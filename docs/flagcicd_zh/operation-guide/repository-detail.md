# 仓库详情

仓库详情页展示单个仓库的完整信息，包括工作流运行实例、仓库质量、流水线效率、Benchmark 对比、制品和设置。

## 访问路径

仓库广场 → 点击仓库卡片

## 基本信息

![仓库详情 - 工作流运行实例](../static/05-repository-detail-workflow.png)

| 信息 | 说明 |
|------|------|
| 仓库名称 | owner/repo 格式 |
| 描述 | 仓库描述 |
| 运行数 | 工作流运行总数 |
| 成功数 | 成功的工作流数量 |
| 失败数 | 失败的工作流数量 |
| 最近更新 | 最后更新时间 |
| 在 GitHub/GitLink 上查看 | 跳转到原始仓库 |

## 工作流运行实例

工作流运行实例展示仓库的所有工作流执行记录。

### 筛选条件

| 筛选项 | 类型 | 选项 |
|--------|------|------|
| 状态 | 下拉框 | 全部、取消、失败、成功、进行中、需要操作、排队中、超时 |
| 分支 | 下拉框 | 动态加载仓库分支（如：dev、main、v0.1.0） |
| Commit | 文本框 | 输入 Commit ID 搜索 |
| Event | 下拉框 | push、pull_request、schedule、workflow_dispatch、repository_dispatch |
| 工作流 | 下拉框 | 动态加载工作流名称 |

### 列表字段

| 列名 | 说明 |
|------|------|
| 状态图标 | 成功（✓）、失败（✗）等 |
| 名称 | 工作流名称和编号 |
| 分支 | 运行分支 |
| 持续时间 | 工作流执行时长 |
| 创建时间 | 工作流触发时间 |
| 操作 | Report、Detail 按钮 |

### 操作按钮

| 按钮 | 功能 |
|------|------|
| Report | 查看工作流报告 |
| Detail | 查看工作流详情 |

## 仓库质量

仓库质量展示代码覆盖率、安全漏洞扫描、工作流通过率等质量指标。

![仓库质量](../static/06-repository-quality.png)

### 指标说明

| 指标 | 说明 |
|------|------|
| 代码覆盖率 | 行覆盖率百分比，含扫描时间 |
| 安全漏洞扫描 | 高危、中危、低危漏洞数量 |
| 工作流通过率 | 可按时间范围筛选（最近一周/最近一月/最近三月） |
| 通过次数/失败次数 | 统计工作流执行结果 |
| 失败原因分类 | 启动失败、执行失败、超时、其他 |

## 流水线效率

流水线效率展示构建时间、成功率、并发数等效率指标。

![流水线效率](../static/07-pipeline-efficiency.png)

### 指标说明

| 指标 | 说明 |
|------|------|
| 平均构建时间 | 平均执行时长（秒） |
| 构建成功率 | 成功执行百分比 |
| 构建并发数 | 并发执行的工作流数量 |
| 队列等待时间 | 平均等待时长（秒） |

## Benchmark 对比

Benchmark 对比功能支持对比不同 Commit 的性能基准测试结果。

![Benchmark 对比](../static/08-benchmark-comparison.png)

### 功能说明

- 选择数据表进行对比
- 选择不同 Commit ID 的 Benchmark 结果
- 支持对比两个不同提交的性能数据

### 筛选条件

| 筛选项 | 说明 |
|--------|------|
| 数据表 | 选择要查看的 Benchmark 数据表 |
| Commit ID | 选择要对比的提交 |

## 制品

制品展示仓库构建产生的 Docker 镜像和 Python 包。

![制品 - 容器镜像](../static/09-artifacts-container.png)

## 设置

设置页签包含三个子页签：Runner、Connection、成员管理。

### Runner 管理

Runner 管理展示当前仓库的 Runner 实例和 Runner Scale Set 配置。

![设置 - Runner 管理](../static/11-settings-runner.png)

#### Runners 列表

显示当前在线的 {term}`Runner` 实例，包括名称和状态（online/offline）。

#### {term}`Runner Scale Set` 列表

| 列名 | 说明 |
|------|------|
| Name | Runner Scale Set 名称 |
| Status | 运行状态 |
| Min Runners | 最小 Runner 数量 |
| Max Runners | 最大 Runner 数量 |
| Image | Runner 镜像 |
| 资源规格 | 计算资源规格 |
| 创建时间 | 创建时间 |
| Actions | 删除操作 |

### 创建 Runner Scale Set

创建 Runner Scale Set 用于配置可弹性伸缩的 Runner 集合。

![创建 Runner Scale Set](../static/12-create-runner.png)

#### 表单字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| Name | 文本框 | 是 | {term}`Runner` 名称 |
| Docker 访问模式 | 单选 | 是 | {term}`DinD` 或 {term}`DooD` |
| 镜像 | 下拉框 | 是 | Runner 镜像选择 |
| 挂载模型 | 开关 | 否 | 是否挂载模型 |
| 资源规格 | 下拉框 | 是 | 计算资源规格 |
| Min Runners | 数字 | 是 | 最小 Runner 数量（默认 0） |
| Max Runners | 数字 | 是 | 最大 Runner 数量（默认 1，范围 1-3） |

#### Docker 访问模式说明

| 模式 | 说明 |
|------|------|
| {term}`DinD`（Docker in Docker） | 可使用 docker build 和 docker push，docker run 不可访问加速卡资源 |
| {term}`DooD`（Docker outside of Docker） | 共享宿主机 Docker Socket，存在安全风险，仅 {term}`特权用户` 可用 |

### Connection 连接配置

Connection 展示仓库与代码托管平台的连接状态。

![Connection 连接配置](../static/18-settings-connection.png)

| 字段 | 说明 |
|------|------|
| GitHub 链接 | 仓库的 GitHub/GitLink 地址，只读 |
| 连接状态 | 当前连接状态：已连接/未连接 |

#### 操作

- **修改**：点击修改按钮可更新仓库连接配置

### 成员管理

成员管理展示仓库的成员列表，支持添加和删除成员。

![成员管理](../static/19-settings-members.png)

#### 成员列表

| 列名 | 说明 |
|------|------|
| 手机号 | 成员手机号 |
| 邮箱 | 成员邮箱 |
| 角色 | 成员角色（{term}`仓库管理员`） |
| 操作 | 删除操作 |

#### 添加成员

1. 点击 **添加** 按钮。
1. 在用户下拉框中搜索并选择已注册用户。
1. 选择角色（{term}`仓库管理员`）。
1. 点击 **保存**。

##### 添加成员字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| 用户 | 下拉框 | 是 | 搜索添加已注册用户 |
| 手机号 | 文本框 | - | 选择用户后自动填充，只读 |
| 邮箱 | 文本框 | - | 选择用户后自动填充，只读 |
| 角色 | 下拉框 | 是 | 默认：{term}`仓库管理员` |
