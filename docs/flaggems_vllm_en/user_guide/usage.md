# Usage

After installing FlagGems-vLLM, you can use its optimized operators directly in your Python code.

## Basic usage

Import the library and call the operators on CUDA tensors:

```python
import torch
import flaggems_vllm

# Create a tensor
x = torch.randn(1024, device='cuda')

# Apply ReLU activation
y = flaggems_vllm.ops.relu(x)
```

For more operators, see the [Operator List](../reference/operator_list.md) for a complete reference.
