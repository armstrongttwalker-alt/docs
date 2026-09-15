# End-to-End Use Case: GRPO Training with verl-FL

This guide provides step-by-step instructions for running end-to-end GRPO training of Qwen3-0.6B on the GSM8K dataset across different hardware platforms using verl-FL.

---

## NVIDIA E2E GRPO Training

End-to-end GRPO training test on NVIDIA GPU environment. Model: Qwen3-0.6B, Dataset: GSM8K.

### Step 1: Pull Image and Create Container

Follow the [NVIDIA Docker setup](../getting_started/install.md#nvidia) in Quick Setup.

### Step 2: Prepare Data and Model

```bash
cd /workspace

# Download model
modelscope download --model Qwen/Qwen3-0.6B --local_dir ./Qwen3-0.6B

# Download dataset
mkdir gsm8k && cd gsm8k
wget "https://baai-flagscale.ks3-cn-beijing.ksyuncs.com/rl/datasets/gsm8k/train.parquet"
wget "https://baai-flagscale.ks3-cn-beijing.ksyuncs.com/rl/datasets/gsm8k/test.parquet"
```

### Step 3: Install FlagOS Software Stack

> **Note:** FlagCX is required. All other FlagOS components (FlagGems, vllm-plugin-FL, TransformerEngine-FL, Megatron-LM-FL) are optional.

**3.1 Install FlagCX (Required)**

```bash
cd /workspace
git clone https://github.com/flagos-ai/FlagCX.git
cd FlagCX
git submodule update --init --recursive
pip install . -v --no-build-isolation

# Post-install configuration
# export FLAGCX_PATH=/workspace/FlagCX/
```

**3.2 Install FlagGems (Optional)**

```bash
cd /workspace
pip install -U scikit-build-core>=0.11 pybind11 ninja cmake
git clone https://github.com/flagos-ai/FlagGems.git
cd FlagGems
pip install --no-build-isolation -v .
```

**3.3 Install vllm-plugin-FL (Optional)**

```bash
cd /workspace
## Option A: Install from PyPI
pip install vllm-plugin-fl==0.1.0+vllm0.13.0 --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple

## Option B: Install from source
git clone --branch v0.1.0+vllm0.13.0 https://github.com/flagos-ai/vllm-plugin-FL.git
cd vllm-plugin-fl
pip install --no-build-isolation -v .
```

**3.4 Install Megatron-LM-FL / TransformerEngine-FL (Optional)**

```bash
cd /workspace
## Option A: Install from PyPI
pip install transformer_engine==0.1.0+te2.9.0 --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple

## Option B: Install from source
git clone --branch v0.1.0+te2.9.0 https://github.com/flagos-ai/TransformerEngine-FL.git
cd TransformerEngine-FL
pip install --no-build-isolation -v .

cd /workspace
## Option A: Install from PyPI
pip install megatron_core==0.1.0+megatron0.15.0rc7 --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple

## Option B: Install from source
git clone --branch v0.1.0+megatron0.15.0rc7 https://github.com/flagos-ai/Megatron-LM-FL.git
cd Megatron-LM-FL
pip install --no-build-isolation -v .
```

### Step 4: Install verl-FL

```bash
cd /workspace
git clone --branch v0.2.0-rc2.post1 https://github.com/flagos-ai/verl-FL.git
cd verl-FL
pip install --no-build-isolation -v -e .
```

### Step 5: Modify Script and Run

Based on `examples/grpo_trainer/run_qwen3-0.6b_fl.sh`, modify model/data/FlagCX paths according to your actual setup (all paths below assume `/workspace` from the steps above):

```bash
#!/bin/bash
# FL Multi-Chip Support Version of run_qwen3-0.6b.sh
# This script demonstrates training with FL (FlagOS) multi-chip support
# including FlagGems operators, Transformer-Engine-FL, and FlagCX communication.
#
# Reference: docs/design/fl_multi_chip_support.md

set -x

# ============ Device Configuration ============
export CUDA_VISIBLE_DEVICES=4,5,6,7
export HYDRA_FULL_ERROR=1

# ============ FlagCX Communication Library ============
# export FLAGCX_PATH=/share/project/lizhiyu/FlagCX
# export PYTHONPATH=/share/project/gzy/FlagCX/plugin/torch:${PYTHONPATH}

# ============ FL Configuration via verl fl_config ============
# Note: Environment variables below are for reference only.
# In verl FL architecture, these are set dynamically by FLEnvManager
# based on fl_config YAML configuration.
export RAY_ACCEL_ENV_VAR_OVERRIDE_ON_ZERO=0
export VERL_ENGINE_DEVICE=flagos
# Training phase environment variables:
export TE_FL_PREFER=flagos  #flagos / vendor / reference    flagos
export TE_FL_PREFER_VENDOR=0    # Prefer vendor (legacy)    1 / 0   0
export TE_FL_STRICT=0   # Strict mode (no fallback) 1 / 0   0
# TE_FL_ALLOW_VENDORS=nvidia,amd    # Allowed vendors (whitelist)   nvidia,amd
# TE_FL_DENY_VENDORS=vendor_a   # Denied vendors (blacklist)    vendor_a
# TE_FL_PER_OP=rmsnorm_fwd=vendor:cuda|default
export VLLM_FL_FLAGOS_BLACKLIST="where_scalar_other,where_scalar_self,where_self,where_self_out,pad"
# Logging
export TEFL_LOG_LEVEL=DEBUG # / INFO / WARNING / ERROR  INF

# Rollout phase environment variables:
# export VLLM_PLUGINS=""
# export VLLM_FL_PREFER_ENABLED=true
# export VLLM_FL_PLATFORM=cuda # will cause error
# export VLLM_FL_PREFER=flagos
export USE_FLAGGEMS=true
export VLLM_FL_OOT_ENABLED=1
export USE_FLAGCX=1
# unset FLAGCX_PATH

export FLAGCX_PATH=/workspace/FlagCX/
export FLAGCX_LOG_LEVEL=DEBUG

## Key modifications below
DATA_DIR=/workspace/gsm8k/
MODEL_DIR=/workspace/Qwen3-0.6B

python3 -m verl.trainer.main_ppo \
    algorithm.adv_estimator=grpo \
    data.train_files=${DATA_DIR}/train.parquet \
    data.val_files=${DATA_DIR}/test.parquet \
    data.train_batch_size=64 \
    data.max_prompt_length=512 \
    data.max_response_length=1024 \
    data.filter_overlong_prompts=True \
    data.truncation='error' \
    actor_rollout_ref.model.path=${MODEL_DIR} \
    actor_rollout_ref.actor.optim.lr=1e-6 \
    actor_rollout_ref.model.use_remove_padding=True \
    actor_rollout_ref.actor.ppo_mini_batch_size=64 \
    actor_rollout_ref.actor.ppo_micro_batch_size_per_gpu=4 \
    actor_rollout_ref.actor.use_kl_loss=True \
    actor_rollout_ref.actor.kl_loss_coef=0.001 \
    actor_rollout_ref.actor.kl_loss_type=low_var_kl \
    actor_rollout_ref.actor.entropy_coeff=0 \
    actor_rollout_ref.model.enable_gradient_checkpointing=True \
    actor_rollout_ref.actor.fsdp_config.param_offload=False \
    actor_rollout_ref.actor.fsdp_config.optimizer_offload=False \
    actor_rollout_ref.rollout.log_prob_micro_batch_size_per_gpu=4 \
    actor_rollout_ref.rollout.tensor_model_parallel_size=1 \
    actor_rollout_ref.rollout.name=vllm \
    actor_rollout_ref.rollout.gpu_memory_utilization=0.4 \
    actor_rollout_ref.rollout.n=5 \
    actor_rollout_ref.ref.log_prob_micro_batch_size_per_gpu=4 \
    actor_rollout_ref.ref.fsdp_config.param_offload=True \
    algorithm.use_kl_in_reward=False \
    trainer.critic_warmup=0 \
    trainer.logger='["console"]' \
    trainer.project_name='verl_grpo_example_gsm8k_fl' \
    trainer.experiment_name='qwen3_0.6b_fl' \
    trainer.n_gpus_per_node=4 \
    trainer.nnodes=1 \
    trainer.save_freq=20 \
    trainer.test_freq=5 \
    trainer.use_legacy_worker_impl='disable' \
    +actor_rollout_ref.rollout.enable_sleep_mode=False \
    actor_rollout_ref.rollout.free_cache_engine=False \
    trainer.total_epochs=15 \
    $@
```

Once the script is modified, run:

```bash
bash examples/grpo_trainer/run_qwen3-0.6b_fl.sh
```

**Validation criteria:** Training outputs step information normally, no errors during the training process, and the reward metric shows a convergence trend.

---

## MetaX E2E GRPO Training

End-to-end GRPO training test on MetaX C500 environment. Model: Qwen3-0.6B, Dataset: GSM8K.

### Step 1: Pull Image and Create Container

Follow the [MetaX Docker setup](../getting_started/install.md#metax) in Quick Setup.

### Step 2: Prepare Data and Model

```bash
cd /workspace

# Download model
modelscope download --model Qwen/Qwen3-0.6B --local_dir ./Qwen3-0.6B

# Download dataset
mkdir gsm8k && cd gsm8k
wget "https://baai-flagscale.ks3-cn-beijing.ksyuncs.com/rl/datasets/gsm8k/train.parquet"
wget "https://baai-flagscale.ks3-cn-beijing.ksyuncs.com/rl/datasets/gsm8k/test.parquet"
```

### Step 3: Install FlagOS Software Stack

> **Note:** FlagCX is required. All other FlagOS components (FlagGems, vllm-plugin-FL, TransformerEngine-FL, Megatron-LM-FL) are optional.

**3.1 Install FlagCX (Required)**

```bash
cd /workspace
git clone https://github.com/flagos-ai/FlagCX.git
cd FlagCX
git checkout v0.9.0
git submodule update --init --recursive
make USE_METAX=1
export FLAGCX_PATH="$PWD"
cd plugin/torch/
FLAGCX_ADAPTOR=metax pip install . --no-build-isolation

# Post-install configuration
# export FLAGCX_PATH=/workspace/FlagCX/
```

**3.2 Install FlagGems (Optional)**

```bash
cd /workspace
pip install -U scikit-build-core>=0.11 pybind11 ninja cmake
git clone https://github.com/flagos-ai/FlagGems.git
cd FlagGems
git checkout v4.2.0
pip install --no-build-isolation -v .
```

**3.3 Install vllm-plugin-FL (Optional)**

```bash
cd /workspace
## Option A: Install from PyPI
pip install vllm-plugin-fl==0.1.0+vllm0.13.0 --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple

## Option B: Install from source
git clone --branch v0.1.0+vllm0.13.0 https://github.com/flagos-ai/vllm-plugin-FL.git
cd vllm-plugin-fl
pip install --no-build-isolation -v .

# Uninstall metax plugin to avoid conflicts
pip uninstall vllm-metax
```

**3.4 Install Megatron-LM-FL / TransformerEngine-FL (Optional)**

```bash
cd /workspace
## Install TransformerEngine-FL from source
pip install onnxscript  # Install dependency
wget https://baai-flagscale.ks3-cn-beijing.ksyuncs.com/rl/pkg/metax/transformer_engine_metax-2.9.0%2Bmaca3.3.0-cp310-cp310-linux_x86_64.whl
pip install transformer_engine_metax-2.9.0+maca3.3.0-cp310-cp310-linux_x86_64.whl
git clone --branch v0.1.0+te2.9.0 https://github.com/flagos-ai/TransformerEngine-FL.git
cd TransformerEngine-FL
TE_FL_SKIP_CUDA=1 pip install --no-build-isolation -v .

cd /workspace
## Option A: Install from PyPI
pip install megatron_core==0.1.0+megatron0.15.0rc7 --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple

## Option B: Install from source
git clone --branch v0.1.0+megatron0.15.0rc7 https://github.com/flagos-ai/Megatron-LM-FL.git
cd Megatron-LM-FL
pip install --no-build-isolation -v .
```

### Step 4: Install verl-FL

```bash
cd /workspace
git clone --branch v0.2.0-rc2.post1 https://github.com/flagos-ai/verl-FL.git
cd verl-FL
pip3 install nvtx
pip3 install --no-deps -e .
```

### Step 5: Modify Script and Run

Based on `examples/grpo_trainer/run_qwen3-0.6b_fl.sh`, modify model/data/FlagCX paths according to your actual setup (all paths below assume `/workspace` from the steps above):

```bash
#!/bin/bash
# FL Multi-Chip Support Version of run_qwen3-0.6b.sh
# This script demonstrates training with FL (FlagOS) multi-chip support
# including FlagGems operators, Transformer-Engine-FL, and FlagCX communication.
#
# Reference: docs/design/fl_multi_chip_support.md

set -x

# ============ MetaX Platform Environment ============
export CUDA_VISIBLE_DEVICES=0,1,2,3,4,5,6,7
export RAY_ACCEL_ENV_VAR_OVERRIDE_ON_ZERO=0
export VLLM_FL_FLAGOS_BLACKLIST="where_scalar_other,where_scalar_self,where_self,where_self_out,pad"
export VERL_ENGINE_DEVICE="flagos"
export USE_FLAGCX=1
export VLLM_FL_PREFER="vendor"
export VLLM_FL_PLATFORM="metax"
export LOGLEVEL="INFO"

# MetaX MACA SDK paths
export CUCC_PATH="/opt/maca/tools/cu-bridge"
export CUDA_PATH="/opt/maca/tools/cu-bridge"
export DEVINFO_ROOT="/opt/maca"
export LD_LIBRARY_PATH="/opt/maca/lib:/opt/maca/mxgpu_llvm/lib:/opt/mxdriver/lib:/opt/maca/ompi/lib:/opt/maca/ucx/lib:/opt/mxdriver/lib"
export MACA_CLANG="/opt/maca/mxgpu_llvm"
export MACA_CLANG_PATH="/opt/maca/mxgpu_llvm/bin"
export MACA_PATH="/opt/maca"
export PATH="/opt/conda/bin:/opt/conda/condabin:/opt/maca/tools/cu-bridge:/opt/maca/bin:/opt/maca/mxgpu_llvm/bin:/opt/maca/ompi/bin:/opt/maca/ucx/bin:/opt/mxdriver/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

# MetaX performance tuning
export CUDA_DEVICE_MAX_CONNECTIONS=1
export NVTE_FLASH_ATTN=1
export NVTE_FUSED_ATTN=0
export MACA_SMALL_PAGESIZE_ENABLE=1
export MCCL_MAX_NCHANNELS=18
export MCCL_P2P_LEVEL=SYS
export PYTORCH_ENABLE_SAME_RAND_CONF=multiprocessosr_count:114,maxthreads_per_multiprocessor:2048
export NVTE_ALLOW_NONDETERMINISTIC_ALGO=0

# MetaX network configuration
export GLOO_SOCKET_IFNAME=bond0
export MCCL_SOCKET_IFNAME=bond0
export MCCL_IB_HCA=mlx5_101,mlx5_102,mlx5_103,mlx5_104,mlx5_105,mlx5_106,mlx5_107,mlx5_108
export MCCL_PCIE_BUFFER_MODE=0

# FlagCX configuration for MetaX
export FLAGCX_P2P_LEVEL=SYS
export FLAGCX_GLOO_SOCKET_IFNAME=bond0
export FLAGCX_SOCKET_IFNAME=bond0
export FLAGCX_IB_HCA=mlx5_101,mlx5_102,mlx5_103,mlx5_104,mlx5_105,mlx5_106,mlx5_107,mlx5_108
export FLAGCX_MAX_NCHANNELS=18
export FLAGCX_ENABLE_TOPO_DETECT=TRUE
# ============ End MetaX Platform Environment ============

export HYDRA_FULL_ERROR=1

# ============ FlagCX Communication Library ============
export FLAGCX_PATH=/workspace/FlagCX/
export FLAGCX_LOG_LEVEL=DEBUG

# ============ FL Configuration ============
export TE_FL_PREFER=flagos
export TE_FL_PREFER_VENDOR=0
export TE_FL_STRICT=0
export TEFL_LOG_LEVEL=DEBUG

# Rollout phase environment variables:
export USE_FLAGGEMS=true
export VLLM_FL_OOT_ENABLED=1

## Key modifications below
DATA_DIR=/workspace/gsm8k/
MODEL_DIR=/workspace/Qwen3-0.6B

python3 -m verl.trainer.main_ppo \
    algorithm.adv_estimator=grpo \
    data.train_files=${DATA_DIR}/train.parquet \
    data.val_files=${DATA_DIR}/test.parquet \
    data.train_batch_size=64 \
    data.max_prompt_length=512 \
    data.max_response_length=1024 \
    data.filter_overlong_prompts=True \
    data.truncation='error' \
    actor_rollout_ref.model.path=${MODEL_DIR} \
    actor_rollout_ref.model.use_fused_kernels=False \
    actor_rollout_ref.actor.optim.lr=1e-6 \
    actor_rollout_ref.model.use_remove_padding=True \
    actor_rollout_ref.actor.ppo_mini_batch_size=64 \
    actor_rollout_ref.actor.ppo_micro_batch_size_per_gpu=8 \
    actor_rollout_ref.actor.use_kl_loss=True \
    actor_rollout_ref.actor.kl_loss_coef=0.001 \
    actor_rollout_ref.actor.kl_loss_type=low_var_kl \
    actor_rollout_ref.actor.entropy_coeff=0 \
    actor_rollout_ref.model.enable_gradient_checkpointing=True \
    actor_rollout_ref.actor.fsdp_config.param_offload=False \
    actor_rollout_ref.actor.fsdp_config.optimizer_offload=False \
    actor_rollout_ref.rollout.log_prob_micro_batch_size_per_gpu=4 \
    actor_rollout_ref.rollout.tensor_model_parallel_size=1 \
    actor_rollout_ref.rollout.name=vllm \
    actor_rollout_ref.rollout.gpu_memory_utilization=0.4 \
    actor_rollout_ref.rollout.n=5 \
    actor_rollout_ref.ref.log_prob_micro_batch_size_per_gpu=4 \
    actor_rollout_ref.ref.fsdp_config.param_offload=True \
    algorithm.use_kl_in_reward=False \
    trainer.critic_warmup=0 \
    trainer.logger='["console"]' \
    trainer.project_name='verl_grpo_example_gsm8k_fl' \
    trainer.experiment_name='qwen3_0.6b_fl' \
    trainer.n_gpus_per_node=4 \
    trainer.nnodes=1 \
    trainer.save_freq=20 \
    trainer.test_freq=5 \
    trainer.use_legacy_worker_impl='disable' \
    +actor_rollout_ref.rollout.enable_sleep_mode=False \
    actor_rollout_ref.rollout.free_cache_engine=False \
    trainer.total_epochs=15 \
    $@
```

Once the script is modified, run:

```bash
bash examples/grpo_trainer/run_qwen3-0.6b_fl.sh
```

**Validation criteria:** Training outputs step information normally, no errors during the training process, and the reward metric shows a convergence trend.

---
