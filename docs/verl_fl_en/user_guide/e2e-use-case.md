# End-to-End Use Case: GRPO Training with verl-FL

This guide provides step-by-step instructions for running end-to-end GRPO training of Qwen3-0.6B on the GSM8K dataset across different hardware platforms using verl-FL.

---

## NVIDIA E2E GRPO Training

This example runs GRPO training on NVIDIA GPUs using the pre-built Docker image.

### Step 1: Pull Image and Create Container

```bash
docker pull harbor.baai.ac.cn/flagos21-release/verl-fl:v0.2.0-rc2-nvidia

docker_image=harbor.baai.ac.cn/flagos21-release/verl-fl:v0.2.0-rc2-nvidia
docker_name=verl_test
sudo docker run -itd \
    --name ${docker_name} \
    --privileged \
    --network=host \
    --ipc=host \
    --device=/dev/infiniband \
    --pid=host \
    --cap-add=ALL \
    --shm-size 512G \
    --ulimit memlock=-1 \
    --gpus all \
    -v /dev/:/dev/ \
    -v /usr/src/:/usr/src/ \
    -v /lib/modules/:/lib/modules/ \
    -w /workspace \
    ${docker_image} \
    /bin/bash

docker exec -it verl_test bash
```

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

### Step 3: Run Training

Create a run script based on `examples/grpo_trainer/run_qwen3-0.6b_fl.sh`:

```bash
#!/bin/bash
set -x

# Device Configuration
export CUDA_VISIBLE_DEVICES=4,5,6,7
export HYDRA_FULL_ERROR=1

# FlagCX
export FLAGCX_PATH=/workspace/FlagCX/
export FLAGCX_LOG_LEVEL=DEBUG

# FL Configuration
export RAY_ACCEL_ENV_VAR_OVERRIDE_ON_ZERO=0
export VERL_ENGINE_DEVICE=flagos
export TE_FL_PREFER=flagos
export TE_FL_PREFER_VENDOR=0
export TE_FL_STRICT=0
export VLLM_FL_FLAGOS_BLACKLIST="where_scalar_other,where_scalar_self,where_self,where_self_out,pad"
export TEFL_LOG_LEVEL=DEBUG
export USE_FLAGGEMS=true
export VLLM_FL_OOT_ENABLED=1
export USE_FLAGCX=1

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

```bash
bash examples/grpo_trainer/run_qwen3-0.6b_fl.sh
```

**Expected result:** Training outputs step information normally, no errors, and the reward metric shows a convergence trend.

---

## MetaX E2E GRPO Training

This example runs GRPO training on MetaX C500/C550 hardware using the pre-built Docker image.

### Step 1: Pull Image and Create Container

```bash
docker pull harbor.baai.ac.cn/flagos21-release/verl-fl:v0.2.0-rc2-metax

docker_image=harbor.baai.ac.cn/flagos21-release/verl-fl:v0.2.0-rc2-metax
docker run -d -t --net=host --uts=host --ipc=host --privileged=true \
  --group-add video --shm-size 100gb --ulimit memlock=-1 \
  --security-opt seccomp=unconfined --security-opt apparmor=unconfined \
  --device=/dev/dri --device=/dev/mxcd --device=/dev/infiniband \
  -v /nfs/dh:/nfs/dh --name verl_fl_test \
  ${docker_image} bash

docker exec -it verl_fl_test bash
```

### Step 2: Prepare Data and Model

```bash
cd /workspace
modelscope download --model Qwen/Qwen3-0.6B --local_dir ./Qwen3-0.6B
mkdir gsm8k && cd gsm8k
wget "https://baai-flagscale.ks3-cn-beijing.ksyuncs.com/rl/datasets/gsm8k/train.parquet"
wget "https://baai-flagscale.ks3-cn-beijing.ksyuncs.com/rl/datasets/gsm8k/test.parquet"
```

### Step 3: Run Training

```bash
#!/bin/bash
set -x

# MetaX Platform Environment
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

export HYDRA_FULL_ERROR=1
export FLAGCX_PATH=/workspace/FlagCX/
export FLAGCX_LOG_LEVEL=DEBUG
export TE_FL_PREFER=flagos
export TE_FL_PREFER_VENDOR=0
export TE_FL_STRICT=0
export TEFL_LOG_LEVEL=DEBUG
export USE_FLAGGEMS=true
export VLLM_FL_OOT_ENABLED=1

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

**Expected result:** Training outputs step information normally, no errors, and the reward metric shows a convergence trend.

---

## MUSA Heterogeneous Training (NVIDIA + Moore Threads)

This setup runs heterogeneous distributed GRPO training across NVIDIA GPU and Moore Threads MUSA nodes via FlagCX. One node runs actor/critic (NVIDIA, FSDP), the other runs rollout (Moore Threads MUSA, vLLM).

### Environment Requirements

- **NVIDIA node:** base image `nvidia/cuda:12.9.1-devel-ubuntu22.04`; Python 3.10; manually install: torch 2.9.0+cu129, vllm 0.12.0, vllm-plugin-FL, TransformerEngine-FL, Megatron-LM-FL, FlagCX, Ray, verl-FL
- **MUSA node:** base image `registry.mthreads.com/presale/devtech/vllm_plugin_fix:20260327hg` (includes torch_musa, MUSA toolkit, vllm-plugin-FL); Python 3.10; manually install: FlagCX, Ray, verl-FL
- **Both nodes:** Python 3.10; InfiniBand for cross-node communication
- **Model:** Qwen3-0.6B
- **Dataset:** GSM8K (`train.parquet` / `test.parquet`)

### Step 1: Start Ray Cluster

On the MUSA node (head, handles rollout):

```bash
export RAY_EXPERIMENTAL_NOSET_MUSA_VISIBLE_DEVICES=1
export MUSA_VISIBLE_DEVICES=0,1,2,3,4,5,6,7
export MCCL_NET_GDR_LEVEL=2
export MCCL_IB_HCA=mlx5_bond_0
export FLAGCX_PATH=/workspace/FlagCX
export USE_FLAGCX=1
export FLAGCX_IB_HCA=mlx5

apt install -y rdma-core libibverbs1 libibverbs-dev ibverbs-utils

ray start --head --port=6379 --node-ip-address=<MUSA_NODE_IP> --num-gpus=8
```

On the NVIDIA node (worker, handles actor/critic):

```bash
export FLAGCX_PATH=/workspace/FlagCX
export USE_FLAGCX=1
export FLAGCX_LOG_LEVEL=DEBUG

ray start --address='<MUSA_NODE_IP>:6379' --node-ip-address=<NVIDIA_NODE_IP> --num-gpus=8
```

### Step 2: Launch Heterogeneous GRPO Training

Edit `config/one_step_off_ppo_trainer.yaml` to set data and model paths:

```yaml
data:
  train_files: <path/to/gsm8k/train.parquet>
  val_files: <path/to/gsm8k/test.parquet>

actor_rollout_ref:
  model:
    path: <path/to/Qwen3-0.6B>
```

Run on the NVIDIA (worker) node:

```bash
TORCH_COMPILE_DISABLE=1 RAY_DEDUP_LOGS=0 HYDRA_FULL_ERROR=1 \
FLAGCX_PATH=/workspace/FlagCX USE_FLAGCX=1 FLAGCX_LOG_LEVEL=DEBUG \
CUDA_VISIBLE_DEVICES=0,1,2,3,4,5,6,7 RAY_ACCEL_ENV_VAR_OVERRIDE_ON_ZERO=0 \
python3 -m recipe.one_step_off_policy.main_ppo \
    --config-path=config \
    --config-name='one_step_off_ppo_trainer.yaml' \
    actor_rollout_ref.actor.strategy=fsdp2 \
    actor_rollout_ref.actor.ppo_micro_batch_size_per_gpu=4 \
    actor_rollout_ref.actor.ppo_mini_batch_size=64 \
    actor_rollout_ref.rollout.name="vllm" \
    actor_rollout_ref.rollout.log_prob_micro_batch_size_per_gpu=4 \
    actor_rollout_ref.rollout.tensor_model_parallel_size=1 \
    +actor_rollout_ref.rollout.enable_sleep_mode=False \
    actor_rollout_ref.rollout.free_cache_engine=False \
    actor_rollout_ref.rollout.calculate_log_probs=True \
    +actor_rollout_ref.model.override_config.attn_implementation=eager \
    critic.strategy=fsdp2 \
    actor_rollout_ref.hybrid_engine=False \
    trainer.nnodes=1 \
    trainer.logger='["console"]' \
    trainer.n_gpus_per_node=8 \
    rollout.nnodes=1 \
    rollout.n_gpus_per_node=8 \
    2>&1 | tee onestep_hetero.log
```

### (Optional) FlagCX Heterogeneous Communication Test

Before running full E2E training, verify cross-node FlagCX communication independently. This does not require Ray or verl-FL.

On the MUSA node (rank 0, master):

```bash
export FLAGCX_DEBUG=INFO
export FLAGCX_DEBUG_SUBSYS=ALL
export FLAGCX_SOCKET_IFNAME=<MUSA_IB_IFNAME>
export MUSA_VISIBLE_DEVICES=0,1,2,3,4,5,6,7
export FLAGCX_IB_HCA=mlx5
export FLAGCX_ENABLE_TOPO_DETECT=TRUE

torchrun --nproc_per_node 8 --nnodes=2 --node_rank=0 \
    --master_addr=<MUSA_NODE_IP> --master_port=8122 \
    example.py
```

On the NVIDIA node (rank 1):

```bash
export FLAGCX_DEBUG=INFO
export FLAGCX_DEBUG_SUBSYS=ALL
export FLAGCX_SOCKET_IFNAME=<NVIDIA_IB_IFNAME>
export CUDA_VISIBLE_DEVICES=0,1,2,3,4,5,6,7
export FLAGCX_IB_HCA=mlx5
export FLAGCX_ENABLE_TOPO_DETECT=TRUE

torchrun --nproc_per_node 8 --nnodes=2 --node_rank=1 \
    --master_addr=<MUSA_NODE_IP> --master_port=8122 \
    example.py
```

Expected: `example.py` (from the [FlagCX](https://github.com/FlagOpen/FlagCX) repo) completes without error; allreduce results match on both sides.

**Expected result for full training:** FlagCX cross-node communication established; training runs without crash; `critic/score/mean` > 0 throughout; `rollout_corr/log_ppl_diff` < 0.005 (training vs rollout PPL consistent).
