# Install FlagFFT

## Clone and Initialize Submodule

```sh
git clone https://github.com/flagos-ai/FlagFFT.git
cd FlagFFT
git submodule update --init --recursive
```

## Install the Python Codegen Package

```sh
pip install .
```

## Build the Native Library

### Build Library Only

```sh
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build -j$(nproc)
```

This produces `build/libflagfft.so`.

### Build Library + CLI + Tests

```sh
cmake -B build -DCMAKE_BUILD_TYPE=Release \
      -DFLAGFFT_BUILD_CLI=ON \
      -DFLAGFFT_BUILD_TESTS=ON
cmake --build build -j$(nproc)
```

### Build Options

| Option | Default | Description |
|---|---|---|
| `FLAGFFT_BUILD_CLI` | `OFF` | Build the `flagfft-cli` benchmark/verification tool |
| `FLAGFFT_BUILD_TESTS` | `OFF` | Build the C++ test suite (requires Google Test + CUDA) |
| `BACKEND` | `CUDA` | GPU backend selector (only `CUDA` is currently supported) |
| `CMAKE_BUILD_TYPE` | — | `Release`, `Debug`, `RelWithDebInfo` |

## Install to System

```sh
cmake --install build --prefix /usr/local
```

Installs `libflagfft.so`, the public header (`flagfft.h`), and `flagfft-cli` (if built).

## Use Docker

A pre-built environment with all dependencies is available:

```sh
docker build -t flagfft-dev -f docker/Dockerfile .
docker run --gpus all -v $(pwd):/workspace/FlagFFT -it flagfft-dev
# Inside the container, run the build and install steps above.
```

## Set Environment Variables

| Variable | Description |
|---|---|
| `FLAGFFT_PYTHON` | Path to the Python interpreter used by JIT codegen (default: `python3` from PATH) |
| `FLAGFFT_TUNE_DB` | Path to the SQLite tuning database (default: `~/.flagfft/tune.db`) |
| `FLAGFFT_TUNE_DISABLE` | Set to `1` to disable tuned plan lookup and always use auto-selected plans |
