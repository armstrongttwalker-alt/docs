# Architecture

## PrivateUse1 Device Extension

PyTorch-Plugin-FL is built on PyTorch's PrivateUse1 extension mechanism, which allows registering custom device types without modifying PyTorch source code. The `flagos` device is registered as a PrivateUse1 device, providing:

- Tensor allocation and memory management
- Operator dispatch to registered implementations
- Stream and event management
- Device-to-device data transfer

## Dispatch Architecture

```
import torch_fl
  → Registers 'flagos' as PrivateUse1 device
  → Registers FlagGems operators via torch.library
  → Loads backends.conf for per-operator routing

torch.mm(x, y)  # x, y on flagos device
  → PyTorch dispatch
  → Check backends.conf: mm = ?
  → If flagos: FlagGems Triton kernel
  → If cuda: native CUDA kernel
  → If flaggems: FlagGems Python-layer impl
```

## Backend Configuration

The dispatch system uses a configuration file (`backends.conf`) with environment variable overrides:

```ini
# backends.conf
# Format: op_name = backend
# backend: "flagos" | "flaggems" | "cuda"
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

On Ascend, FlagGems and CUDA kernels are disabled by default. Only the Ascend kernel backend (ACL NN API) is compiled and used.
