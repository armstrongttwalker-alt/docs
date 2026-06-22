# 运行测试和基准测试

从项目根目录运行，或 `cd tests` 后运行脚本（`.mtx` 目录路径如 `../matrix`）。

## 算子测试运行器

按算子进行 YAML 驱动的精度/性能运行：

```bash
python run_flagsparse_accuracy.py --list-ops
python run_flagsparse_accuracy.py --mode quick --gpus 0
python run_flagsparse_performance.py --ops spmv_csr,spmm_csr --benchmark-input matrix --benchmark-warmup 5 --benchmark-iters 20
python run_flagsparse_pytest.py --phase both --mode quick --gpus 0,1 --benchmark-input matrix --results-dir pytest_results
```

默认情况下，`run_flagsparse_accuracy.py` 和 `run_flagsparse_performance.py` 从 `conf/operators.yaml` 读取算子 ID，按 `--stages` 过滤，并将算子分布到 `--gpus` 上。`run_flagsparse_pytest.py --phase both` 在需要一条命令运行两个阶段时仍然可用。`--ops` 和 `--op-list` 会覆盖 YAML 选择。默认扫描排除手动测试条目 `alpha_spmm_alg1` 和 `spmv_coo_tocsr`；需要时使用 `--ops` 或 `--op-list` 显式包含它们。辅助 API 如 `spsv_descriptor_api` 和 `sparse_format_constructors` 不是算子测试条目。

精度阶段启动 `pytest tests/pytest -m <算子标记> --mode quick|normal --record json --output <op>/accuracy_result.json` 并使用合成 CUDA 数据。性能阶段为每个算子启动配置的 `tests/test_*.py` 基准测试命令；MatrixMarket 支持的命令接收 `--benchmark-input`（默认 `tests/data`，或传递 `matrix` 以使用本地矩阵目录），CSV 输出也会规范化为 FlagGems 风格的 `<op>/performance_result.json`。结果写入 `pytest_results_<timestamp>/` 下，除非提供了 `--results-dir`。每个算子目录包含 `accuracy_stdout.log`、`accuracy_stderr.log`、`accuracy_result.json`、`accuracy_detail.json`、`performance_stdout.log`、`performance_stderr.log`、`performance.csv`、`performance_result.json` 和 `performance_detail.json`（当这些阶段运行时）。根目录的 `summary.json` 使用 FlagGems 的 `timestamp` / `env` / `result` 结构。FlagSparse 特有字段如 GPU ID、命令、日志、总计、解析的 pytest 用例和规范化的基准测试记录保留在 `summary_flat.json` 和每个算子的 `*_detail.json` 文件中。`summary.csv` 和可选的 `summary.xlsx` 提供表格友好的视图，`result.html` 自动生成用于浏览器检查。生成的 `result.html` 从 `summary_flat.json` 渲染；`summary.json` 仍然是外部工具的紧凑 FlagGems 兼容摘要。

## 直接 pytest 精度套件

面向开发的精度检查，可按标记选择：

```bash
pytest tests/pytest --mode quick
pytest tests/pytest --mode normal -m "spmv_csr or spmm_csr"
pytest tests/pytest --mode quick -m "spmv_coo_tocsr"
```

添加或更改算子测试条目时，请保持实现/API 注册、`conf/operators.yaml` 条目、`pytest.ini` 中的 pytest 标记、精度测试、性能命令以及公共替换/导出注册同步。

## test_spmv.py

CSR SpMV（SuiteSparse `.mtx`、合成或 CSR CSV 导出）：

```bash
python tests/test_spmv.py <dir_or_file.mtx>              # 批量运行，默认 float32
python tests/test_spmv.py <dir/> --dtype float64         # 可选：--index-dtype int32|int64、--warmup、--iters、--no-cusparse
python tests/test_spmv.py --synthetic                    # 合成基准测试
python tests/test_spmv.py <dir/> --csv-csr results.csv   # 所有 value×index dtype -> 一个 CSV（运行时每矩阵行）
```

## test_spmv_coo.py

COO SpMV（需要 `--synthetic` 或 `--csv-coo`；不支持独立的 `.mtx` 批量）：

```bash
python tests/test_spmv_coo.py --synthetic
python tests/test_spmv_coo.py <dir/> --csv-coo out.csv
```

## test_spmv_opt.py

SpMV 基准 vs 优化 A/B（仅 `float32` / `float64`）：

```bash
python tests/test_spmv_opt.py <dir_or_file.mtx> [...]
python tests/test_spmv_opt.py <dir/> --csv out.csv
```

## test_spmm.py

CSR SpMM（`.mtx` 批量、合成或 `--csv`）：

```bash
python tests/test_spmm.py <dir_or_file.mtx>
python tests/test_spmm.py --synthetic                    # 可选：--ops non,trans,conj
python tests/test_spmm.py <dir/> --csv results.csv      # float32/float64/complex64/complex128 + int32/int64 + ops 网格
# 常用选项：--dtype、--index-dtype、--ops、--dense-cols、--block-n、--block-nnz、--max-segments、--warmup、--iters、--no-cusparse
# CSR SpMM 支持 op="non" (A @ B)、op="trans" (A.T @ B) 和 op="conj" (A.conj().T @ B)。
```

## test_spmm_opt.py

CSR SpMM 基准 vs 优化 A/B：

```bash
python tests/test_spmm_opt.py <dir_or_file.mtx> --dense-cols 32
python tests/test_spmm_opt.py <dir/> --csv spmm_opt.csv  # 可选：--dtype float32|float64、--dense-cols
# 常用选项：--dtype、--dense-cols、--warmup、--iters
```

## test_spmm_coo.py

原生 COO SpMM：

```bash
python tests/test_spmm_coo.py <dir_or_file.mtx>
python tests/test_spmm_coo.py --synthetic                # 可选：--route rowrun|atomic|compare、--skip-api-checks、--skip-coo-coverage
python tests/test_spmm_coo.py <dir/> --csv out.csv      # 仅 --route rowrun 或 atomic（非 compare）
# 适用时与 CSR SpMM 相同的调优标志：--dense-cols、--block-n、--block-nnz、--warmup、--iters、--no-cusparse
```

## test_sddmm.py

CSR SDDMM（`.mtx` 批量或 `--csv`）：

```bash
python tests/test_sddmm.py <dir_or_file.mtx> --k 64
python tests/test_sddmm.py <dir/> --csv out.csv          # 可选：--dtype float32|float64、--acc_mode f32|f64、--k 64
# 常用选项：--dtype、--index-dtype、--acc_mode、--k、--alpha、--beta、--warmup、--iters、--no-cupy-ref、--skip-api-checks
```

## test_spgemm.py

CSR SpGEMM（`.mtx` 批量或 `--csv`）：

```bash
python tests/test_spgemm.py <dir_or_file.mtx> --input-mode auto
python tests/test_spgemm.py <dir/> --csv results.csv     # 可选：--dtype float32|float64、--input-mode auto|a_equals_b|a_at、--compare-device cpu|gpu
# 常用选项：--dtype、--index-dtype、--warmup、--iters、--input-mode、--adaptive-loops、--no-cusparse、--ref-blocked-retry、--ref-isolated-retry、--ref-block-rows、--compare-device、--run-api-checks
```

## test_spsv.py

SpSV（三角求解；仅**方阵**）。CSR 和 COO 共享此脚本；**没有** `test_spsv_coo.py`。

```bash
python tests/test_spsv.py --synthetic
python tests/test_spsv.py <dir/> --csv-csr spsv.csv
python tests/test_spsv.py <dir/> --csv-coo out.csv      # 与 CSR 相同的 CSV 列
```

## test_spsm.py

SpSM（三角矩阵-矩阵求解；仅**方阵**）：

```bash
python tests/test_spsm.py --synthetic --n 512 --rhs 1024
python tests/test_spsm.py <dir/> --csv-csr spsm_csr.csv --rhs 1024
python tests/test_spsm.py <dir/> --csv-coo spsm_coo.csv --rhs 1024
```

## test_gather.py / test_scatter.py

Gather/scatter 基准测试（pytest 或 `python tests/test_gather.py`）。

精度套件应使用 `tests/pytest/accuracy_utils.py` 获取 FlagGems 风格的金标准参考和容差策略。数值计算算子与转换回测试 dtype 的 CPU-FP64 金标准参考进行比较，而精确/逻辑输出与 CPU int32 参考进行比较。

## CI/CD

- `.github/workflows/ci.yml` 仅 CPU，在 GitHub 托管运行器上运行编译、格式检查、lint、源码关键静态检查、构建、安装和冒烟测试。
- 冒烟集现在涵盖安装后的 wheel 验证、打包元数据、公共 API 表面、算子注册表一致性、共享运行时策略辅助函数、CLI `--help` 和 README 命令片段。
- `conf/operators.yaml` 是统一测试运行器使用的公共 FlagSparse 稀疏算子的 FlagGems 风格算子接口注册表。
- `.github/workflows/nightly-cpu.yml` 是 `main` 分支专用的每夜 CPU 检查，重复包、lint 和共享运行时冒烟测试。
- `.github/workflows/release.yml` 构建源码和 wheel 工件，然后在 `v*` 标签上附加到 GitHub Releases。
- `.github/workflows/triton-smoke.yml` 是 triton 依赖冒烟检查的手动选择加入作业。
- `.github/workflows/gpu-ci.yml` 是手动 GPU 精度冒烟工作流，用于标记为 `self-hosted`、`linux` 和 `gpu` 的自托管运行器。
- `.github/workflows/gpu-benchmark.yml` 添加了一个 Actions 按钮，用于在标记为 `self-hosted`、`linux` 和 `gpu` 的自托管运行器上运行合成 GPU 基准测试。
- `.github/workflows/release-drafter.yml` 从合并的 PR 中保持草稿发布说明最新。
- `make help` 列出本地入口点。
- `make ci` / `make check` 运行 CI 使用的相同仅 CPU 流水线。
- `make format-check`、`make lint` 和 `make lint-src` 是 CI 格式化、CI 辅助 lint 和关键包源码静态检查的非 GPU 质量门。
- `make smoke` 是 CPU 冒烟阶段别名。
- `make release-check` / `make release` 构建、验证和校验发布工件。
- `make triton-smoke` 和 `make triton-deps` 是 triton 依赖运行时检查的可选本地目标。
- `make gpu-env-check` 通过 `tools/ci/check_gpu_environment.py` 在 GPU 运行器上验证 CUDA 可见性。
- `make gpu-benchmark` 在 CUDA 机器上运行快速合成基准测试套件。
- `python tools/ci/run_gpu_benchmark.py --suite quick` 在 CUDA 机器上本地镜像手动 GPU 基准测试工作流。
- `python tools/ci/run_gpu_benchmark.py --suite full --matrix-dir tests/data` 运行完整基准测试矩阵，包括针对仓库测试矩阵的 `.mtx` 支持的 SpGEMM 和 SDDMM 套件。
- `tools/ci/requirements-ci.lock.txt` 和 `tools/ci/requirements-triton-smoke.lock.txt` 是这些 make 目标背后的固定本地依赖包。
- `.github/dependabot.yml` 保持 GitHub Actions 和 Python 依赖更新可见。
- `.github/ISSUE_TEMPLATE/` 为 bug 和功能请求保持结构化的 issue 入口点。
- CI 依赖包现在仅保留打包和测试工具；triton 依赖冒烟通过 `FLAGSPARSE_TRITON_SMOKE=1` 选择加入。
- 发布工件现在附带生成的 `SHA256SUMS` 清单和 CI 中匹配的校验和验证步骤。
- PR 质量门通过默认 CPU CI 工作流实现；在 GitHub 中配置分支保护以要求 `CI / Build and smoke test` 检查通过后再合并。
- GPU 精度和基准测试脚本仍然需要 CUDA 硬件；GPU 工作流是手动的，仅在自托管 GPU 运行器上运行。

## 性能

- `benchmark/performance_utils.py` 定义了 pytest 风格的性能基类、默认指标（`latency_base`、`latency`、`speedup`）、中位数计时、预热/迭代控制、CUDA 同步、CSV 记录辅助函数以及两级平均加速比规则。
- `benchmark/attri_util.py` 和 `benchmark/core_shapes.yaml` 集中维护默认和特殊形状网格。
- `benchmark/summary_for_plot.py` 读取记录的基准测试 CSV 文件并报告两级加速比摘要。
- `benchmark/test_sparse_perf.py` 是一个可选的 pytest 入口点；实际的 GPU 运行仍然是手动或自托管的，因为 GitHub 托管运行器不提供 CUDA GPU。
- `tests/data/*.mtx` 可用作 mtx 支持的 GPU 基准测试套件的默认 MatrixMarket 冒烟数据集。
