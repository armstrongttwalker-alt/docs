# FlagTensor 验收检查清单

本检查清单跟踪算子库验收标准的当前合规状态。

## 结构与组织

| 项目 | 状态 | 说明 |
| --- | --- | --- |
| 统一算子注册表存在 | **已完成** | `conf/operators.yaml` |
| 注册表是 CI/每周/入口点 | **已完成** | `tools/run_flagtensor_ci.py` 和 `run_flagtensor_weekly.py` 使用它 |
| `tests/` 目录存在作为正确性入口 | **已完成** | 基于类别的组织：`tests/{unary,binary,contraction,sparse}/`。所有类别已迁移（28 个一元、4 个二元、5 个收缩、1 个稀疏）。旧版每个算子的 `ctests/` 文件保留为兼容性填充。 |
| 基准测试 dtype 覆盖率 | **已完成** | float16、float32，按 `DEFAULT_BENCHMARK_DTYPES` |
| 正确性 dtype 覆盖率 | **已完成** | float16、float32、bfloat16，按 `DEFAULT_CORRECTNESS_DTYPES` |
| 基准测试形状覆盖率 | **已完成** | 一元/二元：22 个形状（14 个一维 pow2 + 8 个多维）；收缩：4 个形状对；稀疏：3 个形状对 |
| `benchmark/` 支持类别级执行 | **已完成** | 全部四个类别：`test_unary_perf.py`、`test_binary_perf.py`、`test_contraction_perf.py`、`test_sparse_perf.py` |
| Pre-commit 配置存在 | **已完成** | `.pre-commit-config.yaml` |
| pyproject.toml 具有工具配置 | **已完成** | black、isort、flake8、pytest 标记 |

## 测试框架

| 项目 | 状态 | 说明 |
| --- | --- | --- |
| 基于 Pytest 的正确性测试 | **已完成** | `ctests/` 和 `tests/` |
| 共享容差/断言辅助函数 | **已完成** | 集中在 `src/flagtensor/testing/` 包中，包含 `assertions.py`、`shapes.py`、`dtypes.py` 模块 |
| `tests/accuracy_utils.py` 兼容层 | **已完成** | 从 `flagtensor.testing` 重新导出 |
| Dtype 感知容差策略 | **已完成** | float16、float32、bfloat16 |
| 参考选择已记录 | **已完成** | `docs/testing_strategy.md` |
| 形状覆盖率策略已记录 | **已完成** | `docs/testing_strategy.md` |

## 性能测试

| 项目 | 状态 | 说明 |
| --- | --- | --- |
| 以 cuTensor 基线为基准进行基准测试 | **已完成** | 现有基准测试套件 |
| 内核/算子/包装器模式已定义 | **已完成** | `docs/benchmark_strategy.md` |
| 冒烟 vs 完整运行区分 | **已完成** | `run_flagtensor_ci.py --smoke` |
| 预热/重复/计时标准 | **已完成** | 整合在 `benchmark_core.py` 和 `config.py` 中 |
| 模式感知 CSV 选择 | **已完成** | CI 运行器中的 `benchmark_csv_path()` |
| HTML/XLSX 报告生成 | **已完成** | HTML 报告工具存在；通过 `visualization.py` 中的 `write_benchmark_xlsx()` 输出 XLSX |

## CI/CD 与自动化

| 项目 | 状态 | 说明 |
| --- | --- | --- |
| 正确性 CI 作业 | **已完成** | `ci.yaml` correctness-smoke |
| 性能 CI 作业 | **已完成** | `ci.yaml` perf-smoke |
| 每周回归工作流 | **已完成** | `weekly.yaml`（注册表驱动） |
| 质量门（pre-commit） | **已完成** | `quality-gate.yaml` |
| 注册表一致性检查 | **已完成** | `quality-gate.yaml` registry-consistency 作业 |
| 构建/包检查 | **已完成** | `quality-gate.yaml` build-check 作业 |
| 工件上传和摘要 | **已完成** | CI 中的 Artifacts + GITHUB_STEP_SUMMARY |
| 验收级 CI 工作流 | **已完成** | `acceptance.yaml`，支持类别/模式过滤 |
| CI 矩阵文档 | **已完成** | `docs/acceptance/ci_matrix.md` |
| 发布/发布工作流 | **已完成** | `release.yaml`，包含构建、发布说明、PyPI 发布 |
| 多后端兼容性 CI | **已完成** | `compatibility.yaml`，包含 CUDA 12.1/12.4/12.6 矩阵 + H20 回归 |

## 文档与发布

| 项目 | 状态 | 说明 |
| --- | --- | --- |
| 包含使用示例的 README | **已完成** | `README.md` |
| 测试策略文档 | **已完成** | `docs/testing_strategy.md` |
| 基准测试策略文档 | **已完成** | `docs/benchmark_strategy.md` |
| 验收检查清单 | **已完成** | 本文件 |
| 算子覆盖率矩阵 | **已完成** | `docs/acceptance/operator_coverage.md` |
| FlagTensor 特定的精度/基准测试策略存在 | **已完成** | `docs/acceptance/accuracy_policy.md`、`docs/acceptance/benchmark_policy.md` |
| 已知问题列表 | **已完成** | `docs/acceptance/known_issues.md` |
| 标准验收命令 | **已完成** | `docs/acceptance/standard_commands.md` |
| 发布说明模板 | **已完成** | `docs/acceptance/release_notes_template.md` |

## 已知问题

所有先前记录的问题已解决：

- `exp` 和 `log`：移除了 float64 回退 —— float64 不再是支持的 dtype。
- `tensor_contraction_trinary`：移除了 float64 路径；算子仅支持 float16/float32。
- `block_sparse_tensor_contraction` float16：通过稠密回退路由修复；float16 测试现已激活。
