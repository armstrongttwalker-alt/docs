# What's New in FlagOS 2.2

FlagOS 2.2 upgrades the multi-chip software stack across model training, inference, operator optimization, and deployment. It strengthens framework and backend integration, expands compiler and operator capabilities, and adds new toolchains for ARM CPU inference, model quantization, kernel development, and large-model delivery.

## Highlights

- **Framework integrations:** Updates to vLLM-Plugin-FL and SGLang-Plugin-FL, and the first FlagOS integration for PyTorch through Torch-FL.
- **Training stack:** Updates to Megatron-LM-FL, TransformerEngine-FL, and FlagScale for model training and lifecycle management.
- **Operator and compiler tooling:** Expanded operator coverage, new SGLang-specific operators, compiler and auto-tuning improvements, and additional routing options.
- **ARM CPU inference:** First release of FlagTree-CPU as an independent compilation component for low-bit ARM64 workloads.
- **Model conversion:** First release of FlagOS-Compressor for weight conversion and W4A16, W8A16, and dynamic W8A8 workflows.
- **Kernel development:** First release of FlagPrism for cross-backend Triton debugging and profiling.
- **Model delivery:** Additional Day 0 model adaptations, deployment configurations, and model images through FlagRelease.

## Runtime and framework integrations

### vLLM-Plugin-FL

vLLM-Plugin-FL adds the following capabilities for the FlagOS multi-chip backend:

- Compatibility lines for vLLM 0.20.2 and 0.24.0.
- An expanded **Empty** deployment mode that separates framework construction from device-specific implementation.
- INT8 and W8A8 execution paths.
- Graph execution support for selected non-NVIDIA backends.
- Monitoring for key-value (KV) cache transfers.

These features are intended to let the plugin provide device integration, operators, and communication implementations without requiring each model application to change its standard vLLM interface.

### SGLang-Plugin-FL

SGLang-Plugin-FL expands backend integration for the SGLang runtime across Hygon, Iluvatar CoreX, BANG, Kunlunxin, and Enflame backends.

The update also adds or improves:

- The Empty deployment path.
- Pipeline-parallel communication.
- Separate prefill and decode KV transfer paths.
- Multi-token prediction (MTP) integration.
- Integration with the new FlagGems-SGLang operator library.

### Torch-FL

Torch-FL is introduced as the FlagOS PyTorch adaptation path. It provides a unified virtual device named `FlagOS` and routes operators to FlagOS, vendor implementations, or compatible fallback paths.

The initial release focuses on:

- Multi-chip PyTorch execution.
- Mixed-precision and distributed execution paths.
- Compiler integration.
- Backend additions for Hygon, Moore Threads, BANG, and Enflame environments.
- Integration with FlagGems and vendor operator implementations.

Torch-FL also supports running Qwen-Image-2.1 with a standard Diffusers interface while moving text encoding, denoising, and image decoding to the CPU.

### Training stack and FlagScale

The training-side updates include:

- Megatron-LM-FL updated to MCore 0.18.2.
- TransformerEngine-FL updated to Transformer Engine 2.17.
- Adaptation work for GLM5 DSA, fused RoPE, block-wise cross-entropy, and backend-specific execution paths.
- FlagScale improvements for slow-node detection, training performance monitoring, progress heartbeats, and weight conversion.

These updates improve the observability and portability of multi-chip training jobs.

## Operators and compilation

### Operator library updates

FlagOS 2.2 expands operator coverage for general-purpose, fused, and domain-specific libraries. The release includes operators and execution paths for attention, Mamba state updates, mixture-of-experts (MoE) workloads, LoRA, sampling, quantization, MLA, KDA/GLA/GDN2, TopK, and low-precision computation.

The release also introduces **FlagGems-SGLang** as an SGLang-oriented operator library and updates **FlagGems-vLLM** with additional vLLM operator entry points. Operator totals use component-specific scopes and counting methods, so this page does not publish one aggregate total without a matching version, backend matrix, and counting method.

### Compiler and auto-tuning improvements

The compiler and runtime changes target data movement, kernel launch overhead, synchronization, and shape-dependent execution. The release includes:

- Optional NVIDIA TileIR compilation paths.
- TLE-based layout, shared-memory, and asynchronous-pipeline control.
- FlagTune search for execution configurations.
- Operator fusion and mixed-precision paths.
- Shape-aware routing to select an execution path for a given input.
- Additional compiler and backend integration work in FlagTree.

## ARM CPU inference with FlagTree-CPU

FlagTree-CPU v0.1.0 is introduced as an independent compilation component for CPU targets. The release is based on `triton-cpu 3.7.2` and adds ARM64 compilation paths for:

- SME2.
- SVE2.
- NEON I8MM.

The component generates low-bit operator instructions for W4A8 and W8A8 workloads. In the FlagOS deployment path, FlagTree-CPU works with FlagGems ARM operators and vLLM-Plugin-FL to support ARM CPU inference.

The inference stack adds weight pre-packing, operator fusion, compiled-kernel reuse, prefill matrix multiplication, decode-time weight access, and single-stream scheduling.

## Quantization and model compression

### FlagOS-Compressor

FlagOS-Compressor is introduced as a cross-backend weight conversion and quantization tool. It reads Hugging Face `safetensors` checkpoints and provides a workflow for selecting modules, converting weights, exporting deployment artifacts, and validating the resulting tensors and configuration.

The release describes the following quantization schemes:

- **W4A16:** INT4 weights with 16-bit activations.
- **W8A16:** INT8 weights with 16-bit activations.
- **Dynamic W8A8:** INT8 weights with per-token dynamic INT8 activations.

The quantization scope can be selected by module, including attention, MLP, MoE experts, shared experts, vision encoders, embeddings, normalization, and routing gates. Exported artifacts include quantized weights, scale parameters, shard indexes, runtime configuration, and integrity checks. The exported weight format is `compressed-tensors`.

### Large-model deployment

FlagOS 2.2 adds large-model deployment support through INT8 and W8A8 quantization paths, deployment artifacts, and configurations for BANG, Ascend, Hygon, NVIDIA, and PPU environments.

## Triton debugging and profiling with FlagPrism

FlagPrism is introduced as a cross-backend Triton debugger and profiler integrated with FlagTree. It connects Triton source code, compiler IR operations, and device execution events into one observation workflow.

The Debugger can collect:

- Intermediate values from selected regions of a `@triton.jit` kernel.
- Numerical summaries.
- Memory addresses.
- Complete tensor data.
- Source- and IR-level locations associated with collected values.

The Profiler can collect or derive:

- Call context and execution timelines.
- Operation counts.
- Estimated memory traffic.
- Hardware metrics and vendor profiler data where available.
- Aggregated call-tree and timeline reports.

FlagPrism uses a unified test set of 121 Triton operators and targets NVIDIA, Ascend, Iluvatar CoreX, Moore Threads, and Enflame backends. Debugger and profiler capabilities may differ between backends because collection is implemented by backend-specific adapters.

## Kernel generation and evaluation

FlagOS 2.2 continues the KernelGen workflow for generating and validating operator implementations. In the stated quarterly period, KernelGen generated 1,509 operators and 1,231 operators passed accuracy validation. The FlagGems release comparison also includes 436 KernelGen-tagged pull requests; these are different measures and should not be added together.

KernelGenBench v0.2.0 adds multi-chip baselines, chip identification, token-usage analysis, and anti-cheating checks. It also adds 50 matrix-multiplication shapes in two precisions, for 100 benchmark cases in that release.

## Day 0 models and deployment resources

FlagOS 2.2 adds seven Day 0 model adaptations, with a single model covering up to 12 platforms or devices in the release inventory.

FlagRelease provides more than 300 model images through public release channels. The available image, model-card, and deployment configuration should be checked in the relevant channel before use because platform coverage varies by model.
