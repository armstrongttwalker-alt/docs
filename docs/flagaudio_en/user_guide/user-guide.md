# FlagAudio User Guide

## Audio Processing Pipeline

FlagAudio provides a complete processing chain from raw audio to model input:

1. **Audio input** -- Raw audio waveform data (typically loaded as PyTorch tensors).
2. **Signal processing** -- GPU-accelerated audio signal processing operations.
3. **Feature extraction** -- Transform processed audio into model-ready features.
4. **Model input** -- Output tensors ready for speech AI models.

## Multi-Backend Support

FlagAudio's flexible backend mechanism allows it to target different chip vendors. The active backend is determined by the Triton configuration on your system.

## Integration with PyTorch

FlagAudio operators integrate directly with PyTorch tensors, enabling seamless inclusion in audio processing pipelines and speech AI model training workflows.
