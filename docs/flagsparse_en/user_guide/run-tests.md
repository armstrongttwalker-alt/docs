# Running Tests and Benchmarks

## Accuracy Tests

### pytest Accuracy Suite

```bash
pytest tests/pytest --mode quick
pytest tests/pytest --mode normal -m "spmv_csr or spmm_csr"
```

### Operator-Specific Tests

```bash
# SpMV (CSR)
python tests/test_spmv.py <dir_or_file.mtx>              # batch run, default float32
python tests/test_spmv.py --synthetic                    # synthetic benchmark

# SpMV (COO)
python tests/test_spmv_coo.py --synthetic

# SpMM (CSR)
python tests/test_spmm.py <dir_or_file.mtx>
python tests/test_spmm.py --synthetic

# SpMM (COO)
python tests/test_spmm_coo.py <dir_or_file.mtx>
python tests/test_spmm_coo.py --synthetic

# SDDMM
python tests/test_sddmm.py <dir_or_file.mtx> --k 64

# SpGEMM
python tests/test_spgemm.py <dir_or_file.mtx> --input-mode auto

# SpSV (triangular solve)
python tests/test_spsv.py --synthetic

# SpSM (triangular matrix-matrix solve)
python tests/test_spsm.py --synthetic --n 512 --rhs 32
```

### Multi-GPU Test Runner

```bash
python run_flagsparse_pytest.py --mode quick --ops gather,spmv_csr,spmm_csr --gpus 0
python run_flagsparse_pytest.py --op-list ops.txt --gpus 0,1 --results-dir pytest_results
```

## Performance Benchmarks

```bash
# Quick synthetic benchmark
python tools/ci/run_gpu_benchmark.py --suite quick

# Full benchmark with test matrices
python tools/ci/run_gpu_benchmark.py --suite full --matrix-dir tests/data

# Via make target
make gpu-benchmark
```

## Make Targets

| Target | Description |
|--------|-------------|
| `make help` | List all local entry points |
| `make ci` | Full CPU-only CI pipeline |
| `make check` | CPU quality gates |
| `make smoke` | CPU smoke tests |
| `make format-check` | Format checking |
| `make lint` | Lint CI helpers |
| `make lint-src` | Lint critical package source |
| `make gpu-env-check` | Validate CUDA visibility |
| `make gpu-benchmark` | Quick synthetic benchmarks |
| `make triton-smoke` | Triton-dependent smoke tests |
| `make release-check` | Build and validate release artifacts |
