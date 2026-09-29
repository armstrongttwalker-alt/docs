# Build and Installation

## Obtain Source Code

```shell
git clone https://github.com/flagos-ai/FlagCX.git
cd FlagCX
git submodule update --init --recursive
```

## Installation

**Option A — Pythonic Installation (pip install):**

```shell
pip install . -v --no-build-isolation
```

**Option B — C++ library (make):**

```shell
make <backend>=1 -j$(nproc)
```
where `<backend>` is one of:
- `USE_NVIDIA`: NVIDIA GPU support
- `USE_ILUVATAR`: Iluvatar Corex support
- `USE_CAMBRICON`: Cambricon support
- `USE_METAX`: MetaX support
- `USE_MUSA`: Moore Threads support
- `USE_KUNLUNXIN`: Kunlunxin support
- `USE_DU`: Hygon support
- `USE_ASCEND`: Huawei Ascend support
- `USE_AMD`: AMD support
- `USE_TSM`: TsingMicro support
- `USE_ENFLAME`: Enflame support
- `USE_SUNRISE`: Sunrise AI support
- `USE_PPU`: PPU platform support
- `USE_GLOO`: GLOO support
- `USE_MPI`: MPI support

Most builds select one hardware backend. The following optional controls enable additional features when the corresponding runtime or development package is available:

- `USE_SHMEM=1`: enable SHMEM support. Set `SHMEM_HOME` when SHMEM is installed outside `/usr/local/nvshmem`.
- `USE_ACCL_BAREX=1`: enable the ACCL/Barex network transport adaptor.
- `COMPILE_KERNEL=1`: build device-side kernel components needed by Device API tests and benchmarks. You do not need this for ordinary host-side builds.
- `HOST_CXX_STANDARD`: override the host C++ language standard when required by the build environment.
- `JSON_INCLUDE_DIR`: override the directory containing the nlohmann JSON headers.

`USE_ILUVATAR_COREX` is retained as a deprecated compatibility alias for older build scripts. Use `USE_ILUVATAR` for new builds.

Note that Option A also supports `<backend>=1`, allowing users to explicitly specify the backend. Otherwise, it will be selected automatically.

The default installation path is set to `build/`, you can manually set `BUILDDIR` environment variable to customize the build path.
You may also specify `DEVICE_HOME` and/or `CCL_HOME` to indicate the installation paths of the device runtime and installation path
of the communication libraries respectively.
