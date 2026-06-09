# Test Matrix 测试矩阵

Test Matrix 是 FlagCICD 基础层的核心测试组件，采用漏斗式分层触发机制，实现从快速反馈到大规模性能测试的完整测试体系。

## 概述

Test Matrix 覆盖 L0-L2 三级测试，通过分层触发确保测试效率和质量。轻量测试通过后才可触发重量测试，避免资源浪费。

## 测试层级

| 测试层级 | 测试类型 | 内容说明 |
|----------|----------|----------|
| L0 | 快速反馈（几分钟） | Lint（代码风格检查）、Unit Test（单元测试）、Smoke Test（冒烟测试） |
| L1 | 功能/集成（几十分钟） | Lite Training/Inference Tests（轻量训推测试）、Env Tests（多环境兼容性测试） |
| L2 | 大规模/性能（数小时） | Performance（性能回归测试）、Benchmark（精度回归测试）、Distributed Tests（多节点测试）、Long-term Stability Tests（长跑稳定性测试） |

## 触发机制

**漏斗式分层触发**：轻量测试通过才可触发重量测试。

| 触发方式 | 说明 |
|----------|------|
| PR 触发 | 必要触发 + 分层触发 + AI 诊断 |
| Periodically 触发 | 每日定时全仓库集成测试 |