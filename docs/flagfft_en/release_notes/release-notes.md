# FlagFFT Release Notes

## v0.1.0

Initial release of FlagFFT.

- **Added Features**

  - Experimental C++ FFT library with cuFFT-style C API.
  - Triton/TLE-generated CUDA kernels with JIT compilation at plan creation time.
  - Six 1D transform APIs: C2C, Z2Z, R2C, D2Z, C2R, Z2D.
  - Arbitrary-length contiguous rank-1 batched transforms.
  - Fused four-step route support for very large composite lengths.
  - Bluestein fallback for arbitrary 1D complex lengths.
  - Native CLI (`flagfft-cli`) for benchmark measurement and plan inspection.
  - C++ test suite with Google Test and cuFFT reference comparison.
  - Python benchmark suite with pytest-based performance measurement.
  - Plan description API for performance debugging.

- **Improved Features**

  - Both single-layer and nested fused four-step routes supported.
  - Real transforms use pointwise staging around complex FFT route.
  - Numerical acceptance gates with per-batch normwise rel_l2/rel_linf checks.
