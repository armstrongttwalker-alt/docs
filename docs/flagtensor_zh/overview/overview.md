# FlagTensor 概览

FlagTensor 是 [FlagOS](https://flagos.io/) 的组成部分。FlagOS 是一个完全开源的系统软件栈，旨在统一模型-系统-芯片各层，营造开放协作的生态系统。它支持跨多种 AI 加速器的"一次开发，处处运行"工作流，释放硬件性能，消除 AI 芯片特定软件栈之间的碎片化，并大幅降低移植和维护 AI 工作负载的成本。

FlagTensor 是一个使用 [Triton](https://github.com/openai/triton) 语言实现的高性能张量原语库。它提供常见张量原语（一元、二元和张量收缩操作）的优化实现，以 [cuTensor](https://developer.nvidia.com/cutensor) 基线为基准，在不同 GPU 架构上提供参考级正确性和具有竞争力的性能。

FlagTensor 构建在 [FlagTree](https://github.com/flagos-ai/FlagTree)（FlagOS 维护的 Triton 分支，支持多种硬件后端）之上，提供与供应商无关的算子接口和可插拔后端支持。当前主要后端为 NVIDIA；其他供应商后端已注册但功能尚未完全就绪。

## 特性

- 全面的张量原语集合：一元（28 个算子）、二元（4 个算子）、收缩（3 个算子）、稀疏（1 个算子）
- 手工优化的 Triton 内核，支持按架构自动调优（Ampere、Hopper）
- 基于 CPU-FP64 金标准参考验证正确性
- 以 cuTensor 基线为基准进行性能基准测试
- 与供应商无关的后端抽象（已注册 15 家供应商；NVIDIA 后端为主要后端）
- 架构特定的内核特化（如 `_nvidia/hopper/`、`_nvidia/ampere/`）
- 每个算子的测试基础设施，支持 pytest 标记和 JSON 结果记录
- 多 GPU 并行测试运行器，带实时进度显示
- CI 就绪：质量门（lint/format）、正确性和性能流水线

## 项目结构

```
FlagTensor
├── src/flagtensor/            # Python 源码
│   ├── ops/                   # 算子实现（CUTENSOR_OP_*.py）
│   ├── utils/                 # 工具函数和内核构建器
│   ├── runtime/               # 运行时支持
│   │   ├── backend/           # 供应商和架构后端（_nvidia/、_ascend/ 等）
│   │   └── common.py          # 供应商枚举和能力常量
│   ├── testing/               # 测试工具（断言、形状、dtype）
│   ├── fused/                 # 融合算子
│   └── modules/               # 模块实现
├── tests/                     # 正确性测试（分类级 + 每个算子）
│   ├── unary/
│   │   ├── test_unary_correctness.py   # 分类级入口（28 个一元算子）
│   │   └── test_CUTENSOR_OP_*.py       # 每个算子测试（28 个文件）
│   ├── binary/
│   │   ├── test_binary_correctness.py  # 分类级入口（4 个二元算子）
│   │   └── test_CUTENSOR_OP_*.py       # 每个算子测试（4 个文件）
│   ├── contraction/
│   │   ├── test_contraction_correctness.py  # 分类级入口（3 个收缩算子）
│   │   ├── test_Contraction.py
│   │   ├── test_ContractionTrinary.py
│   │   └── test_ElementwiseTrinary.py
│   └── sparse/
│       ├── test_sparse_correctness.py   # 分类级入口（1 个稀疏算子）
│       └── test_BlockSparseContraction.py
├── benchmark/                 # 性能测试（分类级 + 每个算子）
│   ├── consts.py              # Dtype、形状、指标定义
│   ├── test_unary_perf.py     # 分类级：28 个一元算子
│   ├── test_binary_perf.py    # 分类级：4 个二元算子
│   ├── test_contraction_perf.py  # 分类级：3 个收缩算子
│   ├── test_sparse_perf.py    # 分类级：1 个稀疏算子
│   └── test_CUTENSOR_OP_*_perf.py  # 每个算子的基准测试文件
├── tools/                     # CLI 工具
│   ├── run_tests.py           # 多 GPU 测试运行器
│   ├── run_flagtensor_ci.py   # CI 运行器（冒烟/验收正确性与性能）
│   ├── run_flagtensor_weekly.py  # 每周回归运行器
│   ├── get_marks.py           # 从 YAML 提取 pytest 标记
│   ├── summary_for_plot.py    # 解析和聚合基准测试日志
│   ├── generate_flagtensor_html_report.py  # HTML 报告生成器
│   └── export_env.py          # 环境导出用于可复现性
├── conf/
│   └── operators.yaml         # 算子注册表（权威测试入口点）
├── docs/                      # 文档
├── .github/workflows/         # CI/CD 流水线
├── LICENSE
├── README.md
└── pyproject.toml
```
