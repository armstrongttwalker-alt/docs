# 编译器与远程目标

编译负责变换程序，执行负责运行程序。FlagQuantum 刻意把两者分开，使编译产物可以被检视、密封并投递，而不会对“究竟执行了什么”产生歧义。

## 与目标无关的优化

```{code-block} python
import flagquantum as fq
import flagquantum.compiler as compiler

circuit = fq.Circuit(2).h(0).h(0).cx(0, 1)
optimized_ir = compiler.optimize(circuit)

result = fq.run(optimized_ir, options=fq.ExecutionOptions(mode="auto"))
```

`optimize` 返回新的 `CircuitIR`，不修改输入，并把规范重写迭代到不动点。

## 面向目标的编译

当产出的程序必须遵守某个拓扑时，提供显式的耦合图：

```{code-block} python
coupling = compiler.CouplingMap.line(circuit.n_qubits)
compiled_ir = compiler.compile(
    circuit,
    coupling_map=coupling,
    routing_strategy="auto",
)
```

编译器只产出拓扑合法的两比特操作，并把路由决策记录在编译后 IR 的元数据中。它不选择、也不调用执行后端。

## 为提供方编译

```{code-block} python
result = fq.run(
    circuit,
    compiler="qsteed",
    target="quafu:Baihua",
    shots=1024,
)
counts = result.measurement("counts").value[0]
```

该路径完成编译、打包、投递并等待远程结果，同时不改变 `fq.ExecutionResult` 返回类型，也绝不会隐式选择或替换编译器与提供方。

可选参数让流程保持可检视：

- `name` 为部署命名；省略则使用部署默认名，提供方分配的任务 ID 与该展示名彼此独立。
- `target_qubits` 给出可选的有序“逻辑位到物理位”映射。一旦提供，除非目标快照能证明该映射有效且连通，否则编译会失败；显式映射绝不会被静默替换。

## 在硬件上测量哈密顿量

Pauli 期望值可以使用同一个入口。电路只编译一次，然后按量子比特逐位对易关系分组，在互不相同的密封任务中测量，且不改变已选定的物理比特映射：

```{code-block} python
energy = fq.run(
    circuit,
    outputs=fq.expectation(0.5 * (fq.X(0) @ fq.X(1)) + fq.Z(0)),
    compiler="qsteed",
    target="quafu:Baihua",
    shots=4096,
).expectation()
```

采样次数按测量组生效。统计量报告估计量的标准误、分组数、每组采样数与总采样数；来源记录会保存每个提供方任务与部署身份。混合输出与不支持的远程输出会在编译或投递之前失败。

## 非阻塞投递与恢复

长时远程任务不必阻塞笔记本：

```{code-block} python
job = fq.submit(fq.Circuit(2).x(0), target="quafu:Baihua", shots=1024)
job.save("quafu-job.json")
print(job.status())
```

规范化状态为 `queued`、`running`、`succeeded`、`failed`、`cancelled` 与 `unknown`；仅表示“编译完成”的提供方状态会映射为 `queued`，未知状态绝不视为成功。`job.result()` 不会轮询，`job.wait(timeout=...)` 才是刻意阻塞，`job.cancel()` 发出取消请求，需再用状态查询确认。

回执是不含凭据的 JSON，保存不会覆盖已有文件，恢复任务不会重新投递。重启后需重新配置凭据；若投递时网络响应丢失，请先与提供方核对再重试。

## 打包训练好的程序

部署包把训练参数、按目标编译的结果与可审计身份绑定，便于稍后保存、签名或投递：

```{code-block} python
import flagquantum.deployment as deployment

package = deployment.create_deployment_package(
    circuit=trained_circuit,
    backend=deployment.CloudBackendProfile.simulator(4),
    shots=1024,
)
```

预检工具会针对目标校验程序，并对随后可能被投递的那个包做身份校验，过程中不联系提供方、不消耗远程资源。
