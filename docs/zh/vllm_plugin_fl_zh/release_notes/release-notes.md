# 发布说明

本节包含 vllm-plugin-FL 的发布信息。

## v0.1.1

vllm-plugin-FL v0.1.1 需要 [vllm v0.13.0](https://github.com/vllm-project/vllm/tree/v0.13.0)。

- **新增特性**

  - 混合长度基准测试脚本，用于跨可变序列长度的准确性和性能评估
  - 支持摩尔线程硬件

- **改进特性**

  - 解耦供应商后端注册，实现平台感知的动态发现，避免急切导入供应商后端
  - 修复算子调度单元测试用例，提高可靠性
  - CI/CD 改进：特权容器模式，使 nvidia-smi 命令在 CI 环境中可用


## v0.1.0

vllm-plugin-FL v0.1.0 需要 [vllm v0.13.0](https://github.com/vllm-project/vllm/tree/v0.13.0)。

- **新增特性**

  - vllm-plugin-FL 作为 vLLM 推理/服务框架插件的初始版本
  - 通过 FlagGems 和 FlagCX 集成提供统一多芯片后端支持
  - 灵活的算子调度系统，支持 FlagGems、供应商特定和 PyTorch 参考后端
  - 端到端验证支持 Qwen3.5-397B-A17B、Qwen3-Next-80B-A3B、Qwen3-4B、MiniCPM-o 4.5、GLM-5、Qwen3.5-35B-A3B 和 BAAI/bge-m3 模型
  - 硬件支持 NVIDIA、昇腾、平头哥-镇武、MetaX 和 Iluvatar 芯片
  - 平台特定配置文件（ascend.yaml、cuda.yaml）用于自动检测的默认值
  - 基于环境变量的配置，用于后端选择、供应商过滤和算子控制
  - YAML 配置文件支持，用于完全覆盖调度策略
  - 多进程安全的算子注册表，具有线程安全的缓存操作

- **改进特性**

  - 优化调度流程，对已解析的算子进行缓存
  - 从首选后端到可用替代方案的回退机制
  - 每个算子的后端选择顺序配置
  - FlagGems 和 OOT 算子的白名单和黑名单支持
  - 调度系统故障排除的调试日志模式
