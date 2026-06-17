# FlagTensor Overview

FlagTensor is part of [FlagOS](https://flagos.io/), a fully open-source system software stack designed to unify the model–system–chip layers and foster an open and collaborative ecosystem. It enables a "develop once, run anywhere" workflow across diverse AI accelerators, unlocking hardware performance, eliminating fragmentation among AI chipset-specific software stacks, and substantially lowering the cost of porting and maintaining AI workloads.

FlagTensor is a high-performance tensor-primitive library implemented in [Triton](https://github.com/openai/triton) language. It provides optimized implementations of common tensor primitives (unary, binary, and tensor contraction operations) benchmarked against [cuTensor](https://developer.nvidia.com/cutensor) baselines, delivering reference-level correctness with competitive performance across diverse GPU architectures.

Built on [FlagTree](https://github.com/flagos-ai/FlagTree) (a FlagOS-maintained Triton fork supporting multiple hardware backends), FlagTensor offers a vendor-agnostic operator interface with pluggable backend support.

## Features

- Comprehensive collection of tensor primitives: unary (28 ops), binary (4 ops), contraction (5 ops), sparse (1 op)
- Hand-optimized Triton kernels with per-architecture autotune (Ampere, Hopper)
- Correctness validated against CPU-FP64 golden reference
- Performance benchmarked against cuTensor baselines
- Vendor-agnostic backend abstraction (15 vendors registered)
- Architecture-specific kernel specialization (e.g., `_nvidia/hopper/`, `_nvidia/ampere/`)
- Per-operator test infrastructure with pytest marks and JSON result recording
- Multi-GPU parallel test runner with live progress display
- CI-ready: quality gates (lint/format), correctness & performance pipelines

## Project Structure

```
FlagTensor
├── src/flagtensor/            # Python source
│   ├── ops/                   # Operator implementations (CUTENSOR_OP_*.py)
│   ├── utils/                 # Utility functions & kernel builders
│   ├── runtime/               # Runtime support
│   │   ├── backend/           # Vendor & architecture backends (_nvidia/, _ascend/, ...)
│   │   └── common.py          # Vendor enumeration & capability constants
│   ├── testing/               # Testing utilities (assertions, shapes, dtypes)
│   ├── fused/                 # Fused operators
│   └── modules/               # Module implementations
├── tests/                     # Per-operator correctness tests
│   ├── unary/test_<op>.py     # 28 unary operator tests
│   ├── binary/test_<op>.py    # 4 binary operator tests
│   ├── contraction/           # Contraction operator tests
│   └── sparse/                # Sparse operator tests
├── benchmark/                 # Performance tests
│   ├── consts.py              # Dtypes, shapes, metrics definitions
│   └── test_<category>_perf.py
├── tools/                     # CLI tooling
│   ├── run_tests.py           # Multi-GPU test runner
│   ├── get_marks.py           # Extract pytest marks from YAML
│   └── summary_for_plot.py    # Parse & aggregate benchmark logs
├── conf/
│   └── operators.yaml         # Operator registry (authoritative test entry point)
├── docs/                      # Documentation
├── .github/workflows/         # CI/CD pipelines
├── LICENSE
├── README.md
└── pyproject.toml
```
