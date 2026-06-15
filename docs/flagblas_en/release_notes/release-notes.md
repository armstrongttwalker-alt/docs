# FlagBLAS Release Notes

## v0.2.0

```{note}
This is a preview release. The version number shown is a pre-release identifier and may change upon final release. Content in this preview is for reference only and does not constitute a commitment or warranty for the final product.
```

- **Added Features**

  - **BLAS Level 3 — Matrix-Matrix Operations** — sgemm, hgemm, bfgemm, fp8gemm.
  - **BLAS Level 2 — Matrix-Vector Operations** — sgemv, dgemv, cgemv, zgemv, hgemv, bfgemv, fp8_gemv, sgbmv, dgbmv, cgbmv, zgbmv, ssymv, dsymv, csymv, zsymv, chemv, zhemv, strmv, dtrmv, ctrmv, ztrmv, stbmv, dtbmv, ctbmv, ztbmv, stpmv, dtpmv, ctpmv, ztpmv, stbsv.
  - **BLAS Level 1 — Vector Operations** — sabs, dabs, cabs, zabs, samax, damax, camax, zamax, samin, damin, camin, zamin, sasum, dasum, scasum, dzasum, saxpy, daxpy, caxpy, zaxpy, scopy, dcopy, ccopy, zcopy, snrm2, dnrm2, scnrm2, dznrm2, srot, drot, crot, zrot, sscal, dscal, cscal, zscal, csscal, zdscal.
  - **Operator Registry** — Added `conf/operators.yaml` with full operator metadata.
  - **CI/CD Pipeline** — GitHub Actions workflow with correctness tests, performance benchmarks, and pre-commit hooks.
  - **libtuner Autotuning** — Integrated libtuner for automatic kernel configuration tuning.

- **Enhanced Features**

  - hgemm optimized with block-pointer and TMA kernel variants.
  - amax small-N path optimized for improved performance.
  - asum operator underwent deep performance tuning.
  - sgemm and hgemm autotuning migrated from hardcoded configs to libtuner.
  - GEMV fp64 scalar packing and small-N paths optimized.

## v0.1.0

Initial release of FlagBLAS.

- **Added Features**

  - BLAS-standard interface library with multi-backend support.
  - Core vector and matrix operations (Level 1, 2, 3 BLAS).
  - Flexible multi-backend support mechanism.

