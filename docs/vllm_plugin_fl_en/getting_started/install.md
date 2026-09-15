# Install software for running an inference task

vllm-plugin-FL can be installed from source code or via Docker images.

## Install from source

This section covers installing vllm-plugin-FL and its dependencies from source code.

1. Install vllm from the official [v0.20.2](https://github.com/vllm-project/vllm/tree/v0.20.2) (optional if the correct version is installed)
2. Install vllm-plugin-FL

    2.1 Clone the repository:

    ```{code-block} shell
    git clone https://github.com/flagos-ai/vllm-plugin-FL
    ```

    2.2 install

    ```{code-block} shell
    cd vllm-plugin-FL
    pip install --no-build-isolation .
    # or editable install
    pip install --no-build-isolation -e .
    ```

3. Install [FlagGems](https://github.com/flagos-ai/FlagGems/blob/master/docs/getting-started.md#quick-installation)

    3.1 Install build dependencies

    ```{code-block} shell
    pip install -U scikit-build-core==0.11 pybind11 ninja cmake
    ```

    3.2 Install FlagGems

    ```{code-block} shell
    git clone https://github.com/flagos-ai/FlagGems
    cd FlagGems
    pip install --no-build-isolation .
    # or editable install
    pip install --no-build-isolation -e .
    ```

    ```{note}
    On Sunrise platform, depends on FlagGems [PR #2949](https://github.com/flagos-ai/FlagGems/pull/2949).
    On Hygon platform, depends on FlagGems [PR #3477](https://github.com/flagos-ai/FlagGems/pull/3477).
    ```

4. (Optional) Install [FlagCX](https://github.com/flagos-ai/FlagCX/blob/main/docs/getting_started.md#build-and-installation)

    4.1 Clone the repository:

    ```{code-block} shell
    git clone https://github.com/flagos-ai/FlagCX.git
    cd FlagCX
    git checkout -b v0.9.0
    git submodule update --init --recursive
    ```

    4.2 Build the library with different flags targeting to different platforms:

    ```{code-block} shell
    make USE_NVIDIA=1
    ```

    4.3 Set environment

    ```{code-block} shell
    export FLAGCX_PATH="$PWD"
    ```

    4.4 Install FlagCX

    ```{code-block} shell
    cd plugin/torch/
    FLAGCX_ADAPTOR=[xxx] pip install . --no-build-isolation
    # or editable install
    FLAGCX_ADAPTOR=[xxx] pip install -e . --no-build-isolation
    ```

    ```{note}
    [xxx] should be selected according to the current platform, e.g., nvidia, ascend, etc.
    ```

If there are multiple plugins in the current environment, you can specify use vllm-plugin-fl via VLLM_PLUGINS='fl'.

### Additional setup for Huawei Ascend

1. Install [FlagTree](https://resource.flagos.net)

    ```{code-block} shell
    RES="--index-url=https://resource.flagos.net/repository/flagos-pypi-hosted/simple --trusted-host=https://resource.flagos.net"
    python3 -m pip install flagtree==0.4.0+ascend3.2 $RES
    ```

2. Set required environment variable

    ```{code-block} shell
    export TRITON_ALL_BLOCKS_PARALLEL=1
    ```

3. Enable eager execution

    Ascend requires eager execution. Add `enforce_eager=True` to the `LLM` constructor or pass `--enforce-eager` on the command line.

### （Optional）Additional setup for CUDA

This section illustrates how to run an inference task with CUDA through setting environment variables.

For operator dispatch environment variables, see [Environment variables](../dispatch_user_guide/configure-backend-selection.md/#environment-variables).

#### Use CUDA communication library

This section demonstrates how to run an inference task with CUDA by setting environment variables.

```{code-block} shell
unset FLAGCX_PATH
```

#### Use native CUDA operators

If you want to use the original CUDA operators, you can set the following environment variables.

```{code-block} shell
export USE_FLAGGEMS=0
```

## Install from docker image

This section covers running vllm-plugin-FL using pre-built Docker images.

### SVT Full-Stack Test Images (v0.2.0-rc2)

Pre-built SVT images with full FlagOS stack:

| Platform | Image | Contents |
|----------|-------|----------|
| NVIDIA GPU | `harbor.baai.ac.cn/flagos21-release/vllm-plugin-fl:v0.2.0-rc2-nvidia-svt` | vllm 0.20.2, FlagGems 5.3.0-rc2.post1, FlagTree 3.6.0, vllm-plugin-FL 0.2.0-rc2.post1, torch 2.11.0+cu130 |
| Hygon DCU | `harbor.baai.ac.cn/flagos21-release/vllm-plugin-fl:v0.2.0-rc2-hygon-svt` | vllm 0.20.0, FlagGems 5.3.0-rc2.post1, FlagTree 0.5.0-rc2.post1+hcu, vllm-plugin-FL 0.2.0-rc2.post1, torch 2.10.0+das |

```bash
# NVIDIA SVT
docker pull harbor.baai.ac.cn/flagos21-release/vllm-plugin-fl:v0.2.0-rc2-nvidia-svt

# Hygon DCU SVT
docker pull harbor.baai.ac.cn/flagos21-release/vllm-plugin-fl:v0.2.0-rc2-hygon-svt
```

### Hygon DCU

Available for vllm-plugin-FL v0.2.0 (vLLM 0.20.0).

1. Pull and start the Hygon DCU Docker container:

    ```{code-block} shell
    docker pull harbor.sourcefind.cn:5443/dcu/admin/base/custom:vllm0.20.0-ubuntu22.04-dtk26.04-py3.10-MiniCPM-V-4.6

    docker run \
        --name perf \
        --network=host \
        --ipc=host \
        --device=/dev/kfd \
        --device=/dev/mkfd \
        --device=/dev/dri \
        -v /opt/hyhal:/opt/hyhal \
        -v /path/to/models:/models \
        --group-add video \
        --cap-add=SYS_PTRACE \
        --security-opt seccomp=unconfined \
        -itd harbor.sourcefind.cn:5443/dcu/admin/base/custom:vllm0.20.0-ubuntu22.04-dtk26.04-py3.10-MiniCPM-V-4.6 \
        /bin/bash
    ```

    Replace `/path/to/models` with your actual model storage path.

2. Inside the container, install FlagGems:

    ```{code-block} shell
    git clone https://github.com/flagos-ai/FlagGems
    cd FlagGems
    git checkout 2718037d887cd6a3143474da0224648e40c5004f
    pip install --no-build-isolation -e .
    ```

3. Install vllm-plugin-FL:

    ```{code-block} shell
    git clone https://github.com/flagos-ai/vllm-plugin-FL
    cd vllm-plugin-FL
    git checkout 48af29e21491700a38020ab031af5d3b90e6795e
    pip install --no-build-isolation -e .
    ```

4. Download models:

    ```{code-block} shell
    modelscope download --model Qwen/Qwen3.6-27B --local_dir /models/Qwen3.6-27B
    modelscope download --model Qwen/Qwen3.6-35B-A3B --local_dir /models/Qwen3.6-35B-A3B
    ```

### NVIDIA

Available for vllm-plugin-FL v0.2.0 (vLLM 0.20.2).

1. Pull and start the NVIDIA Docker container:

    ```{code-block} shell
    docker pull vllm/vllm-openai:v0.20.0-cu130-ubuntu2404

    docker run -itd \
        --name perf \
        --entrypoint /bin/bash \
        --gpus all \
        --ipc=host \
        --privileged \
        --net host \
        --shm-size 512g \
        -v /path/to/models:/models \
        vllm/vllm-openai:v0.20.0-cu130-ubuntu2404
    ```

    Replace `/path/to/models` with your actual model storage path.

2. Inside the container, install dependencies:

    ```{code-block} shell
    apt-get update
    apt install git
    apt install vim
    pip install -U scikit-build-core==0.11 pybind11 ninja cmake
    ```

3. Install vllm:

    ```{code-block} shell
    pip install vllm==0.20.2
    ```

4. Install FlagGems:

    ```{code-block} shell
    git clone https://github.com/flagos-ai/FlagGems
    cd FlagGems
    git checkout 1dab11ab1a6671e3132528492d2cc193e78af8f4
    pip install --no-build-isolation .
    ```

5. Install vllm-plugin-FL:

    ```{code-block} shell
    git clone https://github.com/flagos-ai/vllm-plugin-FL
    cd vllm-plugin-FL
    git checkout 48af29e21491700a38020ab031af5d3b90e6795e
    pip install --no-build-isolation .
    ```

6. Download models:

    ```{code-block} shell
    modelscope download --model Qwen/Qwen3.6-27B --local_dir /models/Qwen3.6-27B
    modelscope download --model Qwen/Qwen3.6-35B-A3B --local_dir /models/Qwen3.6-35B-A3B
    ```

### Huawei Ascend

Available for vllm-plugin-FL v0.1.0 (vLLM 0.13.0).

1. Pull and start the Ascend Docker container:

    ```{code-block} shell
    docker pull quay.io/ascend/vllm-ascend:v0.13.0rc1-a3

    docker run \
    --name flagos \
    --network host \
    --ipc=host \
    --privileged \
    --device /dev/davinci0 \
    --device /dev/davinci1 \
    --device /dev/davinci2 \
    --device /dev/davinci3 \
    --device /dev/davinci4 \
    --device /dev/davinci5 \
    --device /dev/davinci6 \
    --device /dev/davinci7 \
    --device /dev/davinci8 \
    --device /dev/davinci9 \
    --device /dev/davinci10 \
    --device /dev/davinci11 \
    --device /dev/davinci12 \
    --device /dev/davinci13 \
    --device /dev/davinci14 \
    --device /dev/davinci15 \
    --device /dev/davinci_manager \
    --device /dev/devmm_svm \
    --device /dev/hisi_hdc \
    -v /usr/local/dcmi:/usr/local/dcmi \
    -v /usr/local/bin/npu-smi:/usr/local/bin/npu-smi \
    -v /usr/local/Ascend/driver/lib64/:/usr/local/Ascend/driver/lib64/ \
    -v /usr/local/Ascend/driver/version.info:/usr/local/Ascend/driver/version.info \
    -v /usr/local/Ascend/driver:/usr/local/Ascend/driver \
    -v /usr/local/sbin:/usr/local/sbin \
    -v /etc/ascend_install.info:/etc/ascend_install.info \
    -v /path/to/models:/models \
    -itd quay.io/ascend/vllm-ascend:v0.13.0rc1-a3 bash

    docker exec -it flagos bash
    ```

    Replace `/path/to/models` with your actual model storage path.

2. Inside the container, install FlagGems:

    ```{code-block} shell
    pip install -U scikit-build-core==0.11 pybind11 ninja cmake
    git clone https://github.com/flagos-ai/FlagGems
    cd FlagGems
    git checkout 6f2585dc9c48d440d856ad75f4aedee66fac365a
    pip install --no-build-isolation -e .
    ```

3. Install FlagTree:

    ```{code-block} shell
    RES="--index-url=https://resource.flagos.net/repository/flagos-pypi-hosted/simple --trusted-host=https://resource.flagos.net"
    python3 -m pip install flagtree==0.4.0+ascend3.2 $RES
    ```

4. Install vllm-plugin-FL:

    ```{code-block} shell
    git clone https://github.com/flagos-ai/vllm-plugin-FL
    cd vllm-plugin-FL
    git checkout ba008211c1c9646e19290e832a7f7775f7d2944f
    pip install --no-build-isolation -e .
    ```

5. Set environment variables and start the service:

    ```{code-block} shell
    export VLLM_PLUGINS=fl
    export TRITON_ALL_BLOCKS_PARALLEL=1
    vllm serve --model /models/Qwen3-4B --served-model-name qwen --enforce-eager
    ```

    ```{note}
    Ascend requires eager execution. Add `enforce_eager=True` to the `LLM` constructor or pass `--enforce-eager` on the command line.
    ```

### Iluvatar BI-V150

Available for vllm-plugin-FL v0.1.0 (vLLM 0.13.0).

1. Load and start the Corex Docker container:

    ```{code-block} shell
    docker load -i /mnt/share/images/corex.4.4.0.release.0211.vllm.013.flagos.tar

    docker run --shm-size="32g" -itd \
      -v /dev:/dev -v /usr/src/:/usr/src \
      -v /lib/modules/:/lib/modules \
      -v /mnt/share/user_homes/:/mnt/share/user_homes/ \
      --privileged --cap-add=ALL --pid=host --net=host \
      --name flagos_v2 corex:4.4.0.release.0211.vllm.013.flagos /bin/bash
    ```

2. Inside the container, install FlagGems:

    ```{code-block} shell
    pip install -U scikit-build-core==0.11 pybind11 ninja cmake
    git clone https://github.com/flagos-ai/FlagGems
    cd FlagGems
    git checkout 6f2585dc9c48d440d856ad75f4aedee66fac365a
    pip install --no-build-isolation -e .
    cd ../
    ```

3. Install vllm-plugin-FL:

    ```{code-block} shell
    git clone https://github.com/flagos-ai/vllm-plugin-FL.git
    cd vllm-plugin-FL
    git checkout f11a0f4707aecae245ec81289329b208ede5b06d
    pip install --no-build-isolation -e . --no-deps
    cd ../
    ```

4. Start the service:

    ```{code-block} shell
    export VLLM_PLUGINS=fl
    export VLLM_ENGINE_ITERATION_TIMEOUT_S=36000
    export VLLM_RPC_TIMEOUT=36000000
    vllm serve /mnt/share/user_homes/zyp/Qwen3-4B/ --served-model-name qwen --enforce-eager
    ```

    ```{note}
    The first startup takes approximately 15 minutes. Subsequent startups take less than 2 minutes.
    ```

The steps above provide a minimal setup for running Qwen3-4B on BV150. If you need the full FlagOS stack with FlagTree, FlagGems usage patterns, environment verification, and troubleshooting — or if you are setting up BV150 for the first time — see the complete end-to-end guide: [Qwen2.5-1.5B on Iluvatar BI-V150](example-qwen2.5-bv150.md).

## (Optional) Dispatch operators

If needed, you can also dispatch operators.

For concept related information, see [vllm-plugin-FL Overview](../overview/overview.md).
For configuration related information, see [Operator dispatch user guide](../dispatch_user_guide/dispatch-user-guide.md).

After installation and optional operator dispatch configuration, you can proceed to [Run an inference task](run-inference-task.md).

