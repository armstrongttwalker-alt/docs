# FlagAudio User Guide

## Use FlagAudio

FlagAudio integrates directly with PyTorch. Import the package and call operators on CUDA tensors:

```python
import torch
import flag_audio

# Create a tensor on CUDA
x = torch.randn(1024, device='cuda')

# Apply audio operator
y = flag_audio.ops.add_noise(x)
```

## Operator List

| Category | Operators |
|---|---|
| **Audio Effects** | add_noise, dcshift, mu_law_encoding |
| **Spectral Analysis** | amplitude_to_DB, spectral_centroid |

