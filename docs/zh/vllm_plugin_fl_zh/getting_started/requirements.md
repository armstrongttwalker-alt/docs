# 要求

## 软件要求

| 要求 | 版本 | 备注 |
|-------------|---------|-------|
| Python | 3.10 - 3.13 | 必需 |
| PyTorch | >= 2.7.1 | 必需 |
| vLLM | 0.13.0 | 必需，来自官方发布版或 fork |
| FlagGems | 5.0.0 | 算子调度必需 |
| FlagCX | 0.9.0 | 可选，用于多芯片通信 |
| FlagTree | 0.4.0 | 仅昇腾 NPU |

## 支持的硬件平台

下表总结了支持的硬件及其验证状态：

| 芯片供应商 | 状态 | 备注 |
|-------------|--------|-------|
| NVIDIA | 支持 |  |
| 昇腾 | 支持 | 需要 FlagTree 和 eager 执行 |
| 平头哥-镇武 | 支持 | |
| Iluvatar | 支持 | 需要 FlagTree 和 eager 执行 |
| MetaX | 支持 |  |
| 摩尔线程 | 支持 |  |

## 模型兼容性

理论上，如果不涉及不支持的算子，vllm-plugin-FL 可以支持 vLLM 中所有可用的模型。以下模型已经过端到端验证：

| 模型 | 状态 | 示例 |
|-------|--------|---------|
| Qwen3.5-397B-A17B | 支持 | [qwen3_5_offline_inference.py](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/examples/qwen3_5_offline_inference.py) |
| Qwen3-Next-80B-A3B | 支持 | [qwen3_next_offline_inference.py](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/examples/qwen3_next_offline_inference.py) |
| Qwen3-4B | 支持 | [offline_inference.py](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/examples/offline_inference.py) |
| MiniCPM-o 4.5 | 支持 | [examples/minicpm/](https://github.com/flagos-ai/vllm-plugin-FL/tree/main/examples/minicpm) |
| GLM-5 | 支持 | [glm_5_offline_inference.py](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/examples/glm_5_offline_inference.py) |
| Qwen3.5-35B-A3B | 支持 | [glm_5_offline_inference.py](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/examples/glm_5_offline_inference.py) |
| BAAI/bge-m3 | 支持 | [bge_m3.py](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/vllm_fl/models/bge_m3.py) |
