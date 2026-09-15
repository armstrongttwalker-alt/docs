# FlagTensor 已知问题

本文档跟踪当前 FlagTensor 实现中的已知问题和限制。

## 实验性算子

### block_sparse_contraction

- **状态**：实验性
- **问题**：稀疏张量收缩支持仍在积极开发中
- **影响**：与稠密算子相比，形状/dtype 覆盖率可能有限
- **建议**：仅用于评估；不用于生产工作负载

## 已知限制

### 算子特定的数值问题

### CI 环境

- **GPU 访问**：CI 工作流在 ubuntu-latest（CPU）上运行，无 GPU 访问
  - 实际的 GPU 验证必须通过 Slurm 在集群节点上完成
  - CI 正确性/性能作业目前验证结构和集成，而非实际的 GPU 正确性
- **内存**：CI 运行器内存有限；大形状测试在冒烟模式下缩减

### 基准测试模式覆盖率

- **kernel 模式**：大多数算子完全支持
- **operator 模式**：部分算子支持
- **wrapper 模式**：支持有限；主要用于包装器级优化有益的算子

### Dtype 覆盖率

- **float16**：跨算子完全支持
- **float32**：跨算子完全支持
- **bfloat16**：跨一元和收缩算子支持；在正确性测试中已验证
- **complex64/complex128**：仅对 `conj` 算子支持。Triton 的类型系统不原生支持复数 dtype；其他算子拒绝复数输入。

### 形状覆盖率

- **小形状**：(1024,)、(4096,) —— 在正确性和冒烟基准测试中覆盖
- **中形状**：(128, 128)、(32, 64, 16) —— 在正确性测试中覆盖
- **大形状**：最多 2^24 个元素 —— 在完整基准测试运行中覆盖
- **收缩形状**：用于布局/链验证的专用形状

## 性能说明

- **Triton 自动调优器**：当前 Triton 版本使用已弃用的 warmup/rep 参数
  - 弃用警告出现在基准测试输出中
  - 不影响功能；将在未来 Triton 升级中解决
- **cuTensor 基线**：与 cuTensor C API 的性能比较
  - 某些算子对某些形状/dtype 可能显示加速比 < 1x
  - 这是预期行为，不一定是问题

## 迁移说明

### 目录结构过渡

- **ctests/**：已移除；正确性测试现位于 tests/
- **benchmark/**：单个算子性能文件保留为实现细节；类别级入口点是正式验收接口
- **tests/**：统一的正确性入口，带旧版测试代理层
- **src/flagtensor/testing/**：集中式容差/断言辅助函数

### 注册表过渡

- **weekly_op_test.txt**：已移除；算子列表从注册表生成
- **discover_ops()**：旧版发现函数；正被基于注册表的过滤取代
- **手动排除**：`--exclude-op` 标志仍然支持，但注册表是首选

## 未来工作

- [x] 将所有正确性测试从 ctests/ 迁移到 tests/，按类别组织
  - [x] 类别目录已创建（unary/、binary/、contraction/、sparse/）
  - [x] 加载器支持跳过已迁移的算子
  - [x] 一元算子：28 个已迁移
  - [x] 二元算子：4 个已迁移（add、mul、max、min —— 全部完成）
  - [x] 收缩算子：3 个已迁移（contraction、contraction_trinary、elementwise_trinary）
  - [x] 稀疏算子：1 个已迁移（block_sparse_contraction，float16 现已激活）
- [x] 添加类别级基准测试入口点（正式验收接口）
  - [x] test_unary_perf.py
  - [x] test_binary_perf.py
  - [x] test_contraction_perf.py
  - [x] test_sparse_perf.py
- [ ] 升级 Triton 以移除弃用警告
- [ ] 向 CI 添加 GPU 运行器以进行实际正确性验证
- [x] 扩展 bfloat16 dtype 覆盖率
- [ ] 改进 wrapper 模式覆盖率
- [ ] 添加验收级性能回归检测
