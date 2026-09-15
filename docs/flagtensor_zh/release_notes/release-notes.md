# FlagTensor 发布说明

## v0.2.0


- **新增功能**

  - **一元算子** —— abs、acos、acosh、asin、asinh、atan、atanh、ceil、conj、cos、cosh、exp、floor、identity、log、mish、neg、rcp、relu、sigmoid、sin、sinh、soft_plus、soft_sign、sqrt、swish、tan、tanh（28 个算子）。
  - **二元算子** —— add、max、min、mul。
  - **收缩算子** —— contraction、contraction_trinary、elementwise_trinary。
  - **稀疏算子** —— block_sparse_contraction。
  - **算子注册表** —— 添加了 `conf/operators.yaml`，包含完整的算子元数据。
  - **多 GPU 测试运行器** —— `tools/run_tests.py`，带实时进度显示和 YAML 驱动的算子选择。
  - **CI/CD 流水线** —— 质量门（lint/format）、正确性和性能流水线。

- **增强功能**

  - 手工优化的 Triton 内核，支持按架构自动调优（Ampere、Hopper）。
  - 与供应商无关的后端抽象，已注册 15 家供应商。
  - 架构特定的内核特化（`_nvidia/hopper/`、`_nvidia/ampere/`）。
  - 每个算子的测试基础设施，支持 pytest 标记和 JSON 结果记录。

## v0.1.0

FlagTensor 首次发布。

- **新增功能**

  - 支持多后端的张量原语库。
  - 一元操作（ReLU 等）。
  - 用于逐元素张量算术的二元操作。
  - 用于多维归约的收缩操作。
  - 基于 cuTensor 基线的正确性和性能比较。
