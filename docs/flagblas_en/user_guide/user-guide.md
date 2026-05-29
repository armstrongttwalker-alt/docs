# FlagBLAS User Guide

## BLAS Interface

FlagBLAS follows the standard BLAS interface, providing three levels of operations:

### Level 1 -- Vector Operations

Operations on vectors including dot products, scaling, and norms.

### Level 2 -- Matrix-Vector Operations

Operations between matrices and vectors, including matrix-vector multiplication and rank-1 updates.

### Level 3 -- Matrix-Matrix Operations

Operations between matrices, including general matrix multiply (GEMM) and triangular solve.

## Multi-Backend Support

FlagBLAS's flexible backend mechanism allows it to target different chip vendors. The active backend is determined by the Triton configuration on your system.

## Integration with PyTorch

FlagBLAS operators can be called directly on PyTorch CUDA tensors, providing seamless integration with existing PyTorch workflows.
