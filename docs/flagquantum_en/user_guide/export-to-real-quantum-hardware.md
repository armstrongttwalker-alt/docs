# Export to real quantum hardware

FlagQuantum circuits can be exported to OpenQASM 3.0 and run on all major quantum computing platforms:

```{code-block} python
# Build your circuit
qdev = fq.DistributedQuantumDevice(n_wires=3, record_op=True)
fq.H(wires=[0])(qdev)
fq.RX(wires=[1], init_params=torch.tensor([0.5]))(qdev)
fq.CNOT(wires=[0, 1])(qdev)
fq.measure_allZ(qdev)

# Export to OpenQASM 3.0
fq.export_to_qasm(qdev, "circuit.qasm", version=3.0)

# Now run on ANY platform:
# - Quafu Quantum
# - Origin Quantum
# - IBM Quantum (via Qiskit)
# - AWS Braket (IonQ, Rigetti)
# - Azure Quantum
# - IonQ direct
# - Rigetti direct
```

Supported Platforms

| Platform | Support | Description |
| :--- | :---: | :--- |
| Quafu Quantum |  Native | Run on Chinese Quafu quantum cloud |
| Origin Quantum |  Native | Run on Chinese Origin quantum cloud |
| IBM Quantum |  Native | Run on real IBM quantum processors |
| AWS Braket |  Full | Submit to IonQ, Rigetti, and more |
| Azure Quantum |  Full | OpenQASM as core intermediate representation |
| IonQ |  Native | Direct hardware submission |
| Rigetti |  Native | Superconducting qubit systems |
| Q-CTRL Fire Opal |  Full | Hardware optimization services |