# FlagSparse User Guide

## Sparse Operators

### SpMV (Sparse Matrix-Vector Multiplication)

Compute y = A * x where A is a sparse matrix and x is a dense vector.

Supports CSR and COO formats.

### SpMM (Sparse Matrix-Dense Matrix Multiplication)

Compute C = A * B where A is sparse and B is dense.

Supports CSR and COO formats with configurable dense column counts.

### SpGEMM (Sparse Matrix-Matrix Multiplication)

Compute C = A * B where all matrices are sparse.

Supports CSR format with multiple input modes (auto, a_equals_b, a_at).

### SDDMM (Sampled Dense-Dense Matrix Multiplication)

Compute C = alpha * (A * B) sampled at sparse positions + beta * C.

Supports CSRformat with configurable alpha, beta, and k parameters.

### SpSV / SpSM (Sparse Triangular Solve)

Solve L * x = b (vector) or L * X = B (matrix) where L is a sparse triangular matrix.

Requires square matrices. Supports CSR and COO formats.

### Gather / Scatter

Data movement operations between dense and sparse formats.

## Operator Registry

FlagSparse uses a FlagGems-style operator interface registry defined in `conf/operators.yaml`. This ensures consistent public API surface across all sparse operators and sparse-format helpers.
