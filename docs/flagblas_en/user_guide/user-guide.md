# FlagBLAS User Guide

## Basic Usage

FlagBLAS integrates directly with PyTorch. Import the package and call operators on CUDA tensors:

```python
import torch
import flag_blas

# Create tensors on CUDA
a = torch.randn(1024, 1024, device='cuda')
b = torch.randn(1024, 1024, device='cuda')

# Matrix multiplication (GEMM)
c = flag_blas.ops.sgemm(a, b)
```

## Operator List

The complete operator registry is maintained at [FlagBLAS conf/operators.yaml](https://github.com/flagos-ai/FlagBLAS/blob/master/conf/operators.yaml).

### Level 3 — Matrix-Matrix Operations

sgemm, hgemm, bfgemm, fp8gemm

### Level 2 — Matrix-Vector Operations

sgemv, dgemv, cgemv, zgemv, hgemv, bfgemv, fp8_gemv, sgbmv, dgbmv, cgbmv, zgbmv, ssymv, dsymv, csymv, zsymv, chemv, zhemv, strmv, dtrmv, ctrmv, ztrmv, stbmv, dtbmv, ctbmv, ztbmv, stpmv, dtpmv, ctpmv, ztpmv, stbsv

### Level 1 — Vector Operations

sabs, dabs, cabs, zabs, samax, damax, camax, zamax, samin, damin, camin, zamin, sasum, dasum, scasum, dzasum, saxpy, daxpy, caxpy, zaxpy, scopy, dcopy, ccopy, zcopy, snrm2, dnrm2, scnrm2, dznrm2, srot, drot, crot, zrot, sscal, dscal, cscal, zscal, csscal, zdscal

## Multi-Backend Support

FlagBLAS's flexible backend mechanism allows it to target different chip vendors. The active backend is determined by the Triton configuration on your system.

## Integration with PyTorch

FlagBLAS operators can be called directly on PyTorch CUDA tensors, providing seamless integration with existing PyTorch workflows.
