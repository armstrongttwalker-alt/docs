# Install verl-FL

## Docker Images (Recommended)

Pre-built Docker images are available for each platform:

| Platform | Image | Contents |
|----------|-------|----------|
| NVIDIA (international GPU) | `harbor.baai.ac.cn/flagos21-release/verl-fl:v0.2.0-rc2-nvidia` | verl 0.7.0, torch 2.9.0+cu128, triton 3.5.0 |
| MetaX (C500/C550) | `harbor.baai.ac.cn/flagos21-release/verl-fl:v0.2.0-rc2-metax` | verl 0.7.0, torch 2.8.0+metax3.3.0.2, triton 3.0.0 |

```bash
# NVIDIA
docker pull harbor.baai.ac.cn/flagos21-release/verl-fl:v0.2.0-rc2-nvidia

# MetaX
docker pull harbor.baai.ac.cn/flagos21-release/verl-fl:v0.2.0-rc2-metax
```

## Install from Source

### Prerequisites

Ensure you have the required software dependencies installed. See [Requirements](requirements.md) for details.

### 1. Install FlagCX (Required)

```bash
cd /workspace
git clone https://github.com/flagos-ai/FlagCX.git
cd FlagCX
git submodule update --init --recursive
pip install . -v --no-build-isolation

# For MetaX:
# make USE_METAX=1
# cd plugin/torch/ && FLAGCX_ADAPTOR=metax pip install . --no-build-isolation

export FLAGCX_PATH=/workspace/FlagCX/
```

### 2. Install FlagGems (Optional)

```bash
cd /workspace
pip install -U scikit-build-core>=0.11 pybind11 ninja cmake
git clone https://github.com/flagos-ai/FlagGems.git
cd FlagGems
pip install --no-build-isolation -v .
```

### 3. Install vllm-plugin-FL (Optional)

```bash
# Option A: Install from PyPI
pip install vllm-plugin-fl==0.1.0+vllm0.13.0 \
    --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple

# Option B: Install from source
git clone --branch v0.1.0+vllm0.13.0 https://github.com/flagos-ai/vllm-plugin-FL.git
cd vllm-plugin-fl
pip install --no-build-isolation -v .
```

### 4. Install TransformerEngine-FL / Megatron-LM-FL (Optional)

```bash
# TransformerEngine-FL
pip install transformer_engine==0.1.0+te2.9.0 \
    --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple
# Or from source:
git clone --branch v0.1.0+te2.9.0 https://github.com/flagos-ai/TransformerEngine-FL.git
cd TransformerEngine-FL
pip install --no-build-isolation -v .

# Megatron-LM-FL
pip install megatron_core==0.1.0+megatron0.15.0rc7 \
    --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple
# Or from source:
git clone --branch v0.1.0+megatron0.15.0rc7 https://github.com/flagos-ai/Megatron-LM-FL.git
cd Megatron-LM-FL
pip install --no-build-isolation -v .
```

### 5. Install verl-FL

```bash
cd /workspace
git clone --branch v0.2.0-rc2.post1 https://github.com/flagos-ai/verl-FL.git
cd verl-FL
pip install --no-build-isolation -v -e .
```
