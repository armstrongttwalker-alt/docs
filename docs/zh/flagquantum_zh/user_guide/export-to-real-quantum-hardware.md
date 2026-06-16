# 导出到真实量子硬件

FlagQuantum 电路可以导出为 OpenQASM 3.0 格式，并在所有主流量子计算平台上运行：

```{code-block} python
# 构建您的电路
qdev = fq.DistributedQuantumDevice(n_wires=3, record_op=True)
fq.H(wires=[0])(qdev)
fq.RX(wires=[1], init_params=torch.tensor([0.5]))(qdev)
fq.CNOT(wires=[0, 1])(qdev)
fq.measure_allZ(qdev)

# 导出为 OpenQASM 3.0
fq.export_to_qasm(qdev, "circuit.qasm", version=3.0)

# 现在可以在任何平台上运行：
# - 量子伏 (Quafu Quantum)
# - 本源量子 (Origin Quantum)
# - IBM Quantum（通过 Qiskit）
# - AWS Braket（IonQ、Rigetti）
# - Azure Quantum
# - IonQ 直接
# - Rigetti 直接
```

支持的平台

| 平台 | 支持程度 | 描述 |
| :--- | :---: | :--- |
| 量子伏 (Quafu Quantum) | 原生 | 在中国量子伏量子云上运行 |
| 本源量子 (Origin Quantum) | 原生 | 在中国本源量子云上运行 |
| IBM Quantum | 原生 | 在真实的 IBM 量子处理器上运行 |
| AWS Braket | 完整 | 提交到 IonQ、Rigetti 等 |
| Azure Quantum | 完整 | OpenQASM 作为核心中间表示 |
| IonQ | 原生 | 直接硬件提交 |
| Rigetti | 原生 | 超导量子比特系统 |
| Q-CTRL Fire Opal | 完整 | 硬件优化服务 |
