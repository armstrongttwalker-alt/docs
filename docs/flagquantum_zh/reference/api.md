# 接口参考

FlagQuantum 对外只暴露一套经过整理的 Python 接口：`import flagquantum as fq`。

## 接口总览

| 任务 | 主要接口 | 结果 |
| --- | --- | --- |
| 构建程序 | `fq.Circuit` | 由 FlagQuantum IR 支撑的电路 |
| 优化程序 | `flagquantum.compiler.optimize` | `fq.CircuitIR` |
| 为选定工具与目标编译 | `fq.compile` | `fq.CircuitIR` |
| 检视执行 | `fq.plan`、`Circuit.runtime_plan` | 可解释的运行时计划 |
| 本地或远程执行 | `fq.run` | `fq.ExecutionResult` |
| 非阻塞投递 | `fq.submit`、`fq.restore_job` | 带状态、结果与取消的作业句柄 |
| 定义可训练量子层 | `fq.Module` | PyTorch 模块 |
| 训练 | `fq.train` | `fq.TrainingResult` |
| 测量 | `fq.expectation`、`fq.probabilities`、`fq.samples`、`fq.counts` | 输出请求 |
| 为目标打包 | `flagquantum.deployment.create_deployment_package` | 密封部署包 |

## 错误

稳定的生命周期类别位于 `flagquantum.errors`：语义输入非法时抛 `ValidationError`，计划过期、被篡改或不兼容时抛 `PlanningError`，所请求能力不可用时抛 `CapabilityError`，执行或训练失败时抛 `ExecutionError`。它们都继承 `FlagQuantumError` 及其兼容的 Python 内建异常，因此窄范围与通用 `except` 都能工作。

## 运行时配置

`RuntimeConfig` 记录后端、设备、实数与复数精度、JAX 精度、矩阵乘法策略与绘制风格。电路在构建时捕获配置，并把带版本的清单嵌入其 IR 与计划，因此分布式工作进程会重建同一套策略，而不是继承可变进程状态。`runtime_config(...)` 提供上下文局部的临时覆盖。

## 测量

`fq.expectation`、`fq.probabilities`、`fq.samples`、`fq.counts` 描述要测量什么。Pauli 乘积用 `@`，哈密顿量求和与实数系数用普通算术；采样与计数接受计算基比特或一个不带权重的 Pauli 乘积。结果暴露 `expectation()`、`expectations`、`probabilities`、`samples`、`counts` 与 `measurement(index_or_name)`。

## 算子与扩展点

- `flagquantum.operators` 报告已注册的门集合与每个门的信息。
- `flagquantum.ecosystem` 在一个候选稳定的协议与不可变注册表之后，收纳各框架适配器（Qiskit、PennyLane、Cirq、CUDA-Q、Amazon Braket）。
- `flagquantum.ecosystem.extensions` 是面向后端、编译器、pass、内核、算子、设备、提供方、测量收集器与规划器的冻结前扩展 SDK。
- `flagquantum.services` 收纳可复用的多步工作流，例如执行与部署预检。
- `flagquantum.experimental` 不提供任何兼容性保证，分布式训练与动态电路执行目前都在这里。

## 稳定性边界

- 只有受校验的清单定义稳定接口面；实验性与兼容性导入不会静默扩张它。
- 兼容导入用于迁移，不隐含稳定。
- 规划结果描述意图与估算，永远不是运行时或基准证据。
- 算子与后端支持来自可执行的下沉注册表，而不是文字描述。
- 文档示例由文档契约测试执行；新增公开名称必须先可导入、经过快照测试并加入清单。
