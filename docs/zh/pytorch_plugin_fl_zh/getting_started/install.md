# 安装

## 从源码构建

### CUDA 平台

```{code-block} bash
git clone https://github.com/flagos-ai/PyTorch-Plugin-FL.git && cd PyTorch-Plugin-FL

pip install -e . --no-build-isolation
```

### MACA 平台

```{code-block} bash
# 设置 MACA cu-bridge 库路径，根据您环境中实际的 cu-bridge 路径进行调整
export LD_LIBRARY_PATH=/opt/maca/tools/cu-bridge/lib:$LD_LIBRARY_PATH

ACCELERATOR=maca pip install -e . --no-build-isolation
```

### 华为昇腾平台

```{code-block} bash
# 确保已安装 CANN 工具包并已 source 环境
# （通常为：source /usr/local/Ascend/ascend-toolkit/set_env.sh）

ACCELERATOR=ascend FLAGGEMS_KERNEL=0 CUDA_KERNEL=0 ASCEND_KERNEL=1 \
  pip install --no-build-isolation -vvv -e .
```

在昇腾平台上，FlagGems 和 CUDA 内核被禁用。仅编译昇腾内核后端（ACL NN API）。

## 构建环境变量

| 变量 | 描述 |
|----------|-------------|
| `ACCELERATOR` | 硬件平台：`cuda`（默认）、`maca` 或 `ascend` |
| `CUDA_HOME` | CUDA 工具包路径 |
| `MACA_PATH` | MACA SDK 路径（默认 `/opt/maca`） |
| `ASCEND_HOME` | CANN 工具包路径（默认 `/usr/local/Ascend/ascend-toolkit/latest`） |
| `FLAGGEMS_DIR` | FlagGems C++ 库路径（启用低开销 C++ 调度） |
| `FLAGGEMS_KERNEL` | 启用 FlagGems 内核构建（`ON`/`OFF`，默认 `ON`；昇腾平台设为 `0`） |
| `CUDA_KERNEL` | 启用 CUDA 内核构建（`ON`/`OFF`，默认 `ON`；昇腾平台设为 `0`） |
| `ASCEND_KERNEL` | 启用昇腾内核构建（`ON`/`OFF`，默认 `OFF`；昇腾平台设为 `1`） |

### 运行时环境变量

| 变量 | 描述 |
| :--- | :--- |
| `FLAGOS_DISABLE_FLAGGEMS_PY` | 设为 `1` 以禁用 FlagGems Python 层注册（昇腾平台必需） |
| `FLAGGEMS_SOURCE_DIR` | FlagGems 源码目录（当 C++ 原生 API 算子路由到 `flaggems` 后端时必需） |
| `FLAGOS_BACKEND_CONFIG` | 覆盖 `backends.conf` 的路径（昇腾平台使用 `torch_fl/backends_ascend.conf`） |
| `FLAGOS_LOG_DISPATCH` | 设为 `1` 以打印每次算子调度的后端选择 |
| `FLAGOS_OP_<name>` | 逐算子后端覆盖（算子名称中的 `.` 替换为 `__`） |
