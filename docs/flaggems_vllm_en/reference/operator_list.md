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

## Attention operators

| Operator | Description |
|----------|-------------|
| `apply_rotary_pos_emb` | Apply rotary position embeddings |
| `concat_and_cache_mla` | Concatenate and cache for MLA (Multi-Latent Attention) |
| `flash_attn_varlen_func` | FlashAttention with variable-length sequences |
| `flash_mla` | Flash Multi-Latent Attention |
| `flashmla_sparse` | Sparse Flash Multi-Latent Attention |
| `reshape_and_cache` | Reshape and cache KV cache |
| `reshape_and_cache_flash` | Reshape and cache for FlashAttention |
| `rotary_embedding` | Rotary positional embedding |
| `sparse_attention` | Sparse attention computation |

## Mixture of Experts (MoE) operators

| Operator | Description |
|----------|-------------|
| `fused_experts_impl` | Fused MoE experts implementation |
| `fused_moe` | Fused Mixture of Experts operator |
| `grouped_topk` | Grouped top-K selection for MoE routing |
| `moe_align_block_size` | MoE block size alignment |
| `moe_sum` | MoE expert output summation |
| `topk_softmax` | Top-K with softmax for MoE gating |

## Linear and matrix operators

| Operator | Description |
|----------|-------------|
| `cutlass_scaled_mm` | Scaled matrix multiplication via CUTLASS |
| `outer` | Outer product of two vectors |
| `weight_norm` | Weight normalization |
| `weight_norm_interface` | Weight normalization interface |

## Normalization operators

| Operator | Description |
|----------|-------------|
| `fused_add_rms_norm` | Fused addition with RMSNorm |
| `instance_norm` | Instance normalization |
| `skip_layernorm` | Skip connection with LayerNorm |

## Reduction and utility operators

| Operator | Description |
|----------|-------------|
| `bincount` | Count frequency of each value |
| `cross_entropy_loss` | Cross-entropy loss computation |

## Quantization operators

| Operator | Description |
|----------|-------------|
| `quant` | Quantization operators |

## DSA (Deep Sparse Attention) operators

| Operator | Description |
|----------|-------------|
| `bin_topk` | Binary top-K selection |
| `indexer_k_tiled` | Tiled K indexing |
| `sparse_mla` | Sparse Multi-Latent Attention |

## FLA (Flash Linear Attention) operators

| Operator | Description |
|----------|-------------|
| `chunk` | Chunk-based attention computation |
| `chunk_delta_h` | Chunk delta-H computation |
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
| `mhc_bwd` | MHC backward pass |
| `mhc_post` | MHC post-processing |
| `mhc_pre` | MHC pre-processing |
| `hc_head_fused_kernel` | Head-channel fused kernel |
| `hc_split_sinkhorn` | Head-channel split with Sinkhorn |

## RWKV operators

| Operator | Description |
|----------|-------------|
| `rwkv_ka_fusion` | RWKV key-attention fusion kernel |
| `rwkv_mm_sparsity` | RWKV matrix multiplication sparsity kernel |

