# FlagScale v1.0.0 发布说明

## 亮点

- **统一 FlagScale CLI**：引入统一的 FlagScale CLI 作为所有操作的唯一入口，提供跨 NVIDIA GPU、昇腾和 MUSA 的统一多芯片训练支持。
- **VeRL-FL 与扩展模型支持**：将第三方 verl 替换为 [VeRL-FL](https://github.com/flagos-ai/verl-FL)，并扩展模型支持至 Qwen3-VL、Qwen2.5-VL、GR00T N1.5 和 DeepSeek Engram。
- **增强的 CI/CD**：通过 Megatron-LM-FL 集成测试和自动化 CLI 验证工作流，增强了 CI/CD 覆盖范围。
