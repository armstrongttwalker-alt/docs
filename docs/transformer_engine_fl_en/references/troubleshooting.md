# Troubleshooting

## ABI Compatibility Issues

- **Symptoms:** `ImportError` with undefined symbols when importing transformer_engine
- **Solution:** Ensure PyTorch and Transformer Engine are built with the same C++ ABI setting.

## Missing Headers or Libraries

- **Symptoms:** CMake errors about missing headers (`cudnn.h`, `cublas_v2.h`, etc.)
- **Solution:** Set environment variables to point to correct locations:

```bash
export CUDA_PATH=/path/to/cuda
export CUDNN_PATH=/path/to/cudnn
```

## Build Resource Issues

- **Symptoms:** Compilation hangs, system freezes, or out-of-memory errors
- **Solution:** Limit parallel builds:

```bash
MAX_JOBS=1 NVTE_BUILD_THREADS_PER_JOB=1 pip install ...
```

## FlashAttention Compilation

FlashAttention-2 compilation is resource-intensive. Set `MAX_JOBS=1` to avoid out-of-memory errors.

## JAX FFI Issues

- **Symptoms:** `No registered implementation for custom call to <some_te_ffi> for platform CUDA`
- **Solution:** Ensure `--no-build-isolation` is used during installation.

## Breaking Changes

### v1.7: Padding mask definition for PyTorch

The padding mask has changed from `True` meaning inclusion to `True` meaning exclusion. Since v1.7, all attention mask types follow the same definition where `True` means masking out the corresponding position.
