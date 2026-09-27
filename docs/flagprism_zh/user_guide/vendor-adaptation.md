# 芯片厂商适配

本页基于 `docs/CHIP_VENDOR_ADAPTATION_REQUIREMENTS.md`，总结将 FlagPrism Profiler 与 Debugger 适配到新芯片厂商的需求。

## 目标

适配完成后，厂商平台需要支持：

- **Profiler**：启动/停止芯片性能采集，获取 kernel 执行信息和硬件指标。
- **Debugger**：分配设备调试内存，将调试指针传给 kernel，并在 kernel 执行后取回调试数据。
- **关闭时零影响**：未启用 Profiler 或 Debugger 时，不改变 kernel 的编译和执行行为。

芯片硬件性能信息依赖厂商提供的 Profiler 能力（性能采集 API 或命令行工具，并提供可解析结果）。FlagPrism 负责调用厂商 Profiler、将结果与 Triton 算子关联，并转换为统一格式。

## 信息分类

| 类型 | 可获得的信息 | 是否依赖厂商 Profiler |
| --- | --- | --- |
| 基础插桩信息 | kernel 和算子名称、源码位置、算子 ID、数据类型、shape、layout、访存类型 | 否 |
| 数值摘要 | 元素数量、NaN/Inf/零值数量、有限值均值/最小/最大值、L2 Norm | 否 |
| 芯片性能信息 | kernel 设备执行时间、计算单元利用率、带宽、Cache、指令统计、硬件计数器 | 是 |

只要芯片支持 Debugger 的隐藏参数和调试记录写入，基础插桩信息和数值摘要就可由 FlagPrism 自行获得。厂商未提供的指标会标记为不支持或不可用，不影响其他类别的采集。

## Profiler 适配接口

适配分三步，完整调用顺序为：
`makePlan -> doSetMode -> doStart -> startOp/stopOp -> doStop -> import`。

### 1. 声明能力并生成采集计划

`VendorAdapter` 负责声明厂商支持哪些指标，并将用户请求转换为实际计划：

- `getName()` / `getDeviceType()`
- `getSupportedVendorMetrics()`
- `makePlan(options)` -> `VendorProfilePlan`（启用指标、未启用指标、原因、厂商配置）
- `getRuntimeProfiler()` -> 采集对象
- `createImporter()` -> 结果解析对象

计划是本次 Profiler 实际使用的采集配置，而非 kernel 执行计划。若用户请求了不支持的指标，计划会将其记为未启用并附带原因。

### 2. 启动采集并标记算子

`Profiler` 接口实现 `doStart()`、`doFlush()`、`doStop()`、`doSetMode(options)`。`OpInterface` 实现 `startOp(scope)` 和 `stopOp(scope)`，将 Triton 算子与芯片侧性能事件对应。

### 3. 解析厂商性能数据

`VendorMetricsImporter.import(metadata, plan)` 将厂商原始结果转换为统一的 `VendorProfileArtifact`。`SessionProfileMetadata`、`VendorProfilePlan`、`VendorProfileArtifact` 等结构体由 FlagPrism 定义。

## Debugger 适配

Debugger 路径要求厂商后端支持隐藏 kernel 参数（用于传递调试指针）和设备侧调试记录写入。运行时需要分配调试内存、将指针传入 kernel，并在执行后取回记录。动态采集与 hidden-argument launch 路径目前已在昇腾/CANN9、天数/CoreX 4.4、MUSA/mthreads 4.3.5 与 NVIDIA CUDA 上验证，最新状态见 `Debugger/README.md` 的后端支持矩阵。
