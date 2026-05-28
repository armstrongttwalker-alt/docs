# Basic Usage

## Import and register device

```{code} python
import torch
import torch_fl  # Import automatically registers FlagGems operators

# Create tensors on flagos device
x = torch.randn(1000, 1000, device="flagos")
y = torch.randn(1000, 1000, device="flagos")

# All operations automatically use FlagGems Triton kernels
z = x + y
mm_result = torch.mm(x, y)
softmax_result = torch.softmax(x, dim=-1)
```

```{note}
**Import order on MetaX (MACA) hardware**:
On MetaX (MACA) hardware specifically, you must import `torch_fl` before import `torch`, because PyTorch's bundled CUDA 12.x runtime is ABI-incompatible with MACA's cu-bridge (CUDA 11.6 compatibility layer). `torch_fl` preloads a shim library to provide the required symbol versions.
```


## Transfer data between devices

```python
# CPU to flagos
cpu_tensor = torch.randn(3, 3)
flagos_tensor = cpu_tensor.to("flagos")

# flagos back to CPU
back_to_cpu = flagos_tensor.cpu()
```

## Manage device context

```python
with torch_fl.flagos.device(0):
    a = torch.randn(10, 10, device="flagos")
```
