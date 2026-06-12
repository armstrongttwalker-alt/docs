# FlagTensor User Guide

## Use FlagTensor

FlagTensor integrates directly with PyTorch. Import the package and call operators on CUDA tensors:

```python
import torch
import flagtensor

# Element-wise operations
x = torch.randn(1024, device="cuda", dtype=torch.float32)
y = flagtensor.abs(x)
z = flagtensor.relu(x)
w = flagtensor.sigmoid(x)

# Binary operations
a = torch.randn(1024, device="cuda")
b = torch.randn(1024, device="cuda")
c = flagtensor.add(a, b)

# Tensor contraction
m = torch.randn(64, 32, device="cuda")
n = torch.randn(32, 48, device="cuda")
r = flagtensor.gett(m, n)
```

## Operator List

The complete operator registry is maintained at [FlagTensor conf/operators.yaml](https://github.com/flagos-ai/FlagTensor/blob/main/conf/operators.yaml).

| Category | Operators | Status |
|---|---|---|
| **Unary** | abs, acos, acosh, asin, asinh, atan, atanh, ceil, conj, cos, cosh, exp, floor, identity, log, mish, neg, rcp, relu, sigmoid, sin, sinh, soft_plus, soft_sign, sqrt, swish, tan, tanh | stable |
| **Binary** | add, max, min, mul | stable |
| **Contraction** | gett, tgett, ttgt, tensor_contraction_trinary, trinary_generic | stable |
| **Sparse** | block_sparse_tensor_contraction | experimental |

## Run Tests

```bash
# Single operator correctness test
pytest tests/unary/test_abs.py -v

# Record test results as JSON (using CPU-FP64 reference)
pytest tests/unary/test_abs.py --ref cpu --record json --output results.json

# Multi-GPU test runner (from YAML registry)
python tools/run_tests.py --stages stable --gpus 0,1

# Extract operator marks
python tools/get_marks.py --stage stable --output ops.txt

# Benchmark with recording
pytest benchmark/test_unary_perf.py -m abs \
  --mode kernel --level core --record log

# Parse benchmark summary
python tools/summary_for_plot.py result-*.log
```

## Use Multi-Backend

FlagTensor's flexible backend mechanism allows it to target different chip vendors. The active backend is determined by the Triton configuration on your system.

## Validate Against cuTensor

FlagTensor supports correctness and performance comparisons against cuTensor baselines. Use the provided test utilities to validate numerical accuracy and benchmark performance.
