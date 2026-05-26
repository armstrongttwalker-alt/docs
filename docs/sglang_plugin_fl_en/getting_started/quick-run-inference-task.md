# Quick run an inference task

This section covers how to quick start a inference task through sglang-plugin-FL. 

## Installation

### 1. Install SGLang v0.5.11

```{code-block} shell
pip install "sglang[all]==0.5.11"
```

### 2. Install [FlagGems](https://github.com/flagos-ai/FlagGems)

```{code-block} shell
git clone https://github.com/flagos-ai/FlagGems
cd FlagGems && pip install .
```

### 3. Install sglang-plugin-FL

```{code-block} shell
git clone https://github.com/flagos-ai/sglang-plugin-FL
cd sglang-plugin-FL && pip install .
```

### 4. (Optional) Install [FlagCX](https://github.com/flagos-ai/FlagCX) for multi-chip communication

```{code-block} shell
git clone https://github.com/flagos-ai/FlagCX.git
cd FlagCX && make USE_NVIDIA=1
export FLAGCX_PATH="$PWD"
```

## Download models

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

## Run the inference task

### 1. Launch sglang server

#### Single GPU

```{code-block} shell
python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-0.5B-Instruct \
    --port 30000 \
    --disable-piecewise-cuda-graph
```

#### Multi-GPU with Tensor Parallelism

```{code-block} shell
python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-14B-Instruct \
    --tp 8 --port 30000 \
    --disable-piecewise-cuda-graph
```

```{note}
FlagGems Triton kernels contain `logging.Logger` calls that are incompatible with `torch.compile` (used by SGLang's piecewise CUDA graph). Always use `--disable-piecewise-cuda-graph` when launching the server. Regular CUDA graph capture works normally.
```

### 2. Send a Request

After the server is ready (`The server is fired up and ready to roll`), send a request:

```{code-block} shell
curl -s http://localhost:30000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "default",
    "messages": [{"role": "user", "content": "List the first 5 prime numbers."}],
    "temperature": 0
  }' | python -m json.tool
```

## Use native CUDA operators

To disable the plugin and use SGLang's original CUDA path:

```{code-block} shell
SGLANG_PLUGINS="__none__" python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-0.5B-Instruct \
    --port 30000 --disable-piecewise-cuda-graph
```

To disable only the ATen layer (keep fused op dispatch):

```{code-block} shell
USE_FLAGGEMS=0 python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-0.5B-Instruct \
    --port 30000 --disable-piecewise-cuda-graph
```

For more dispatch configuration options, see the [Operator Dispatch User Guide](../dispatch_user_guide/dispatch-user-guide.md).
