# 量子纠错

量子纠错把症状提取、译码、纠正与逻辑结果分析连成一条流程。长期目标是面向容错量子计算研究的完整工作流，包括逻辑操作与硬件反馈。

QEC 领域持有码、译码语义、探测事件与 Pauli 帧。它组合编译器的控制流、运行时反馈、模拟内核、噪声模型与远程硬件接口。

## 从存储实验开始

三数据比特重复码存储实验会注入一个错误，并跟踪它经过症状提取、译码与纠正的全过程：

```{code-block} python
from flagquantum.qec import ErrorEvent, ErrorSchedule, run_repetition_memory_experiment

result = run_repetition_memory_experiment(
    error_schedule=ErrorSchedule((ErrorEvent(round_index=0, wire=1),)),
    rounds=3,
    shots=16,
    seed=0,
)
print(result.logical_error_rate)
```

实验会报告症状历史、纠正动作与最终逻辑结果；反馈轨迹把真实比特与观测比特、动作以及帧演化分开记录。

## 参考实现覆盖的内容

- 固定的重复码画像，支持有界的确定性错误计划。
- 可按轮替换的轨迹译码策略，动作可以是物理 X 或 Pauli 帧 X。
- 时间规则：拒绝孤立的读出偏移，数据错误需要后续轮次确认。
- 按电路位置定义的随机噪声画像：奇偶校验操作后独立比特翻转，读出独立混淆。

## 运行与校验

```{code-block} shell
python -m pytest tests/qec -q
```

针对已知注入错误，检查症状历史、纠正动作与最终逻辑结果。修改译码器时还必须覆盖读出故障与末轮附近的错误。

## 边界

- 扫描只报告有限采样观测；逻辑抑制与阈值结论需要单独的统计与规模证据。
- 该时间规则不是最大似然译码，重复的读出故障可能被误判为数据错误。
- 批量译码反馈、通用信道与码、关联或时序噪声、硬实时提供方控制、梯度与分布式执行仍不在当前能力范围内。
