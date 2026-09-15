# 算子调度用户指南

您可以以逐算子粒度配置使用 FlagGems 还是原生厂商后端。通过环境变量调度算子的优先级高于通过配置文件调度。

## 通过环境变量调度

可以通过环境变量覆盖单个算子（优先级高于配置文件）：

```{code-block} bash
# 格式：FLAGOS_OP_<算子名称>=cuda|flaggems
# 将算子名称中的 "." 替换为 "__"
export FLAGOS_OP_mm=cuda
export FLAGOS_OP_mm__out=cuda
```

## 通过配置文件调度

默认路径为 `torch_fl/backends.conf`，可通过 `FLAGOS_BACKEND_CONFIG` 环境变量覆盖。

```{code-block} bash
# 格式：算子名称 = 后端
# 后端："flagos" | "flaggems" | "cuda"
# 未列出的算子默认使用 flagos（FlagGems）
mm = cuda
bmm = flagos
cat = cuda
```

## C++ 纯存根模式

您可以完全禁用 FlagGems Python 层注册，仅保留 C++ 统一封装器处于活动状态。这对于验证所有必需的算子是否都被 C++ 存根覆盖非常有用。

```{code-block} bash
# 必需：告诉 FlagGems C++ 原生 API 在哪里找到 Triton 内核源码
export FLAGGEMS_SOURCE_DIR=$(python -c "import os;import flag_gems;print(os.path.dirname(flag_gems.__file__))")

# 禁用 Python 层 FlagGems 注册
export FLAGOS_DISABLE_FLAGGEMS_PY=1

python your_script.py
```

在此模式下，所有算子调度均由 C++ 调度存根（`backends.conf` 路由）处理，没有来自 FlagGems 的 Python 层 `torch.library` 注册。


## 调试调度

```{code-block} bash
export FLAGOS_LOG_DISPATCH=1  # 打印每次算子调度的后端选择
```

## 运行时环境变量

| 变量 | 描述 |
|----------|-------------|
| `FLAGOS_DISABLE_FLAGGEMS_PY` | 设为 `1` 以禁用 FlagGems Python 层注册（昇腾平台必需） |
| `FLAGGEMS_SOURCE_DIR` | FlagGems 源码目录（当 C++ 原生 API 算子路由到 `flaggems` 后端时必需） |
| `FLAGOS_BACKEND_CONFIG` | 覆盖 `backends.conf` 的路径（昇腾平台使用 `torch_fl/backends_ascend.conf`） |
| `FLAGOS_LOG_DISPATCH` | 设为 `1` 以打印每次算子调度的后端选择 |
| `FLAGOS_OP_<name>` | 逐算子后端覆盖（算子名称中的 `.` 替换为 `__`） |

