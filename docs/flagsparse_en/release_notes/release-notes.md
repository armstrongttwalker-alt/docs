# FlagSparse Release Notes

## v0.2.0

- **Added Features**

  - **SpMM Operators** — SpMM COO, SpMM CSR-opt, SpMM CSR-opt-alg2, AlphaSparse SpMM alg1 (with TLE and TLE-opt variants).
    - Supported on NVIDIA.
  - **SpGEMM Operator** — Sparse matrix-sparse matrix multiplication for CSR inputs.
    - Supported on NVIDIA.
  - **SDDMM Operator** — Sampled dense-dense matrix multiplication on CSR sparsity pattern.
    - Supported on NVIDIA.
  - **SpSM Operator** — Sparse triangular solve with dense matrix right-hand sides (CSR and COO).
    - Supported on NVIDIA.
  - **SpSV Descriptor API** — Full descriptor, buffer-size, analysis, preprocess, and solve API for SpSV workflows.
    - Supported on NVIDIA.
  - **Sparse Format Constructors** — create_csr_matrix, create_coo_matrix, create_csc_matrix, create_bsr_matrix, create_sell_matrix, create_blocked_ell_matrix, coo_to_csr, coo_to_csc, coo_to_bsr, coo_to_sell, coo_to_blocked_ell, generate_random_sparse_matrix, read_mtx_file.
    - Supported on NVIDIA.
  - **Operator Registry** — Added `conf/operators.yaml` with full operator metadata and `ops_support.csv` / `ops_support.py` for tracking backend support.
    - Supported on NVIDIA.
  - **CI/CD Pipeline** — GPU CI workflow, nightly CPU checks, release drafter, pre-commit config, and Triton smoke tests.
    - Supported on NVIDIA.

- **Enhanced Features**

  - SpMV CSR and COO operators underwent significant optimization and accuracy improvements.
  - SpSV CSR and COO solvers expanded with comprehensive test coverage and descriptor-based API.
  - Gather/Scatter operators enhanced with int64 support.
  - Benchmark framework unified with standardized shape configurations and performance utilities.
  - pytest accuracy suite expanded with dedicated test files for all operators.
  - CI pipeline added GPU benchmark workflow, packaging metadata tests, and public API validation.

## v0.1.0

Initial release of FlagSparse.

- **Added Features**

  - GPU sparse operations package with SpMV, SpMM, SpGEMM, SDDMM, gather, and scatter operators.
  - CSR and COO sparse format support.
  - SpSV and SpSM triangular solve operators.
  - FlagGems-style operator interface registry (`conf/operators.yaml`).
  - pytest accuracy suite with CPU-FP64 golden reference comparison.
  - Performance benchmark framework with two-level speedup reporting.
  - Native CLI `--help` and README command snippets in CI smoke tests.
