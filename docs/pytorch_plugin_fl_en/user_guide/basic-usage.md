# Basic Usage

## Import and Device Registration

```python
import torch
import torch_fl  # Import automatically registers FlagGems operators
```

Once imported, the `flagos` device is available for tensor operations.

## Create Tensors on flagos Device

```python
# Create tensors on flagos device
x = torch.randn(1000, 1000, device="flagos")
y = torch.randn(1000, 1000, device="flagos")

# All operations automatically use FlagGems Triton kernels
z = x + y
mm_result = torch.mm(x, y)
softmax_result = torch.softmax(x, dim=-1)
```

## Data Transfer Between Devices

```python
# CPU to flagos
cpu_tensor = torch.randn(3, 3)
flagos_tensor = cpu_tensor.to("flagos")

# flagos back to CPU
back_to_cpu = flagos_tensor.cpu()
```

## C++ Stub-Only Mode

You can disable the FlagGems Python-layer registration entirely, leaving only the C++ unified wrapper active. This is useful for verifying that all required operators are covered by C++ stubs.

```{code-block} shell
# Required: tell FlagGems C++ native API where to find Triton kernel sources
export FLAGGEMS_SOURCE_DIR=$(python -c "import os;import flag_gems;print(os.path.dirname(flag_gems.__file__))")

# Disable Python-layer FlagGems registration
export FLAGOS_DISABLE_FLAGGEMS_PY=1

python your_script.py
```

In this mode, all operator dispatch is handled by the C++ dispatch stub (`backends.conf` routing), with no Python-layer `torch.library` registrations from FlagGems.
