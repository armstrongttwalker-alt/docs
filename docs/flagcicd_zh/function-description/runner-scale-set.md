# Runner Scale Set

Runner Scale Set 是 FlagCICD 的资源池管理机制，通过 AutoscalingRunnerSet 实现 Runner 的自动扩缩容，配合 Volcano 调度器为项目划分资源配额。

## 概述

Runner Scale Set 为每个项目仓库单独部署，通过配置 `maxRunners` 和 `minRunners` 参数，根据任务队列自动扩缩容 {term}`Runner` 资源。

## 核心特性

- **自动扩缩容**：根据任务队列长度自动调整 Runner 数量
- **项目隔离**：为每个仓库单独部署 Runner Scale Set
- **资源配额**：使用 Volcano 调度器，通过 {term}`Queue` 为项目划分资源配额

## Docker 运行模式

| 模式 | 说明 | 适用场景 |
|------|------|----------|
| {term}`DinD`（Docker-in-Docker） | 在 Runner Pod 中启动 Docker daemon 容器，需要特权模式 | 隔离场景，推荐使用 |
| {term}`DooD`（Docker-outside-of-Docker） | 挂载宿主机 `/var/run/docker.sock` 到容器中 | 高性能但风险较高，仅对特权用户开放 |