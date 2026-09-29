# Requirements

Before installing FlagGems-sglang, ensure your environment meets the following requirements.

## Software requirements

- **Python** 3.8 or higher
- **PyTorch** 2.6.0 or higher, with support for your accelerator
- **Triton** compatible with your GPU architecture
- **PyYAML** and **SQLAlchemy**, required by the operator registry at runtime
- **pip** for package installation

## Build dependencies

The following packages are required to build FlagGems-sglang from source:

- `setuptools` >= 64.0
- `scikit-build-core` >= 0.11
- `pybind11`

`ninja` and `cmake` are only needed when a vendor extension is compiled, which is why the installation guide installs them up front.

## Test dependencies

The `test` extra installs what the test and benchmark suites need:

- `pytest` >= 7.1.0
- `numpy` >= 1.26
- `scipy` >= 1.14
- `cupy-cuda12x`

`cupy-cuda12x` targets CUDA devices. On other accelerators, install the CuPy wheel matching that platform.

## Hardware requirements

A supported accelerator is required to run most operators. The test suite can compare against a CPU reference with `--ref cpu` for the operators that support it.
