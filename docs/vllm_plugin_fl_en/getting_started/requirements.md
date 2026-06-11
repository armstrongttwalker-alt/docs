# Requirements

## Software Requirements

| Requirement | v0.1.0 (vLLM 0.13.0) | v0.2.0 (vLLM 0.20.0 or vLLM 0.20.2) | Notes |
|-------------|----------------------|----------------------|-------|
| Python | 3.10 - 3.13 | 3.10 - 3.13 | Required |
| PyTorch | >= 2.7.1 | >= 2.7.1 | Required |
| vLLM | 0.13.0 | 0.20.2 | From official release or fork |
| FlagGems | >= v5.0.0 | >= v5.0.0 | Required for operator dispatch |
| FlagCX | v0.9.0 | v0.9.0 | Optional, for multi-chip communication |
| FlagTree | 0.4.0 | 0.4.0 | Ascend NPU only |

## Supported hardware platforms

The following table summarizes supported hardware and their verification status:

| Chip Vendor | v0.1.0 (vLLM 0.13.0) | v0.2.0 (vLLM 0.20.0 or vLLM 0.20.2) | Notes |
|-------------|----------------------|----------------------|-------|
| NVIDIA | Supported | Supported | |
| Ascend | Supported | — | Requires FlagTree and eager execution |
| MetaX | Supported | — | |
| T-Head | Supported | — | |
| Iluvatar | Supported | — | Requires FlagTree and eager execution |
| Moore Threads | Supported | — | |
| Tsingmicro | Merging | — | [PR #52](https://github.com/flagos-ai/vllm-plugin-FL/pull/52) |
| Hygon DCU | Supported | Supported | v0.2.0 requires DTK container (see install guide) |
| Sunrise | Supported | — | |

## Supported models

In theory, vllm-plugin-FL can support all models available in vLLM if no unsupported operators are involved. The following models have been end-to-end verified:

| Model | Status | Example |
|-------|--------|---------|
| Qwen3.5-397B-A17B | Supported | [qwen3_5_offline_inference.py](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/examples/qwen3_5_offline_inference.py) |
| Qwen3-Next-80B-A3B | Supported | [qwen3_next_offline_inference.py](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/examples/qwen3_next_offline_inference.py) |
| Qwen3-4B | Supported | [offline_inference.py](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/examples/offline_inference.py) |
| MiniCPM-o 4.5 | Supported | [examples/minicpm/](https://github.com/flagos-ai/vllm-plugin-FL/tree/main/examples/minicpm) |
| GLM-5 | Supported | [glm_5_offline_inference.py](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/examples/glm_5_offline_inference.py) |
| Qwen3.5-35B-A3B | Supported | [qwen3_5_offline_inference.py](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/examples/qwen3_5_offline_inference.py) |
| BAAI/bge-m3 | Supported | [bge_m3.py](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/vllm_fl/models/bge_m3.py) |
| MiniMax-M2.7 | Supported | [minimax_m27_offline_inference.py](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/examples/minimax_m27_offline_inference.py) |
| Qwen3.6-35B-A3B | Supported | [Text + image inference/serving (v0.2.0)](/getting_started/run-inference-task.md#run-a-serving-inference-task) |
| Qwen3.6-27B | Supported | [Text + image inference/serving (v0.2.0)](/getting_started/run-inference-task.md#run-a-serving-inference-task) |
| Qwen2.5-1.5B | Supported | [Iluvatar BI-V150 example](example-qwen2.5-bv150.md) |
