# FlagBLAS Release Notes

## v0.2.0

```{note}
This is a preview release. The version number shown is a pre-release identifier and may change upon final release. Content in this preview is for reference only and does not constitute a commitment or warranty for the final product.
```

- **Added Features**
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

