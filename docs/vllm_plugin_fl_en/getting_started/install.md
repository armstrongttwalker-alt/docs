# Install software for running an inference task

1. Install vllm from the official [v0.18.1](https://github.com/vllm-project/vllm/tree/v0.18.1) (optional if the correct version is installed) or from the fork [vllm-FL](https://github.com/flagos-ai/vllm-FL).

2. Install vllm-plugin-FL

    2.1 Clone the repository:

    ```{code-block} shell
    git clone https://github.com/flagos-ai/vllm-plugin-FL
    ```

    2.2 install

    ```{code-block} shell
    cd vllm-plugin-FL
    pip install --no-build-isolation .
    # or editble install
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
    git checkout v5.0.0
    cd FlagGems
    pip install --no-build-isolation .
    # or editble install
    pip install --no-build-isolation -e .
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

## Additional setup steps for running an inference task on Huawei Ascend

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

## Additional setup steps for running an inference task with CUDA

This section illustrates how to run an inference task with CUDA through setting environment variables.

For operator dispatch environment variables, see [Environment variables](../dispatch_user_guide/configure-backend-selection.md/#environment-variables).

### Use CUDA communication library

This section demonstrates how to run an inference task with CUDA by setting environment variables.

```{code-block} shell
unset FLAGCX_PATH
```

### Use native CUDA operators

If you want to use the original CUDA operators, you can set the following environment variables.

```{code-block} shell
export USE_FLAGGEMS=0
```

## Dispatch operators

With vllm-plugin-FL, you can also dispatch operators.

For concept related information, see [vllm-plugin-FL Overview](../overview/overview.md).
For configuration related information, see [Operator dispatch user guide](../dispatch_user_guide/dispatch-user-guide.md)