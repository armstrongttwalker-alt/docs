# Install FlagTensor

## Install Dependencies

```shell
pip install -U pip setuptools wheel
pip install torch triton pytest pyyaml matplotlib openpyxl
```

## Clone and Install FlagTensor

```shell
git clone https://github.com/flagos-ai/FlagTensor.git
cd FlagTensor
pip install -e .
```

## Verify Installation

```python
import torch
import flagtensor

x = torch.randn(1024, device="cuda", dtype=torch.float32)
y = flagtensor.relu(x)
print(y.shape)
```
