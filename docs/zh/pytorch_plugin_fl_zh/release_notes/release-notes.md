# 发布说明

本节包含 PyTorch-Plugin-FL 的发布信息。

## v0.1.0

```{note}
这是一个预览版本。显示的版本号是预发布标识符，可能在最终发布时更改。此预览中的内容仅供参考，不构成对最终产品的承诺或保证。
```

- **新增功能**：
  - PyTorch-Plugin-FL 作为 FlagOS 的一部分首次发布。
  - 基于 PrivateUse1 的自定义设备插件，将 `flagos` 注册为一流的 PyTorch 设备。
  - 为 `flagos` 后端自动注册 FlagGems Triton 算子。
  - 通过 `backends.conf` 实现逐算子可配置的后端路由，支持环境变量覆盖。
  - 多平台支持：NVIDIA CUDA、MetaX MACA、华为昇腾。
  - 完整的设备管理 API：流、事件、RNG、AMP、内存分配器、DeviceGuard。
  - 轻量级 C++ 调度存根，替代 PyTorch 较重的 DispatchStub。
  - C++ 纯存根模式（`FLAGOS_DISABLE_FLAGGEMS_PY=1`），实现最小开销。
  - 通过 `torch_fl.distributed` 支持分布式训练（DDP/FSDP 补丁）。
  - MACA cu-bridge ABI shim，用于符号版本兼容。
  - 昇腾 NPU 支持，使用 ACL NN API 内核。
  - 集成测试套件，包含工厂算子、调度路由、CPU 回退追踪以及 Qwen3 推理/训练测试。
