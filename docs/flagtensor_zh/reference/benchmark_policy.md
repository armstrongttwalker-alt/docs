# FlagTensor 基准测试策略

## 范围

本文档定义 FlagTensor 性能验证的验收级基准测试策略。

## 基准测试目标

- 将 FlagTensor 内核与 cuTensor 基线进行比较。
- 生成可复现的算子级和类别级基准测试工件。
- 支持冒烟和验收级执行模式。
- 以模式感知的输出处理报告基准测试结果。

## 基准测试模式

| 模式 | 含义 | 典型用途 |
| --- | --- | --- |
| `kernel` | 内核级测量 | 低级性能分析 |
| `operator` | 算子级测量 | 默认验收报告 |
| `wrapper` | 包装器/API 路径测量 | 集成级验证 |

## 执行级别

### 冒烟基准测试

- 缩减的形状集
- 缩减的 dtype 集
- 旨在满足 CI 周转速度
- 通过 `tools/run_flagtensor_ci.py --smoke --run-perf` 触发

### 验收基准测试

- 完整的配置形状覆盖率
- 所选算子集的完整支持 dtype 覆盖率
- 旨在用于发布和验收审查
- 通过 `tools/run_flagtensor_ci.py --run-perf` 触发

### 每周基准测试

- 注册表驱动的计划或手动回归执行
- 旨在跨算子和 GPU 进行更广泛的漂移跟踪
- 通过 `tools/run_flagtensor_weekly.py` 触发

## 形状和 Dtype 策略

- 基准测试形状应尽可能集中管理。
- 类别级基准测试入口点是正式的验收接口。
  旧版每个算子的基准测试文件保留为调试和迁移兼容性填充，
  不作为验收要求。
- 基准测试 dtype 默认为 `float16` 和 `float32`，除非算子需要专用的 dtype 集。

## 计时策略

- 预热次数和重复次数必须明确且可复现。
- 当前默认值通过环境变量和运行器标志控制。
- 未来整合应将共享计时策略移入集中式基准测试工具层。

## 报告策略

- 基准测试 CSV 选择必须是模式感知的。
- 报告应区分 `kernel`、`operator` 和 `wrapper` 输出。
- 验收报告应包括通过/失败状态和加速比统计。
- 支持 HTML 和 XLSX 报告。

## 类别基准测试入口点（验收接口）

基准测试执行使用类别级文件作为正式验收接口。
单个算子通过 `pytest -m <op>` 标记选择。

当前类别入口点（全部四个已完成）：

- `benchmark/test_unary_perf.py` —— 28 个一元算子
- `benchmark/test_binary_perf.py` —— 4 个二元算子
- `benchmark/test_contraction_perf.py` —— 5 个收缩算子
- `benchmark/test_sparse_perf.py` —— 1 个稀疏算子

旧版每个算子的基准测试文件（`benchmark/test_CUTENSOR_OP_*_perf.py`）保留为
调试和迁移兼容性的实现细节，但它们不属于正式验收接口。

## 权威来源

- 注册表元数据：`conf/operators.yaml`
- 基准测试策略概述：`docs/benchmark_strategy.md`
- CI 运行器：`tools/run_flagtensor_ci.py`
- 每周运行器：`tools/run_flagtensor_weekly.py`
