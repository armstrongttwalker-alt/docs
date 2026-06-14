# Operator List

This page lists the operators supported by FlagGems-vLLM.

FlagGems-vLLM provides optimized implementations of common vLLM operators using the Triton programming language. The following operators are currently supported:

## Activation and gating operators

| Operator | Description |
|----------|-------------|
| `apply_repetition_penalties` | Apply repetition penalties during generation |
| `dreglu` | Backward pass for ReGLU activation |
| `dgeglu` | Backward pass for GEGLU activation |
| `dswiglu` | Backward pass for SwiGLU activation |
| `geglu` | GEGLU (Gated Linear Unit with GELU) activation |
| `gelu_and_mul` | GELU activation combined with element-wise multiplication |
| `reglu` | ReGLU (Gated Linear Unit with ReLU) activation |
| `silu_and_mul` | SiLU (Swish) activation combined with element-wise multiplication |
| `silu_and_mul_with_clamp` | SiLU activation with multiplication and clamping |
| `swiglu` | SwiGLU (Gated Linear Unit with SiLU) activation |
| `tanh` | Hyperbolic tangent activation |

## Attention operators

| Operator | Description |
|----------|-------------|
| `apply_rotary_pos_emb` | Apply rotary position embeddings |
| `concat_and_cache_mla` | Concatenate and cache for MLA (Multi-Latent Attention) |
| `flash_attn_varlen_func` | FlashAttention with variable-length sequences |
| `flash_mla` | Flash Multi-Latent Attention |
| `flash_mla_with_kvcache` | Flash MLA with KV cache support |
| `flashmla_sparse` | Sparse Flash Multi-Latent Attention |
| `reshape_and_cache` | Reshape and cache KV cache |
| `reshape_and_cache_flash` | Reshape and cache for FlashAttention |
| `rotary_embedding` | Rotary positional embedding |
| `sparse_attention` | Sparse attention computation |

## DeepSeek V4 Attention operators

| Operator | Description |
|----------|-------------|
| `deepseek_v4_attention_combine_topk_swa_indices` | Combine top-K and sliding window attention indices for DeepSeek V4 |
| `deepseek_v4_attention_compute_global_topk_indices_and_lens` | Compute global top-K indices and lengths for DeepSeek V4 |
| `deepseek_v4_attention_dequantize_and_gather_k_cache` | Dequantize and gather K cache for DeepSeek V4 |
| `deepseek_v4_attention_fused_q_kv_rmsnorm` | Fused Q/KV RMSNorm for DeepSeek V4 |
| `fused_deepseek_v4_qnorm_rope_kv_rope_quant_insert` | Fused Q-norm, RoPE, KV-RoPE, quantize, and insert for DeepSeek V4 |

## Mixture of Experts (MoE) operators

| Operator | Description |
|----------|-------------|
| `fused_experts_impl` | Fused MoE experts implementation |
| `fused_marlin_moe` | Fused Marlin MoE operator |
| `fused_moe` | Fused Mixture of Experts operator |
| `grouped_topk` | Grouped top-K selection for MoE routing |
| `moe_align_block_size` | MoE block size alignment |
| `moe_sum` | MoE expert output summation |
| `top_k_per_row_decode` | Top-K per row for decode phase |
| `top_k_per_row_prefill` | Top-K per row for prefill phase |
| `topk_softmax` | Top-K with softmax for MoE gating |
| `topk_softplus_sqrt` | Top-K with softplus and sqrt for MoE gating |

## Linear and matrix operators

| Operator | Description |
|----------|-------------|
| `cutlass_scaled_mm` | Scaled matrix multiplication via CUTLASS |
| `mul` | Element-wise multiplication |
| `mv` | Matrix-vector multiplication |
| `outer` | Outer product of two vectors |
| `weight_norm` | Weight normalization |
| `weight_norm_interface` | Weight normalization interface |
| `weightnorm` | Weight normalization kernel |

## Normalization operators

| Operator | Description |
|----------|-------------|
| `add_rms_norm` | Addition with RMSNorm |
| `fused_add_rms_norm` | Fused addition with RMSNorm |
| `instance_norm` | Instance normalization |
| `skip_layernorm` | Skip connection with LayerNorm |

## Reduction and utility operators

| Operator | Description |
|----------|-------------|
| `bincount` | Count frequency of each value |
| `cross_entropy_loss` | Cross-entropy loss computation |
| `pack_seq` | Pack sequences |
| `unpack_seq` | Unpack sequences |

## Quantization operators

| Operator | Description |
|----------|-------------|
| `fused_inv_rope_fp8_quant` | Fused inverse RoPE with FP8 quantization |
| `per_token_group_quant_fp8` | Per-token group FP8 quantization |
| `quant` | General quantization operators |

## DSA (Deep Sparse Attention) operators

| Operator | Description |
|----------|-------------|
| `bin_topk` | Binary top-K selection |
| `cp_gather_indexer_k_quant_cache` | Gather indexer K with quantized cache |
| `indexer_k_quant_and_cache` | Indexer K with quantization and cache |
| `indexer_k_tiled` | Tiled K indexing |
| `sparse_mla` | Sparse Multi-Latent Attention |

## FLA (Flash Linear Attention) operators

| Operator | Description |
|----------|-------------|
| `chunk` | Chunk-based attention computation |
| `chunk_delta_h` | Chunk delta-H computation |
| `chunk_fused_tail_vblock` | Fused tail V-block computation |
| `chunk_gated_delta_direct` | Gated delta rule with direct computation |
| `chunk_gated_delta_rule` | Gated delta rule computation |
| `chunk_kda` | Chunk KDA (Kernelized Delta Attention) computation |
| `chunk_o` | Chunk output computation |
| `chunk_scaled_dot_kkt` | Chunk scaled dot product KKT |
| `cumsum` | Cumulative sum |
| `fused_cumsum_kkt_solve_tril` | Fused cumsum KKT solve with lower triangular |
| `fused_recurrent` | Fused recurrent computation |
| `index` | Indexing operations |
| `solve_tril` | Lower triangular system solve |
| `wy_fast` | Fast WY representation computation |

## MHC (Multi-Head Compatibility) operators

| Operator | Description |
|----------|-------------|
| `hc_head_fused_kernel` | Head-channel fused kernel |
| `hc_split_sinkhorn` | Head-channel split with Sinkhorn |
| `mhc_bwd` | MHC backward pass |
| `mhc_post` | MHC post-processing |
| `mhc_pre` | MHC pre-processing |

## RWKV operators

| Operator | Description |
|----------|-------------|
| `rwkv_ka_fusion` | RWKV key-attention fusion kernel |
| `rwkv_mm_sparsity` | RWKV matrix multiplication sparsity kernel |
