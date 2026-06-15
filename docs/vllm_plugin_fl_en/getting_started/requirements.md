# Requirements

## Software Requirements

| Requirement | Version | Notes |
|-------------|---------|-------|
| Python | 3.10 - 3.13 | Required |
| PyTorch | >= 2.7.1 | Required |
| vLLM | 0.13.0 | Required, from official release or fork |
| FlagGems | 5.0.0 | Required for operator dispatch |
| FlagCX | 0.9.0 | Optional, for multi-chip communication |
| FlagTree | 0.4.0 | Ascend NPU only |

## Supported hardware platforms

The following table summarizes supported hardware and their verification status:

| Chip Vendor | Status | Notes |
|-------------|--------|-------|
| NVIDIA | Supported |  |
| Ascend | Supported | Requires FlagTree and eager execution |
| Pingtouge-Zhenwu | Supported | |
| Iluvatar | Supported | Requires FlagTree and eager execution |
| MetaX | Supported |  |
| Moore Threads | Supported |  |

## Model Compatibility

In theory, vllm-plugin-FL can support all models available in vLLM if no unsupported operators are involved. The following models have been end-to-end verified:

| Model | Status | Example |
|-------|--------|---------|
| Qwen3.5-397B-A17B | Supported | [qwen3_5_offline_inference.py](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/examples/qwen3_5_offline_inference.py) |
| Qwen3-Next-80B-A3B | Supported | [qwen3_next_offline_inference.py](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/examples/qwen3_next_offline_inference.py) |
| Qwen3-4B | Supported | [offline_inference.py](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/examples/offline_inference.py) |
| MiniCPM-o 4.5 | Supported | [examples/minicpm/](https://github.com/flagos-ai/vllm-plugin-FL/tree/main/examples/minicpm) |
| GLM-5 | Supported | [glm_5_offline_inference.py](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/examples/glm_5_offline_inference.py) |
| Qwen3.5-35B-A3B | Supported | [glm_5_offline_inference.py](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/examples/glm_5_offline_inference.py) |
| BAAI/bge-m3 | Supported | [bge_m3.py](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/vllm_fl/models/bge_m3.py) |
