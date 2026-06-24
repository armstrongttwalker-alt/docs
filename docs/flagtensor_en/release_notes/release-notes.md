# FlagTensor Release Notes

## v0.2.0


- **Added Features**

  - **Unary Operators** — abs, acos, acosh, asin, asinh, atan, atanh, ceil, conj, cos, cosh, exp, floor, identity, log, mish, neg, rcp, relu, sigmoid, sin, sinh, soft_plus, soft_sign, sqrt, swish, tan, tanh (28 operators).
  - **Binary Operators** — add, max, min, mul.
  - **Contraction Operators** — contraction, contraction_trinary, elementwise_trinary.
  - **Sparse Operators** — block_sparse_contraction.
  - **Operator Registry** — Added `conf/operators.yaml` with full operator metadata.
  - **Multi-GPU Test Runner** — `tools/run_tests.py` with live progress display and YAML-driven operator selection.
  - **CI/CD Pipeline** — Quality gates (lint/format), correctness and performance pipelines.

- **Enhanced Features**

  - Hand-optimized Triton kernels with per-architecture autotune (Ampere, Hopper).
  - Vendor-agnostic backend abstraction with 15 registered vendors.
  - Architecture-specific kernel specialization (`_nvidia/hopper/`, `_nvidia/ampere/`).
  - Per-operator test infrastructure with pytest marks and JSON result recording.

## v0.1.0

Initial release of FlagTensor.

- **Added Features**

  - Tensor-primitive library with multi-backend support.
  - Unary operations (ReLU and others).
  - Binary operations for element-wise tensor arithmetic.
  - Contraction operations for multi-dimensional reductions.
  - Correctness and performance comparison against cuTensor baselines.