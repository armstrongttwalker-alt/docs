# 扩展 SDK

扩展 SDK 允许独立安装的包贡献执行后端、电路编译器、编译 pass、内核、算子、设备、提供方、测量收集器或规划器，同时不成为 FlagQuantum 的运行时依赖。

## 位置

这套已获批准、尚未冻结的 SDK 契约位于 `flagquantum.ecosystem.extensions`，不新增顶层导出。扩展声明带版本号的清单，在激活前协商能力，并被安装到任务级不可变注册表中。该命名空间迁移到当前位置时未提供兼容层，其子模块导入路径保持等价。

## 如何编写扩展

包在其入口点组中注册一个零参工厂，并返回身份一致的清单：

```{code-block} python
from flagquantum.ecosystem.extensions import ExtensionManifest

ExtensionManifest(
    name="qsteed",
    version="0.1.0",
    kind="compiler",
    capabilities=frozenset({"circuit_ir"}),
)
```

电路编译器实现协商、启动、编译与关闭。`compile` 接受 FlagQuantum 的 `CircuitIR`、可选的目标映射，并返回 FlagQuantum 的 `CircuitIR`；第三方编译器的对象始终留在插件内部。编译 pass 是更小的变换钩子，交换同样的 IR 边界。

## 发现与激活

已安装的包只通过显式的、按类型区分的发现调用被识别。发现过程会校验入口点身份与清单是否一致，并把结果加入既有的不可变注册表，而不是引入第二套插件注册表。导入 FlagQuantum 绝不会发现、导入或激活任何扩展。

面向用户的集成为显式指定编译器或提供方，绝不依赖隐式选择：

```{code-block} python
import flagquantum as fq

result = fq.run(circuit, compiler="qsteed", target="quafu:Baihua", shots=1024)
```

## 兼容性生命周期

- SDK API 不匹配会在注册阶段失败，并给出升级提示。
- 单个扩展默认是实验性的；要稳定化需要一致性验证、安全审查、文档与明确的兼容窗口。
- 弃用需在清单中声明移除版本，并在该窗口内保留上一版契约。
- 能力协商失败即关闭：缺少 dtype、设备、梯度或语义能力会在激活前产生阻塞项。

## 隔离与安全

- 注册返回新的不可变注册表，作用域为任务级。扩展绝不会改动顶层导出、核心算子表或其他任务的注册表。
- 生命周期包装器会转换扩展异常，并在启动失败后尝试清理；正常退出作用域时同样会清理。
- 原始令牌、口令、API key、密钥与凭据会被拒绝进入扩展配置。提供方必须通过宿主提供的解析器获取凭据，且不得把它们放进清单、错误、测量或序列化负载。
- 扩展以 Python 进程的权限运行。发现机制不是沙箱：请只安装可信的包。

## 一致性验证

SDK 提供可复用的后端、提供方与电路编译器检查，覆盖清单与负载序列化、能力声明真实性、PyTorch 梯度、dtype 与设备保持、IR 归属、确定性、错误隔离与清理。通过这些检查是扩展稳定化的前提，但不能替代对该扩展本身的独立资质评估。
