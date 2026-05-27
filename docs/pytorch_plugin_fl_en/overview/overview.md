# PyTorch-Plugin-FL Overview

`torch_fl` is a custom PyTorch device plugin based on the PrivateUse1 extension mechanism. It registers [FlagGems](https://github.com/flagos-ai/FlagGems) high-performance Triton operators as the `flagos` device backend for unified multi-chip support.

Without modifying PyTorch source code, the same `device="flagos"` tensor operations can run on NVIDIA CUDA, MetaX MACA, or Huawei Ascend hardware — automatically routing through the best available backend.

```{toctree}
:maxdepth: 2

features.md
architecture.md
project-structure.md
```
