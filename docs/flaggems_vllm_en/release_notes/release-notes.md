# Release Notes

This section includes the release information for FlagGems-vLLM.

## <version to be decided>

- **Added features**:
  - Initial release of FlagGems-vLLM as part of FlagOS. 
  - Implemented over 55 optimized operators organized into 13 categories for vLLM inference acceleration.
    - **Activation and gating operators**: `apply_repetition_penalties`, `geglu`, `gelu_and_mul`, `reglu`, `silu_and_mul`, `silu_and_mul_with_clamp`, `swiglu`, and backward variants (`dreglu`, `dgeglu`, `dswiglu`).
    - **Attention operators**: `apply_rotary_pos_emb`, `concat_and_cache_mla`, `flash_attn_varlen_func`, `flash_mla`, `flashmla_sparse`, `reshape_and_cache`, `reshape_and_cache_flash`, `rotary_embedding`, `sparse_attention`.
    - **Mixture of Experts (MoE)**: `fused_experts_impl`, `fused_moe`, `grouped_topk`, `moe_align_block_size`, `moe_sum`, `topk_softmax`.
    - **Linear and matrix operators**: `cutlass_scaled_mm`, `outer`, `weight_norm`, `weight_norm_interface`.
    - **Normalization operators**: `fused_add_rms_norm`, `instance_norm`, `skip_layernorm`.
    - **Reduction and utility**: `bincount`, `cross_entropy_loss`.
    - **DSA (Deep Sparse Attention)**: `bin_topk`, `indexer_k_tiled`, `sparse_mla`.
    - **FLA (Flash Linear Attention)**: `chunk`, `chunk_delta_h`, `chunk_o`, `chunk_scaled_dot_kkt`, `cumsum`, `fused_cumsum_kkt_solve_tril`, `fused_recurrent`, `index`, `solve_tril`, `wy_fast`.
    - **MHC (Multi-Head Compatibility)**: `mhc_bwd`, `mhc_post`, `mhc_pre`, `hc_head_fused_kernel`, `hc_split_sinkhorn`.
    - **RWKV operators**: `rwkv_ka_fusion`, `rwkv_mm_sparsity`.
  