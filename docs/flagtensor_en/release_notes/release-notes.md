# FlagTensor Release Notes

## v0.1.0

Initial release of FlagTensor.

- **Added Features**

  - Tensor-primitive library with multi-backend support.
  - Unary operations (ReLU and others).
  - Binary operations for element-wise tensor arithmetic.
  - Contraction operations for multi-dimensional reductions.
  - Correctness and performance comparison against cuTensor baselines.

- **Improved Features**

  - Tensor primitives underwent performance tuning.
  - Triton kernel call optimization for reduced launch overhead.
