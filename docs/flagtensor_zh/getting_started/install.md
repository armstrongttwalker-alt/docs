# 安装 FlagTensor

## 快速开始（NVIDIA A100）

```bash
# 1. 安装 PyTorch
pip install torch==2.6.0 --index-url https://download.pytorch.org/whl/cu124

# 2. 安装 cuTensor
pip install cutensor-cu12
ln -sf $(python3 -c "import cutensor; print(cutensor.__path__[0])")/lib/libcutensor.so.2 \
  /usr/lib/x86_64-linux-gnu/libcutensor.so

# 3. 安装 FlagTree（Triton 分支）
pip install --no-cache-dir \
  --index-url=https://resource.flagos.net/repository/flagos-pypi-hosted/simple \
  --trusted-host=resource.flagos.net \
  "flagtree==0.4.0+3.3" --no-deps

# 4. 安装 FlagTensor
pip install -e . --no-deps
```
