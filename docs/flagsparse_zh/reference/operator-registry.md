# 算子注册表

完整的算子注册表维护在 [FlagSparse conf/operators.yaml](https://github.com/flagos-ai/FlagSparse/blob/main/conf/operators.yaml)。

## gather

使用 FlagSparse gather 路径按索引从稠密张量中收集值。

| 字段 | 值 |
|---|---|
| **id** | gather |
| **kind** | Sparse |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, triton, public-api |
| **for** | flagsparse_gather |

## scatter

使用 FlagSparse scatter 路径按索引将值散布到稠密张量中。

| 字段 | 值 |
|---|---|
| **id** | scatter |
| **kind** | Sparse |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, triton, public-api |
| **for** | flagsparse_scatter |

## spmv_csr

计算 CSR 矩阵的稀疏矩阵-向量乘法。

| 字段 | 值 |
|---|---|
| **id** | spmv_csr |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, public-api |
| **for** | flagsparse_spmv_csr, prepare_spmv_csr |

## spmv_coo

计算 COO 矩阵的稀疏矩阵-向量乘法。

| 字段 | 值 |
|---|---|
| **id** | spmv_coo |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, coo, triton, public-api |
| **for** | flagsparse_spmv_coo, prepare_spmv_coo |

## spmv_coo_tocsr

通过 COO-to-CSR 准备路径计算 COO SpMV。

| 字段 | 值 |
|---|---|
| **id** | spmv_coo_tocsr |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, coo, csr, triton, public-api |
| **for** | flagsparse_spmv_coo_tocsr, prepare_spmv_coo_tocsr |

## spmm_csr

计算 CSR 矩阵的稀疏矩阵-稠密矩阵乘法。

| 字段 | 值 |
|---|---|
| **id** | spmm_csr |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, public-api |
| **for** | flagsparse_spmm_csr, flagsparse_spmm_csr_run, prepare_spmm_csr_route |

## spmm_coo

计算 COO 矩阵的稀疏矩阵-稠密矩阵乘法。

| 字段 | 值 |
|---|---|
| **id** | spmm_coo |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, coo, triton, public-api |
| **for** | flagsparse_spmm_coo |

## spmm_csr_opt

计算优化的 CSR 稀疏矩阵-稠密矩阵乘法。

| 字段 | 值 |
|---|---|
| **id** | spmm_csr_opt |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, optimized, public-api |
| **for** | flagsparse_spmm_csr_opt, prepare_spmm_csr_opt |

## spmm_csr_opt_alg1

使用算法 1 路径计算优化的 CSR SpMM。

| 字段 | 值 |
|---|---|
| **id** | spmm_csr_opt_alg1 |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, optimized, public-api |
| **for** | flagsparse_spmm_csr_opt_alg1, flagsparse_spmm_csr_opt_alg1_preprocess, prepare_spmm_csr_opt_alg1, prepare_spmm_csr_opt_alg1_preprocess |

## spmm_csr_opt_alg2

使用算法 2 路径计算优化的 CSR SpMM。

| 字段 | 值 |
|---|---|
| **id** | spmm_csr_opt_alg2 |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, optimized, public-api |
| **for** | flagsparse_spmm_csr_opt_alg2, flagsparse_spmm_csr_opt_alg2_preprocess, prepare_spmm_csr_opt_alg2, prepare_spmm_csr_opt_alg2_preprocess |

## alpha_spmm_alg1

使用算法 1 实现族计算 AlphaSparse 风格的 CSR SpMM。

| 字段 | 值 |
|---|---|
| **id** | alpha_spmm_alg1 |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, alpha-sparse, public-api |
| **for** | flagsparse_alpha_spmm_alg1, flagsparse_alpha_spmm_alg1_tle, flagsparse_alpha_spmm_alg1_tle_opt, prepare_alpha_spmm_alg1, prepare_alpha_spmm_alg1_tle, prepare_alpha_spmm_alg1_tle_opt |

## spgemm_csr

计算 CSR 输入的稀疏矩阵-稀疏矩阵乘法。

| 字段 | 值 |
|---|---|
| **id** | spgemm_csr |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, public-api |
| **for** | flagsparse_spgemm_csr, prepare_spgemm_csr |

## sddmm_csr

基于 CSR 稀疏模式计算采样稠密-稠密矩阵乘法。

| 字段 | 值 |
|---|---|
| **id** | sddmm_csr |
| **kind** | SparseLinearAlg |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, public-api |
| **for** | flagsparse_sddmm_csr, prepare_sddmm_csr |

## spsv_csr

求解 CSR 格式表示的稀疏三角系统。

| 字段 | 值 |
|---|---|
| **id** | spsv_csr |
| **kind** | SparseSolver |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, public-api |
| **for** | flagsparse_spsv_csr |

## spsv_coo

求解 COO 格式表示的稀疏三角系统。

| 字段 | 值 |
|---|---|
| **id** | spsv_coo |
| **kind** | SparseSolver |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, coo, triton, public-api |
| **for** | flagsparse_spsv_coo |

## spsv_descriptor_api

为 SpSV 工作流提供描述符、缓冲区大小、分析、预处理和求解 API。

| 字段 | 值 |
|---|---|
| **id** | spsv_descriptor_api |
| **kind** | SparseSolver, Utility |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, coo, descriptor, public-api |
| **for** | flagsparse_create_spsv_handle, flagsparse_create_dnvec, flagsparse_create_spmat_csr, flagsparse_create_spmat_coo, flagsparse_spsv_buffer_size, flagsparse_spsv_buffer_size_ex, flagsparse_spsv_create_workspace, flagsparse_spsv_analysis_csr, flagsparse_spsv_analysis_coo, flagsparse_spsv_analysis_ex, flagsparse_spsv_preprocess_csr, flagsparse_spsv_preprocess_coo, flagsparse_spsv_solve_csr, flagsparse_spsv_solve_coo, flagsparse_spsv_solve_ex |

## spsm_csr

求解 CSR 格式的带稠密矩阵右侧的稀疏三角系统。

| 字段 | 值 |
|---|---|
| **id** | spsm_csr |
| **kind** | SparseSolver |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, csr, triton, public-api |
| **for** | flagsparse_spsm_csr |

## spsm_coo

求解 COO 格式的带稠密矩阵右侧的稀疏三角系统。

| 字段 | 值 |
|---|---|
| **id** | spsm_coo |
| **kind** | SparseSolver |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, coo, triton, public-api |
| **for** | flagsparse_spsm_coo |

## sparse_format_constructors

创建稀疏矩阵容器并将 COO 数据转换为支持的稀疏格式。

| 字段 | 值 |
|---|---|
| **id** | sparse_format_constructors |
| **kind** | SparseFormat, Utility |
| **stages** | beta: 1.0 |
| **labels** | flagsparse, sparse, format, public-api |
| **for** | create_csr_matrix, create_coo_matrix, create_csc_matrix, create_bsr_matrix, create_sell_matrix, create_blocked_ell_matrix, coo_to_csr, coo_to_csc, coo_to_bsr, coo_to_sell, coo_to_blocked_ell, generate_random_sparse_matrix, read_mtx_file |
