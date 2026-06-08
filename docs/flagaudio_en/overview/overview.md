# FlagAudio Overview

FlagAudio is a multi-backend computing library that adheres to Audio standard interfaces. It is part of the [FlagOS](https://flagos.io/) ecosystem and delivers a high-performance computing solution designed for audio signal processing and speech AI applications, offering a complete processing chain from raw audio to model input.

FlagAudio is implemented using the [Triton programming language](https://github.com/openai/triton) launched by OpenAI, enabling portable kernel code across diverse hardware backends.

## Features

- **Deep performance tuning** -- Audio processing operators have undergone extensive optimization for throughput and latency.
- **Triton kernel call optimization** -- Kernel launch patterns minimize overhead and maximize hardware utilization.
- **Flexible multi-backend support** -- Pluggable backend mechanism targets different chip vendors through a unified Audio-compatible API.
- **Complete audio processing chain** -- From raw audio input to model-ready features for speech AI applications.

## Architecture

FlagAudio follows a layered architecture:

1. **Python API layer** -- User-facing interface that integrates with PyTorch tensors and audio data pipelines.
2. **Triton kernel layer** -- Chip-agnostic kernel implementations for audio signal processing operations.
3. **Backend dispatch layer** -- Routes kernel execution to the appropriate hardware-specific runtime.

## Application Domains

- Audio signal processing
- Speech recognition preprocessing
- Feature extraction for speech AI models
- Real-time audio analysis
