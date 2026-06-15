# 术语表

本文档定义了 FlagCICD 平台中使用的术语。

{.glossary}
CI/CD
: 持续集成与持续部署，一种自动化构建、测试和发布的软件开发实践。

{.glossary}
Runner
: 执行 CI/CD 工作流的代理程序。

{.glossary}
Runner Scale Set
: 支持自动扩缩容的 Runner 集合。

{.glossary}
Workflow
: 工作流，定义 CI/CD 任务流程。

{.glossary}
DinD
: Docker-in-Docker，在 Docker 容器内运行 Docker 的技术方案，隔离性好但 docker run 不可访问加速卡资源。

{.glossary}
DooD
: Docker-outside-of-Docker，使用宿主机 Docker daemon 的容器化方案，性能高但风险高，仅对特权用户开放。

{.glossary}
Coverage
: 代码覆盖率，衡量测试覆盖程度的指标。

{.glossary}
Benchmark
: 性能基准测试，用于评估系统性能表现。

{.glossary}
镜像
: Docker 容器镜像。

{.glossary}
Tag
: 镜像或制品的版本标签。

{.glossary}
Wheel
: Python 包的分发格式。

{.glossary}
地域
: 资源部署的地理区域。

{.glossary}
可用区
: 地域内的独立故障隔离区域。

{.glossary}
资源规格
: 计算资源的配置规格，包括 CPU、内存、加速卡等。

{.glossary}
GPU
: 图形处理器，如 NVIDIA A100。

{.glossary}
NPU
: 神经网络处理器，如华为昇腾。

{.glossary}
DCU
: 深度计算单元，如海光 DCU。

{.glossary}
Queue
: 资源配额管理单元，用于 Volcano 调度。

{.glossary}
平台管理员
: 拥有平台全部权限的管理角色，包含特权用户权限。

{.glossary}
特权用户
: 可使用 DooD 模式的高级用户。

{.glossary}
普通用户
: 使用平台基本功能的用户。

{.glossary}
仓库管理员
: 管理特定仓库的用户。
