# 分布式执行

分布式执行保持一个逻辑负载，并把它切分到多个 rank 上。

## 跨卡切分的态向量

已初始化的多 rank 进程组改变的是运行时，而不是程序：

```bash
torchrun --nproc_per_node=4 your_script.py
```

```python
import flagquantum as fq

module = fq.Module(build_circuit, n_parameters=2)
```

此后，同一个模块与结果接口会使用原生跨卡态向量运行时，振幅归属保持在本地 rank。
该路径禁止物化完整态，仅前向训练的阻塞项会被显式报告，分布式拓扑取自执行环境。

## 按 rank 拥有的 MPS

MPS 执行同样可以把一个态分布到多个 rank：

```bash
python examples/distributed_mps/variable_bond_capacity_8gpu.py
```

在已复核的证据中，针对已入库的 all-rank 与 all-boundary 负载，一次 batch-one、complex64
的 MPS 训练步在键维数 768、16 个 rank 上达到 131,072 个格点，单 rank 峰值分配内存
最大 72.41 GiB，累计丢弃权重 8.39e-06。这是一次确切负载的结果，不是固定计划的强
扩展性结论。

## 分布式训练

按 rank 拥有的态向量与 MPS 训练，可通过 `flagquantum.experimental.distributed` 下显式
的实验性入口使用，具备按 rank 拥有的优化器状态、检查点／恢复、取消与进度上报。它们
不会因调用 `fq.train` 而被隐式启用；并且只有当前向执行、梯度、优化器更新与检查点
归属都保持声明的分布式语义时，分布式训练才算完成。

## 必须说明的语义

- 数据并行复制属于吞吐，而不是容量扩展。
- rank 本地内核与手工张量切片按各自语义报告。
- CPU 分布式运行只能证明语义与失败即拒行为，绝不能替代真实加速卡的容量证据。
- 多机发布认证需要获得提升的、经审计的硬件证据。
