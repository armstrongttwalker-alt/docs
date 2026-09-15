# FlagTensor 算子覆盖率矩阵

从注册表生成：`conf/operators.yaml`

## 按类别

### 一元算子（28）

| 算子 | 实现 | 正确性 | 基准测试 | 模式 | 状态 |
| --- | --- | --- | --- | --- | --- |
| CUTENSOR_OP_ABS | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_ACOS | 已完成 | 已完成 | 已完成 | kernel, operator, wrapper | stable |
| CUTENSOR_OP_ACOSH | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_ASIN | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_ASINH | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_ATAN | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_ATANH | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_CEIL | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_CONJ | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_COS | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_COSH | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_EXP | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_FLOOR | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_IDENTITY | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_LOG | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_MISH | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_NEG | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_RCP | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_RELU | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_SIGMOID | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_SIN | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_SINH | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_SOFT_PLUS | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_SOFT_SIGN | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_SQRT | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_SWISH | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_TAN | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_TANH | 已完成 | 已完成 | 已完成 | operator | stable |

### 二元算子（4）

| 算子 | 实现 | 正确性 | 基准测试 | 模式 | 状态 |
| --- | --- | --- | --- | --- | --- |
| CUTENSOR_OP_ADD | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_MUL | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_MAX | 已完成 | 已完成 | 已完成 | operator | stable |
| CUTENSOR_OP_MIN | 已完成 | 已完成 | 已完成 | operator | stable |

### 收缩算子（3）

| 算子 | 实现 | 正确性 | 基准测试 | 模式 | 状态 |
| --- | --- | --- | --- | --- | --- |
| Contraction | 已完成 | 已完成 | 已完成 | kernel, operator | stable |
| ContractionTrinary | 已完成 | 已完成 | 已完成 | kernel, operator | active |
| ElementwiseTrinary | 已完成 | 已完成 | 已完成 | operator | stable |

### 稀疏算子（1）

| 算子 | 实现 | 正确性 | 基准测试 | 模式 | 状态 |
| --- | --- | --- | --- | --- | --- |
| BlockSparseContraction | 已完成 | 已完成 | 已完成 | operator | experimental |

## 摘要

- **算子总数**：36
- **稳定**：34
- **活跃**：1
- **实验性**：1
- **已阻止**：0
- **类别**：一元（28）、二元（4）、收缩（3）、稀疏（1）
