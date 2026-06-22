# FlagTensor 精度策略

## 范围

本文档定义 FlagTensor 正确性验证的验收级精度策略。

## 参考策略

- 一元和二元算子使用数学上等价的 PyTorch 表达式作为主要参考。
- 基于 cuTensor 的收缩算子可根据算子语义和数值稳定性与 CPU 参考或 cuTensor 参考进行比较。
- 任何具有特殊数值行为的算子必须在测试实现中记录其参考选择。

## 断言策略

- 逐位精确的算子应使用等式风格的断言。
- 浮点算子应使用近似风格的断言。
- 所有默认的近似断言应使用 `src/flagtensor/testing/` 中的集中式辅助 API。
- 验收风格测试可通过 `tests/accuracy_utils.py` 重新导出这些辅助函数。

## 默认容差

| Dtype | atol | rtol |
| --- | --- | --- |
| `float16` | `1e-3` | `1e-3` |
| `bfloat16` | `2e-2` | `2e-2` |
| `float32` | `1e-5` | `1e-5` |

复数容差未定义：Triton 不原生支持复数 dtype。唯一支持复数的算子是 `conj`，它通过一个专用内核处理复数，该内核在 Python 层面分解实部/虚部后再启动 Triton。

## 形状策略

- 逐点算子必须覆盖代表性小、中、多维形状。
- 收缩算子必须覆盖布局敏感和链敏感形状。
- 稀疏算子必须同时覆盖稠密值正确性和结构保持性。
- 共享默认形状辅助函数应来自集中式测试工具，而非每个测试重复定义。

## Dtype 覆盖率策略

- 默认正确性覆盖率包括 `float16`、`float32` 和 `bfloat16`（当算子支持稳定时）。
- 复数 dtype（`complex64`、`complex128`）**仅对 `conj` 支持**。Triton 的类型系统不支持原生复数，因此所有其他一元算子在执行器层面拒绝复数输入。
- 基准测试覆盖率包括所有算子类别的 `float16` 和 `float32`。

## 跳过 / 阻止策略

- 已知不稳定的算子可在 `conf/operators.yaml` 中标记为 `blocked`。
- 被阻止的算子必须包含 `skip_reason`。
- CI 和每周工作流默认排除被阻止的算子，除非显式请求 `--include-blocked`。

## 权威来源

- 注册表元数据：`conf/operators.yaml`
- 共享辅助函数：`src/flagtensor/testing/`
- 兼容性导出：`tests/accuracy_utils.py`
- 策略概述：`docs/testing_strategy.md`
