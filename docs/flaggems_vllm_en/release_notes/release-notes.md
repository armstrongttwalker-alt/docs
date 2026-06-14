# Release Notes

This section includes the release information for FlagGems-vLLM.

## v0.1.0

- **Added features**:
  - Initial release of FlagGems-vLLM as part of FlagOS.
  - Implemented over 80 optimized operators organized into 14 categories for vLLM inference acceleration.
    - **Activation and gating operators**: `apply_repetition_penalties`, `geglu`, `gelu_and_mul`, `reglu`, `silu_and_mul`, `silu_and_mul_with_clamp`, `swiglu`, `tanh`, and backward variants (`dreglu`, `dgeglu`, `dswiglu`).
    - **Attention operators**: `apply_rotary_pos_emb`, `concat_and_cache_mla`, `flash_attn_varlen_func`, `flash_mla`, `flash_mla_with_kvcache`, `flashmla_sparse`, `reshape_and_cache`, `reshape_and_cache_flash`, `rotary_embedding`, `sparse_attention`.
    - **DeepSeek V4 Attention operators**: `deepseek_v4_attention_combine_topk_swa_indices`, `deepseek_v4_attention_compute_global_topk_indices_and_lens`, `deepseek_v4_attention_dequantize_and_gather_k_cache`, `deepseek_v4_attention_fused_q_kv_rmsnorm`, `fused_deepseek_v4_qnorm_rope_kv_rope_quant_insert`.
    - **Mixture of Experts (MoE)**: `fused_experts_impl`, `fused_marlin_moe`, `fused_moe`, `grouped_topk`, `moe_align_block_size`, `moe_sum`, `top_k_per_row_decode`, `top_k_per_row_prefill`, `topk_softmax`, `topk_softplus_sqrt`.
    - **Linear and matrix operators**: `cutlass_scaled_mm`, `mul`, `mv`, `outer`, `weight_norm`, `weight_norm_interface`, `weightnorm`.
    - **Normalization operators**: `add_rms_norm`, `fused_add_rms_norm`, `instance_norm`, `skip_layernorm`.
    - **Reduction and utility**: `bincount`, `cross_entropy_loss`, `pack_seq`, `unpack_seq`.
    - **Quantization operators**: `fused_inv_rope_fp8_quant`, `per_token_group_quant_fp8`.
    - **DSA (Deep Sparse Attention)**: `bin_topk`, `cp_gather_indexer_k_quant_cache`, `indexer_k_quant_and_cache`, `indexer_k_tiled`, `sparse_mla`.
    - **FLA (Flash Linear Attention)**: `chunk`, `chunk_delta_h`, `chunk_fused_tail_vblock`, `chunk_gated_delta_direct`, `chunk_gated_delta_rule`, `chunk_kda`, `chunk_o`, `chunk_scaled_dot_kkt`, `cumsum`, `fused_cumsum_kkt_solve_tril`, `fused_recurrent`, `index`, `solve_tril`, `wy_fast`.
    - **MHC (Multi-Head Compatibility)**: `hc_head_fused_kernel`, `hc_split_sinkhorn`, `mhc_bwd`, `mhc_post`, `mhc_pre`.
    - **RWKV operators**: `rwkv_ka_fusion`, `rwkv_mm_sparsity`.
