# FlagTensor User Guide

## Use FlagTensor

FlagTensor integrates directly with PyTorch. Import the package and call operators on CUDA tensors:

```python
import torch
import flagtensor

# Element-wise (unary) operations
x = torch.randn(1024, device="cuda", dtype=torch.float32)
y = flagtensor.abs(x)
z = flagtensor.relu(x)
w = flagtensor.sigmoid(x)

# Binary operations
a = torch.randn(1024, device="cuda")
b = torch.randn(1024, device="cuda")
c = flagtensor.add(a, b)
d = flagtensor.mul(a, b)

# Tensor contraction
m = torch.randn(64, 32, device="cuda")
n = torch.randn(32, 48, device="cuda")
r = flagtensor.contraction(m, n)

# Trinary contraction
p = torch.randn(64, 32, device="cuda")
q = torch.randn(32, 48, device="cuda")
s = torch.randn(64, 48, device="cuda")
t = flagtensor.contraction_trinary(p, q, s)

# Element-wise trinary
u = flagtensor.elementwise_trinary(a, b, c)
```

## Operator List

The complete operator registry is maintained at [FlagTensor conf/operators.yaml](https://github.com/flagos-ai/FlagTensor/blob/main/conf/operators.yaml).

| Category | Operators | Status |
|---|---|---|
| **Unary** | abs, acos, acosh, asin, asinh, atan, atanh, ceil, conj, cos, cosh, exp, floor, identity, log, mish, neg, rcp, relu, sigmoid, sin, sinh, soft_plus, soft_sign, sqrt, swish, tan, tanh | stable |
| **Binary** | add, max, min, mul | stable |
| **Contraction** | contraction, elementwise_trinary | stable |
| **Contraction** | contraction_trinary | active |
| **Sparse** | block_sparse_contraction | experimental |

## Run Tests

### Correctness Tests

```bash
# Category-level correctness (primary acceptance interface)
pytest tests/unary/test_unary_correctness.py -v
pytest tests/binary/test_binary_correctness.py -v
pytest tests/contraction/test_contraction_correctness.py -v
pytest tests/sparse/test_sparse_correctness.py -v

# Single operator correctness test (per-operator file)
pytest tests/unary/test_CUTENSOR_OP_ABS.py -v

# Record test results as JSON (using CPU-FP64 reference)
pytest tests/unary/test_CUTENSOR_OP_ABS.py --ref cpu --record json --output results.json

# Multi-GPU test runner (from YAML registry)
python tools/run_tests.py --stages stable --gpus 0,1

# Extract operator marks
python tools/get_marks.py --stage stable --output ops.txt
```

### Performance Tests

```bash
# Category-level benchmark (primary acceptance interface)
pytest benchmark/test_unary_perf.py -m CUTENSOR_OP_ABS --mode kernel --level core --record log
pytest benchmark/test_binary_perf.py -m CUTENSOR_OP_ADD --mode kernel --level core --record log
pytest benchmark/test_contraction_perf.py -m Contraction --mode kernel --level core --record log
pytest benchmark/test_sparse_perf.py -m BlockSparseContraction --mode kernel --level core --record log

# Per-operator benchmark (legacy/debug)
pytest benchmark/test_CUTENSOR_OP_ABS_perf.py --mode kernel --level core --record log

# Parse benchmark summary
python tools/summary_for_plot.py result-*.log
```

### CI Runner

```bash
# Smoke correctness
python tools/run_flagtensor_ci.py --smoke --run-correctness --results-dir ci_results_correctness --dump-json-summary

# Smoke performance
python tools/run_flagtensor_ci.py --smoke --run-perf --results-dir ci_results_perf --dump-json-summary

# Acceptance correctness (full coverage)
python tools/run_flagtensor_ci.py --run-correctness --results-dir acceptance_results_correctness --dump-json-summary

# Acceptance performance (full coverage)
python tools/run_flagtensor_ci.py --run-perf --results-dir acceptance_results_perf --dump-json-summary

# Weekly regression
python tools/run_flagtensor_weekly.py --project-root . --results-dir weekly_results --gpus 0 --mode kernel
```
