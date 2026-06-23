# 安装 TransformerEngine-FL

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
