# Quantum encoding

FlagQuantum provides multiple encoding schemes for embedding classical data into quantum states:

```{code-block} python
# Angle encoding
x = torch.randn(2, 4)  # batch=2, features=4
fq.angle_encoder(qdev, x, wires=[0, 1, 2, 3])

# Amplitude encoding
amplitudes = torch.randn(2, 16)  # 2^4 = 16 amplitudes
fq.amplitude_encoder(qdev, amplitudes)

# Custom encoding circuit
encoder = fq.GeneralEncoder([
    {"func": "ry", "wires": [0], "input_idx": 0},
    {"func": "ry", "wires": [1], "input_idx": 1},
    {"func": "cx", "wires": [0, 1]},
])
encoder(device, x)
```
