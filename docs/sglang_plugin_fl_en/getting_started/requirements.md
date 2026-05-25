# Requirements

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

## Hardware Requirements

- NVIDIA GPU with CUDA 13.0 support, or
- Huawei Ascend NPU with CANN toolkit, or
- Other supported hardware with appropriate vendor SDK

## Dependencies

sglang-plugin-FL depends on the following FlagOS components:

- **[FlagGems](https://github.com/flagos-ai/FlagGems)** — Unified operator library providing Triton-based GPU kernels
- **[FlagCX](https://github.com/flagos-ai/FlagCX)** (optional) — Unified communication library for multi-chip distributed inference
