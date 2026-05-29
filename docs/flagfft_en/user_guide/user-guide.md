# FlagFFT User Guide

## C API Usage

### Basic Complex Transform

```cpp
#include <cuda_runtime_api.h>
#include <flagfft.h>

int main() {
  constexpr int n = 256;
  constexpr int batch = 4;
  flagfftComplex* d_input = nullptr;
  flagfftComplex* d_output = nullptr;
  cudaMalloc(reinterpret_cast<void**>(&d_input), n * batch * sizeof(flagfftComplex));
  cudaMalloc(reinterpret_cast<void**>(&d_output), n * batch * sizeof(flagfftComplex));

  flagfftHandle plan = nullptr;
  cudaStream_t stream = nullptr;
  cudaStreamCreate(&stream);

  flagfftResult status = flagfftPlan1d(&plan, n, FLAGFFT_C2C, batch);
  if (status == FLAGFFT_SUCCESS) {
    status = flagfftSetStream(plan, stream);
  }
  if (status == FLAGFFT_SUCCESS) {
    status = flagfftExecC2C(plan, d_input, d_output, FLAGFFT_FORWARD);
    cudaStreamSynchronize(stream);
  }
  if (plan != nullptr) {
    flagfftDestroy(plan);
  }

  cudaStreamDestroy(stream);
  cudaFree(d_output);
  cudaFree(d_input);
  return status == FLAGFFT_SUCCESS ? 0 : 1;
}
```

### In-Place Real Transform

For in-place rank-1 real forward transforms, allocate `2 * (n / 2 + 1)` real scalars per batch:

```cpp
int dims[1] = {n};
int padded[1] = {2 * (n / 2 + 1)};
int compact[1] = {n / 2 + 1};
flagfftHandle plan = nullptr;
flagfftPlanMany(&plan, 1, dims, padded, 1, padded[0], compact, 1,
                compact[0], FLAGFFT_R2C, batch);
flagfftExecR2C(plan, d_real_in_place,
               reinterpret_cast<flagfftComplex*>(d_real_in_place));
```

## Native CLI

The `flagfft-cli` executable provides benchmark measurement:

```sh
./build/flagfft-cli bench --rank 1 --api r2c --shape 4096 --batch 64 \
  --warmup 10 --iters 100 --json
./build/flagfft-cli tune
```

### CLI Options

| Option | Values | Description |
|--------|--------|-------------|
| `--api` | c2c, z2z, r2c, d2z, c2r, z2d | Transform type |
| `--rank` | 1, 2, 3 | Transform rank |
| `--shape` | N, NxM, NxMxK | Transform dimensions |
| `--batch` | integer | Number of batched transforms |
| `--direction` | forward, inverse | Transform direction |
| `--placement` | out-of-place, in-place | Memory placement |
| `--print-path` | flag | Print plan description |

### Capability Matrix

| Command | Supported | Unsupported |
|---------|-----------|-------------|
| `test correctness`, `bench` | Six 1D APIs with plan1d, both complex directions, valid real direction, in/out-of-place; padded real in-place planmany | Rank 2/3 and other planmany layouts |
| `tune` | 1D c2c complex64, out-of-place plan1d, either direction | Other APIs, ranks, or layouts |

## Validation

### C++ Tests

```sh
cmake -S . -B build -GNinja -DBACKEND=CUDA -DFLAGFFT_BUILD_TESTS=ON
cmake --build build
ctest --test-dir build --verbose                              # full suite
FLAGFFT_TEST_PROFILE=smoke ctest --test-dir build --verbose  # quick validation
```

### Python Benchmarks

```sh
pytest benchmark/test_bench.py -v --bench-suite=smoke \
  --flagfft-cli ./build/flagfft-cli
```

## Plan Description

Use `flagfftGetPlanDescription(plan)` or `--print-path` with the CLI to inspect the plan node tree, factorization, kernel names, and module paths for performance debugging.

## Kernel Backend

FlagFFT is JIT-only. It requires the `deps/libtriton_jit` submodule and targets CUDA through `BACKEND=CUDA`. Plan creation emits Triton source and calls libtriton_jit compile APIs so the first exec call does not pay Python compilation latency.

Supported execution routes:
- Leaf plan
- Fused leaf/leaf four-step
- Generic nested four-step
- Bluestein fallback for arbitrary 1D complex lengths
