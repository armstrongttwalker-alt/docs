# FlagBLAS Overview

FlagBLAS is a high-performance general-purpose operator library that follows the BLAS (Basic Linear Algebra Subprograms) standard interface, oriented towards multiple chip backends. It is part of the [FlagOS](https://flagos.io/) ecosystem and defines core operations for numerical calculations such as vectors and matrices, supporting high-performance computing in scientific computing, engineering simulation, machine learning, and artificial intelligence.

FlagBLAS is implemented using the [Triton programming language](https://github.com/openai/triton) launched by OpenAI, enabling portable kernel code across diverse hardware.

## Features

- **Deep performance tuning** -- All BLAS operators have undergone extensive optimization for throughput and latency.
- **Triton kernel call optimization** -- Kernel launch patterns minimize overhead and maximize hardware utilization.
- **Flexible multi-backend support** -- A pluggable backend mechanism targets different chip vendors through a unified BLAS-compatible API.

## Architecture

FlagBLAS follows the standard BLAS interface hierarchy:

1. Level 1 -- Vector-vector operations (dot product, scaling, norms).
2. Level 2 -- Matrix-vector operations (matrix-vector multiply, rank-1 updates).
3. Level 3 -- Matrix-matrix operations (general matrix multiply, triangular solve).

The Python API layer integrates with PyTorch, while the Triton kernel layer provides chip-agnostic implementations dispatched to the appropriate hardware backend.

## Operator list

The complete operator registry is maintained at [FlagBLAS conf/operators.yaml](https://github.com/flagos-ai/FlagBLAS/blob/master/conf/operators.yaml).

### Level 3 — Matrix-Matrix Operations

sgemm, hgemm, bfgemm, fp8gemm

### Level 2 — Matrix-Vector Operations

sgemv, dgemv, cgemv, zgemv, hgemv, bfgemv, fp8_gemv, sgbmv, dgbmv, cgbmv, zgbmv, ssymv, dsymv, csymv, zsymv, chemv, zhemv, strmv, dtrmv, ctrmv, ztrmv, stbmv, dtbmv, ctbmv, ztbmv, stpmv, dtpmv, ctpmv, ztpmv, stbsv

### Level 1 — Vector Operations

sabs, dabs, cabs, zabs, samax, damax, camax, zamax, samin, damin, camin, zamin, sasum, dasum, scasum, dzasum, saxpy, daxpy, caxpy, zaxpy, scopy, dcopy, ccopy, zcopy, snrm2, dnrm2, scnrm2, dznrm2, srot, drot, crot, zrot, sscal, dscal, cscal, zscal, csscal, zdscal