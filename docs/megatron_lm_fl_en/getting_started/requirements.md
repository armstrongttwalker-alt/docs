# Requirements

## Supported Hardwares

| Platform | Device | Description |
|----------|--------|-------------|
| **NVIDIA** | CUDA GPUs | Full feature support (default) |
| **MetaX** | MetaX GPUs | MetaX platform |
| **Moore Threads** | MUSA GPUs | Moore Threads MUSA platform |
| **TXDA** | Tsingmicro GPUs | Tsingmicro TXDA platform |
| **NPU** | Ascend NPU | Ascend 910B / CANN 8.0+ |

## Operating system

Linux (official), WSL2 (limited support)

## Software

- Python >= 3.10 (3.12 recommended)
- PyTorch >= 2.3
- CUDA >= 12.1 (NVIDIA GPU), or MUSA SDK (Moore Threads / MetaX), or CANN 8.0+ (NPU)
- TransformerEngine (optional, for TE-accelerated layers)

## Source Build Requirements

- CMake 3.18+
- Git 2.17+
