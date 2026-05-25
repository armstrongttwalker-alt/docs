# Installation

## Setup

### 1. Install SGLang

```{code-block} shell
pip install "sglang[all]==0.5.11"
```

### 2. Install FlagGems

```{code-block} shell
git clone https://github.com/flagos-ai/FlagGems
cd FlagGems && pip install .
```

### 3. Install sglang-plugin-FL

```{code-block} shell
git clone https://github.com/flagos-ai/sglang-plugin-FL
cd sglang-plugin-FL && pip install .
```

### 4. (Optional) Install FlagCX for Multi-Chip Communication

```{code-block} shell
git clone https://github.com/flagos-ai/FlagCX.git
cd FlagCX && make USE_NVIDIA=1
export FLAGCX_PATH="$PWD"
```

## Download Models

```{code-block} shell
# Small model for quick testing (single GPU)
huggingface-cli download Qwen/Qwen2.5-0.5B-Instruct

# Larger model for multi-GPU (tp=8)
huggingface-cli download Qwen/Qwen2.5-14B-Instruct
```

If HuggingFace is not accessible, use a mirror:

```{code-block} shell
HF_ENDPOINT=https://hf-mirror.com huggingface-cli download Qwen/Qwen2.5-0.5B-Instruct
```

Models are cached in `~/.cache/huggingface/hub/` by default. You can also pass a local path to `--model-path`.

## Additional Setup for Huawei Ascend

1. Set required environment variables:

```{code-block} shell
export TRITON_ALL_BLOCKS_PARALLEL=1
```

2. Enable eager execution:

```{code-block} shell
# Pass --enforce-eager when launching the server
```

## Additional Setup for CUDA

### Use CUDA Communication Library

```{code-block} shell
unset FLAGCX_PATH
```

### Use Native CUDA Operators

If you want to use the original CUDA operators instead of FlagGems:

```{code-block} shell
export USE_FLAGGEMS=0
```
