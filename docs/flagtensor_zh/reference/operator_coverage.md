# FlagTensor 算子覆盖率矩阵

从注册表生成：`conf/operators.yaml`

## 按类别

### 一元算子（28）

| 算子 | 实现 | 正确性 | 基准测试 | 模式 | 状态 |
| --- | --- | --- | --- | --- | --- |
| abs | 已完成 | 已完成 | 已完成 | operator | stable |
| acos | 已完成 | 已完成 | 已完成 | kernel, operator, wrapper | stable |
| acosh | 已完成 | 已完成 | 已完成 | operator | stable |
| asin | 已完成 | 已完成 | 已完成 | operator | stable |
| asinh | 已完成 | 已完成 | 已完成 | operator | stable |
| atan | 已完成 | 已完成 | 已完成 | operator | stable |
| atanh | 已完成 | 已完成 | 已完成 | operator | stable |
| ceil | 已完成 | 已完成 | 已完成 | operator | stable |
| conj | 已完成 | 已完成 | 已完成 | operator | stable |
| cos | 已完成 | 已完成 | 已完成 | operator | stable |
| cosh | 已完成 | 已完成 | 已完成 | operator | stable |
| exp | 已完成 | 已完成 | 已完成 | operator | stable |
| floor | 已完成 | 已完成 | 已完成 | operator | stable |
| identity | 已完成 | 已完成 | 已完成 | operator | stable |
| log | 已完成 | 已完成 | 已完成 | operator | stable |
| mish | 已完成 | 已完成 | 已完成 | operator | stable |
| neg | 已完成 | 已完成 | 已完成 | operator | stable |
| rcp | 已完成 | 已完成 | 已完成 | operator | stable |
| relu | 已完成 | 已完成 | 已完成 | operator | stable |
| sigmoid | 已完成 | 已完成 | 已完成 | operator | stable |
| sin | 已完成 | 已完成 | 已完成 | operator | stable |
| sinh | 已完成 | 已完成 | 已完成 | operator | stable |
| soft_plus | 已完成 | 已完成 | 已完成 | operator | stable |
| soft_sign | 已完成 | 已完成 | 已完成 | operator | stable |
| sqrt | 已完成 | 已完成 | 已完成 | operator | stable |
| swish | 已完成 | 已完成 | 已完成 | operator | stable |
| tan | 已完成 | 已完成 | 已完成 | operator | stable |
| tanh | 已完成 | 已完成 | 已完成 | operator | stable |

### 二元算子（4）

| 算子 | 实现 | 正确性 | 基准测试 | 模式 | 状态 |
| --- | --- | --- | --- | --- | --- |
| add | 已完成 | 已完成 | 已完成 | operator | stable |
| mul | 已完成 | 已完成 | 已完成 | operator | stable |
| max | 已完成 | 已完成 | 已完成 | operator | stable |
| min | 已完成 | 已完成 | 已完成 | operator | stable |

### 收缩算子（5）

| 算子 | 实现 | 正确性 | 基准测试 | 模式 | 状态 |
| --- | --- | --- | --- | --- | --- |
| gett | 已完成 | 已完成 | 已完成 | kernel, operator | stable |
| tgett | 已完成 | 已完成 | 已完成 | kernel, operator | stable |
| ttgt | 已完成 | 已完成 | 已完成 | kernel, operator | stable |
| tensor_contraction_trinary | 已完成 | 已完成 | 已完成 | kernel, operator | stable |
| trinary_generic | 已完成 | 已完成 | 已完成 | operator | stable |

### 稀疏算子（1）

| 算子 | 实现 | 正确性 | 基准测试 | 模式 | 状态 |
| --- | --- | --- | --- | --- | --- |
| block_sparse_tensor_contraction | 已完成 | 已完成 | 已完成 | operator | experimental |

## 摘要

- **算子总数**：38
- **稳定**：37
- **实验性**：1
- **已阻止**：0
- **类别**：一元（28）、二元（4）、收缩（5）、稀疏（1）
