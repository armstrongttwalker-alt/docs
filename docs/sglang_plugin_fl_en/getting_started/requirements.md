# Requirements

## Software requirements

The following software versions are required for sglang-plugin-FL.

| Package | Version |
|---------|---------|
| SGLang | 0.5.11 |
| sglang-kernel | 0.4.2 |
| PyTorch | 2.11.0+cu130 |
| Triton | 3.6.0 |
| FlagGems | 4.2.1rc0 |
| flashinfer | 0.6.8.post1 |
| Python | 3.12 |
| CUDA | 13.0 |

## Hardware requirements

- NVIDIA GPU with CUDA 13.0 support, or
- Huawei Ascend NPU with CANN toolkit, or
- Other supported hardware with appropriate vendor SDK

## Verified models

| Model | TP | Status |
|-------|-----|--------|
| Qwen3.6-27B (Hybrid Attention + FLA + MoE) | tp=1 | Verified |
| Qwen3.6-35B-A3B (MoE, 256 experts) | tp=1 | Verified |
| Qwen2.5-14B-Instruct | tp=8 | Verified |
