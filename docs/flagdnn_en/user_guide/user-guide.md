# FlagDNN User Guide

## Basic Usage

FlagDNN integrates directly with PyTorch. Import the package and call operators on CUDA tensors:

```python
import torch
import flag_dnn

# Create a tensor on CUDA
x = torch.randn(1024, device='cuda')

# Apply ReLU activation
y = flag_dnn.ops.relu(x)
```

## Available Operators

### ReLU

The ReLU (Rectified Linear Unit) activation function applies element-wise: `output = max(0, input)`.

```python
import torch
import flag_dnn

x = torch.randn(1024, device='cuda')
y = flag_dnn.ops.relu(x)
```

| Property | Value |
|----------|-------|
| Input dtype | float32, float16, bfloat16 |
| Output dtype | Same as input |
| In-place support | Check API for in-place variant |

## Multi-Backend Support

FlagDNN's flexible backend mechanism allows it to target different chip vendors. The active backend is determined by the Triton configuration on your system. Consult the Triton documentation for backend-specific setup instructions.
