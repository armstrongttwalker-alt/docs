# 可逆模式

对于需要梯度计算的大型电路，使用可逆模式以减少内存使用：

```{code-block} python
device = fq.DistributedQuantumDevice(n_wires=10, bsz=64, invertible=True)
# 在反向传播期间使用更少的内存
```
