# Installation

## Docker Images (Recommended)

| Platform | Image | Contents |
|----------|-------|----------|
| NVIDIA GPU | `harbor.baai.ac.cn/flagos21-release/pytorch-plugin-fl:v0.1.0-rc2-nvidia` | torch 2.11.0+cu128, torch_fl 0.1.0, flag_gems 5.0.2, triton 3.6.0 |
| Huawei Ascend | `harbor.baai.ac.cn/flagos21-release/pytorch-plugin-fl:v0.1.0-rc2-ascend` | torch 2.11.0+CPU, torch_npu, torch_fl |

```bash
# NVIDIA
docker pull harbor.baai.ac.cn/flagos21-release/pytorch-plugin-fl:v0.1.0-rc2-nvidia
# Huawei Ascend
docker pull harbor.baai.ac.cn/flagos21-release/pytorch-plugin-fl:v0.1.0-rc2-ascend
```

## Build from Source

### CUDA platform

```{code-block} bash
git clone https://github.com/flagos-ai/PyTorch-Plugin-FL.git && cd PyTorch-Plugin-FL

pip install -e . --no-build-isolation
```

### MACA platform

```{code-block} bash
# Set MACA cu-bridge library path, depending on the actual cu-bridge path in your environment
export LD_LIBRARY_PATH=/opt/maca/tools/cu-bridge/lib:$LD_LIBRARY_PATH

ACCELERATOR=maca pip install -e . --no-build-isolation
```

### Huawei Ascend platform

```{code-block} bash
# Ensure CANN toolkit is installed and environment is sourced
# (typically: source /usr/local/Ascend/ascend-toolkit/set_env.sh)

ACCELERATOR=ascend FLAGGEMS_KERNEL=0 CUDA_KERNEL=0 ASCEND_KERNEL=1 \
  pip install --no-build-isolation -vvv -e .
```

On Ascend, FlagGems and CUDA kernels are disabled. Only the Ascend kernel backend (ACL NN API) is compiled.

## Build Environment Variables

| Variable | Description |
|----------|-------------|
| `ACCELERATOR` | Hardware platform: `cuda` (default), `maca`, or `ascend` |
| `CUDA_HOME` | CUDA toolkit path |
| `MACA_PATH` | MACA SDK path (default `/opt/maca`) |
| `ASCEND_HOME` | CANN toolkit path (default `/usr/local/Ascend/ascend-toolkit/latest`) |
| `FLAGGEMS_DIR` | FlagGems C++ library path (enables low-overhead C++ dispatch) |
| `FLAGGEMS_KERNEL` | Enable FlagGems kernel build (`ON`/`OFF`, default `ON`; set `0` for Ascend) |
| `CUDA_KERNEL` | Enable CUDA kernel build (`ON`/`OFF`, default `ON`; set `0` for Ascend) |
| `ASCEND_KERNEL` | Enable Ascend kernel build (`ON`/`OFF`, default `OFF`; set `1` for Ascend) |

### Runtime Environment Variables

| Variable | Description |
| :--- | :--- |
| `FLAGOS_DISABLE_FLAGGEMS_PY` | Set to `1` to disable FlagGems Python-layer registration (required on Ascend) |
| `FLAGGEMS_SOURCE_DIR` | FlagGems source directory (required when C++ native API ops route to `flaggems` backend) |
| `FLAGOS_BACKEND_CONFIG` | Override path for `backends.conf` (use torch_fl/backends_ascend.conf on Ascend) |
| `FLAGOS_LOG_DISPATCH` | Set to `1` to print backend selection for each operator dispatch |
| `FLAGOS_OP_<name>` | Per-operator backend override (replace `.` with `__` in op names) |