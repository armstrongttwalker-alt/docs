# Release Notes

## v1.0.0

**Initial release** of PyTorch-Plugin-FL.

### Added

- PrivateUse1-based `flagos` device registration for PyTorch
- Automatic FlagGems Triton operator registration as flagos device backend
- Per-operator backend routing via `backends.conf` configuration file
- Environment variable overrides for individual operator backend selection
- Complete device management API (stream, event, RNG, AMP)
- Support for NVIDIA CUDA, MACA (MetaX), and Huawei Ascend platforms
- C++ dispatch stub for low-overhead operator routing
- C++ Stub-Only mode for verifying operator coverage
- MACA cu-bridge compatibility shim for ABI compatibility
- Dispatch logging for debugging backend selection

### Platform Support

- **CUDA**: Full support with FlagGems Triton kernels (CUDA 12.9+ recommended)
- **MACA (MetaX)**: Supported via MACA cu-bridge library
- **Ascend**: Supported via CANN toolkit, ACL NN API backend

### Known Issues

- **CUDA 12.2 precision**: Known NaN issues with CUDA 12.2. Use CUDA 12.9 or higher.
- **MACA import order**: `torch_fl` must be imported before `torch` on MACA platforms.
