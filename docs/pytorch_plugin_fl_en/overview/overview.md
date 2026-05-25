# PyTorch-Plugin-FL Overview

PyTorch-Plugin-FL (`torch_fl`) is a custom PyTorch device plugin based on the PrivateUse1 extension mechanism. It registers [FlagGems](https://github.com/FlagOpen/FlagGems) high-performance Triton operators as the `flagos` device backend for unified multi-chip support.

```{toctree}
:maxdepth: 2

features.md
architecture.md

```
