# 安装运行推理任务所需的软件

1. 从官方 [v0.18.1](https://github.com/vllm-project/vllm/tree/v0.18.1)（如果已安装正确版本则可选）或从 fork [vllm-FL](https://github.com/flagos-ai/vllm-FL) 安装 vllm。

2. 安装 vllm-plugin-FL

    2.1 克隆仓库：

    ```{code-block} shell
    git clone https://github.com/flagos-ai/vllm-plugin-FL
    ```

    2.2 安装

    ```{code-block} shell
    cd vllm-plugin-FL
    pip install --no-build-isolation .
    # 或可编辑安装
    pip install --no-build-isolation -e .
    ```

3. 安装 [FlagGems](https://github.com/flagos-ai/FlagGems/blob/master/docs/getting-started.md#quick-installation)

    3.1 安装构建依赖

    ```{code-block} shell
    pip install -U scikit-build-core==0.11 pybind11 ninja cmake
    ```

    3.2 安装 FlagGems

    ```{code-block} shell
    git clone https://github.com/flagos-ai/FlagGems
    git checkout v5.0.0
    cd FlagGems
    pip install --no-build-isolation .
    # 或可编辑安装
    pip install --no-build-isolation -e .
    ```

4. （可选）安装 [FlagCX](https://github.com/flagos-ai/FlagCX/blob/main/docs/getting_started.md#build-and-installation)

    4.1 克隆仓库：

    ```{code-block} shell
    git clone https://github.com/flagos-ai/FlagCX.git
    cd FlagCX
    git checkout -b v0.9.0
    git submodule update --init --recursive
    ```

    4.2 使用不同标志构建库以适配不同平台：

    ```{code-block} shell
    make USE_NVIDIA=1
    ```

    4.3 设置环境变量

    ```{code-block} shell
    export FLAGCX_PATH="$PWD"
    ```

    4.4 安装 FlagCX

    ```{code-block} shell
    cd plugin/torch/
    FLAGCX_ADAPTOR=[xxx] pip install . --no-build-isolation
    # 或可编辑安装
    FLAGCX_ADAPTOR=[xxx] pip install -e . --no-build-isolation
    ```

    ```{note}
    [xxx] 应根据当前平台选择，例如 nvidia、ascend 等。
    ```

如果当前环境中有多个插件，您可以通过 VLLM_PLUGINS='fl' 指定使用 vllm-plugin-fl。

## 在华为昇腾上运行推理任务的额外设置步骤

1. 安装 [FlagTree](https://resource.flagos.net)

    ```{code-block} shell
    RES="--index-url=https://resource.flagos.net/repository/flagos-pypi-hosted/simple --trusted-host=https://resource.flagos.net"
    python3 -m pip install flagtree==0.4.0+ascend3.2 $RES
    ```

2. 设置所需的环境变量

    ```{code-block} shell
    export TRITON_ALL_BLOCKS_PARALLEL=1
    ```

3. 启用 eager 执行

    昇腾需要 eager 执行。在 `LLM` 构造函数中添加 `enforce_eager=True` 或在命令行中传递 `--enforce-eager`。

## 使用 CUDA 运行推理任务的额外设置步骤

本节说明如何通过设置环境变量来使用 CUDA 运行推理任务。

有关算子调度环境变量，请参阅 [环境变量](../dispatch_user_guide/configure-backend-selection.md/#environment-variables)。

### 使用 CUDA 通信库

本节演示如何通过设置环境变量来使用 CUDA 运行推理任务。

```{code-block} shell
unset FLAGCX_PATH
```

### 使用原生 CUDA 算子

如果您想使用原始的 CUDA 算子，可以设置以下环境变量。

```{code-block} shell
export USE_FLAGGEMS=0
```

## 调度算子

使用 vllm-plugin-FL，您还可以调度算子。

有关概念信息，请参阅 [vllm-plugin-FL 概览](../overview/overview.md)。
有关配置信息，请参阅 [算子调度用户指南](../dispatch_user_guide/dispatch-user-guide.md)
