# 快速开始

本页训练一个双量子比特模型，然后演示如何在不改动模型的情况下切换模拟表示。

## 训练第一个量子模型

构建一个双量子比特线路，并通过最小化 0 号线上的 `Z` 期望值来学习它的旋转角：

```python
import torch
import flagquantum as fq


def circuit(parameters):
    return fq.Circuit(2).ry(0, parameters[0]).cx(0, 1)


model = fq.Module(circuit, n_parameters=1, init=torch.tensor([0.25]))
training = fq.train(
    model,
    optimizer=torch.optim.Adam(model.parameters(), lr=0.05),
    objective=lambda z: z.mean(),
    steps=10,
)

trained_circuit = circuit(next(model.parameters()).detach())
measurement = fq.expectation(fq.Z(0))
result = fq.run(trained_circuit, outputs=measurement)
print(result.expectation())
```

`fq.Module` 把量子模型暴露给 PyTorch，并拥有其可训练参数；`fq.train` 执行
`zero_grad`、`backward`、`step`，返回的训练结果提供 `final_loss` 与 `losses`
等稳定访问器。

## 执行前先查看线路与计划

```python
import flagquantum as fq

circuit = fq.Circuit(n_qubits=2).h(0).cx(0, 1)
options = fq.ExecutionOptions(mode="auto", precision="complex64")
plan = fq.plan(circuit, options=options)
result = fq.run(plan)

print(plan.identity)
print(plan.summary()["recommended_mode"])
print(result.state)
```

计划可以序列化与恢复。把恢复后的计划交给 `fq.run` 会精确执行该计划：不会重新规划，
也不会被静默替换成另一个后端。

## 让同一个模型换一种表示运行

`examples/quick_start.py` 训练一个解已知的经典—量子混合模型，并可在命令行切换模拟表示：

```bash
python examples/quick_start.py --mode sv --steps 40
python examples/quick_start.py --mode mps --steps 40
python examples/quick_start.py --mode tn --steps 40
```

建议先跑态向量模式；MPS 与张量网络的支持边界见[模拟模式](../user_guide/simulation-modes.md)。

## 下一步

- [用户指南](../user_guide/user-guide.md)——线路、训练、测量、噪声、数字孪生、纠错、部署与远程执行。
- [参考资料](../reference.md)——稳定 API 清单与可执行算子下发表。
