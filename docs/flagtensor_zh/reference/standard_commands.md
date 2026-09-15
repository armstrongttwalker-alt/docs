# FlagTensor 标准验收命令

本文档提供运行 FlagTensor 验收检查的标准命令。

## 前提条件

```bash
# 安装包
python -m pip install .

# 安装 pre-commit 钩子（可选但推荐）
pre-commit install
```

## 静态质量检查

```bash
# 本地运行 pre-commit 检查
pre-commit run --all-files --show-diff-on-failure

# 构建包用于验证
python -m build

# 检查包元数据
twine check dist/*
```

## 正确性测试

### 冒烟正确性（CI 级）

```bash
# 运行所有算子的冒烟正确性
python tools/run_flagtensor_ci.py --smoke --run-correctness --results-dir ci_results_correctness --dump-json-summary

# 运行特定算子的冒烟正确性
python tools/run_flagtensor_ci.py --op acos --smoke --run-correctness --results-dir ci_results_correctness --dump-json-summary

# 运行特定类别的冒烟正确性
python tools/run_flagtensor_ci.py --category unary --smoke --run-correctness --results-dir ci_results_correctness --dump-json-summary
```

### 验收正确性（完整覆盖率）

```bash
# 运行所有算子的验收级正确性
python tools/run_flagtensor_ci.py --run-correctness --results-dir acceptance_results_correctness --dump-json-summary

# 运行特定类别的验收级正确性
python tools/run_flagtensor_ci.py --category unary --run-correctness --results-dir acceptance_results_correctness --dump-json-summary

# 以特定基准测试模式运行验收级正确性
python tools/run_flagtensor_ci.py --run-correctness --mode operator --results-dir acceptance_results_correctness --dump-json-summary
```

### 通过 Pytest 进行正确性测试 —— 类别文件（主要）

类别级正确性文件是正式验收接口：

```bash
# 通过 tests/ 入口运行所有正确性测试
python -m pytest -vs tests

# 通过标记运行特定算子正确性
python -m pytest -vs tests -m acos

# 运行某个类别中的所有算子
python -m pytest -vs tests/unary/
```

## 性能测试

### 冒烟性能（CI 级）

```bash
# 运行所有算子的冒烟性能
python tools/run_flagtensor_ci.py --smoke --run-perf --results-dir ci_results_perf --dump-json-summary

# 运行特定算子的冒烟性能
python tools/run_flagtensor_ci.py --op acos --smoke --run-perf --results-dir ci_results_perf --dump-json-summary

# 运行特定类别的冒烟性能
python tools/run_flagtensor_ci.py --category unary --smoke --run-perf --results-dir ci_results_perf --dump-json-summary
```

### 验收性能（完整覆盖率）

```bash
# 运行所有算子的验收级性能
python tools/run_flagtensor_ci.py --run-perf --results-dir acceptance_results_perf --dump-json-summary

# 以特定基准测试模式运行验收级性能
python tools/run_flagtensor_ci.py --run-perf --mode operator --results-dir acceptance_results_perf --dump-json-summary
```

### 通过类别基准测试进行性能测试（主要）

类别级基准测试文件是正式验收接口。单个算子通过 `pytest -m <op>` 标记选择：

```bash
# 运行一元类别基准测试
python -m pytest -vs benchmark/test_unary_perf.py -m identity

# 运行二元类别基准测试
python -m pytest -vs benchmark/test_binary_perf.py -m add

# 运行收缩类别基准测试
python -m pytest -vs benchmark/test_contraction_perf.py -m Contraction

# 运行稀疏类别基准测试
python -m pytest -vs benchmark/test_sparse_perf.py -m BlockSparseContraction
```

### 通过单个算子进行性能测试 —— 旧版/调试

旧版每个算子基准测试文件保留用于调试，但不属于验收接口：

```bash
python -m pytest -vs benchmark/test_CUTENSOR_OP_ACOS_perf.py
```

## 每周回归

```bash
# 使用注册表驱动的算子选择运行每周回归
python tools/run_flagtensor_weekly.py --project-root . --results-dir weekly_results --gpus 0 --mode kernel

# 使用特定算子列表运行每周（可选；省略时从注册表生成）
python tools/run_flagtensor_weekly.py --project-root . --op-list my_ops.txt --results-dir weekly_results --gpus 0 --mode kernel

# 使用类别过滤运行每周
python tools/run_flagtensor_weekly.py --project-root . --category unary --results-dir weekly_results --gpus 0 --mode kernel
```

## 注册表操作

```bash
# 加载并检查注册表
python - <<'PY'
import sys
sys.path.insert(0, 'src')
from flagtensor_registry import load_operator_registry

for spec in load_operator_registry():
    print(f"{spec.name}: category={spec.category}, status={spec.status}")
PY

# 检查注册表一致性
python - <<'PY'
import sys
from pathlib import Path

sys.path.insert(0, 'src')
from flagtensor_registry import load_operator_registry

registry = load_operator_registry()
errors = []

for spec in registry:
    impl_path = Path(spec.impl_file)
    if not impl_path.exists():
        errors.append(f"Missing impl: {spec.name} -> {spec.impl_file}")

    test_path = Path(spec.correctness_test)
    if not test_path.exists():
        errors.append(f"Missing test: {spec.name} -> {spec.correctness_test}")

    bench_path = Path(spec.benchmark_test)
    if not bench_path.exists():
        errors.append(f"Missing benchmark: {spec.name} -> {spec.benchmark_test}")

if errors:
    print("Registry consistency errors:")
    for e in errors:
        print(f"  - {e}")
else:
    print(f"Registry consistency OK: {len(registry)} operators")
PY
```

## 报告生成

```bash
# 从 CI 结果生成 HTML 报告
python tools/generate_flagtensor_html_report.py --results-dir ci_results_correctness --output ci_results_correctness/report.html

# 从验收结果生成 HTML 报告
python tools/generate_flagtensor_html_report.py --results-dir acceptance_results_correctness --output acceptance_results_correctness/report.html
```

## 环境导出

```bash
# 导出环境用于可复现性
python tools/export_env.py --project-root . --output env.json
```

## GPU 集群验证（Slurm）

```bash
# 在 GPU 集群节点上运行正确性
srun -N 1 --job-name flagtensor-correctness --nodelist <node_name> --gres=gpu:1 --cpus-per-task=24 --mem=242144 \
  docker exec -w /workspace/FlagGems/flagtensor triton_cuda12 \
  bash -lc "python tools/run_flagtensor_ci.py --smoke --run-correctness --results-dir /tmp/flagtensor_ci_results"

# 在 GPU 集群节点上运行每周
srun -N 1 --job-name flagtensor-weekly --nodelist <node_name> --gres=gpu:1 --cpus-per-task=24 --mem=242144 \
  docker exec -w /workspace/FlagGems/flagtensor triton_cuda12 \
  bash -lc "python tools/run_flagtensor_weekly.py --project-root /workspace/FlagGems/flagtensor --results-dir /tmp/flagtensor_weekly_results --gpus 0"
```

## 快速验收检查清单

要验证验收就绪状态，按顺序运行以下命令：

1. **静态质量**
   ```bash
   pre-commit run --all-files --show-diff-on-failure
   ```

2. **注册表一致性**
   ```bash
   python -c "import sys; sys.path.insert(0, 'src'); from flagtensor_registry import load_operator_registry; print(f'Registry OK: {len(list(load_operator_registry()))} operators')"
   ```

3. **冒烟正确性**
   ```bash
   python tools/run_flagtensor_ci.py --smoke --run-correctness --results-dir /tmp/flagtensor_smoke_correctness --dump-json-summary && cat /tmp/flagtensor_smoke_correctness/summary.json
   ```

4. **冒烟性能**
   ```bash
   python tools/run_flagtensor_ci.py --smoke --run-perf --results-dir /tmp/flagtensor_smoke_perf --dump-json-summary && cat /tmp/flagtensor_smoke_perf/summary.json
   ```

5. **类别基准测试验证**
   ```bash
   python -m pytest -vs benchmark/test_unary_perf.py -m identity
   python -m pytest -vs benchmark/test_binary_perf.py -m add
   python -m pytest -vs benchmark/test_contraction_perf.py -m Contraction
   python -m pytest -vs benchmark/test_sparse_perf.py -m BlockSparseContraction
   ```
