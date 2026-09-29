# 概览

FlagQuantum 是一个基于 PyTorch 构建的分布式、可微量子计算框架。它把量子线路变成可训练模型：同一个程序既可以用 PyTorch 常规优化器训练，也可以用不同表示形式模拟，在负载需要时跨卡切分，并在远程算力或量子硬件上求值。它属于 FlagOS 生态——一个统一的开源 AI 系统软件栈，用来整合多样化的模型、系统与芯片。

## 为什么需要 FlagQuantum？

一个量子程序有三个彼此独立的关注点：线路、测量请求、执行目标。FlagQuantum 让它们保持显式。

- 线路用 `fq.Circuit` 构建一次，并以与表示无关的 FlagQuantum IR 保存。
- 执行在运行时选择——本地态向量、MPS、张量网络、跨卡切分或远程目标——无需改写模型。
- 训练保持 PyTorch 语义：`fq.Module` 返回可自动求导的张量，`fq.train` 就是调用方自己拥有的优化循环。

架构上的不变式是：后端选择可以改变执行方式，但不能改变程序含义，也不能改变结果契约。

## 入口

| 目标 | 主要接口 |
| --- | --- |
| 构建程序 | `fq.Circuit` |
| 查看其稳定表示 | `fq.CircuitIR` |
| 执行前先规划 | `fq.plan`、`Circuit.runtime_plan` |
| 本地执行 | `fq.run` |
| 定义可训练量子层 | `fq.Module` |
| 训练 | `fq.train` |
| 测量 | `fq.expectation`、`fq.probabilities`、`fq.samples`、`fq.counts` |
| 编译或优化 | `fq.compile`、`flagquantum.compiler.optimize` |
| 为目标打包 | `flagquantum.deployment.create_deployment_package` |
| 远程运行 | `fq.run(target=...)`、`fq.submit`、`fq.restore_job` |

## 能力成熟度

支持范围因后端与负载而异。每项能力都有等级，且等级只适用于实际验证过的范围：

| 等级 | 含义 |
| --- | --- |
| 发布认证（Release certified） | 有经审计、可复现的证据并通过发布门禁，且没有未解决的发布阻塞。 |
| 生产可用（Production supported） | 有兼容性、运维指引和目标硬件证据的支持路径。 |
| 开发证据（Development evidence） | 可执行且已测试的开发结果，不是生产或通用扩展性结论。 |
| 实验性（Experimental） | 研究性接口，不提供兼容性或生产保证。 |

稳定的公开 API 不会提升实验性后端的等级，CPU 语义证据也不会提升分布式能力的等级。[参考资料](../reference.md)列出已认证的稳定名称；对外性能数字必须有已入库的审计产物作为依据。

## 与 FlagOS 的配合方式

FlagQuantum 依赖 PyTorch，而不依赖特定厂商运行时。国产加速器通过 FlagOS 统一多芯片层接入，物理设备探测、厂商运行时以及逻辑设备 `flagos:0` 的映射都由该层负责；FlagQuantum 自身不含任何厂商分支，只记录它收到的路由证据。层边界见[架构](architecture.md)，厂商接入路径见[远程执行](../user_guide/remote-execution.md)。

## 从哪开始

- 参考[安装](../getting_started/install.md)，并按[快速开始](../getting_started/quick-start.md)训练一个双量子比特模型。
- 在不改动模型的前提下，按[模拟模式](../user_guide/simulation-modes.md)选择表示形式。
- 依赖某条路径之前，先确认它验证到什么程度：[参考资料](../reference.md)与上游的验证范围说明。
