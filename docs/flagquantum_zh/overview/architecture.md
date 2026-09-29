# 架构

FlagQuantum 为量子 AI 程序提供统一模型，覆盖本地开发、加速内核、分布式模拟与部署：

```text
fq.Circuit / fq.Module
          |
          v
   FlagQuantum IR
          |
          +-- 编译与导出
          +-- 本地态向量、MPS 与张量网络运行时
          +-- PyTorch 接口之后的可选 JAX 内核
          +-- 跨卡切分的态向量与 MPS 执行
          +-- 面向厂商与硬件目标的部署包
```

架构不变式很简单：后端选择可以改变执行方式，但不能改变程序含义或结果契约。

## 核心分层

| 层 | 职责 | 入口 |
| --- | --- | --- |
| 用户 API | 线路构建、PyTorch 模块、规划、执行、训练、部署 | `import flagquantum as fq` |
| 编译 | 变换线路并合法化目标输出，但不执行 | `fq.compile`、`flagquantum.compiler` |
| FlagQuantum IR | 带版本的算子、测量、元数据、序列化与校验 | `fq.CircuitIR` |
| 规划 | 选择表示与执行策略，解释阻塞与回退 | `fq.plan`、`Circuit.runtime_plan` |
| 运行时 | 本地或跨 rank 执行，返回带类型的结果 | `fq.run`、`fq.ExecutionResult` |
| 训练 | 在受支持的运行时上保持 PyTorch 自动求导与优化器语义 | `fq.Module`、`fq.train` |
| 部署 | 绑定训练参数、面向目标编译、密封可审计的部署包 | `flagquantum.deployment.create_deployment_package` |

计划描述的是意图与估算，它永远不是执行或基准证据；运行时记录描述的是实际运行了什么。

## 源码结构

```text
flagquantum/
+-- _api.py                 # 根级 compile / plan / run 组合
+-- circuit.py              # 线路构建
+-- core/                   # 与后端无关的 IR 与共享语义
+-- compiler/               # 校验、优化、下降与代码生成
+-- runtime/                # 规划、执行生命周期、结果与协调
+-- simulation/             # 数值方法与内核
+-- noise/                  # 与后端无关的噪声模型与信道
+-- observables/            # 面向用户的测量构建
+-- qec/                    # 纠错工作流与领域模型
+-- twin/                   # 硬件数字孪生模型
+-- compute/                # 当前进程可支配的资源
+-- remote/                 # 外部任务系统与结果获取
+-- ecosystem/              # 框架与格式适配器
+-- deployment/             # 密封的、与目标无关的执行包
+-- services/               # 可复用的多步应用工作流
+-- algorithms/             # 面向用户的算法组合
+-- benchmarking/           # 可复现的测量与证据生成
+-- drawer/                 # 线路可视化
+-- testing/                # 可复用的正确性与一致性辅助
+-- experimental/           # 明确不稳定的 API
```

## 依赖方向

依赖朝内：用户门面调用编译器、运行时与应用工作流，它们再调用 `core`。数值方法、本地算力适配器与远程适配器并列其侧，`core` 不会调用它们。

- `core` 不导入编排、数值引擎或厂商集成。
- 编译器变换程序，但不执行程序。
- 运行时组织执行，但不实现数值内核。
- `simulation` 是数值方法域，而不是第二个公开运行时。
- `compute` 与 `remote` 把硬件与外部系统的细节与其他域隔离。
- 可选集成不得进入本地 PyTorch 的必需路径。

## 执行与训练契约

`fq.run` 是规范的执行入口，对受支持的本地与分布式模式返回 `fq.ExecutionResult`。专用原生函数属于进阶接口，可能暴露后端特有的对象。

`fq.train` 承担常规的 PyTorch 优化循环。按 rank 拥有的态向量与 MPS 训练有各自独立的实验性分布式入口，调用 `fq.train` 不会隐式启用它们。只有当前向执行、梯度、优化器更新与检查点归属都保持声明的分布式语义时，分布式训练才算完成。

要给出分布式可扩展性结论，必须把同一个逻辑负载切分到多个 rank 上。数据并行复制、rank 本地内核以及手工张量切片，各自以自身语义报告，绝不被重新表述为容量扩展。

## 公开与内部接口

- 公开示例统一使用 `import flagquantum as fq`。
- 稳定名称列在[稳定 API 清单](../reference.md)中。
- `fq.experimental` 不提供兼容性保证。
- 兼容模块用于迁移，不定义新的稳定 API。
- 基准与研究工具不得成为运行时依赖。
