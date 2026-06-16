# 要求

## 软件要求

sglang-plugin-FL 需要以下软件版本。

| 软件包 | 版本 |
|---------|---------|
| SGLang | 0.5.11 |
| sglang-kernel | 0.4.2 |
| PyTorch | 2.11.0+cu130 |
| Triton | 3.6.0 |
| FlagGems | 4.2.1rc0 |
| flashinfer | 0.6.8.post1 |
| Python | 3.12 |
| CUDA | 13.0 |

## 硬件要求

- 支持 CUDA 13.0 的 NVIDIA GPU，或
- 配备 CANN 工具包的华为昇腾 NPU，或
- 其他支持相应厂商 SDK 的硬件

## 已验证的模型

| 模型 | TP | 状态 |
|-------|-----|--------|
| Qwen3.6-27B (混合注意力 + FLA + MoE) | tp=1 | 已验证 |
| Qwen3.6-35B-A3B (MoE, 256 专家) | tp=1 | 已验证 |
| Qwen2.5-14B-Instruct | tp=8 | 已验证 |
