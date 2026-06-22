# 算子调度用户指南

调度系统提供三层算子替换。您可以独立且灵活地控制每一层。

调度系统支持 YAML 配置和环境变量进行细粒度控制。环境变量优先级高于 YAML 配置。

优先级链如下：

```{code-block} python
SGLANG_FL_* 环境变量 > YAML 配置（SGLANG_FL_CONFIG）> 平台自动检测 YAML > 代码默认值
```



```{toctree}
:maxdepth: 2

dispatch-through-yaml-file.md
dispatch-through-environment-variables.md
debugg-and-diagonostics.md
vendor-integration.md

```
