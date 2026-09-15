# 基本使用

创建分布式量子设备并使用函数式 API 应用门：

```{code-block} python

import flagquantum as fq
import torch

# 创建分布式量子设备（默认：如果有 GPU 可用则 device='cuda'）
qdev= fq.DistributedQuantumDevice(n_wires=4, bsz=2, world_sz=1, device='cpu')

# 应用门（函数式风格）
fq.h(device, wires=[0])
fq.rx(device, wires=[1], params=0.5)
fq.cx(device, wires=[0, 1])

# 测量所有量子比特
expectations = fq.measure_allZ(device)
print(expectations.shape)  # (2, 4)
```
