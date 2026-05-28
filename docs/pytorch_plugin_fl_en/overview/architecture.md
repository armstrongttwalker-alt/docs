# Architecture

## PrivateUse1 Device Extension

PyTorch-Plugin-FL is built on PyTorch's PrivateUse1 extension mechanism, which allows registering custom device types without modifying PyTorch source code. The `flagos` device is registered as a PrivateUse1 device, providing:

- Tensor allocation and memory management
- Operator dispatch to registered implementations
- Stream and event management
- Device-to-device data transfer

## Layered Architecture

```
┌──────────────────────────────────────────────────────────────┐
│  Python: import torch_fl                                     │
│  ┌────────────────┐  ┌────────────────────────────┐          │
│  │ torch_fl.flagos│  │ torch_fl.distributed       │          │
│  │ (device API)   │  │ (DDP/FSDP patch)           │          │
│  └────────────────┘  └────────────────────────────┘          │
├──────────────────────────────────────────────────────────────┤
│  PrivateUse1 Dispatch                                        │
│  ┌─────────────┐  ┌──────────┐  ┌───────────┐  ┌────────┐    │
│  │ FlagGems    │  │ CUDA     │  │ Ascend    │  │ CPU    │    │
│  │ (Triton)    │  │ (native) │  │ (ACL NN)  │  │fallback│    │
│  └─────────────┘  └──────────┘  └───────────┘  └────────┘    │
├──────────────────────────────────────────────────────────────┤
│  C++ Runtime (csrc/)                                         │
│  ┌──────────┐ ┌────────┐ ┌───────┐ ┌───────────┐             │
│  │Allocator │ │ Guard  │ │ RNG   │ │ Hooks     │             │
│  └──────────┘ └────────┘ └───────┘ └───────────┘             │
├──────────────────────────────────────────────────────────────┤
│  Hardware Abstraction (accelerator/)                         │
│  ┌──────────────┐  ┌─────────────────────┐  ┌────────────┐   │
│  │ CUDA Runtime │  │ MACA cu-bridge+shim │  │ Ascend ACL │   │
│  └──────────────┘  └─────────────────────┘  └────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

## Backend Configuration

The dispatch system uses a configuration file (`backends.conf`) with environment variable overrides:

```ini
# backends.conf
# Format: op_name = backend
# backend: "flagos" | "flaggems" | "cuda" | "ascend"
mm = cuda
bmm = flagos
cat = cuda
```

Operators not listed in the config default to `flagos` (FlagGems).

## Platform-Specific Notes

### MACA (MetaX) Import Order

On MetaX hardware, you **must** import `torch_fl` before `import torch`:

```python
import torch_fl  # Must import first
import torch
```

PyTorch's bundled CUDA 12.x runtime is ABI-incompatible with MACA's cu-bridge (CUDA 11.6 compatibility layer). `torch_fl` preloads a shim library to provide the required symbol versions.

This restriction does not apply to CUDA platforms.

### Ascend Platform

On Ascend, FlagGems and CUDA kernels are disabled by default. Only the Ascend kernel backend (ACL NN API) is compiled and used. Set `FLAGOS_DISABLE_FLAGGEMS_PY=1` and use `torch_fl/backends_ascend.conf` for the correct routing.
