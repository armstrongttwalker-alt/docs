# 算子列表

本页列出了 FlagGems-vLLM 导出的算子，来源于 `src/flaggems_vllm/ops/__init__.py`。

FlagGems-vLLM 使用 Triton 编程语言提供了常用 vLLM 算子的优化实现。目前共导出以下 75 个算子：

## 激活与门控

| 算子 | 描述 |
|----------|-------------|
| `dgeglu` | GEGLU 激活的反向传播 |
| `dreglu` | ReGLU 激活的反向传播 |
| `dswiglu` | SwiGLU 激活的反向传播 |
| `geglu` | GEGLU（带 GELU 的门控线性单元）激活 |
| `gelu_and_mul` | GELU 激活与逐元素乘法组合 |
| `reglu` | ReGLU（带 ReLU 的门控线性单元）激活 |
| `silu_and_mul` | SiLU（Swish）激活与逐元素乘法组合 |
| `silu_and_mul_out` | SiLU 激活与乘法（非原地变体） |
| `silu_and_mul_with_clamp` | SiLU 激活与乘法及截断 |
| `silu_and_mul_with_clamp_out` | SiLU 激活与乘法及截断（非原地变体） |
| `swiglu` | SwiGLU（带 SiLU 的门控线性单元）激活 |

## 注意力

| 算子 | 描述 |
|----------|-------------|
| `apply_rotary_pos_emb` | 应用旋转位置编码 |
| `concat_and_cache_mla` | MLA（多潜在注意力）的拼接与缓存 |
| `flash_attention_forward` | FlashAttention 前向传播 |
| `flash_attn_varlen_func` | 变长序列的 FlashAttention |
| `flash_attn_varlen_opt_func` | 变长序列的优化 FlashAttention |
| `flash_mla` | Flash 多潜在注意力 |
| `flash_mla_sparse_fwd` | 稀疏 Flash MLA 前向传播 |
| `flash_mla_with_kvcache` | 带 KV 缓存支持的 Flash MLA |
| `reshape_and_cache` | KV 缓存的重塑与缓存 |
| `reshape_and_cache_flash` | FlashAttention 的重塑与缓存 |
| `sparse_attn_triton` | 通过 Triton 实现的稀疏注意力计算 |

## DeepSeek V4 注意力

| 算子 | 描述 |
|----------|-------------|
| `combine_topk_swa_indices` | 组合 DeepSeek V4 的 top-K 和滑动窗口注意力索引 |
| `compute_global_topk_indices_and_lens` | 计算 DeepSeek V4 的全局 top-K 索引和长度 |
| `dequantize_and_gather_k_cache` | DeepSeek V4 的 K 缓存反量化与收集 |
| `fused_q_kv_rmsnorm` | DeepSeek V4 的融合 Q/KV RMSNorm |
| `fused_deepseek_v4_qnorm_rope_kv_rope_quant_insert` | DeepSeek V4 的融合 Q-norm、RoPE、KV-RoPE、量化与插入 |

## 混合专家（MoE）

| 算子 | 描述 |
|----------|-------------|
| `dispatch_fused_moe_kernel` | 分发融合 MoE 内核 |
| `fused_experts_impl` | 融合 MoE 专家实现 |
| `grouped_topk` | MoE 路由的分组 top-K 选择 |
| `inplace_fused_experts` | 原地融合 MoE 专家 |
| `invoke_fused_moe_triton_kernel` | 调用融合 MoE Triton 内核 |
| `moe_align_block_size` | MoE 块大小对齐 |
| `moe_align_block_size_triton` | MoE 块大小对齐（Triton 变体） |
| `moe_sum` | MoE 专家输出求和 |
| `outplace_fused_experts` | 非原地融合 MoE 专家 |
| `top_k_per_row_decode` | 解码阶段的逐行 top-K |
| `top_k_per_row_prefill` | 预填充阶段的逐行 top-K |
| `topk_softmax` | MoE 门控的 top-K softmax |
| `topk_softplus_sqrt` | MoE 门控的 top-K softplus 与 sqrt |

## 线性与矩阵

| 算子 | 描述 |
|----------|-------------|
| `cutlass_scaled_mm` | 通过 CUTLASS 实现的缩放矩阵乘法 |
| `mul` | 逐元素乘法 |
| `mul_` | 逐元素乘法（原地） |
| `mv` | 矩阵-向量乘法 |
| `outer` | 两个向量的外积 |

## 归一化

| 算子 | 描述 |
|----------|-------------|
| `add_rms_norm` | 加法与 RMSNorm |
| `fused_add_rms_norm` | 融合加法与 RMSNorm |
| `instance_norm` | 实例归一化 |
| `skip_layer_norm` | 跳跃连接与 LayerNorm |
| `weight_norm` | 权重归一化 |
| `weight_norm_interface` | 权重归一化接口 |
| `weight_norm_interface_backward` | 权重归一化接口反向传播 |

## 归约与工具

| 算子 | 描述 |
|----------|-------------|
| `apply_repetition_penalties` | 在生成过程中应用重复惩罚 |
| `bincount` | 统计每个值的频率 |
| `cross_entropy_loss` | 交叉熵损失计算 |
| `pack_seq_triton` | 打包序列 |
| `unpack_seq_triton` | 解包序列 |

## 量化

| 算子 | 描述 |
|----------|-------------|
| `fused_indexer_q_rope_quant` | 融合索引器 Q 与 RoPE 和量化 |
| `fused_inv_rope_fp8_quant` | 融合逆 RoPE 与 FP8 量化 |
| `per_token_group_quant_fp8` | 逐 token 分组 FP8 量化 |

## DSA — 深度稀疏注意力

| 算子 | 描述 |
|----------|-------------|
| `bucket_sort_topk` | 桶排序 top-K 选择 |
| `cp_gather_indexer_k_quant_cache` | 收集索引器 K 与量化缓存 |
| `indexer_k_quant_and_cache` | 索引器 K 量化与缓存 |

## FLA — Flash 线性注意力

| 算子 | 描述 |
|----------|-------------|
| `chunk_gated_delta_rule` | 门控 delta 规则计算 |
| `chunk_gated_delta_rule_fwd` | 门控 delta 规则前向传播 |
| `fused_recurrent_gated_delta_rule_fwd` | 融合循环门控 delta 规则前向传播 |

## MHC — 多头兼容性

| 算子 | 描述 |
|----------|-------------|
| `hc_head_fused_kernel` | 头-通道融合内核 |
| `hc_head_fused_kernel_ref` | 头-通道融合内核（参考实现） |
| `mhc_bwd` | MHC 反向传播 |
| `mhc_bwd_ref` | MHC 反向传播（参考实现） |
| `mhc_post` | MHC 后处理 |
| `mhc_pre` | MHC 预处理 |
| `sinkhorn_forward` | Sinkhorn 前向计算 |

## RWKV

| 算子 | 描述 |
|----------|-------------|
| `rwkv_ka_fusion` | RWKV 键-注意力融合内核 |
| `rwkv_mm_sparsity` | RWKV 矩阵乘法稀疏性内核 |
