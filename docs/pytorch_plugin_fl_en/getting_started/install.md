# Installation

## Build from Source

### CUDA Platform

```{code-block} shell
git clone https://github.com/flagos-ai/PyTorch-Plugin-FL.git && cd PyTorch-Plugin-FL

pip install -e . --no-build-isolation
```

### MACA Platform

```{code-block} shell
# Set MACA cu-bridge library path (adjust based on your environment)
export LD_LIBRARY_PATH=/opt/maca/tools/cu-bridge/lib:$LD_LIBRARY_PATH

ACCELERATOR=maca pip install -e . --no-build-isolation
```

### Ascend Platform

```{code-block} shell
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
