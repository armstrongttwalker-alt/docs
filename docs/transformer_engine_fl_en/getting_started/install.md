# Install TransformerEngine-FL

## Docker Images (Recommended)

TransformerEngine-FL shares the same Docker image with Megatron-LM-FL:

| Platform | Image | Contents |
|----------|-------|----------|
| NVIDIA GPU | `harbor.baai.ac.cn/flagos21-release/megatron-lm-fl:v0.2.0-rc2-nvidia` | torch 2.4.0a0, triton 3.0.0, trans-engine 2.14.0 |

```bash
docker pull harbor.baai.ac.cn/flagos21-release/megatron-lm-fl:v0.2.0-rc2-nvidia
```

Suitable for 100B+ parameter model pre-training.

You can install TransformerEngine-FL through one of the following methods:

## Direct install from FlagOS Repository

```bash
pip install transformer_engine==0.1.0+te2.9.0 --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple
```

## Install from source

```bash
git clone https://github.com/flagos-ai/TransformerEngine-FL.git
cd TransformerEngine-FL
git checkout <tag number>
git submodule update --init --recursive
MAX_JOBS=xxx pip install .
```

```{note}
This requires the image from the vendors. 
```

For an end-to-end training workflow using TransformerEngine-FL, Megatron-LM-FL, and FlagScale, see [End-to-End Use Case: TransformerEngine-FL + Megatron-LM-FL + FlagScale](/e2e-use-case.md).
