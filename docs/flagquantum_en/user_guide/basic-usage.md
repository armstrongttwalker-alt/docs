# Basic usage

Create a distributed quantum device and apply gates using the functional API:

```{code-block} python

import flagquantum as fq
import torch

# Create a distributed quantum device (default: device='cuda' if GPU available)
qdev= fq.DistributedQuantumDevice(n_wires=4, bsz=2, world_sz=1, device='cpu')

# Apply gates (functional style)
fq.h(device, wires=[0])
fq.rx(device, wires=[1], params=0.5)
fq.cx(device, wires=[0, 1])

# Measure all qubits
expectations = fq.measure_allZ(device)
print(expectations.shape)  # (2, 4)
```
