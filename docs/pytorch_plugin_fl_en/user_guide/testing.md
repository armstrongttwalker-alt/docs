# Run tests

Tests in `tests/integration/ops/` are marked with `@pytest.mark` to indicate platform scope.

## Pytest marks

| Mark | Description | When to run |
|------|---------|-------------|
| `@pytest.mark.anyplatform` | Platform-agnostic correctness tests (shape, dtype, broadcast) | Any platform |
| `@pytest.mark.cuda` | CUDA/FlagGems dispatch routing tests. | CUDA platform only |
| `@pytest.mark.ascend` | Ascend backend dispatch tests. | Ascend platform only |
| `@pytest.mark.flaggems` | Requires FlagGems (Triton) backend. | FlagGems platform |
| `@pytest.mark.flaggems_python` | Requires FlagGems Python wrapper (pybind11 path). | FlagGems platform |

Use `-m <mark>` to run specific test categories. Example: `pytest tests/integration/ops/ -m cuda` runs only CUDA tests.

## CUDA platform

```{code-block} bash
# Operator tests (requires FlagGems source for C++ native API)
FLAGOS_DISABLE_FLAGGEMS_PY=1 FLAGGEMS_SOURCE_DIR=/path_to_repos/FlagGems/src/flag_gems \
  pytest tests/integration/ops/ -v -m "anyplatform or cuda"

# Qwen3 inference test
FLAGOS_DISABLE_FLAGGEMS_PY=1 FLAGGEMS_SOURCE_DIR=/path_to_repos/FlagGems/src/flag_gems \
  pytest tests/integration/test_qwen3_infer.py -v -s

# Qwen3 training test (single GPU)
FLAGOS_DISABLE_FLAGGEMS_PY=1 FLAGGEMS_SOURCE_DIR=/path_to_repos/FlagGems/src/flag_gems \
  pytest tests/integration/test_qwen3_train.py -v -s --steps 10

# Run only CUDA-specific tests
pytest tests/integration/ops/ -v -m cuda

# Run only FlagGems (Triton) backend tests
pytest tests/integration/ops/ -v -m flaggems

# Run only FlagGems Python wrapper tests
pytest tests/integration/ops/ -v -m flaggems_python

# Run platform-agnostic correctness tests
pytest tests/integration/ops/ -v -m anyplatform

# FlagGems Python wrapper (flagos_python) end-to-end tests
FLAGOS_BACKEND_CONFIG=torch_fl/backends_flagos_py.conf \
  pytest tests/integration/ops/ -v
```

## Ascend platform

```{code-block} bash
# Operator tests
FLAGOS_DISABLE_FLAGGEMS_PY=1 FLAGOS_BACKEND_CONFIG=torch_fl/backends_ascend.conf \
  pytest tests/integration/ops/ -v -m "anyplatform or ascend"

# Qwen3 inference test
FLAGOS_DISABLE_FLAGGEMS_PY=1 FLAGOS_BACKEND_CONFIG=torch_fl/backends_ascend.conf \
  pytest tests/integration/test_qwen3_infer.py -v -s

# Qwen3 training test (single GPU)
FLAGOS_DISABLE_FLAGGEMS_PY=1 FLAGOS_BACKEND_CONFIG=torch_fl/backends_ascend.conf \
  pytest tests/integration/test_qwen3_train.py -v -s --steps 10
```

```{note}
- `FLAGOS_DISABLE_FLAGGEMS_PY=1` is required on Ascend to skip FlagGems Python-layer registration, which crashes due to NPU device detection issues. FlagGems is optional on Ascend platform.

- The `test_qwen3_infer.py` and `test_qwen3_train.py` tests use the same code on all platforms — only the installation method (`ACCELERATOR=ascend pip install -e .`) and runtime environment variables differ.
```
