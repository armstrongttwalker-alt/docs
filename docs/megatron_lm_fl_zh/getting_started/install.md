# 安装 Megatron-LM-FL

您可以通过以下方法之一安装 Megatron-LM-FL：

## Docker（推荐）

### CUDA

```bash
docker pull harbor.baai.ac.cn/flagscale/flagscale-train:dev-cu128-py3.12-20260319182856
docker run -itd --gpus all --shm-size=500g --name <name> harbor.baai.ac.cn/flagscale/flagscale-train:dev-cu128-py3.12-20260319182856 /bin/bash
docker exec -it <name> /bin/bash
conda activate flagscale-train
pip install flash-attn==2.8.3 --no-build-isolation
```

## 从源码安装

```bash
git clone https://github.com/flagos-ai/Megatron-LM-FL.git
cd Megatron-LM-FL
git checkout <tag number>
pip install . --no-build-isolation --root-user-action=ignore
```

有关使用 Megatron-LM-FL、TransformerEngine-FL 和 FlagScale 的端到端训练工作流，请参见[端到端用例](../user_guide/e2e-use-case.md)。
