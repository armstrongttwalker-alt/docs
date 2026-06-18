# FlagTensor CI 矩阵

本文档描述 FlagTensor 验收流程中的 CI/CD 工作流及其用途。

## 工作流概览

| 工作流 | 触发条件 | 用途 | 需要 GPU | 输出 |
| --- | --- | --- | --- | --- |
| `quality-gate.yaml` | PR、push、手动 | 静态质量检查（pre-commit、构建、注册表） | 否 | 构建工件、一致性报告 |
| `ci.yaml` | PR、push、手动 | 冒烟级正确性和性能 | 否 | 冒烟结果、摘要 |
| `weekly.yaml` | 手动 | 集群上的每周回归 | 是（通过 Slurm） | 每周结果、工件 |
| `acceptance.yaml` | 手动、每周计划 | 验收级完整覆盖率 | 否（结构）/ 是（集群） | 验收结果、摘要 |

## 质量门工作流（`quality-gate.yaml`）

### 作业

#### pre-commit
- **用途**：运行静态分析和格式化检查
- **检查项**：YAML 语法、尾部空白、flake8、isort、black、clang-format
- **运行时间**：约 2-3 分钟
- **失败影响**：阻止 PR 合并

#### build-check
- **用途**：验证包可以构建和分发
- **步骤**：构建 wheel/sdist、twine check
- **运行时间**：约 1-2 分钟
- **失败影响**：阻止 PR 合并

#### registry-consistency
- **用途**：确保算子注册表与代码库一致
- **检查项**：
  - 所有实现文件存在
  - 所有正确性测试文件存在
  - 所有基准测试文件存在
  - 覆盖率统计
- **运行时间**：约 30 秒
- **失败影响**：阻止 PR 合并

## CI 工作流（`ci.yaml`）

### 作业

#### correctness-smoke
- **用途**：验证正确性结构和基本功能
- **范围**：所有活跃算子（非阻止）
- **模式**：冒烟（缩减形状/dtype）
- **基准测试模式**：默认 kernel，可配置
- **运行时间**：约 5-10 分钟（仅 CPU 结构检查）
- **输出**：summary.json、summary.md、每个算子的日志
- **失败影响**：仅警告（GPU 验证在集群上完成）

#### perf-smoke
- **用途**：验证基准测试结构和 CSV 生成
- **范围**：所有活跃算子（非阻止）
- **模式**：冒烟（缩减形状）
- **基准测试模式**：默认 kernel，可配置
- **运行时间**：约 5-10 分钟（仅 CPU 结构检查）
- **输出**：summary.json、summary.md、基准测试 CSV
- **失败影响**：仅警告（GPU 验证在集群上完成）

## 每周工作流（`weekly.yaml`）

### 作业

#### weekly-entry
- **用途**：GPU 集群上的完整每周回归
- **范围**：注册表中的所有活跃算子（非阻止）
- **模式**：完整（所有形状/dtype）
- **GPU 分配**：通过 `--gpus` 参数配置
- **运行时间**：1-2 小时（取决于 GPU 数量）
- **输出**：每周结果、算子列表、工件
- **失败影响**：需要调查

### 每周参数

| 参数 | 默认值 | 描述 |
| --- | --- | --- |
| `op_list` | （从注册表生成） | 可选的算子列表文件路径 |
| `gpus` | `0` | 要使用的 GPU ID（逗号分隔） |
| `mode` | `kernel` | 基准测试模式（kernel/operator/wrapper） |

## 验收工作流（`acceptance.yaml`）

### 作业

#### correctness-acceptance
- **用途**：验收级正确性验证
- **范围**：所有活跃算子或特定类别
- **模式**：完整（所有形状/dtype）
- **类别过滤**：可选（unary/binary/contraction/sparse）
- **基准测试模式**：可配置
- **运行时间**：30-60 分钟（CPU 结构）/ 1-2 小时（GPU 集群）
- **输出**：ACCEPTANCE_SUMMARY.md、summary.json、每个算子的日志
- **失败影响**：阻止验收

#### perf-acceptance
- **用途**：验收级性能验证
- **范围**：所有活跃算子或特定类别
- **模式**：完整（所有形状）
- **类别过滤**：可选（unary/binary/contraction/sparse）
- **基准测试模式**：可配置
- **运行时间**：30-60 分钟（CPU 结构）/ 2-4 小时（GPU 集群）
- **输出**：ACCEPTANCE_SUMMARY.md、summary.json、基准测试 CSV、加速比统计
- **失败影响**：阻止验收

### 验收参数

| 参数 | 默认值 | 描述 |
| --- | --- | --- |
| `mode` | `kernel` | 基准测试模式（kernel/operator/wrapper） |
| `category` | `""`（全部） | 算子类别过滤 |

### 验收摘要输出

验收工作流生成详细摘要，包括：

- 测试的算子总数
- 通过/失败计数和通过率
- 失败算子列表
- 性能加速比统计（平均、中位数、最小、最大）
- 每个算子的状态表

## 集群 GPU 验证

由于 GitHub Actions 运行器没有 GPU 访问权限，实际的 GPU 验证在集群上使用 Slurm 执行。

### 标准 Slurm 模板

```bash
srun -N 1 --job-name <job_name> \
  --nodelist <node_name> \
  --gres=gpu:<gpu_count> \
  --cpus-per-task=$((24*gpu_count)) \
  --mem=$((242144*gpu_count)) \
  docker exec -w /workspace/FlagGems/flagtensor triton_cuda12 \
  bash -lc "<command>"
```

### 集群节点

- **主节点**：`bjdb-h20-node-038`
- **容器**：`triton_cuda12`
- **容器路径**：`/workspace/FlagGems/flagtensor`

## 工件存储

所有工作流上传工件用于审计和调试：

| 工件 | 工作流 | 保留期限 | 内容 |
| --- | --- | --- | --- |
| `flagtensor-ci-correctness-smoke` | ci.yaml | 30 天 | 冒烟正确性结果 |
| `flagtensor-ci-perf-smoke` | ci.yaml | 30 天 | 冒烟性能结果 |
| `flagtensor-weekly-results` | weekly.yaml | 90 天 | 每周回归结果 |
| `flagtensor-acceptance-correctness` | acceptance.yaml | 90 天 | 验收正确性结果 |
| `flagtensor-acceptance-perf` | acceptance.yaml | 90 天 | 验收性能结果 |
| `flagtensor-build-dist` | quality-gate.yaml | 30 天 | Wheel/sdist 包 |

## CI 状态指示器

### GitHub Step Summary

工作流向 GitHub Step Summary 报告结果：

- **质量门**：Pre-commit 状态、构建状态、注册表一致性
- **CI 冒烟**：正确性和性能的通过/失败表
- **每周**：算子计数和总体状态
- **验收**：详细的通过/失败统计、加速比分析

### 退出码

- **0**：所有检查通过
- **1**：一个或多个检查失败
- **非零**：工作流错误（如缺少依赖）

## CI 最佳实践

1. **PR 合并前始终运行质量门**
2. **使用冒烟模式进行快速迭代**
3. **发布前在 GPU 集群上运行验收**
4. **每周审查每周回归结果**
5. **保持注册表与代码库同步**
6. **添加算子时更新类别基准测试入口点**

## CI vs 本地测试

| 方面 | CI | 本地 |
| --- | --- | --- |
| **速度** | 快速（CPU 结构） | 可变 |
| **GPU 访问** | 否 | 是（通过 Slurm） |
| **覆盖率** | 冒烟 | 完整 |
| **用途** | PR 检查 | 验收验证 |
| **建议** | 用于 PR 检查 | 用于验收验证 |
