# Installing FlagFFT

## Step 1: Install the Python Codegen Package

```sh
python3 -m pip install .
```

## Step 2: Build the Native Library

```sh
cmake -S . -B build -GNinja -DBACKEND=CUDA
cmake --build build
```

## Step 3: (Optional) Build CLI and Tests

```sh
cmake -S . -B build -GNinja -DBACKEND=CUDA -DFLAGFFT_BUILD_CLI=ON -DFLAGFFT_BUILD_TESTS=ON
cmake --build build --target flagfft-cli
```

## Step 4: Install

```sh
cmake --install build --prefix /path/to/flagfft-install
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `FLAGFFT_PYTHON` | Python interpreter for JIT source generation (defaults to `python3`) |
| `FLAGFFT_TUNE_DB` | Path to tuned plan SQLite database |
| `FLAGFFT_TUNE_DISABLE` | Set to `1` to disable tuned-plan lookup |
