# FlagSparse User Guide

## Use Sparse Operators

### SpMV (Sparse Matrix-Vector Multiplication)

Compute y = A * x where A is a sparse matrix and x is a dense vector.

| Variant | Format | Description |
|---|---|---|
| `spmv_csr` | CSR | Standard CSR SpMV |
| `spmv_coo` | COO | Native COO SpMV |
| `spmv_coo_tocsr` | COO→CSR | COO SpMV through CSR preparation path |

### SpMM (Sparse Matrix-Dense Matrix Multiplication)

Compute C = A * B where A is sparse and B is dense.

| Variant | Format | Description |
|---|---|---|
| `spmm_csr` | CSR | Standard CSR SpMM |
| `spmm_coo` | COO | Native COO SpMM |
| `spmm_csr_opt` | CSR | Optimized CSR SpMM |
| `spmm_csr_opt_alg1` | CSR | Optimized CSR SpMM (algorithm 1) |
| `spmm_csr_opt_alg2` | CSR | Optimized CSR SpMM (algorithm 2) |
| `alpha_spmm_alg1` | CSR | AlphaSparse-style CSR SpMM (alg1, TLE, TLE-opt variants) |

### SpGEMM (Sparse Matrix-Matrix Multiplication)

Compute C = A * B where all matrices are sparse.

| Variant | Format | Description |
|---|---|---|
| `spgemm_csr` | CSR | CSR SpGEMM with multiple input modes (auto, a_equals_b, a_at) |

### SDDMM (Sampled Dense-Dense Matrix Multiplication)

Compute C = alpha * (A * B) sampled at sparse positions + beta * C.

| Variant | Format | Description |
|---|---|---|
| `sddmm_csr` | CSR | CSR SDDMM with configurable alpha, beta, and k parameters |

### SpSV / SpSM (Sparse Triangular Solve)

Solve L * x = b (vector) or L * X = B (matrix) where L is a sparse triangular matrix.

| Variant | Format | Description |
|---|---|---|
| `spsv_csr` | CSR | Sparse triangular solve (vector) |
| `spsv_coo` | COO | Sparse triangular solve (vector) |
| `spsm_csr` | CSR | Sparse triangular solve (matrix) |
| `spsm_coo` | COO | Sparse triangular solve (matrix) |

### Gather / Scatter

Data movement operations between dense and sparse formats.

| Variant | Description |
|---|---|
| `gather` | Gather values from dense tensor by index |
| `scatter` | Scatter values into dense tensor by index |

### Sparse Format Constructors

`create_csr_matrix`, `create_coo_matrix`, `create_csc_matrix`, `create_bsr_matrix`, `create_sell_matrix`, `create_blocked_ell_matrix`, `coo_to_csr`, `coo_to_csc`, `coo_to_bsr`, `coo_to_sell`, `coo_to_blocked_ell`, `generate_random_sparse_matrix`, `read_mtx_file`

### SpSV Descriptor API

Full descriptor, buffer-size, analysis, preprocess, and solve API for SpSV workflows.

## Operator Registry

FlagSparse uses a FlagGems-style operator interface registry defined in `conf/operators.yaml`. This ensures consistent public API surface across all sparse operators and sparse-format helpers.
