# 快速运行推理任务

本节介绍如何通过 sglang-plugin-FL 快速启动推理任务。

## 安装

### 1. 安装 SGLang v0.5.11

```{code-block} shell
pip install "sglang[all]==0.5.11"
```

### 2. 安装 [FlagGems](https://github.com/flagos-ai/FlagGems)

```{code-block} shell
git clone https://github.com/flagos-ai/FlagGems
cd FlagGems && pip install .
```

### 3. 安装 sglang-plugin-FL

```{code-block} shell
git clone https://github.com/flagos-ai/sglang-plugin-FL
cd sglang-plugin-FL && pip install .
```

### 4. （可选）安装 [FlagCX](https://github.com/flagos-ai/FlagCX) 以支持多芯片通信

```{code-block} shell
git clone https://github.com/flagos-ai/FlagCX.git
cd FlagCX && make USE_NVIDIA=1
export FLAGCX_PATH="$PWD"
```

## 下载模型

```{code-block} shell
# 用于快速测试的小模型（单 GPU）
huggingface-cli download Qwen/Qwen2.5-0.5B-Instruct

# 用于多 GPU 的大模型（tp=8）
huggingface-cli download Qwen/Qwen2.5-14B-Instruct
```

如果无法访问 HuggingFace，可使用镜像：

```{code-block} shell
HF_ENDPOINT=https://hf-mirror.com huggingface-cli download Qwen/Qwen2.5-0.5B-Instruct
```

模型默认缓存在 `~/.cache/huggingface/hub/` 中。您也可以将本地路径传递给 `--model-path`。

## 运行推理任务

### 1. 启动 SGLang 服务器

#### 单 GPU

```{code-block} shell
python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-0.5B-Instruct \
    --port 30000 \
    --disable-piecewise-cuda-graph
```

#### 多 GPU 张量并行

```{code-block} shell
python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-14B-Instruct \
    --tp 8 --port 30000 \
    --disable-piecewise-cuda-graph
```

```{note}
FlagGems Triton 内核包含 `logging.Logger` 调用，与 `torch.compile`（SGLang 的分段 CUDA 图使用）不兼容。启动服务器时请始终使用 `--disable-piecewise-cuda-graph`。常规 CUDA 图捕获可正常工作。
```

### 2. 发送请求

服务器就绪后（显示 `The server is fired up and ready to roll`），发送请求：

```{code-block} shell
curl -s http://localhost:30000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "default",
    "messages": [{"role": "user", "content": "List the first 5 prime numbers."}],
    "temperature": 0
  }' | python -m json.tool
```

## 使用原生 CUDA 算子

要禁用插件并使用 SGLang 的原始 CUDA 路径：

```{code-block} shell
SGLANG_PLUGINS="__none__" python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-0.5B-Instruct \
    --port 30000 --disable-piecewise-cuda-graph
```

仅禁用 ATen 层（保留融合算子调度）：

```{code-block} shell
USE_FLAGGEMS=0 python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-0.5B-Instruct \
    --port 30000 --disable-piecewise-cuda-graph
```

更多调度配置选项，请参阅[算子调度用户指南](../dispatch_user_guide/dispatch-user-guide.md)。
