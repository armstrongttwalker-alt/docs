# Release Notes

This section includes the vllm-plugin-FL release information.

## v0.1.1

vllm-plugin-FL v0.1.1 requires [vllm v0.13.0](https://github.com/vllm-project/vllm/tree/v0.13.0).

- **Added Features**

  - Mixed length benchmark script for accuracy and performance evaluation across variable sequence lengths
  - Hardware support for Mthreads

- **Improved Features**

  - Decoupled vendor backend registration with platform-aware dynamic discovery, avoiding eager imports of vendor backends
  - Fixed operator dispatch unit test cases for improved reliability
  - CI/CD improvements: privileged container mode for nvidia-smi command availability in CI environment


## v0.1.0

vllm-plugin-FL v0.1.0 requires [vllm v0.13.0](https://github.com/vllm-project/vllm/tree/v0.13.0).

- **Added Features**

  - Initial release of vllm-plugin-FL as a vLLM inference/serving framework plugin
  - Unified multi-chip backend support via FlagGems and FlagCX integration
  - Flexible operator dispatch system with FlagGems, vendor-specific, and PyTorch reference backends
  - End-to-end verified support for Qwen3.5-397B-A17B, Qwen3-Next-80B-A3B, Qwen3-4B, MiniCPM-o 4.5, GLM-5, Qwen3.5-35B-A3B, and BAAI/bge-m3 models
  - Hardware support for NVIDIA, Ascend, T-head-Zhenwu, MetaX, and Iluvatar chips
  - Platform-specific configuration files (ascend.yaml, cuda.yaml) for auto-detected defaults
  - Environment variable-based configuration for backend selection, vendor filtering, and operator control
  - YAML configuration file support for complete dispatch policy override
  - Multi-process safe operator registry with thread-safe cache operations

- **Improved Features**

  - Optimized dispatch flow with caching for resolved operators
  - Fallback mechanism from preferred backend to available alternatives on failure
  - Per-operator backend selection order configuration
  - Whitelist and blacklist support for FlagGems and OOT operators
  - Debug logging mode for dispatch system troubleshooting
