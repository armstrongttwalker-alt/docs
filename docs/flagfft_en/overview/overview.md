# FlagFFT Overview

FlagFFT is an experimental C++ FFT library with a cuFFT-style API and Triton/TLE-generated CUDA kernels. The public runtime interface is C; Python is retained only for Triton/TLE JIT source generation (internal codegen).

FlagFFT is part of the [FlagOS](https://flagos.io/) ecosystem and provides high-performance FFT computations for scientific computing, signal processing, and machine learning workloads.

## Features

- **cuFFT-style API** -- Familiar planning and execution interface for developers migrating from cuFFT.
- **JIT kernel compilation** -- Kernels are generated at plan creation time via Triton/TLE, eliminating Python compilation latency at execution time.
- **Arbitrary-length 1D transforms** -- Supports arbitrary composite lengths via fused four-step routes, including very large sizes (e.g., n = 2^23) without falling back to Bluestein.
- **Multiple transform types** -- C2C, Z2Z (complex), R2C, D2Z, C2R, Z2D (real-to-complex and reverse).
- **Plan description** -- `flagfftGetPlanDescription` returns detailed information about the plan node tree, kernel names, and compilation details for performance debugging.
- **Native CLI** -- `flagfft-cli` provides benchmark measurement and plan inspection without Python overhead.

## Architecture

FlagFFT is organized into several modules:

| Module | Description |
|--------|-------------|
| `src/utils/` | Shared C++ utilities, request/key types, JSON serialization, SQLite wrapper |
| `src/plan/` | Plan node definitions, factorization, cost model, automatic route selection |
| `src/codegen/` | C++ libtriton_jit invocation and cache logic |
| `python/flagfft_codegen/` | Installable Python kernel source generator and codelets |
| `src/adaptor/` | Backend abstraction and CUDA Driver implementation |
| `src/exec/` | cuFFT-style C API, raw pointer execution nodes, tuned plan lookup |
| `src/cli_tools/` | Unified native CLI, shared execution/timing code, SQLite tuning orchestration |

## Workflow

1. Create an FFT plan with `flagfftPlan1d` (or `flagfftPlanMany` for batched transforms).
2. Optionally attach a CUDA stream with `flagfftSetStream`.
3. Execute the transform with `flagfftExec*` functions.
4. Destroy the plan with `flagfftDestroy`.
