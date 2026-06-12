# FlagAudio User Guide

## Use FlagAudio

FlagAudio integrates directly with PyTorch. Import the package and call operators on CUDA tensors:

```python
import torch
import flag_audio

# Create a tensor on CUDA
x = torch.randn(1024, device='cuda')

# Apply audio operator
y = flag_audio.ops.some_operator(x)
```

## Use Multi-Backend

FlagAudio's flexible backend mechanism allows it to target different chip vendors. The active backend is determined by the Triton configuration on your system.

## Integrate with PyTorch

FlagAudio operators can be called directly on PyTorch CUDA tensors, providing seamless integration with existing PyTorch workflows.
