# 要求

PyTorch-Plugin-FL 需要以下软件版本。

## 软件依赖

| 依赖 | 版本 |
|------------|---------|
| Python | 3.12 |
| PyTorch | 2.11.0 |
| CUDA | 12.8 |
| FlagGems | 5.0.2 |

```{warning}
CUDA 12.2 存在已知的数值精度问题（NaN）。请使用 CUDA 版本 12.9 或更高版本。
```

## 硬件运行时依赖

| 平台 | 所需依赖 |
|----------|----------------------|
| CUDA | CUDA 工具包 12.8 |
| MACA（MetaX） | MACA cu-bridge 库 |
| 华为昇腾 | CANN 工具包 |

## FlagGems

需要 FlagGems（版本 5.0.2 或更高），并启用 `DFLAGGEMS_BUILD_C_EXTENSIONS`。有关源码安装，请参阅 [FlagGems 安装指南](https://flagos-ai.github.io/FlagGems/getting-started/install/)。

```{note}
在华为昇腾平台上，FlagGems 是可选的。
```
