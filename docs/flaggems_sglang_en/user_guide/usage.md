# Use operators

After installing FlagGems-sglang, import the package and call the operators directly. Every operator resolved for the current device is attached to the package namespace, so the call site stays the same regardless of the underlying hardware.

The example below uses two exported operators, `silu_and_mul` and `fused_rmsnorm`:

```python
import torch
import flaggems_sglang

# Create a tensor; hidden_states has shape [..., 2d]
x = torch.randn(1024, 4096, device=flaggems_sglang.device)

# Gated SiLU: out = silu(x[..., :d]) * x[..., d:]
y = flaggems_sglang.silu_and_mul(x)

# Fused RMSNorm over the last dimension
weight = torch.ones(2048, device=flaggems_sglang.device)
z = flaggems_sglang.fused_rmsnorm(y, weight, eps=1e-5)
```

To check which implementation was resolved on the current machine:

```python
print(flaggems_sglang.device, flaggems_sglang.vendor_name)
print(flaggems_sglang.silu_and_mul.__module__)
print(len(flaggems_sglang.all_registered_ops()), "operators registered")
```

For a full operator list, see [Operator List](../reference/operator_list.md).
