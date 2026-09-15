# Reference

This section contains the FlagTensor acceptance documentation, covering policies, CI/CD workflows, operator coverage, and standard commands.

| Document | Description |
|---|---|
| [Acceptance Checklist](acceptance_checklist.md) | Tracks compliance status against operator library acceptance standards across structure, testing, performance, CI/CD, and documentation. |
| [Accuracy Policy](accuracy_policy.md) | Defines reference policy, assertion policy, default tolerances, shape/dtype coverage, and skip/block rules for correctness validation. |
| [Benchmark Policy](benchmark_policy.md) | Defines benchmark goals, execution modes (smoke/acceptance/weekly), shape/dtype policy, timing policy, and reporting policy for performance validation. |
| [CI Matrix](ci_matrix.md) | Describes all CI/CD workflows (quality-gate, ci, weekly, acceptance) with job details, parameters, artifact storage, and cluster GPU validation. |
| [Known Issues](known_issues.md) | Tracks experimental operators, CI limitations, dtype/shape coverage gaps, performance notes, migration status, and future work. |
| [Operator Coverage](operator_coverage.md) | Per-operator implementation, correctness, and benchmark coverage matrix across all 36 operators (28 unary, 4 binary, 3 contraction, 1 sparse). |
| [Standard Commands](standard_commands.md) | Standard commands for running acceptance checks: static quality, correctness testing, performance testing, weekly regression, registry operations, and GPU cluster validation. |

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
