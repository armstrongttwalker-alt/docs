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

### 3. 非 NVIDIA 平台

在沐曦、海光、昇腾与平头哥 PPU 上，请使用对应平台的容器镜像，并从源码安装与之匹配的正式版本 Megatron-LM-FL 与 TransformerEngine-FL。

| 平台 | 容器镜像 | FlagTree 后端 | 可见设备环境变量 |
|------|----------|---------------|------------------|
| 沐曦 MetaX | `harbor.baai.ac.cn/flagscale/megatron-lm-with-te:202603231839` | `metax` | `MACA_VISIBLE_DEVICES` |
| 海光 Hygon | `harbor.sourcefind.cn:5443/dcu/admin/base/custom:vllm0.20.0-ubuntu22.04-dtk26.04-py3.10-MiniCPM-V-4.6` | `hcu` | `HIP_VISIBLE_DEVICES` |
| 昇腾 Ascend | `harbor.baai.ac.cn/flagos-dev/flagscale:manual-20260812-ascend-dev-inference` | `ascend` | `ASCEND_RT_VISIBLE_DEVICES` |
| 平头哥 PPU | `harbor.baai.ac.cn/flagtree/flagtree-ppu-py312-torch2.10.0-sdk2.1.0-cu130-ubuntu24.04:202607-3.6-vllm0.24.0` | `ppu` | `CUDA_VISIBLE_DEVICES` |

```{code-block} shell
cd /workspace/Megatron-LM-FL && git checkout v0.3.0 && pip install . --no-build-isolation --root-user-action=ignore
cd /workspace/TransformerEngine-FL && git checkout v0.3.0
TE_FL_SKIP_CUDA=1 MAX_JOBS=64 pip install -v . --no-build-isolation --root-user-action=ignore
cd /workspace/FlagScale && git checkout v2.1.0 && pip install . --no-build-isolation
```

```{note}
非 NVIDIA 平台必须加 `TE_FL_SKIP_CUDA=1`——不加会尝试编译 CUDA kernel 并失败。
```

完整流程（含 FlagTree 与 FlagGems 算子栈、各平台问题排查）请参见[多平台训练与测试](../user_guide/multi-platform-training.md)。
