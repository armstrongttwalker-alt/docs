# Operator Dispatch User Guide

The dispatch system provides three layers of operator replacement. You can control each layer independently and flexibly.

The dispatch system supports both YAML configuration and environment variables for fine-grained control. Environment variables take precedence over YAML config.

The priority chain is as follows:

```{code-block} python
SGLANG_FL_* env vars > YAML config (SGLANG_FL_CONFIG) > Platform auto-detect YAML > Code defaults
```



```{toctree}
:maxdepth: 2

dispatch-through-yaml-file.md
dispatch-through-environment-variables.md
debugg-and-diagonostics.md
vendor-integration.md

```
