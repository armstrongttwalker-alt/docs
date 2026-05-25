# Use operators

After installing FlagGems-vLLM, you can use its optimized operators directly in your Python code.

For example, import the library and call the operators on CUDA tensors:

```python
import torch
import flaggems_vllm

# Create a tensor
x = torch.randn(1024, device='cuda')

# Apply ReLU activation
y = flaggems_vllm.ops.relu(x)
```

For a full operator list, see [Operator List](../reference/operator_list.md).
