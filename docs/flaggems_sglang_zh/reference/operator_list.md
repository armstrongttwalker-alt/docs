# 算子列表

本页列出 FlagGems-sglang 导出的算子，来源于 `conf/operators.yaml` 以及 `src/flaggems_sglang/ops/*.py` 的 `__all__`。

通用算子集共 40 个，两个来源的算子名完全一致。每个算子均以 Triton 实现，并通过概览中所述的三级注册器按当前设备解析。

## 激活与门控

| 算子 | 描述 |
|----------|-------------|
| `gelu_and_mul` | 融合 GELU 门控与乘法：单次遍历计算 gelu(x[..., :d]) * x[..., d:]。具备步长感知能力，非连续的 gate/up 切分无需拷贝即可处理。 |
| `silu_and_mul` | 融合 SiLU 门控与乘法：单次遍历计算 silu(x[..., :d]) * x[..., d:]。针对解码与预填充阶段采用自适应分块策略进行优化。 |
| `silu_and_mul_masked` | 面向分组混合专家激活的带掩码 SiLU 门控与乘法：仅计算各分组掩码长度指示的有效 token 行。 |

## 注意力

| 算子 | 描述 |
|----------|-------------|
| `context_attention` | 打包变长序列上的预填充/上下文阶段缩放点积注意力：支持按批次起始偏移与长度划分的序列上的因果掩码。 |
| `decode_attention` | 针对分页 KV 缓存的解码阶段注意力：通过间接索引表为单 token 查询收集键和值。 |
| `decode_grouped_attention` | 解码阶段分页注意力的分组查询变体：一组查询头共享同一个 KV 头，以降低缓存带宽。 |
| `merge_state` | 使用 log-sum-exp 缩放合并前缀与后缀序列的注意力状态：用于连续批处理与分块注意力计算。 |

## Mamba 与 SSM

| 算子 | 描述 |
|----------|-------------|
| `bmm_chunk` | 面向 Mamba2 SSD 扫描的分块批量矩阵乘法：按块计算 C @ B^T 乘积，可选因果掩码。 |
| `causal_conv1d_fn` | 连续批处理序列上的通用深度可分离因果一维卷积：支持可选偏置与 SiLU 激活。 |
| `chunk_state` | Mamba2 分块 SSM 隐状态累加：按块将 x 与经衰减和 dt 缩放的状态投影矩阵累加。 |
| `chunk_state_varlen` | Mamba2 分块状态累加的变长版本：处理由累积序列长度界定的打包序列。 |
| `selective_state_update` | 单步 Mamba 选择性状态空间更新：以 float32 推进循环状态，支持可选 softplus dt、D 跳跃项与门控。 |
| `state_passing` | Mamba2 SSD 块间状态传递扫描：将每个块的最终状态从初始状态起依次向前传播。 |
| `mamba_layernorm_gated` | Mamba 块的门控层归一化/RMS 归一化：在归一化前或后施加分组归一化与 SiLU 门控。 |

## 分块累积求和

| 算子 | 描述 |
|----------|-------------|
| `chunk_cumsum` | Mamba 时间步与状态衰减项的分块累积求和：计算 dt（可选 softplus 与偏置）以及每块的累积 dA。 |
| `chunk_local_cumsum_scalar` | 对分块序列计算局部累积和：支持可选缩放与反向累积方向，兼容直接与转置两种计算方式。 |
| `chunk_local_cumsum_vector` | 逐 token、逐头向量门的块内累积求和：支持可选缩放与反向累积。 |

## 混合专家（MoE）

| 算子 | 描述 |
|----------|-------------|
| `fused_moe_gemm` | 融合混合专家 GEMM：将 token 路由与专家计算合并，为 MoE 模型执行按专家加权的矩阵乘法。 |
| `fused_moe_router_cudacore` | 在 CUDA 核心上执行的融合混合专家路由：计算路由 logits（可选 softcapping 与纠正偏置），再选取 top-k 专家。 |
| `fused_moe_router_tensorcore` | 融合混合专家路由的 Tensor Core 变体：与 CUDA 核心路由数学等价，针对 Tensor Core 吞吐进行调优。 |
| `moe_fused_gate` | 带专家分组选择的融合混合专家门控：对专家打分，施加偏置与 top-k 选择，并可选重归一化与重缩放。 |
| `moe_fused_mul_sum` | 融合的混合专家输出加权归约：将每个 top-k 专家输出按其路由权重缩放并对 top-k 求和，屏蔽被专家并行路由丢弃的槽位。 |
| `moe_sum_reduce` | 对混合专家层各专家输出求和：在 top-k 维度上归约并施加路由缩放因子。 |
| `per_group_transpose` | 面向 MoE 模型的按专家分组转置：按专家分配对张量块进行转置，以便高效计算。 |
| `sigmoid_gate_topk_renorm` | 带 top-k 选择与权重重归一化的 sigmoid 专家门控：支持可选偏置、共享专家处理以及路由/全局缩放。 |

## LoRA

| 算子 | 描述 |
|----------|-------------|
| `embedding_lora_a` | 面向分段多适配器批次的 LoRA A 投影（作用在 embedding 查表之上）：选择各分段的适配器权重并对收集到的行做投影。 |
| `gate_up_lora_b` | 面向分段多适配器批次、用于融合 gate/up 投影的 LoRA B 投影：展开低秩激活并累加到基础输出上。 |
| `qkv_lora_b` | 面向分段多适配器批次、用于融合 QKV 投影的 LoRA B 投影：将低秩激活展开到基础输出的 Q、K、V 各切片偏移上。 |
| `sgemm_lora_a` | 面向分段多适配器批次的 LoRA A 投影 GEMM：将激活收缩到适配器秩，可选择在投影堆叠上执行。 |
| `sgemm_lora_b` | 面向分段多适配器批次的 LoRA B 投影 GEMM：展开低秩激活并累加到基础输出上。 |

## 归一化

| 算子 | 描述 |
|----------|-------------|
| `fused_rmsnorm` | 带可学习权重的融合均方根层归一化：单次遍历计算 RMS 倒数并施加缩放。 |

## 量化

| 算子 | 描述 |
|----------|-------------|
| `per_token_group_quant_int8` | 逐 token、逐分组的对称 INT8 量化：输出量化值以及每个 token 分组一个缩放因子。 |
| `per_token_quant_int8` | 逐 token 对称 INT8 量化：输出量化值以及每个 token 行一个缩放因子。 |

## 旋转位置编码

| 算子 | 描述 |
|----------|-------------|
| `interleaved_rope` | 交错布局的旋转位置编码：按多段的时间、高度、宽度切分旋转相邻元素对。 |
| `mrope_fused` | 面向查询与键张量的多维旋转位置编码（mRoPE）：在时间、高度、宽度维度施加位置相关的旋转。 |
| `rotary_embedding` | 使用预计算 cos/sin 表的旋转位置编码：同时支持交错与半切分两种旋转布局。 |

## 采样

| 算子 | 描述 |
|----------|-------------|
| `apply_token_bitmask` | 将打包位掩码施加到 logits 上，用于语法约束解码：把不允许的词表 token 置为 -inf 予以屏蔽。 |
| `softcap_inplace_logits` | 原地 logit softcap：对完整 logit 张量计算 cap * tanh(x / cap)，在采样前限制 logit 幅度且不额外分配输出缓冲。 |
| `softcap_out` | 非原地 logit softcap：计算 cap * tanh(x / cap) 并返回 FP32 张量，每次启动使用确定性的形状启发式选择分块。 |

## 投机解码

| 算子 | 描述 |
|----------|-------------|
| `draft_topk1` | 投机解码的 top-1 草稿 token 选择：对每个位置取 argmax 草稿 token 并写入草稿 token 列。 |

## 多后端算子覆盖

除通用实现外，各芯片厂商还在 `src/flaggems_sglang/runtime/backend/_<vendor>/ops/` 下提供算子特化实现，各厂商的覆盖数量见[特性](../overview/features.md)中的后端表。厂商未特化的算子会自动回退到通用 Triton 实现。
