# FlagTensor Overview

FlagTensor is a high-performance tensor-primitive library oriented toward multiple hardware backends. It is part of the [FlagOS](https://flagos.io/) ecosystem and provides efficient implementations of common tensor primitives, including unary, binary, and contraction operations. FlagTensor supports correctness and performance comparisons against cuTensor baselines.

FlagTensor is implemented with the [Triton programming language](https://github.com/openai/triton) launched by OpenAI, enabling portable kernel code across diverse hardware.

## Features

- **Performance-tuned tensor primitives** -- Unary, binary, and contraction operations optimized for throughput and latency.
- **Triton kernel call optimization** -- Kernel launch patterns minimize overhead and maximize hardware utilization.
- **Flexible multi-backend support** -- Pluggable backend mechanism targets different chip vendors through a unified API.
- **Common tensor primitives** -- Includes ReLU and other element-wise and reduction operations, with correctness and performance validation against cuTensor baselines.

## Architecture

FlagTensor follows a layered architecture:

1. **Python API layer** -- User-facing interface (`flagtensor.*`) that integrates with PyTorch tensors.
2. **Triton kernel layer** -- Chip-agnostic kernel implementations for tensor primitives.
3. **Backend dispatch layer** -- Routes kernel execution to the appropriate hardware-specific runtime.
4. **Validation layer** -- Correctness and performance comparison against cuTensor baselines.
