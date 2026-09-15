# Release Notes

This section includes the release information for PyTorch-Plugin-FL.

## v0.1.0


- **Added features**:
  - Initial release of PyTorch-Plugin-FL as part of FlagOS.
  - PrivateUse1-based custom device plugin registering `flagos` as a first-class PyTorch device.
  - Automatic FlagGems Triton operator registration for the `flagos` backend.
  - Per-operator configurable backend routing via `backends.conf` with environment variable overrides.
  - Multi-platform support: NVIDIA CUDA, MetaX MACA, Huawei Ascend.
  - Complete device management API: stream, event, RNG, AMP, memory allocator, DeviceGuard.
  - Lightweight C++ dispatch stub replacing PyTorch's heavier DispatchStub.
  - C++ stub-only mode (`FLAGOS_DISABLE_FLAGGEMS_PY=1`) for minimal overhead.
  - Distributed training support via `torch_fl.distributed` (DDP/FSDP patch).
  - MACA cu-bridge ABI shim for symbol version compatibility.
  - Ascend NPU support with ACL NN API kernels.
  - Integration test suite with factory ops, dispatch routing, CPU fallback tracing, and Qwen3 inference/training tests.
