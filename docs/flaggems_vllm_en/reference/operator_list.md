# Operator List

This page lists the operators exported by FlagGems-vLLM, sourced from `src/flaggems_vllm/ops/__init__.py`.

FlagGems-vLLM provides optimized implementations of common vLLM operators using the Triton programming language. The following 75 operators are currently exported:

## Activation and Gating

| Operator | Description |
|----------|-------------|
| `dgeglu` | Backward pass for GEGLU activation |
| `dreglu` | Backward pass for ReGLU activation |
| `dswiglu` | Backward pass for SwiGLU activation |
| `geglu` | GEGLU (Gated Linear Unit with GELU) activation |
| `gelu_and_mul` | GELU activation combined with element-wise multiplication |
| `reglu` | ReGLU (Gated Linear Unit with ReLU) activation |
| `silu_and_mul` | SiLU (Swish) activation combined with element-wise multiplication |
| `silu_and_mul_out` | SiLU activation with multiplication (out-of-place variant) |
| `silu_and_mul_with_clamp` | SiLU activation with multiplication and clamping |
| `silu_and_mul_with_clamp_out` | SiLU activation with multiplication and clamping (out-of-place variant) |
| `swiglu` | SwiGLU (Gated Linear Unit with SiLU) activation |

## Attention

| Operator | Description |
|----------|-------------|
| `apply_rotary_pos_emb` | Apply rotary position embeddings |
| `concat_and_cache_mla` | Concatenate and cache for MLA (Multi-Latent Attention) |
| `flash_attention_forward` | FlashAttention forward pass |
| `flash_attn_varlen_func` | FlashAttention with variable-length sequences |
| `flash_attn_varlen_opt_func` | Optimized FlashAttention with variable-length sequences |
| `flash_mla` | Flash Multi-Latent Attention |
| `flash_mla_sparse_fwd` | Sparse Flash MLA forward pass |
| `flash_mla_with_kvcache` | Flash MLA with KV cache support |
| `reshape_and_cache` | Reshape and cache KV cache |
| `reshape_and_cache_flash` | Reshape and cache for FlashAttention |
| `sparse_attn_triton` | Sparse attention computation via Triton |

## DeepSeek V4 Attention

| Operator | Description |
|----------|-------------|
| `combine_topk_swa_indices` | Combine top-K and sliding window attention indices for DeepSeek V4 |
| `compute_global_topk_indices_and_lens` | Compute global top-K indices and lengths for DeepSeek V4 |
| `dequantize_and_gather_k_cache` | Dequantize and gather K cache for DeepSeek V4 |
| `fused_q_kv_rmsnorm` | Fused Q/KV RMSNorm for DeepSeek V4 |
| `fused_deepseek_v4_qnorm_rope_kv_rope_quant_insert` | Fused Q-norm, RoPE, KV-RoPE, quantize, and insert for DeepSeek V4 |

## Mixture of Experts (MoE)

| Operator | Description |
|----------|-------------|
| `dispatch_fused_moe_kernel` | Dispatch fused MoE kernel |
| `fused_experts_impl` | Fused MoE experts implementation |
| `grouped_topk` | Grouped top-K selection for MoE routing |
| `inplace_fused_experts` | In-place fused MoE experts |
| `invoke_fused_moe_triton_kernel` | Invoke fused MoE Triton kernel |
| `moe_align_block_size` | MoE block size alignment |
| `moe_align_block_size_triton` | MoE block size alignment (Triton variant) |
| `moe_sum` | MoE expert output summation |
| `outplace_fused_experts` | Out-of-place fused MoE experts |
| `top_k_per_row_decode` | Top-K per row for decode phase |
| `top_k_per_row_prefill` | Top-K per row for prefill phase |
| `topk_softmax` | Top-K with softmax for MoE gating |
| `topk_softplus_sqrt` | Top-K with softplus and sqrt for MoE gating |

## Linear and Matrix

| Operator | Description |
|----------|-------------|
| `cutlass_scaled_mm` | Scaled matrix multiplication via CUTLASS |
| `mul` | Element-wise multiplication |
| `mul_` | Element-wise multiplication (in-place) |
| `mv` | Matrix-vector multiplication |
| `outer` | Outer product of two vectors |

## Normalization

| Operator | Description |
|----------|-------------|
| `add_rms_norm` | Addition with RMSNorm |
| `fused_add_rms_norm` | Fused addition with RMSNorm |
| `instance_norm` | Instance normalization |
| `skip_layer_norm` | Skip connection with LayerNorm |
| `weight_norm` | Weight normalization |
| `weight_norm_interface` | Weight normalization interface |
| `weight_norm_interface_backward` | Weight normalization interface backward pass |

## Reduction and Utility

| Operator | Description |
|----------|-------------|
| `apply_repetition_penalties` | Apply repetition penalties during generation |
| `bincount` | Count frequency of each value |
| `cross_entropy_loss` | Cross-entropy loss computation |
| `pack_seq_triton` | Pack sequences |
| `unpack_seq_triton` | Unpack sequences |

## Quantization

| Operator | Description |
|----------|-------------|
| `fused_indexer_q_rope_quant` | Fused indexer Q with RoPE and quantization |
| `fused_inv_rope_fp8_quant` | Fused inverse RoPE with FP8 quantization |
| `per_token_group_quant_fp8` | Per-token group FP8 quantization |

## DSA — Deep Sparse Attention

| Operator | Description |
|----------|-------------|
| `bucket_sort_topk` | Bucket sort top-K selection |
| `cp_gather_indexer_k_quant_cache` | Gather indexer K with quantized cache |
| `indexer_k_quant_and_cache` | Indexer K with quantization and cache |

## FLA — Flash Linear Attention

| Operator | Description |
|----------|-------------|
| `chunk_gated_delta_rule` | Gated delta rule computation |
| `chunk_gated_delta_rule_fwd` | Gated delta rule forward pass |
| `fused_recurrent_gated_delta_rule_fwd` | Fused recurrent gated delta rule forward pass |

## MHC — Multi-Head Compatibility

| Operator | Description |
|----------|-------------|
| `hc_head_fused_kernel` | Head-channel fused kernel |
| `hc_head_fused_kernel_ref` | Head-channel fused kernel (reference) |
| `mhc_bwd` | MHC backward pass |
| `mhc_bwd_ref` | MHC backward pass (reference) |
| `mhc_post` | MHC post-processing |
| `mhc_pre` | MHC pre-processing |
| `sinkhorn_forward` | Sinkhorn forward computation |

## RWKV

| Operator | Description |
|----------|-------------|
| `rwkv_ka_fusion` | RWKV key-attention fusion kernel |
| `rwkv_mm_sparsity` | RWKV matrix multiplication sparsity kernel |
