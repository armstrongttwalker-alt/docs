# 功能特性

PyTorch-Plugin-FL 提供以下能力：

## 自动设备注册

自动将 FlagGems Triton 算子注册为 `flagos` 设备的调度实现。一旦导入，所有在 `device="flagos"` 上的张量操作将自动使用 FlagGems Triton 内核，无需修改代码。

## 可配置的后端路由

以逐算子粒度选择 FlagGems 或原生厂商后端（CUDA/MACA/Ascend）。`backends.conf` 配置文件控制哪些算子使用哪个后端，并支持通过环境变量覆盖单个算子。

## 多平台支持

支持三种硬件平台：

| 平台 | 后端 | 备注 |
|----------|---------|-------|
| **NVIDIA CUDA** | CUDA 12.8 + FlagGems Triton | 完整的 FlagGems 支持 |
| **MACA（MetaX）** | MACA cu-bridge + shim | 在 `torch` 之前导入 `torch_fl` |
| **华为昇腾** | ACL NN API | FlagGems 禁用；仅原生内核 |

## 完整的设备管理 API

提供完整的 PyTorch 兼容设备接口：

- 流管理
- 事件同步
- RNG 状态
- AMP（自动混合精度）
- 设备上下文管理
- 内存分配器（设备内存和固定内存）
