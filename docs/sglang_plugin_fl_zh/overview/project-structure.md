# 项目结构

```{code-block} python
sglang_fl/
├── pyproject.toml                    # 包配置 + entry_points 注册
└── sglang_fl/
    ├── __init__.py                   # 插件入口：FlagGems + 调度初始化 + 通信器钩子
    ├── platform.py                   # PlatformFL（设备标识、内存、图捕获）
    ├── distributed/                  # 通信模块（与 vllm-plugin-FL 对齐）
    │   ├── __init__.py
    │   ├── communicator.py           # CommunicatorFL（FlagCX / torch.distributed 封装）
    │   └── device_communicators/
    │       └── flagcx.py             # FlagCX 专用通信器
    ├── config/
    │   ├── __init__.py               # YAML 配置加载器，支持平台自动检测
    │   ├── sample.yaml               # 完整示例配置，包含所有选项的文档说明
    │   ├── nvidia.yaml               # NVIDIA CUDA 平台默认配置
    │   └── ascend.yaml               # 昇腾平台默认配置（含黑名单）
    └── dispatch/                     # 算子调度系统（与 vllm-plugin-FL 对齐）
        ├── __init__.py               # 公共 API：call_op()、resolve_op()
        ├── types.py                  # OpImpl、BackendImplKind、BackendPriority
        ├── registry.py               # 线程安全的 OpRegistry
        ├── policy.py                 # SelectionPolicy + 环境变量 / YAML 配置
        ├── manager.py                # OpManager：解析、调用、缓存、回退
        ├── builtin_ops.py            # 注册编排器
        ├── ops.py                    # FLBackendBase ABC（算子签名定义）
        ├── logger_manager.py         # 使用 SGLANG_FL_LOG_LEVEL 进行日志记录
        ├── bridge/                   # SGLang ↔ 调度参数转换
        │   ├── __init__.py
        │   ├── silu_and_mul.py       # forward_cuda(self, x) → call_op("silu_and_mul", obj, x)
        │   ├── rms_norm.py           # 处理 post_residual_addition
        │   └── rotary_embedding.py   # 从 cos_sin_cache 提取 cos/sin，处理偏移量
        └── backends/
            ├── __init__.py           # Backend ABC
            ├── flaggems/             # DEFAULT 后端（FlagGems Triton 内核）
            │   ├── flaggems.py
            │   ├── register_ops.py
            │   └── impl/             # activation.py、normalization.py、rotary.py
            ├── reference/            # REFERENCE 后端（PyTorch 原生，始终可用）
            │   ├── reference.py
            │   ├── register_ops.py
            │   └── impl/             # activation.py、normalization.py、rotary.py
            └── vendor/               # VENDOR 后端（自动发现）
                ├── ascend/           # 华为昇腾 NPU（torch_npu）
                ├── cuda/             # NVIDIA CUDA（sgl_kernel）
                └── template/         # 新厂商模板
```

