# FlagSparse Overview

FlagSparse is a GPU sparse operations package providing high-performance implementations of sparse linear algebra operations. It is part of the [FlagOS](https://flagos.io/) ecosystem.

## Operators

FlagSparse provides the following sparse operators:

| Operator | Description | Formats |
|----------|-------------|---------|
| SpMV | Sparse matrix-vector multiplication | CSR, COO |
| SpMM | Sparse matrix-dense matrix multiplication | CSR, COO |
| SpGEMM | Sparse matrix-matrix multiplication | CSR |
| SDDMM | Sampled Dense-Dense Matrix Multiplication | CSR |
| SpSV | Sparse triangular solve (vector) | CSR, COO |
| SpSM | Sparse triangular solve (matrix) | CSR, COO |
| Gather | Gather operation | -- |
| Scatter | Scatter operation | -- |

## Sparse Formats

- **CSR** (Compressed Sparse Row) -- Standard format for row-oriented sparse operations.
- **COO** (Coordinate format) -- Triples of (row, column, value).

## Architecture

- `src/flagsparse/` -- Core package. `sparse_operations/` is emitted as several `.py` modules from string literals in `flagsparse.py`.
- `tests/` -- Pytest accuracy tests and benchmarks.
- `benchmark/` -- Performance benchmarks.
