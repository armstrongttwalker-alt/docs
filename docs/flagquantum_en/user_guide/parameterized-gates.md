# Parameterized gates

FlagQuantum supports trainable quantum circuits with gradient computation:

```{code-block} python
# Create a gate with trainable parameter
rx_gate = fq.RX(wires=[0], trainable=True)
rx_gate(device)  # Apply to device

# Optimize the parameter
optimizer = torch.optim.Adam([rx_gate.params])
for _ in range(100):
    optimizer.zero_grad()
    device.reset_states()
    rx_gate(device)
    loss = fq.measure_allZ(device).sum()
    loss.backward()
    optimizer.step()
```
