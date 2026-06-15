# Features

PyTorch-Plugin-FL provides the following capabilities:

## Automatic device registration

Automatically registers FlagGems Triton operators as dispatch implementations for the `flagos` device. Once imported, all tensor operations on `device="flagos"` automatically use FlagGems Triton kernels without code changes.

## Configurable backend routing

Select FlagGems or native vendor backend (CUDA/MACA/Ascend) at per-operator granularity. The `backends.conf` configuration file controls which operators use which backend, with environment variable overrides for individual operators.

## Multi-platform support

Supports three hardware platforms:

| Platform | Backend | Notes |
|----------|---------|-------|
| **NVIDIA CUDA** | CUDA 12.8 + FlagGems Triton | Full FlagGems support |
| **MACA (MetaX)** | MACA cu-bridge + shim | Import `torch_fl` before `torch` |
| **Huawei Ascend** | ACL NN API | FlagGems disabled; native kernels only |

## Complete device management API

Provides a full PyTorch-compatible device interface:

- Stream management
- Event synchronization
- RNG state
- AMP (Automatic Mixed Precision)
- Device context management
- Memory allocator (device and pinned)
