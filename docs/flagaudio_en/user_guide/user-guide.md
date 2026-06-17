# FlagAudio User Guide

## Use FlagAudio

FlagAudio integrates directly with PyTorch. Import the package and call operators on CUDA tensors:

```python
import torch
import flag_audio

# Create a tensor on CUDA
waveform = torch.randn(16000, device='cuda')

# Apply gain
y = flag_audio.ops.gain(waveform, gain_db=3.0)
```

## Operator List

DB_to_amplitude, gain, mask_along_axis, mask_along_axis_iid, preemphasis, mu_law_encoding, amplitude_to_DB, dcshift, spectral_centroid, add_noise
