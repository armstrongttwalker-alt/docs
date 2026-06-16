# 插件工作原理

## 加载插件

SGLang 在启动时通过 setuptools entry_points 自动发现并加载插件。

插件在 `pyproject.toml` 中注册了两个 entry_points：

```{code-block} python
[project.entry-points."sglang.srt.plugins"]
sglang_fl = "sglang_fl:load_plugin"

[project.entry-points."sglang.srt.platforms"]
sglang_fl = "sglang_fl:activate_platform"
```

## 调度钩子

核心机制使用 `MultiPlatformOp.dispatch_forward()` 上的 AROUND 钩子，结合标准化调度系统：

```{code-block} python
dispatch_forward() 被调用（例如 RMSNorm）
  → AROUND 钩子拦截
    → 检查 OOT_WHITELIST/OOT_BLACKLIST
    → 通过 MRO 查找桥接函数（RMSNorm → rms_norm_bridge）
    → 返回桥接函数作为 forward 方法
  → SGLang 使用框架参数调用桥接函数：
      rms_norm_bridge(self, x, residual, post_residual_addition)
    → 桥接函数处理 SGLang 特定参数（post_residual_addition → 合并到 residual）
    → 桥接函数调用 dispatch.call_op("rms_norm", obj, x, residual)
      → OpManager 通过策略解析最佳实现（flagos > vendor > reference）
      → 调用选中的后端：rms_norm_flaggems(obj, x, residual)
```

桥接层将框架特定参数与标准化算子签名解耦。厂商后端只需实现标准签名——同一实现可同时用于 sglang-plugin-FL 和 vllm-plugin-FL。

## 调度架构（与 vllm-plugin-FL 共享）

```{code-block} python
┌─────────────────────────────────────────────────────────────┐
│  SGLang AROUND Hook        │  vLLM forward_oot override     │
│  (bridge/rms_norm.py)      │  (vllm_fl/ops/layernorm.py)    │
└────────────┬───────────────┴────────────────┬───────────────┘
             │                                │
             ▼                                ▼
┌─────────────────────────────────────────────────────────────┐
│  dispatch.call_op("rms_norm", obj, x, residual)             │
│  OpManager → SelectionPolicy → OpRegistry → resolve impl    │
└──────────────────────────┬──────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
   ┌─────────────┐  ┌───────────┐  ┌──────────────┐
   │ DEFAULT     │  │ VENDOR    │  │ REFERENCE    │
   │ (FlagGems)  │  │ (Ascend/  │  │ (PyTorch)    │
   │ priority=150│  │  CUDA)    │  │ priority=50  │
   │             │  │ priority= │  │              │
   │             │  │   100     │  │              │
   └─────────────┘  └───────────┘  └──────────────┘
```

芯片厂商为两个框架实现**相同的后端接口**。唯一的框架特定代码是桥接层，由插件维护。

## ATen 替换

```{code-block} python
插件加载 → flag_gems.enable(record=True)
  → PyTorch 调度表为 ATen 算子注册 Triton 内核
  → 首次推理调用时，记录每个被替换的算子
  → _AtenOnlyFilter 确保只记录 flag_gems.ops.* 调用
    （排除第二层 flagos 实现中触发的内部 FlagGems 调用）
```
