# FlagCICD 用户手册

FlagCICD 是一个面向多芯片开源项目的统一 CI/CD 平台，实现大模型软件栈从 CUDA 向国产芯片的高效迁移与适配。

## 平台简介

FlagCICD 解决 AI 基础设施"碎片化"挑战，构建"基础层-智能层-平台层"三层架构：

- **基础层**：标准化 CICD 流程，环境构建、依赖管理、验证自动化
- **智能层**：AI Agent 驱动自动迁移技术，"分析-迁移-验证-优化"闭环
- **平台层**：云服务封装，在线迁移、测试、发布的开箱即用体验

## 核心能力

- 多异构算力 {term}`Runner` 支持
- 流水线报告展示
- 制品上传和托管
- 测试用例管理

## 支持的芯片

华为昇腾、海光 DCU、沐曦 MXC550、摩尔线程 S5000、NVIDIA A100、天数智卡、昆仑芯、燧原、寒武纪、清微等。

## 平台地址

- **生产环境**：https://flagcicd.flagos.net

## 文档目录

```{toctree}
:maxdepth: 2

overview/index
getting-started/index
function-description/index
operation-guide/index
faq/index
glossary/index
```

## 相关链接

- [FlagOps Actions](https://github.com/flagos-ai/FlagOps/tree/main/actions/)
- [示例 Workflow](https://github.com/flagos-ai/FlagScale/blob/main/.github/workflows/)

## 联系我们

如有问题，请联系平台管理员：flagcicd@baai.ac.cn
