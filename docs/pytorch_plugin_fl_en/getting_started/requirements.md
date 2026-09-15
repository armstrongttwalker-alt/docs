# Requirements

The following software versions are required for PyTorch-Plugin-FL.

## Software Dependencies

| Dependency | Version |
|------------|---------|
| Python | 3.12 |
| PyTorch | 2.11.0 |
| CUDA | 12.8 |
| FlagGems | 5.0.2 |

```{warning}
CUDA 12.2 has known numerical precision issues (NaN). Please use CUDA version 12.9 or higher.
```

## Hardware Runtime Dependencies

| Platform | Required Dependencies |
|----------|----------------------|
| CUDA | CUDA toolkit 12.8 |
| MACA (MetaX) | MACA cu-bridge library |
| Huawei Ascend | CANN toolkit |

## FlagGems

FlagGems (version 5.0.2 or higher) is required with `DFLAGGEMS_BUILD_C_EXTENSIONS` enabled. For source installation, refer to the [FlagGems Installation Guide](https://flagos-ai.github.io/FlagGems/getting-started/install/).

```{note}
FlagGems is optional on Huawei Ascend platform.
```
