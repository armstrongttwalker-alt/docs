# Features

PyTorch-Plugin-FL provides the following capabilities:

## Automatic Device Registration

Automatically registers FlagGems Triton operators as dispatch implementations for the `flagos` device. Once imported, all tensor operations on `device="flagos"` automatically use FlagGems Triton kernels without code changes.

## Configurable Backend Routing

Select FlagGems or native vendor backend (CUDA/MACA/Ascend) at per-operator granularity. The `backends.conf` configuration file controls which operators use which backend, with environment variable overrides for individual operators.

## Multi-Platform Support

Supports three hardware platforms:

| Platform | Backend | Notes |
|----------|---------|-------|
| **NVIDIA CUDA** | CUDA 12.8 + FlagGems Triton | Full FlagGems support |
| **MACA (MetaX)** | MACA cu-bridge + shim | Import `torch_fl` before `torch` |
| **Huawei Ascend** | ACL NN API | FlagGems disabled; native kernels only |

## Complete Device Management API

Provides a full PyTorch-compatible device interface:

- Stream management
- Event synchronization
- RNG state
- AMP (Automatic Mixed Precision)
- Device context management
- Memory allocator (device and pinned)
