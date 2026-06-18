# Install Megatron-LM-FL

You can install Megatron-LM-FL through one of the following methods:

## Docker (Recommended)

### CUDA

```bash
docker pull harbor.baai.ac.cn/flagscale/flagscale-train:dev-cu128-py3.12-20260319182856
docker run -itd --gpus all --shm-size=500g --name <name> harbor.baai.ac.cn/flagscale/flagscale-train:dev-cu128-py3.12-20260319182856 /bin/bash
docker exec -it <name> /bin/bash
conda activate flagscale-train
pip install flash-attn==2.8.3 --no-build-isolation
pip install upgrade wandb tensorboard
```

### MetaX

```bash
docker pull harbor.baai.ac.cn/flagscale/megatron-lm-with-te:202603231839
docker run -itd --gpus all --shm-size=500g --name <name> --ulimit nofile=65535:65535 --device=/dev/dri --device=/dev/mxcd harbor.baai.ac.cn/flagscale/megatron-lm-with-te:202603231839
conda activate base
```

## Install from source

```bash
git clone https://github.com/flagos-ai/Megatron-LM-FL.git
cd Megatron-LM-FL
git checkout <tag number>
pip install . --no-build-isolation --root-user-action=ignore
```

For an end-to-end training workflow using Megatron-LM-FL, TransformerEngine-FL, and FlagScale, see [End-to-End Use Case](../user_guide/e2e-use-case.md).
