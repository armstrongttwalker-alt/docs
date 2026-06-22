# 安装 FlagScale

安装前请先阅读[要求](requirements.md)。

## 环境搭建

### 1. 安装后端

#### 推理 / 服务后端

建议使用最新版本的 flagscale-inference 镜像。

```{code-block} shell
docker pull harbor.baai.ac.cn/flagscale/flagscale-inference:dev-cu128-py3.12-20260302102033
docker run -itd --privileged --gpus all --net=host --ipc=host --device=/dev/infiniband --shm-size 512g --ulimit memlock=-1 --name <name>  harbor.baai.ac.cn/flagscale/flagscale-inference:dev-cu128-py3.12-20260302102033
docker exec -it <name> /bin/bash
conda activate flagscale-inference
```

vLLM：

```{code-block} shell
pip install vllm==0.13.0
```

vLLM-plugin-FL：

```{code-block} shell
pip install vllm-plugin-fl==0.1.0+vllm0.13.0 --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple
```

更多详情请参见 [vllm-plugin-FL](https://github.com/flagos-ai/vllm-plugin-FL)。

FlagGems：

```{code-block} shell
pip install -U scikit-build-core==0.11 pybind11 ninja cmake
git clone https://github.com/flagos-ai/FlagGems
cd FlagGems
pip install --no-build-isolation .
```

更多详情请参见 [FlagGems](https://github.com/flagos-ai/FlagGems)。

#### 训练后端

建议使用最新版本的 flagscale-train 镜像。

```{code-block} shell
docker pull harbor.baai.ac.cn/flagscale/flagscale-train:dev-cu128-py3.12-20260319182856
docker run -itd --gpus all --shm-size=500g --name <name>  harbor.baai.ac.cn/flagscale/flagscale-train:dev-cu128-py3.12-20260319182856 /bin/bash
docker exec -it <name> /bin/bash
conda activate flagscale-train
```

Megatron-LM-FL：

```{code-block} shell
pip install megatron_core==0.1.0+megatron0.15.0rc7 --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple
```

更多详情请参见 [Megatron-LM-FL](https://github.com/flagos-ai/Megatron-LM-FL)。

TransformerEngine-FL：

```{code-block} shell
pip install transformer_engine==0.1.0+te2.9.0 --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple
```

更多详情请参见 [TransformerEngine-FL](https://github.com/flagos-ai/TransformerEngine-FL)。

#### 强化学习后端

建议使用最新版本的 flagscale-train 镜像。

```{code-block} shell
docker pull harbor.baai.ac.cn/flagscale/flagscale-train:dev-cu128-py3.12-20260319182856
docker run -itd --gpus all --shm-size=500g --name <name>  harbor.baai.ac.cn/flagscale/flagscale-train:dev-cu128-py3.12-20260319182856 /bin/bash
docker exec -it <name> /bin/bash
conda activate flagscale-train
```

verl-FL：

```{code-block} shell
pip install verl==0.1.0+verl0.7.0 --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple
```

更多详情请参见 [veRL-FL](https://github.com/flagos-ai/verl-FL.git) 获取完整安装说明。

### 2. 安装 FlagScale

**方式一：通过 pip 安装**

```{code-block} shell
pip install flagscale --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple
```

**方式二：从源码安装**

```{code-block} shell
git clone https://github.com/flagos-ai/FlagScale.git
cd FlagScale
pip install .
```
