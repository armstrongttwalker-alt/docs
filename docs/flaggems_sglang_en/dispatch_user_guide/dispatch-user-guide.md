# Operator Dispatch User Guide

This guide explains how to configure operator dispatch between FlagGems, vendor-specific, and PyTorch backends.

The dispatch system supports both YAML configuration and environment variables for fine-grained control. Environment variables take precedence over YAML config.

All plugin behavior is controlled via `SGLANG_FL_*` environment variables. They take precedence over YAML config.

The priority chain is as follows:

```{code-block} python
SGLANG_FL_* env vars > YAML config (SGLANG_FL_CONFIG) > Platform auto-detect YAML > Code defaults
```

Besides, the dispatch system provides three layers of operator replacement. You can control each layer independently and flexibly. 

```{toctree}
:maxdepth: 2

dispatch-through-yaml-file.md
dispatch-through-environment-variables.md
debugg-and-diagonostics.md
vendor-integration.md

```
