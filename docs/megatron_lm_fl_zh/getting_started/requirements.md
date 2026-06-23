# 要求

## 支持的硬件

| 平台 | 设备 | 描述 |
|------|------|------|
| **NVIDIA** | CUDA GPU | 完整功能支持（默认） |
| **MetaX** | MetaX GPU | MetaX 平台 |
| **Moore Threads** | MUSA GPU | Moore Threads MUSA 平台 |
| **TXDA** | Tsingmicro GPU | Tsingmicro TXDA 平台 |
| **NPU** | Ascend NPU | Ascend 910B / CANN 8.0+ |

## 操作系统

Linux（官方），WSL2（有限支持）

## 软件

- Python >= 3.10（推荐 3.12）
- PyTorch >= 2.3
- CUDA >= 12.1（NVIDIA GPU），或 MUSA SDK（Moore Threads / MetaX），或 CANN 8.0+（NPU）
- TransformerEngine（可选，用于 TE 加速层）

## 源码构建要求

- CMake 3.18+
- Git 2.17+
