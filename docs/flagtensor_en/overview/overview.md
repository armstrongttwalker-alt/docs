# FlagTensor Overview

FlagTensor is part of [FlagOS](https://flagos.io/), a fully open-source system software stack designed to unify the model–system–chip layers and foster an open and collaborative ecosystem. It enables a "develop once, run anywhere" workflow across diverse AI accelerators, unlocking hardware performance, eliminating fragmentation among AI chipset-specific software stacks, and substantially lowering the cost of porting and maintaining AI workloads.

FlagTensor is a high-performance tensor-primitive library implemented in [Triton](https://github.com/openai/triton) language. It provides optimized implementations of common tensor primitives (unary, binary, and tensor contraction operations) benchmarked against [cuTensor](https://developer.nvidia.com/cutensor) baselines, delivering reference-level correctness with competitive performance across diverse GPU architectures.

Built on [FlagTree](https://github.com/flagos-ai/FlagTree) (a FlagOS-maintained Triton fork supporting multiple hardware backends), FlagTensor offers a vendor-agnostic operator interface with pluggable backend support.

## Features

- **Comprehensive tensor primitives** — Unary (28 ops), binary (4 ops), contraction (5 ops), sparse (1 op).
- **Hand-optimized Triton kernels** — Per-architecture autotune for Ampere and Hopper.
- **cuTensor-validated correctness** — Validated against CPU-FP64 golden reference.
- **Performance benchmarked** — Benchmarked against cuTensor baselines.
- **Vendor-agnostic backend** — 15 vendors registered with architecture-specific kernel specialization (e.g., `_nvidia/hopper/`, `_nvidia/ampere/`).
- **Multi-GPU test runner** — Parallel test execution with live progress display.
- **CI-ready** — Quality gates (lint/format), correctness and performance pipelines.
