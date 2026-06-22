# 运行测试

`tests/integration/ops/` 中的测试使用 `@pytest.mark` 标记来指示平台范围。

## Pytest 标记

| 标记 | 描述 | 何时运行 |
|------|---------|-------------|
| `@pytest.mark.anyplatform` | 平台无关的正确性测试（形状、dtype、广播） | 任何平台 |
| `@pytest.mark.cuda` | CUDA/FlagGems 调度路由测试。 | 仅 CUDA 平台 |
| `@pytest.mark.ascend` | 昇腾后端调度测试。 | 仅昇腾平台 |
| `@pytest.mark.flaggems` | 需要 FlagGems（Triton）后端。 | FlagGems 平台 |
| `@pytest.mark.flaggems_python` | 需要 FlagGems Python 封装（pybind11 路径）。 | FlagGems 平台 |

使用 `-m <标记>` 运行特定的测试类别。示例：`pytest tests/integration/ops/ -m cuda` 仅运行 CUDA 测试。

## CUDA 平台

```{code-block} bash
# 算子测试（需要 FlagGems 源码以使用 C++ 原生 API）
FLAGOS_DISABLE_FLAGGEMS_PY=1 FLAGGEMS_SOURCE_DIR=/path_to_repos/FlagGems/src/flag_gems \
  pytest tests/integration/ops/ -v -m "anyplatform or cuda"

# Qwen3 推理测试
FLAGOS_DISABLE_FLAGGEMS_PY=1 FLAGGEMS_SOURCE_DIR=/path_to_repos/FlagGems/src/flag_gems \
  pytest tests/integration/test_qwen3_infer.py -v -s

# Qwen3 训练测试（单 GPU）
FLAGOS_DISABLE_FLAGGEMS_PY=1 FLAGGEMS_SOURCE_DIR=/path_to_repos/FlagGems/src/flag_gems \
  pytest tests/integration/test_qwen3_train.py -v -s --steps 10

# 仅运行 CUDA 特定测试
pytest tests/integration/ops/ -v -m cuda

# 仅运行 FlagGems（Triton）后端测试
pytest tests/integration/ops/ -v -m flaggems

# 仅运行 FlagGems Python 封装测试
pytest tests/integration/ops/ -v -m flaggems_python

# 运行平台无关的正确性测试
pytest tests/integration/ops/ -v -m anyplatform

# FlagGems Python 封装（flagos_python）端到端测试
FLAGOS_BACKEND_CONFIG=torch_fl/backends_flagos_py.conf \
  pytest tests/integration/ops/ -v
```

## 昇腾平台

```{code-block} bash
# 算子测试
FLAGOS_DISABLE_FLAGGEMS_PY=1 FLAGOS_BACKEND_CONFIG=torch_fl/backends_ascend.conf \
  pytest tests/integration/ops/ -v -m "anyplatform or ascend"

# Qwen3 推理测试
FLAGOS_DISABLE_FLAGGEMS_PY=1 FLAGOS_BACKEND_CONFIG=torch_fl/backends_ascend.conf \
  pytest tests/integration/test_qwen3_infer.py -v -s

# Qwen3 训练测试（单 GPU）
FLAGOS_DISABLE_FLAGGEMS_PY=1 FLAGOS_BACKEND_CONFIG=torch_fl/backends_ascend.conf \
  pytest tests/integration/test_qwen3_train.py -v -s --steps 10
```

```{note}
- 在昇腾平台上，`FLAGOS_DISABLE_FLAGGEMS_PY=1` 是必需的，以跳过 FlagGems Python 层注册，否则会因 NPU 设备检测问题而崩溃。在昇腾平台上，FlagGems 是可选的。

- `test_qwen3_infer.py` 和 `test_qwen3_train.py` 测试在所有平台上使用相同的代码——只有安装方法（`ACCELERATOR=ascend pip install -e .`）和运行时环境变量不同。
```
