# 参数化门

FlagQuantum 支持带梯度计算的可训练量子电路：

```{code-block} python
# 创建带可训练参数的门
rx_gate = fq.RX(wires=[0], trainable=True)
rx_gate(device)  # 应用到设备

# 优化参数
optimizer = torch.optim.Adam([rx_gate.params])
for _ in range(100):
    optimizer.zero_grad()
    device.reset_states()
    rx_gate(device)
    loss = fq.measure_allZ(device).sum()
    loss.backward()
    optimizer.step()
```
