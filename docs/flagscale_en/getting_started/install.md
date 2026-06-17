# Install FlagScale

Read [Requirements](requirements.md) before proceeding.

## Setup

### 1. Install backends

#### Inference / Serving backend

We recommend using the latest release of flagscale-inference image.

```{code-block} shell
docker pull harbor.baai.ac.cn/flagscale/flagscale-inference:dev-cu128-py3.12-20260302102033
docker run -itd --privileged --gpus all --net=host --ipc=host --device=/dev/infiniband --shm-size 512g --ulimit memlock=-1 --name <name>  harbor.baai.ac.cn/flagscale/flagscale-inference:dev-cu128-py3.12-20260302102033
docker exec -it <name> /bin/bash
conda activate flagscale-inference
```

vLLM:

```{code-block} shell
pip install vllm==0.13.0
```

vLLM-plugin-FL:

```{code-block} shell
pip install vllm-plugin-fl==0.1.0+vllm0.13.0 --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple
```

See more details in [vllm-plugin-FL](https://github.com/flagos-ai/vllm-plugin-FL).

FlagGems:

```{code-block} shell
pip install -U scikit-build-core==0.11 pybind11 ninja cmake
git clone https://github.com/flagos-ai/FlagGems
cd FlagGems
pip install --no-build-isolation .
```

See more details in [FlagGems](https://github.com/flagos-ai/FlagGems).

#### Training backend

We recommend using the latest release of flagscale-train image.

```{code-block} shell
docker pull harbor.baai.ac.cn/flagscale/flagscale-train:dev-cu128-py3.12-20260319182856
docker run -itd --gpus all --shm-size=500g --name <name>  harbor.baai.ac.cn/flagscale/flagscale-train:dev-cu128-py3.12-20260319182856 /bin/bash
docker exec -it <name> /bin/bash
conda activate flagscale-train
```

Megatron-LM-FL:

```{code-block} shell
pip install megatron_core==0.1.0+megatron0.15.0rc7 --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple
```

See more details in [Megatron-LM-FL](https://github.com/flagos-ai/Megatron-LM-FL).

TransformerEngine-FL:

```{code-block} shell
pip install transformer_engine==0.1.0+te2.9.0 --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple
```

See more details in [TransformerEngine-FL](https://github.com/flagos-ai/TransformerEngine-FL).

#### RL backend

We recommend using the latest release of flagscale-train image.

```{code-block} shell
docker pull harbor.baai.ac.cn/flagscale/flagscale-train:dev-cu128-py3.12-20260319182856
docker run -itd --gpus all --shm-size=500g --name <name>  harbor.baai.ac.cn/flagscale/flagscale-train:dev-cu128-py3.12-20260319182856 /bin/bash
docker exec -it <name> /bin/bash
conda activate flagscale-train
```

verl-FL:

```{code-block} shell
pip install verl==0.1.0+verl0.7.0 --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple
```

See more details in [veRL-FL](https://github.com/flagos-ai/verl-FL.git) to get full installation instructions.

### 2. Install FlagScale

**Option 1: Install via pip**

```{code-block} shell
pip install flagscale --extra-index-url https://resource.flagos.net/repository/flagos-pypi-hosted/simple
```

**Option 2: Install from source**

```{code-block} shell
git clone https://github.com/flagos-ai/FlagScale.git
cd FlagScale
pip install .
```

