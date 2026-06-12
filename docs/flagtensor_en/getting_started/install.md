# Install FlagTensor

## Quick Start (NVIDIA A100)

```bash
# 1. Install PyTorch
pip install torch==2.6.0 --index-url https://download.pytorch.org/whl/cu124

# 2. Install cuTensor
pip install cutensor-cu12
ln -sf $(python3 -c "import cutensor; print(cutensor.__path__[0])")/lib/libcutensor.so.2 \
  /usr/lib/x86_64-linux-gnu/libcutensor.so

# 3. Install FlagTree (Triton fork)
pip install --no-cache-dir \
  --index-url=https://resource.flagos.net/repository/flagos-pypi-hosted/simple \
  --trusted-host=resource.flagos.net \
  "flagtree==0.4.0+3.3" --no-deps

# 4. Install FlagTensor
pip install -e . --no-deps
```

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
