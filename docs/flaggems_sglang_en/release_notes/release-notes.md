# Release Notes

This section includes the release information for FlagGems-sglang.

## v0.1.0

**Added features**:

- 40 operators implemented in Triton for SGLang inference, covering activation and gating, attention, Mamba/SSM, chunked cumulative sums, Mixture-of-Experts, LoRA projections, normalization, INT8 quantization, rotary positional embedding, sampling and speculative decoding.
- Flexible multi-backend support: operators are resolved through a three-level registrar (generic / vendor / architecture), with vendor specializations for KunlunXin, Ascend, Enflame, Iluvatar, MetaX, Hygon, MThreads and NVIDIA, plus Hopper and Ampere architecture folders for NVIDIA.
- Deep performance tuning and Triton kernel call optimization, with per-operator test and benchmark suites and accuracy recording.
