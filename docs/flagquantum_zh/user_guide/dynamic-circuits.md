# 动态线路

动态线路引入线路中测量与经典条件控制。

## 构建并运行

```python
import flagquantum as fq
from flagquantum.dynamic import DynamicCircuit

circuit = DynamicCircuit(2)
circuit.h(0)
circuit.measure(0, classical_bit=0)
circuit.conditional("x", 1, classical_bit=0)

result = fq.experimental.dynamic.run_dynamic(circuit, shots=128, seed=7)
stable_result = result.to_execution_result()
```

`DynamicCircuit` 及其 IR 编码处于“候选稳定”状态，等待 API 负责人批准；执行与后端
评估仍属实验性。稳定的动态路径将继续返回规范的 `fq.ExecutionResult`，厂商原生状态
不会被固化进该契约。

## 执行策略

`run_dynamic(..., strategy="auto")` 对符合条件的、采样次数不少于 32 的负载使用批量
态向量轨迹；当批处理会超过 `max_batched_bytes`（默认 256 MiB）或输入本身已是批量时，
回退到参考轨迹路径。调用方可以显式请求 `strategy="trajectory"` 或 `"batched"`，
`statistics["gate_execution_strategy"]` 会记录所选路径，便于基准归因。

## 后端评估

```python
report = fq.experimental.dynamic.assess_dynamic_backend(circuit, backend)
assert report.compatible, report.blockers
```

该预检只读，不提交任何任务。本地动态噪声仅限于与已执行门相匹配的单线路比特翻转
信道，以及在显式测量与最终采样上的独立读出混淆；其他信道、关联读出、设备 profile
的时序噪声以及厂商噪声执行都会失败即拒，而不是静默近似。与厂商无关的一致性测试在
本地与 Qiskit Aer 上通过，且不声称已在真实动态 QPU 上执行。
