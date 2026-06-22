# 参考

本节包含 FlagTensor 验收文档，涵盖策略、CI/CD 工作流、算子覆盖率和标准命令。

| 文档 | 描述 |
|---|---|
| [验收检查清单](acceptance_checklist.md) | 跟踪算子库验收标准的合规状态，涵盖结构、测试、性能、CI/CD 和文档。 |
| [精度策略](accuracy_policy.md) | 定义正确性验证的参考策略、断言策略、默认容差、形状/dtype 覆盖率和跳过/阻止规则。 |
| [基准测试策略](benchmark_policy.md) | 定义性能验证的基准测试目标、执行模式（冒烟/验收/每周）、形状/dtype 策略、计时策略和报告策略。 |
| [CI 矩阵](ci_matrix.md) | 描述所有 CI/CD 工作流（质量门、ci、每周、验收），包括作业详情、参数、工件存储和集群 GPU 验证。 |
| [已知问题](known_issues.md) | 跟踪实验性算子、CI 限制、dtype/形状覆盖差距、性能说明、迁移状态和未来工作。 |
| [算子覆盖率](operator_coverage.md) | 全部 38 个算子（28 个一元、4 个二元、5 个收缩、1 个稀疏）的每个算子实现、正确性和基准测试覆盖率矩阵。 |
| [标准命令](standard_commands.md) | 运行验收检查的标准命令：静态质量、正确性测试、性能测试、每周回归、注册表操作和 GPU 集群验证。 |

```{toctree}
:maxdepth: 1
:hidden:

acceptance_checklist.md
accuracy_policy.md
benchmark_policy.md
ci_matrix.md
known_issues.md
operator_coverage.md
standard_commands.md
```
