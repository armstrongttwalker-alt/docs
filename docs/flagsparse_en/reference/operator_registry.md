# Operator Registry

| ID | Kind | Description | Stage |
|---|---|---|---|
| gather | Sparse | Gathers values from a dense tensor by index using the FlagSparse gather path. | beta 1.0 |
| scatter | Sparse | Scatters values into a dense tensor by index using the FlagSparse scatter path. | beta 1.0 |
| spmv_csr | SparseLinearAlg | Computes sparse matrix-vector multiplication for a CSR matrix. | beta 1.0 |
| spmv_coo | SparseLinearAlg | Computes sparse matrix-vector multiplication for a COO matrix. | beta 1.0 |
| spmv_coo_tocsr | SparseLinearAlg | Computes COO SpMV through a COO-to-CSR preparation path. | beta 1.0 |
| spmm_csr | SparseLinearAlg | Computes sparse matrix-dense matrix multiplication for a CSR matrix. | beta 1.0 |
| spmm_coo | SparseLinearAlg | Computes sparse matrix-dense matrix multiplication for a COO matrix. | beta 1.0 |
| spmm_csr_opt | SparseLinearAlg | Computes optimized CSR sparse matrix-dense matrix multiplication. | beta 1.0 |
| spmm_csr_opt_alg1 | SparseLinearAlg | Computes optimized CSR SpMM using the algorithm 1 path. | beta 1.0 |
| spmm_csr_opt_alg2 | SparseLinearAlg | Computes optimized CSR SpMM using the algorithm 2 path. | beta 1.0 |
| alpha_spmm_alg1 | SparseLinearAlg | Computes AlphaSparse-style CSR SpMM using the algorithm 1 implementation family. | beta 1.0 |
| spgemm_csr | SparseLinearAlg | Computes sparse matrix-sparse matrix multiplication for CSR inputs. | beta 1.0 |
| sddmm_csr | SparseLinearAlg | Computes sampled dense-dense matrix multiplication on a CSR sparsity pattern. | beta 1.0 |
| spsv_csr | SparseSolver | Solves sparse triangular systems represented in CSR format. | beta 1.0 |
| spsv_coo | SparseSolver | Solves sparse triangular systems represented in COO format. | beta 1.0 |
| spsv_descriptor_api | SparseSolver, Utility | Provides descriptor, buffer-size, analysis, preprocess, and solve APIs for SpSV workflows. | beta 1.0 |
| spsm_csr | SparseSolver | Solves sparse triangular systems with dense matrix right-hand sides in CSR format. | beta 1.0 |
| spsm_coo | SparseSolver | Solves sparse triangular systems with dense matrix right-hand sides in COO format. | beta 1.0 |
| sparse_format_constructors | SparseFormat, Utility | Creates sparse matrix containers and converts COO data into supported sparse formats. | beta 1.0 |
