# 发布说明

## v0.1.0


sglang-plugin-FL 初始版本。

- 新增功能

  - SGLang 的三层算子替换架构：
    - **第一层**：通过 FlagGems Triton 内核进行 ATen 算子替换
    - **第二层**：SGLang 融合内核调度（SiluAndMul、RMSNorm、RotaryEmbedding）
    - **第三层**：通过 CommunicatorFL（FlagCX / torch.distributed）进行分布式通信
  - 使用 SGLang entry_points 的非侵入式插件架构
  - 逐算子后端选择，支持自动回退
  - YAML 配置和环境变量控制
  - 桥接层将框架特定参数与标准化算子签名解耦
  - 厂商自动发现机制——同一后端可同时用于 sglang-plugin-FL 和 vllm-plugin-FL
  - 支持 NVIDIA CUDA、华为昇腾，并可扩展到其他硬件
  - 已验证模型：Qwen3.6-27B、Qwen3.6-35B-A3B、Qwen2.5-14B-Instruct
  - 调度日志和 ATen 替换日志用于调试
  - 用于数值调试的精度二分法工作流
