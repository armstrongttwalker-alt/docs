# 参考资料

本项目从以下项目和组织中汲取灵感和参考：

- [NVIDIA CUDA-Q](https://github.com/NVIDIA/cuda-quantum) - 提供了关于 GPU 加速量子电路模拟和分布式量子计算的见解
- [MIT TorchQuantum](https://github.com/mit-han-lab/torchquantum) - 提供了关于 PyTorch 原生量子电路表示的灵感
- [IonQ's TQD](https://github.com/ionq/torchquantum-dist) - 提供了关于高效状态表示的思路
- [Xanadu's PennyLane](https://github.com/PennyLaneAI/pennylane) - 提供了优雅的函数式 API 设计以及与经典机器学习框架的无缝集成
- [IBM's Qiskit](https://github.com/Qiskit/qiskit) - 提供了量子电路构建和状态向量模拟的基础概念

本项目使用 PyTorch 的 DTensor 进行分布式张量操作，实现了跨多个设备的可扩展量子态模拟。
