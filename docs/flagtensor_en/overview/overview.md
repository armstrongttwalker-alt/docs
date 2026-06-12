# FlagTensor Overview

FlagTensor is a high-performance tensor-primitive library oriented toward multiple hardware backends. It is part of the [FlagOS](https://flagos.io/) ecosystem and provides efficient implementations of common tensor primitives benchmarked against [cuTensor](https://developer.nvidia.com/cutensor) baselines.

FlagTensor is implemented with the [Triton programming language](https://github.com/openai/triton) via [FlagTree](https://github.com/flagos-ai/FlagTree), enabling portable kernel code across diverse hardware.

## Features

- **Comprehensive tensor primitives** — Unary (28 ops), binary (4 ops), contraction (6 ops), sparse (1 op).
- **Hand-optimized Triton kernels** — Per-architecture autotune for Ampere and Hopper.
- **cuTensor-validated correctness** — Validated against CPU-FP64 golden reference.
- **Performance benchmarked** — Benchmarked against cuTensor baselines.
- **Vendor-agnostic backend** — 15 vendors registered with architecture-specific kernel specialization.
- **Multi-GPU test runner** — Parallel test execution with live progress display.

## Architecture

FlagTensor follows a layered architecture:

1. **Python API layer** — User-facing interface (`flagtensor.*`) that integrates with PyTorch tensors.
2. **Triton kernel layer** — Chip-agnostic kernel implementations for tensor primitives.
3. **Backend dispatch layer** — Routes kernel execution to the appropriate hardware-specific runtime (e.g., `_nvidia/hopper/`, `_nvidia/ampere/`).
4. **Validation layer** — Correctness and performance comparison against cuTensor baselines.
