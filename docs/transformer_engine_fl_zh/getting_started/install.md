# 安装 TransformerEngine-FL

## Docker 镜像（推荐）

TransformerEngine-FL 与 Megatron-LM-FL 共用同一 Docker 镜像：

| 平台 | 镜像 | 内容 |
|----------|-------|----------|
| NVIDIA GPU | `harbor.baai.ac.cn/flagos21-release/megatron-lm-fl:v0.2.0-rc2-nvidia` | torch 2.4.0a0, triton 3.0.0, trans-engine 2.14.0 |

```bash
docker pull harbor.baai.ac.cn/flagos21-release/megatron-lm-fl:v0.2.0-rc2-nvidia
```

适用于千亿参数模型预训练。

您可以通过以下方法之一安装 TransformerEngine-FL：

## 从 FlagOS 仓库直接安装

```bash
pip install transformer_engine==0.1.0+te2.9.0 --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple
```

## 从源码安装

```bash
git clone https://github.com/flagos-ai/TransformerEngine-FL.git
cd TransformerEngine-FL
git checkout <tag number>
git submodule update --init --recursive
MAX_JOBS=xxx pip install .
```

```{note}
此方式需要使用厂商提供的镜像。
```

有关使用 TransformerEngine-FL、Megatron-LM-FL 和 FlagScale 的端到端训练工作流，请参见[端到端用例：TransformerEngine-FL + Megatron-LM-FL + FlagScale](/e2e-use-case.md)。
