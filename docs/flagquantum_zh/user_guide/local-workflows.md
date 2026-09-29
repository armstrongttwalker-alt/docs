# 本地工作流

本地执行是零配置路径，不需要提供方账号、编译器插件、任务调度器或网络连接。

## 模拟

```{code-block} python
import flagquantum as fq

circuit = fq.Circuit(2).h(0).cx(0, 1)
result = fq.run(circuit)
state = result.to_statevector()
```

CPU 态向量执行是默认路径。需要时可显式选择本机可控的一块 GPU：

```{code-block} python
result = fq.run(
    circuit,
    options=fq.ExecutionOptions(device="cuda:0"),
)
```

`ExecutionOptions.device` 描述当前进程可控的设备。`target` 参数保留给外部执行目的地，例如九鼎 GPU 工作区或 Quafu 硬件。

## 测量

直接请求所需的科学结果，而不是手工检查态向量：

```{code-block} python
probabilities = fq.run(
    circuit,
    outputs=fq.probabilities(),
).probabilities

correlation = fq.run(
    circuit,
    outputs=fq.expectation(fq.Z(0) @ fq.Z(1)),
).expectation()

counts = fq.run(
    circuit,
    outputs=fq.counts(),
    shots=1024,
).counts[0]
```

概率与期望值默认是精确值。计数与采样需要显式指定采样次数。本地执行会保留批次维度，因此 `counts` 对每个批次项返回一个字典，`[0]` 选取默认的单电路批次。

## 选择模拟表示

同一份程序不必改写即可在不同表示下运行：

```{code-block} python
statevector_result = fq.run(circuit, options=fq.ExecutionOptions(mode="statevector"))
mps_result = fq.run(circuit, options=fq.ExecutionOptions(mode="mps"))
tensor_result = fq.run(circuit, options=fq.ExecutionOptions(mode="tensor_network"))
```

首次运行建议使用态向量模拟。MPS 适合低纠缠的大规模系统，张量网络适合结构化的收缩负载；每种表示都有各自的支持边界。

## 精度

每次执行只解析一次精度：`complex64` 隐含 float32 参数，`complex128` 隐含 float64。长时运行或分布式任务请使用显式的运行时配置，使电路、计划与各工作进程保持一致：

```{code-block} python
from flagquantum.runtime.configuration import RuntimeConfig

config = RuntimeConfig(device="cuda", complex_dtype="complex128")
circuit = fq.Circuit(4, config=config)
```

## 绘制电路

```{code-block} python
print(circuit.draw())                 # 终端文本形式
figure, axes = circuit.draw(format="mpl")   # 出版级图形
```

## 运行维护中的本地示例

```{code-block} shell
python -m examples.local.simulate
python -m examples.local.measure
python -m examples.local.train
```

接下来可查看单机示例，了解显式模拟器选择、更大的模型，以及可配置的 CPU/GPU 运行方式。
