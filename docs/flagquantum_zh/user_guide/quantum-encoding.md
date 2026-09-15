# 量子编码

FlagQuantum 提供了多种编码方案，用于将经典数据嵌入量子态：

```{code-block} python
# 角度编码
x = torch.randn(2, 4)  # batch=2, features=4
fq.angle_encoder(qdev, x, wires=[0, 1, 2, 3])

# 振幅编码
amplitudes = torch.randn(2, 16)  # 2^4 = 16 个振幅
fq.amplitude_encoder(qdev, amplitudes)

# 自定义编码电路
encoder = fq.GeneralEncoder([
    {"func": "ry", "wires": [0], "input_idx": 0},
    {"func": "ry", "wires": [1], "input_idx": 1},
    {"func": "cx", "wires": [0, 1]},
])
encoder(device, x)
```
