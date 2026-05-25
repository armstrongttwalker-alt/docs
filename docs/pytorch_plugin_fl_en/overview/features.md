# Features

PyTorch-Plugin-FL provides the following capabilities:

## Automatic Device Registration

Automatically registers FlagGems Triton operators as dispatch implementations for the `flagos` device. Once imported, all tensor operations on `device="flagos"` automatically use FlagGems Triton kernels without code changes.

## Configurable Backend Routing

Select FlagGems or native vendor backend (CUDA/MACA/Ascend) at per-operator granularity. The `backends.conf` configuration file controls which operators use which backend, with environment variable overrides for individual operators.

## Multi-Platform Support

Currently supports:

- **NVIDIA CUDA** — Standard CUDA platform with full FlagGems support
- **MACA (MetaX)** — MetaX GPU platform via MACA cu-bridge library
- **Huawei Ascend** — Ascend NPU platform via CANN toolkit

## Complete Device Management API

Provides full PyTorch device interface:

- Stream management
- Event synchronization
- RNG state
- AMP (Automatic Mixed Precision)
- Device context management

## C++ Dispatch Stub

A C++ unified wrapper provides low-overhead operator dispatch. The Python-layer FlagGems registration can be disabled entirely, leaving only the C++ stub active for minimal overhead.
