# 添加新算子和供应商后端

## 添加新算子

添加新算子时，修改以下文件：

- `backends/flaggems/impl/*.py` - 添加 FlagGems 实现
- `backends/flaggems/flaggems.py` - 向后端类添加方法
- `backends/flaggems/register_ops.py` - 注册 OpImpl
- `backends/reference/impl/*.py` - 添加 PyTorch 实现（如适用）
- `backends/reference/reference.py` - 向后端类添加方法
- `backends/reference/register_ops.py` - 注册 OpImpl
- `backends/vendor/<vendor>/impl/*.py` - 添加供应商特定实现（可选）
- `backends/vendor/<vendor>/<vendor>.py` - 向供应商后端类添加方法
- `backends/vendor/<vendor>/register_ops.py` - 注册供应商 OpImpl
- `ops.py` - 添加抽象方法声明

**注意：** 并非所有算子都需要参考实现。例如，`attention_backend` 只有 FlagGems 和供应商实现，因为它返回的是后端类路径而不是执行计算。

### 添加供应商后端

调度系统支持三种集成供应商后端的方式：

1. **内置供应商后端** - 位于 `backends/vendor/`（推荐用于核心供应商）
2. **外部插件包** - 作为独立的 Python 包分发
3. **基于环境变量的插件** - 通过 `VLLM_FL_PLUGIN_MODULES` 加载

#### 选项 1：内置供应商后端

目录结构：

```
backends/vendor/<vendor_name>/
├── __init__.py
├── <vendor_name>.py        # 后端类
├── register_ops.py         # 注册函数
└── impl/                   # 算子实现
    ├── __init__.py
    ├── activation.py
    ├── normalization.py
    ├── rotary.py
    └── attention.py        # （可选）供应商特定的注意力后端
```

**步骤 1：创建后端类**（`<vendor_name>.py`）：

```python
from ...base import Backend

class <VendorName>Backend(Backend):
    _available = None

    @property
    def name(self) -> str:
        return "<vendor_name>"

    @property
    def vendor(self) -> str:
        return "<vendor_name>"  # 供应商后端必需

    def is_available(self) -> bool:
        if <VendorName>Backend._available is None:
            try:
                import <vendor_library>
                <VendorName>Backend._available = True
            except ImportError:
                <VendorName>Backend._available = False
        return <VendorName>Backend._available

    def silu_and_mul(self, x):
        from .impl.activation import silu_and_mul_<vendor>
        return silu_and_mul_<vendor>(x)
```

**步骤 2：创建注册模块**（`register_ops.py`）：

```python
from ....types import OpImpl, BackendImplKind, BackendPriority

def register_builtins(registry):
    from .<vendor_name> import <VendorName>Backend
    backend = <VendorName>Backend()

    impls = [
        OpImpl(
            op_name="silu_and_mul",
            impl_id="vendor.<vendor_name>",
            kind=BackendImplKind.VENDOR,
            fn=backend.silu_and_mul,
            vendor="<vendor_name>",
            priority=BackendPriority.VENDOR,  # 100
        ),
    ]
    registry.register_many(impls)
```

**步骤 3：在 builtin_ops.py 中注册**：

```python
try:
    from .backends.vendor.<vendor_name>.register_ops import register_builtins as register_<vendor>
    register_<vendor>(registry)
except Exception as e:
    logger.debug(f"<Vendor> 算子不可用: {e}")
```

#### 选项 2：外部插件包

创建一个带有入口点的独立包：

```python
# setup.py
setup(
    name="vllm-plugin-<vendor>",
    entry_points={
        "vllm_fl.plugin": [
            "<vendor> = vllm_fl_<vendor>.register_ops:register_builtins",
        ],
    },
)
```

安装并使用：

```bash
pip install vllm-plugin-<vendor>
# 插件通过入口点自动发现
```

#### 选项 3：基于环境变量的插件

```bash
export VLLM_FL_PLUGIN_MODULES=my_custom_backend.register_ops
```

该模块应提供一个 `register_builtins(registry)` 函数。

#### 优先级级别

使用 `types.py` 中的常量：

- `BackendPriority.DEFAULT` (150) - FlagGems
- `BackendPriority.VENDOR` (100) - 供应商后端
- `BackendPriority.REFERENCE` (50) - PyTorch

#### 测试您的后端

```python
from vllm_fl.dispatch import get_default_manager

manager = get_default_manager()
manager.ensure_initialized()

# 检查注册
snap = manager.registry.snapshot()
for op_name, impls in snap.impls_by_op.items():
    for impl in impls:
        if impl.vendor == "<vendor_name>":
            print(f"{op_name}: {impl.impl_id}, available={impl.is_available()}")
```

启用调试输出：

```bash
export VLLM_FL_LOG_LEVEL=DEBUG
```

#### 供应商后端检查清单

- [ ] 后端类继承自 `Backend`
- [ ] `vendor` 属性返回供应商名称（不是 None）
- [ ] `is_available()` 检查硬件/库的可用性
- [ ] `register_ops.py` 使用 `BackendImplKind.VENDOR`
- [ ] `impl_id` 遵循格式：`vendor.<vendor_name>`
- [ ] 优先级设置为 `BackendPriority.VENDOR` (100)
- [ ] 对缺失依赖的错误处理
- [ ] （可选）`attention_backend()` 返回供应商特定的注意力后端类路径

#### 当前供应商后端

| 供应商 | 设备 | 库 | 注意力后端 |
|--------|--------|---------|-------------------|
| `cuda` | NVIDIA GPU | `vllm._custom_ops` | -（使用 vLLM 原生） |
| `ascend` | 华为 NPU | `torch_npu` | `AscendAttentionBackend` |

请参阅 `backends/vendor/template/` 获取创建新供应商后端的模板。

## 多进程安全

OpManager 支持多进程环境：

- 使用 `os.register_at_fork()` 在 fork 后自动重置状态
- PID 检测确保每个进程独立初始化
- 线程安全的注册表和缓存操作
