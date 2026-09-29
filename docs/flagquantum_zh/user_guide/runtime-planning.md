# 运行时规划

计划在真正执行之前解释运行时的意图：它选择表示与执行策略，并显式报告阻塞项与回退，而不是静默改变程序语义。

## 查看计划

```{code-block} python
import flagquantum as fq

circuit = (
    fq.Circuit(n_qubits=4)
    .h(0)
    .cx(0, 1)
    .rzz(1, 2, theta=0.2)
)

plan = circuit.runtime_plan(prefer_jax=True, require_gradients=True)
print(plan.summary())
```

也可以直接使用同一个规划入口：

```{code-block} python
plan = fq.plan(circuit, options=fq.ExecutionOptions(mode="auto"))
print(plan.summary()["recommended_mode"])
```

## 计划可执行且可复现

把 `fq.plan` 的结果直接交给 `fq.run`，即可获得可检视、可复现的执行。给定的计划会被校验并执行，不会重新规划或重新编译；计划身份覆盖规范 IR、解析后的执行语义、编译流水线、所需环境与最终决策：

```{code-block} python
plan = fq.plan(circuit, options=fq.ExecutionOptions(mode="auto", precision="complex64"))
result = fq.run(plan)
assert result.plan.identity == plan.identity
```

JSON 往返会在执行前校验所有指纹与最终身份；已有计划对语义覆盖是封闭的：若同时传入 `options`、`measurements` 或 `noise_model` 会抛出 `TypeError`。环境或 world size 不匹配会在内核启动前失败，而不是静默重新规划或降级。

## 规划不是证据

规划结果描述意图与估算，永远不是运行时证据、基准证据或可扩展性结论。性能与容量结论必须来自运行时生成的记录，并说明其分布语义。

## 失败即关闭

- 未知的执行选项在规划前即报错，而不是被忽略。
- 不支持的结果类型与缺少采样次数在执行前即报错。
- 在所选路径上无法满足的请求会抛出能力或规划错误，而不是在调用方不知情的情况下切换表示。
- 分布式执行由执行环境描述；world size 或精度冲突会在最开始就失败。

## 相关页面

- [本地工作流](local-workflows.md) —— 在本地执行已规划的程序。
- [编译器与远程目标](compiler-and-remote.md) —— 面向拓扑或提供方进行编译。
- [使用 PyTorch 训练](training-with-pytorch.md) —— 模块与运行时策略如何配合。
