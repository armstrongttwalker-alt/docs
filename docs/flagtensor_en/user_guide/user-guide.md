# FlagTensor User Guide

## Basic Usage

FlagTensor integrates directly with PyTorch. Import the package and call operators on CUDA tensors:

```python
import torch
import flagtensor

# Create a tensor on CUDA
x = torch.randn(1024, device="cuda", dtype=torch.float32)

# Apply ReLU operator
y = flagtensor.relu(x)
```

## Tensor Primitives

### Unary Operations

Element-wise operations applied to a single tensor:

- **ReLU** -- Rectified Linear Unit: `output = max(0, input)`

```python
y = flagtensor.relu(x)
```

### Binary Operations

Operations between two tensors:

- Element-wise arithmetic operations (add, subtract, multiply, divide)
- Comparison operations

### Contraction Operations

Tensor contraction operations for multi-dimensional reductions.

## Multi-Backend Support

FlagTensor's flexible backend mechanism allows it to target different chip vendors. The active backend is determined by the Triton configuration on your system.

## Validation Against cuTensor

FlagTensor supports correctness and performance comparisons against cuTensor baselines. Use the provided test utilities to validate numerical accuracy and benchmark performance.
