# Operator Registry

The complete operator registry is maintained at [FlagSparse conf/operators.yaml](https://github.com/flagos-ai/FlagSparse/blob/main/conf/operators.yaml).

## gather

Gathers values from a dense tensor by index using the FlagSparse gather path.

| Field | Value |
|---|---|
| **id** | gather |
| **kind** | Sparse |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, triton, public-api |
| **for** | flagsparse_gather |

## scatter

Scatters values into a dense tensor by index using the FlagSparse scatter path.

| Field | Value |
|---|---|
| **id** | scatter |
| **kind** | Sparse |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, triton, public-api |
| **for** | flagsparse_scatter |

## spmv_csr

Computes sparse matrix-vector multiplication for a CSR matrix.

| Field | Value |
|---|---|
| **id** | spmv_csr |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, public-api |
| **for** | flagsparse_spmv_csr, prepare_spmv_csr |

## spmv_coo

Computes sparse matrix-vector multiplication for a COO matrix.

| Field | Value |
|---|---|
| **id** | spmv_coo |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, coo, triton, public-api |
| **for** | flagsparse_spmv_coo, prepare_spmv_coo |

## spmv_coo_tocsr

Computes COO SpMV through a COO-to-CSR preparation path.

| Field | Value |
|---|---|
| **id** | spmv_coo_tocsr |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, coo, csr, triton, public-api |
| **for** | flagsparse_spmv_coo_tocsr, prepare_spmv_coo_tocsr |

## spmm_csr

Computes sparse matrix-dense matrix multiplication for a CSR matrix.

| Field | Value |
|---|---|
| **id** | spmm_csr |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, public-api |
| **for** | flagsparse_spmm_csr, flagsparse_spmm_csr_run, prepare_spmm_csr_route |

## spmm_coo

Computes sparse matrix-dense matrix multiplication for a COO matrix.

| Field | Value |
|---|---|
| **id** | spmm_coo |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, coo, triton, public-api |
| **for** | flagsparse_spmm_coo |

## spmm_csr_opt

Computes optimized CSR sparse matrix-dense matrix multiplication.

| Field | Value |
|---|---|
| **id** | spmm_csr_opt |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, optimized, public-api |
| **for** | flagsparse_spmm_csr_opt, prepare_spmm_csr_opt |

## spmm_csr_opt_alg1

Computes optimized CSR SpMM using the algorithm 1 path.

| Field | Value |
|---|---|
| **id** | spmm_csr_opt_alg1 |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, optimized, public-api |
| **for** | flagsparse_spmm_csr_opt_alg1, flagsparse_spmm_csr_opt_alg1_preprocess, prepare_spmm_csr_opt_alg1, prepare_spmm_csr_opt_alg1_preprocess |

## spmm_csr_opt_alg2

Computes optimized CSR SpMM using the algorithm 2 path.

| Field | Value |
|---|---|
| **id** | spmm_csr_opt_alg2 |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, optimized, public-api |
| **for** | flagsparse_spmm_csr_opt_alg2, flagsparse_spmm_csr_opt_alg2_preprocess, prepare_spmm_csr_opt_alg2, prepare_spmm_csr_opt_alg2_preprocess |

## alpha_spmm_alg1

Computes AlphaSparse-style CSR SpMM using the algorithm 1 implementation family.

| Field | Value |
|---|---|
| **id** | alpha_spmm_alg1 |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, alpha-sparse, public-api |
| **for** | flagsparse_alpha_spmm_alg1, flagsparse_alpha_spmm_alg1_tle, flagsparse_alpha_spmm_alg1_tle_opt, prepare_alpha_spmm_alg1, prepare_alpha_spmm_alg1_tle, prepare_alpha_spmm_alg1_tle_opt |

## spgemm_csr

Computes sparse matrix-sparse matrix multiplication for CSR inputs.

| Field | Value |
|---|---|
| **id** | spgemm_csr |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, public-api |
| **for** | flagsparse_spgemm_csr, prepare_spgemm_csr |

## sddmm_csr

Computes sampled dense-dense matrix multiplication on a CSR sparsity pattern.

| Field | Value |
|---|---|
| **id** | sddmm_csr |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, public-api |
| **for** | flagsparse_sddmm_csr, prepare_sddmm_csr |

## spsv_csr

Solves sparse triangular systems represented in CSR format.

| Field | Value |
|---|---|
| **id** | spsv_csr |
| **kind** | SparseSolver |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, public-api |
| **for** | flagsparse_spsv_csr |

## spsv_coo

Solves sparse triangular systems represented in COO format.

| Field | Value |
|---|---|
| **id** | spsv_coo |
| **kind** | SparseSolver |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, coo, triton, public-api |
| **for** | flagsparse_spsv_coo |

## spsv_descriptor_api

Provides descriptor, buffer-size, analysis, preprocess, and solve APIs for SpSV workflows.

| Field | Value |
|---|---|
| **id** | spsv_descriptor_api |
| **kind** | SparseSolver, Utility |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, coo, descriptor, public-api |
| **for** | flagsparse_create_spsv_handle, flagsparse_create_dnvec, flagsparse_create_spmat_csr, flagsparse_create_spmat_coo, flagsparse_spsv_buffer_size, flagsparse_spsv_buffer_size_ex, flagsparse_spsv_create_workspace, flagsparse_spsv_analysis_csr, flagsparse_spsv_analysis_coo, flagsparse_spsv_analysis_ex, flagsparse_spsv_preprocess_csr, flagsparse_spsv_preprocess_coo, flagsparse_spsv_solve_csr, flagsparse_spsv_solve_coo, flagsparse_spsv_solve_ex |

## spsm_csr

Solves sparse triangular systems with dense matrix right-hand sides in CSR format.

| Field | Value |
|---|---|
| **id** | spsm_csr |
| **kind** | SparseSolver |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, public-api |
| **for** | flagsparse_spsm_csr |

## spsm_coo

Solves sparse triangular systems with dense matrix right-hand sides in COO format.

| Field | Value |
|---|---|
| **id** | spsm_coo |
| **kind** | SparseSolver |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, coo, triton, public-api |
| **for** | flagsparse_spsm_coo |

## sparse_format_constructors

Creates sparse matrix containers and converts COO data into supported sparse formats.

| Field | Value |
|---|---|
| **id** | sparse_format_constructors |
| **kind** | SparseFormat, Utility |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, format, public-api |
| **for** | create_csr_matrix, create_coo_matrix, create_csc_matrix, create_bsr_matrix, create_sell_matrix, create_blocked_ell_matrix, coo_to_csr, coo_to_csc, coo_to_bsr, coo_to_sell, coo_to_blocked_ell, generate_random_sparse_matrix, read_mtx_file |
