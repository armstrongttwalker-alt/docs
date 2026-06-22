# 通过 YAML 配置文件进行调度

插件附带一个示例配置文件 `config/sample.yaml`，包含所有可用选项。复制并自定义：

```{code-block} shell
# 复制示例配置
cp $(python -c "from sglang_fl.config import _CONFIG_DIR; print(_CONFIG_DIR / 'sample.yaml')") my_config.yaml

# 根据需要编辑，然后使用它启动
SGLANG_FL_CONFIG=./my_config.yaml python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-0.5B-Instruct \
    --port 30000 --disable-piecewise-cuda-graph
```

如果未设置 `SGLANG_FL_CONFIG`，插件使用合理的默认值（在 CUDA 上等同于 `prefer: flagos`）。仅当需要自定义行为时才需要 YAML 文件。

## 配置字段

```yaml
# 全局后端偏好：flagos | vendor | reference
prefer: flagos

# 逐算子后端优先级（有序列表，第一个可用的胜出）
op_backends:
  rms_norm: [vendor, flagos, reference]
  silu_and_mul: [flagos, vendor, reference]

# 第二层要跳过的融合算子（回退到 SGLang 原生 CUDA）
# 可用：SiluAndMul、RMSNorm、RotaryEmbedding
oot_blacklist:
  - RotaryEmbedding

# 第一层要从 FlagGems Triton 替换中排除的 ATen 算子
flagos_blacklist:
  - mul
  - sub
```

| 字段 | 描述 |
|-------|-------------|
| `prefer` | 全局后端偏好：`flagos`、`vendor`、`reference` |
| `op_backends` | 逐算子有序后端列表（第一个可用的胜出，可列出 1–3 个后端） |
| `oot_blacklist` | 第二层要从 OOT 调度中跳过的融合算子（回退到 SGLang 原生 CUDA） |
| `flagos_blacklist` | 第一层要从 FlagGems 替换中排除的 ATen 算子（回退到 PyTorch 原生） |

## 常用配置方案

每个方案展示一个 YAML 配置和预期的调度结果。使用[调度日志](/dispatch_user_guide/debugg-and-diagonostics.md)进行验证。

### 1. 跳过 RotaryEmbedding 的 OOT 调度（回退到 SGLang 原生 CUDA）

```yaml
# my_config.yaml
prefer: flagos
oot_blacklist:
  - RotaryEmbedding
```

预期调度日志：仅出现 SiluAndMul 和 RMSNorm，不出现 RotaryEmbedding。

### 2. 强制 RMSNorm 使用 vendor 后端，其他使用 flagos

```yaml
# my_config.yaml
prefer: flagos
op_backends:
  rms_norm: [vendor, flagos, reference]
```

预期调度日志：`RMSNorm → vendor(vendor.nvidia)`，`SiluAndMul → flagos(flagos)`。

### 3. 所有算子使用纯 PyTorch reference（适用于精度调试）

```yaml
# my_config.yaml
prefer: reference
```

预期调度日志：所有算子 → `reference(reference)`。
