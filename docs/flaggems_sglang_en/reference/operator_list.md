# Operator List

This page lists the operators exported by FlagGems-sglang, sourced from `conf/operators.yaml` and the `__all__` of `src/flaggems_sglang/ops/*.py`.

The generic operator set contains 40 operators, and the two sources agree name for name. Each operator is implemented in Triton and resolved for the current device by the three-level registrar described in [Overview](../overview/overview.md).

## Activation and Gating

| Operator | Description |
|----------|-------------|
| `gelu_and_mul` | Fused GELU gate and multiply operation. Computes gelu(x[..., :d]) * x[..., d:] in a single pass. Stride-aware so non-contiguous gate/up splits are handled without a copy. |
| `silu_and_mul` | Fused SiLU gate and multiply operation. Computes silu(x[..., :d]) * x[..., d:] in a single pass. Optimized for both decode and prefill phases with adaptive tiling strategies. |
| `silu_and_mul_masked` | Masked SiLU gate and multiply for grouped Mixture-of-Experts activations. Computes only the valid token rows indicated by the per-group masked length. |

## Attention

| Operator | Description |
|----------|-------------|
| `context_attention` | Prefill/context-stage scaled dot-product attention on packed variable-length sequences. Supports causal masking over sequences delimited by per-batch start offsets and lengths. |
| `decode_attention` | Decode-stage attention against a paged KV cache. Gathers keys and values through an indirection table for single-token queries. |
| `decode_grouped_attention` | Grouped-query variant of decode-stage paged attention. Shares each KV head across a group of query heads to cut cache bandwidth. |
| `merge_state` | Merges attention states from prefix and suffix sequences using log-sum-exp scaling. Used for continuous batching and chunked attention computation. |

## Mamba and SSM

| Operator | Description |
|----------|-------------|
| `bmm_chunk` | Chunked batched matrix multiplication for the Mamba2 SSD scan. Computes per-chunk C @ B^T products with optional causal masking. |
| `causal_conv1d_fn` | Generic depthwise causal 1-D convolution over continuous-batched sequences. Computes depthwise causal convolution with optional bias and SiLU activation. |
| `chunk_state` | Mamba2 per-chunk SSM hidden-state accumulation. Accumulates x against the decay- and dt-scaled state-projection matrix per chunk. |
| `chunk_state_varlen` | Variable-length variant of the Mamba2 per-chunk state accumulation. Handles packed sequences delimited by cumulative sequence lengths. |
| `selective_state_update` | Single-step Mamba selective state-space update. Advances the recurrent state in float32 with optional softplus dt, D skip and gating. |
| `state_passing` | Mamba2 SSD inter-chunk state-passing scan. Sequentially propagates each chunk's final state forward from the initial state. |
| `mamba_layernorm_gated` | Gated layer/RMS normalization for Mamba blocks. Applies grouped normalization with a SiLU gate before or after the norm. |

## Chunked Cumulative Sum

| Operator | Description |
|----------|-------------|
| `chunk_cumsum` | Chunk-wise cumulative sum of the Mamba timestep and state-decay terms. Computes dt with optional softplus and bias, plus the cumulative dA per chunk. |
| `chunk_local_cumsum_scalar` | Computes local cumulative sum over chunked sequences with optional scaling and reverse direction. Supports both direct and transposed cumsum computation. |
| `chunk_local_cumsum_vector` | Within-chunk cumulative sum of a per-token, per-head vector gate. Supports optional scaling and reverse-direction accumulation. |

## Mixture of Experts (MoE)

| Operator | Description |
|----------|-------------|
| `fused_moe_gemm` | Fused Mixture-of-Experts GEMM operation that combines token routing and expert computation. Performs weighted expert-specific matrix multiplication for MoE models. |
| `fused_moe_router_cudacore` | Fused Mixture-of-Experts router evaluated on CUDA cores. Computes router logits with optional softcapping and correction bias, then selects top-k experts. |
| `fused_moe_router_tensorcore` | Tensor Core variant of the fused Mixture-of-Experts router. Mathematically identical to the CUDA-core router, tuned for Tensor Core throughput. |
| `moe_fused_gate` | Fused Mixture-of-Experts gating with expert-group selection. Scores experts, applies bias and top-k selection, then optionally renormalizes and rescales. |
| `moe_fused_mul_sum` | Fused weighted reduction of Mixture-of-Experts outputs. Scales each top-k expert output by its routing weight and sums over top-k, masking slots dropped by expert-parallel routing. |
| `moe_sum_reduce` | Sums the per-expert outputs of a Mixture-of-Experts layer. Reduces over the top-k dimension and applies the routed scaling factor. |
| `per_group_transpose` | Per-expert group transpose operation for MoE models. Transposes tensor blocks grouped by expert assignment for efficient computation. |
| `sigmoid_gate_topk_renorm` | Sigmoid expert gating with top-k selection and weight renormalization. Applies optional bias, shared-expert handling, and route/global scaling. |

## LoRA

| Operator | Description |
|----------|-------------|
| `embedding_lora_a` | LoRA A-projection over an embedding lookup for segmented multi-adapter batches. Selects the per-segment adapter weight and projects the gathered rows. |
| `gate_up_lora_b` | LoRA B-projection for fused gate/up projections in segmented multi-adapter batches. Expands the low-rank activations and accumulates onto the base output. |
| `qkv_lora_b` | LoRA B-projection for fused QKV projections in segmented multi-adapter batches. Expands the low-rank activations into per-slice Q, K and V offsets of the base output. |
| `sgemm_lora_a` | LoRA A-projection GEMM for segmented multi-adapter batches. Shrinks activations to the adapter rank, optionally over a stack of projections. |
| `sgemm_lora_b` | LoRA B-projection GEMM for segmented multi-adapter batches. Expands the low-rank activations and accumulates onto the base output. |

## Normalization

| Operator | Description |
|----------|-------------|
| `fused_rmsnorm` | Fused root-mean-square layer normalization with a learned weight. Computes the reciprocal RMS and applies the scale in a single pass. |

## Quantization

| Operator | Description |
|----------|-------------|
| `per_token_group_quant_int8` | Per-token, per-group symmetric INT8 quantization. Emits quantized values alongside one scale per token group. |
| `per_token_quant_int8` | Per-token symmetric INT8 quantization. Emits quantized values alongside one scale per token row. |

## Rotary Positional Embedding

| Operator | Description |
|----------|-------------|
| `interleaved_rope` | Interleaved-layout Rotary Positional Embedding. Rotates adjacent element pairs using multi-section temporal, height, and width splits. |
| `mrope_fused` | Multi-dimensional Rotary Positional Embedding (mRoPE) for query and key tensors. Applies position-dependent rotation across temporal, height, and width dimensions. |
| `rotary_embedding` | Rotary Positional Embedding with precomputed cosine and sine tables. Supports both the interleaved and half-split rotation layouts. |

## Sampling

| Operator | Description |
|----------|-------------|
| `apply_token_bitmask` | Applies a packed bitmask to logits for grammar-constrained decoding. Masks out disallowed vocabulary tokens by setting them to -inf. |
| `softcap_inplace_logits` | In-place logit softcapping. Computes cap * tanh(x / cap) over the full logit tensor. Bounds logit magnitude before sampling without allocating an output buffer. |
| `softcap_out` | Out-of-place logit softcapping. Computes cap * tanh(x / cap) and returns an FP32 tensor. Uses a deterministic shape heuristic to pick a tiling on every launch. |

## Speculative Decoding

| Operator | Description |
|----------|-------------|
| `draft_topk1` | Top-1 draft token selection for speculative decoding. Picks the argmax draft token per position and writes it to the draft token column. |

## Multi-backend operator coverage

Beyond the generic implementations, vendors ship specializations under `src/flaggems_sglang/runtime/backend/_<vendor>/ops/`. Per-vendor coverage counts are in the backends table in [Features](../overview/features.md). Operators a vendor does not specialize fall back to the generic Triton implementation.
