# verl-FL 用户指南

## 概述

verl-FL 是 [verl](https://github.com/volcengine/verl) 的一个分支，旨在支持多种 AI 加速器。它基于 [FlagOS](https://github.com/flagos-ai) 构建，FlagOS 是一个统一的开源 AI 系统软件栈，集成了训练引擎 [Megatron-LM-FL](https://github.com/flagos-ai/Megatron-LM-FL)、[Transformer-Engine-FL](https://github.com/flagos-ai/TransformerEngine-FL) 以及推理引擎 [vllm-plugin-FL](https://github.com/flagos-ai/vllm-plugin-FL) 等关键组件。

verl（火山引擎大语言模型强化学习）是一个灵活、高效、生产可用的大语言模型（LLM）强化学习训练框架。

### 主要特性

- **多种 RL 算法**：PPO、GRPO、DAPO、DrGRPO、GMPO、SPPO、SPIN、RLOO、ReMax、REINFORCE++、PRIME 等
- **多后端训练**：训练支持 FSDP、FSDP2 和 Megatron-LM（通过 Megatron-LM-FL）；推理/采样支持 vLLM、SGLang 和 HF Transformers
- **多硬件支持**：通过平台抽象支持 NVIDIA（CUDA）、AMD（ROCm）、华为昇腾（NPU）
- **可扩展架构**：单控制器设计，使用 Ray 进行编排，可从单卡扩展到数千卡
- **高级功能**：多轮工具调用、VLM RL、序列打包、LoRA RL、专家并行、异步训练（完全异步/一步离策略）、RL 推测解码
- **模型支持**：包括 Qwen-3、Qwen-2.5、Llama3.1、Gemma2、DeepSeek（最高 671B）和 VLM 在内的 HuggingFace 模型

---

## 快速开始

### 环境要求

- Python >= 3.10
- CUDA >= 12.8

### Docker 安装（推荐）

```bash
docker pull verlai/verl:latest
```

### pip 安装

```bash
# 创建 conda 环境
conda create -n verl python=3.10
conda activate verl

# 安装支持 CUDA 12.8 的 PyTorch
pip install torch --index-url https://download.pytorch.org/whl/cu128

# 克隆并安装 verl-FL
git clone https://github.com/flagos-ai/verl-FL.git
cd verl-FL
pip install -e .

# 安装 vLLM 用于采样
pip install vllm>=0.8.5

# 安装 Flash Attention
pip install flash-attn
```

### 快速安装脚本

```bash
# 安装 vLLM、SGLang 和 Megatron-Core 后端
bash scripts/install_vllm_sglang_mcore.sh
```

### 训练后端

| 后端 | 用途 | 安装 |
| --- | --- | --- |
| **FSDP** | 默认，易于配置 | 随 PyTorch 提供 |
| **FSDP2** | 最新 PyTorch 分布式 | 随 PyTorch 提供 |
| **Megatron-LM** | 大规模训练 | 通过 Megatron-LM-FL |

### 采样后端

| 后端 | 用途 | 安装 |
| --- | --- | --- |
| **vLLM** | 高吞吐推理 | `pip install vllm>=0.8.5` |
| **SGLang** | 多轮、工具调用 | `pip install sglang==0.5.6` |
| **HF Transformers** | 简单，无额外依赖 | 已包含 |

---

## 安装

### 自定义环境配置

```bash
# 创建环境
conda create -n verl python=3.10
conda activate verl

# 安装 CUDA 12.8
conda install -c nvidia cuda-toolkit=12.8

# 安装 cuDNN
pip install nvidia-cudnn-cu12==9.10.1.2

# 安装 PyTorch
pip install torch --index-url https://download.pytorch.org/whl/cu128

# 安装 verl-FL
cd verl-FL
pip install -e .

# 安装 Apex（可选，用于 Megatron 后端）
pip install -v --disable-pip-version-check --no-cache-dir \
    --no-build-isolation --config-settings="--build-option=--cpp_ext" \
    --config-settings="--build-option=--cuda_ext" \
    git+https://github.com/NVIDIA/apex
```

### AMD ROCm 支持

verl-FL 通过 ROCm 支持 AMD GPU。详见仓库中的 `docs/amd_tutorial/` 目录获取详细配置说明。

### 昇腾 NPU 支持

verl-FL 支持华为昇腾 NPU。安装 NPU 特定依赖：

```bash
pip install -r requirements-npu.txt
```

详见仓库中的 `docs/ascend_tutorial/` 获取详细说明。

---

## RL 算法

### PPO（近端策略优化）

LLM 后训练的标准 RL 算法，采用 Actor-Critic 架构和 GAE（广义优势估计）。

关键配置：

```yaml
algorithm:
  kl_ctrl:
    type: fixed        # KL 散度控制
    kl_coef: 0.001
trainer:
  train_batch_size: 256
  ppo_mini_batch_size: 64
  ppo_epochs: 1
```

### GRPO（组相对策略优化）

无 Critic 算法，通过组分数估计基线而非学习价值函数。

关键配置：

```yaml
rollout:
  n: 8                    # 每个 prompt 的样本数
trainer:
  train_batch_size: 256
  ppo_mini_batch_size: 64
algorithm:
  loss_agg_mode: token     # 或 "seq" 用于序列级别
```

### DAPO（解耦对齐策略优化）

GRPO 的扩展，具有分离的裁剪 epsilon、动态采样和超长奖励塑形。

### 其他算法

- **GMPO**：几何平均策略优化，用于稳定训练
- **SPPO**：自博弈偏好优化
- **SPIN**：自博弈微调，使用在线 DPO 损失
- **DrGRPO**：带方差缩减的 GRPO

---

## 平台抽象

verl-FL 包含平台抽象层（`verl/plugin/platform/`），为多加速器支持提供硬件无关接口。

### 支持的平台

| 平台 | 设备 | 状态 |
| --- | --- | --- |
| CUDA | NVIDIA GPU | 完全支持 |
| NPU | 华为昇腾 | 完全支持 |
| CPU | CPU | 基础支持 |

### 添加新加速器

要为新加速器（如 XPU、ROCm、MLU）添加支持，请在 `verl/plugin/platform/` 中实现平台接口。可参考现有平台实现。

---

## 数据集格式

verl-FL 使用以下 RLHF 数据集模式：

```json
{
  "data_source": "数据集名称",
  "prompt": [
    {"role": "system", "content": "你是一个有帮助的助手。"},
    {"role": "user", "content": "2+2 等于多少？"}
  ],
  "ability": "math",
  "reward_model": {
    "style": "rule",
    "ground_truth": "4"
  }
}
```

字段说明：

- `data_source`：数据集标识符
- `prompt`：对话格式消息（system/user/assistant 角色）
- `ability`：任务类别标签
- `reward_model`：奖励配置（基于规则或基于模型）