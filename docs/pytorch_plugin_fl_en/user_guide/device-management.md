# Device Management

## Device Context Management

```python
import torch_fl

# Use device context manager
with torch_fl.flagos.device(0):
    a = torch.randn(10, 10, device="flagos")
    b = torch.mm(a, a)
```

## Device Query APIs

```python
# Check if device is available
torch_fl.flagos.is_available()

# Number of devices
torch_fl.flagos.device_count()

# Current device index
torch_fl.flagos.current_device()

# Synchronize device
torch_fl.flagos.synchronize()

# Check if FlagGems operators are registered
torch_fl.is_flaggems_enabled()

# List of registered operators
torch_fl.get_registered_ops()
```

## Platform-Specific Import Order

### MACA Platform

On MetaX (MACA) hardware, you **must** import `torch_fl` before `import torch`:

```python
import torch_fl  # Must import first
import torch
```

Reason: PyTorch's bundled CUDA 12.x runtime is ABI-incompatible with MACA's cu-bridge (CUDA 11.6 compatibility layer). `torch_fl` preloads a shim library to provide the required symbol versions.

This restriction does not apply to CUDA platforms.

### CUDA Platform

On CUDA, import order does not matter:

```python
import torch
import torch_fl  # Works fine after torch
```
