# Release Notes

## v0.1.0


Initial release of sglang-plugin-FL.

- Added features

  - Three-layer operator replacement architecture for SGLang:
    - **Layer 1**: ATen operator replacement via FlagGems Triton kernels
    - **Layer 2**: SGLang fused kernel dispatch (SiluAndMul, RMSNorm, RotaryEmbedding)
    - **Layer 3**: Distributed communication via CommunicatorFL (FlagCX / torch.distributed)
  - Non-intrusive plugin architecture using SGLang entry_points
  - Per-operator backend selection with automatic fallback
  - YAML configuration and environment variable control
  - Bridge layer decoupling framework-specific parameters from standardized op signatures
  - Vendor auto-discovery mechanism — same backends work for both sglang-plugin-FL and vllm-plugin-FL
  - Support for NVIDIA CUDA, Huawei Ascend, and extensible to other hardware
  - Verified models: Qwen3.6-27B, Qwen3.6-35B-A3B, Qwen2.5-14B-Instruct
  - Dispatch logging and ATen replacement logging for debugging
  - Precision bisection workflow for numerical debugging