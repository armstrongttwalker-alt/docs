# FlagTensor Operator Coverage Matrix

Generated from registry: `conf/operators.yaml`

## By Category

### Unary Operators (28)

| Operator | Impl | Correctness | Benchmark | Modes | Status |
| --- | --- | --- | --- | --- | --- |
| CUTENSOR_OP_ABS | Done | Done | Done | operator | stable |
| CUTENSOR_OP_ACOS | Done | Done | Done | kernel, operator, wrapper | stable |
| CUTENSOR_OP_ACOSH | Done | Done | Done | operator | stable |
| CUTENSOR_OP_ASIN | Done | Done | Done | operator | stable |
| CUTENSOR_OP_ASINH | Done | Done | Done | operator | stable |
| CUTENSOR_OP_ATAN | Done | Done | Done | operator | stable |
| CUTENSOR_OP_ATANH | Done | Done | Done | operator | stable |
| CUTENSOR_OP_CEIL | Done | Done | Done | operator | stable |
| CUTENSOR_OP_CONJ | Done | Done | Done | operator | stable |
| CUTENSOR_OP_COS | Done | Done | Done | operator | stable |
| CUTENSOR_OP_COSH | Done | Done | Done | operator | stable |
| CUTENSOR_OP_EXP | Done | Done | Done | operator | stable |
| CUTENSOR_OP_FLOOR | Done | Done | Done | operator | stable |
| CUTENSOR_OP_IDENTITY | Done | Done | Done | operator | stable |
| CUTENSOR_OP_LOG | Done | Done | Done | operator | stable |
| CUTENSOR_OP_MISH | Done | Done | Done | operator | stable |
| CUTENSOR_OP_NEG | Done | Done | Done | operator | stable |
| CUTENSOR_OP_RCP | Done | Done | Done | operator | stable |
| CUTENSOR_OP_RELU | Done | Done | Done | operator | stable |
| CUTENSOR_OP_SIGMOID | Done | Done | Done | operator | stable |
| CUTENSOR_OP_SIN | Done | Done | Done | operator | stable |
| CUTENSOR_OP_SINH | Done | Done | Done | operator | stable |
| CUTENSOR_OP_SOFT_PLUS | Done | Done | Done | operator | stable |
| CUTENSOR_OP_SOFT_SIGN | Done | Done | Done | operator | stable |
| CUTENSOR_OP_SQRT | Done | Done | Done | operator | stable |
| CUTENSOR_OP_SWISH | Done | Done | Done | operator | stable |
| CUTENSOR_OP_TAN | Done | Done | Done | operator | stable |
| CUTENSOR_OP_TANH | Done | Done | Done | operator | stable |

### Binary Operators (4)

| Operator | Impl | Correctness | Benchmark | Modes | Status |
| --- | --- | --- | --- | --- | --- |
| CUTENSOR_OP_ADD | Done | Done | Done | operator | stable |
| CUTENSOR_OP_MUL | Done | Done | Done | operator | stable |
| CUTENSOR_OP_MAX | Done | Done | Done | operator | stable |
| CUTENSOR_OP_MIN | Done | Done | Done | operator | stable |

### Contraction Operators (3)

| Operator | Impl | Correctness | Benchmark | Modes | Status |
| --- | --- | --- | --- | --- | --- |
| Contraction | Done | Done | Done | kernel, operator | stable |
| ContractionTrinary | Done | Done | Done | kernel, operator | active |
| ElementwiseTrinary | Done | Done | Done | operator | stable |

### Sparse Operators (1)

| Operator | Impl | Correctness | Benchmark | Modes | Status |
| --- | --- | --- | --- | --- | --- |
| BlockSparseContraction | Done | Done | Done | operator | experimental |

## Summary

- **Total Operators**: 36
- **Stable**: 34
- **Active**: 1
- **Experimental**: 1
- **Blocked**: 0
- **Categories**: unary (28), binary (4), contraction (3), sparse (1)
