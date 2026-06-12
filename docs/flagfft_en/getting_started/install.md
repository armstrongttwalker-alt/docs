# Quick Start

Build the library, install the Python codegen package, and run the full test suite:

```{code-block} python
# 1. Clone
git clone https://github.com/Artlesbol/FlagFFT-dev.git
cd FlagFFT-dev

# 2. Initialize submodule
git submodule update --init --recursive

# 3. Build the library, CLI, and test binaries
cmake -B build -DCMAKE_BUILD_TYPE=Release \
      -DFLAGFFT_BUILD_CLI=ON \
      -DFLAGFFT_BUILD_TESTS=ON
cmake --build build -j$(nproc)

# 4. Install the Python codegen package (required for JIT kernel generation)
pip install .

# 5. Run the full accuracy + performance test suite
python tools/run_tests.py --combination full --gpus 0
```

The runner prints a live progress table and writes summary.json with per-operator accuracy (pass/fail) and performance (geometric mean speedup vs cuFFT) results.

## Docker

A pre-built environment with all dependencies is available:

```{code} python
docker build -t flagfft-dev -f docker/Dockerfile .
docker run --gpus all -v $(pwd):/workspace/FlagFFT-dev -it flagfft-dev
# Inside the container, run steps 3-5 from above.
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
