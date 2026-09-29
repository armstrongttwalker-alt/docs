# FlagGems-sglang 概览

FlagGems-sglang 是 [FlagOS](https://flagos.io/) 的一部分，是一个面向多种硬件后端的高性能算子库。它提供了常见 SGLang 算子的优化实现，并支持多种广泛使用的模型进行高性能推理与部署。

FlagGems-sglang 是一个使用 OpenAI 推出的 [Triton 编程语言](https://github.com/openai/triton) 实现的高性能深度学习算子库。

通过与 SGLang 集成，FlagGems-sglang 以优化的 Triton 内核替代默认算子实现来加速推理负载，在多种硬件平台上带来显著的性能提升。

本算子库提供 40 个通用算子，覆盖激活与门控、注意力、Mamba 与 SSM 的分块与扫描、分块累积求和、混合专家的路由与归约、LoRA 投影、归一化、INT8 量化、旋转位置编码、采样与投机解码。完整列表见[算子列表](../reference/operator_list.md)。

## 多级算子路由

每个算子都会针对当前设备经三级注册器解析，同名冲突时后一级覆盖前一级：

| 优先级 | 来源 | 用途 |
|----------|--------|---------|
| 0 | `flaggems_sglang.ops` | 通用 Triton 实现 |
| 1 | `flaggems_sglang.runtime.backend._<vendor>/ops` | 面向厂商的特化实现 |
| 2 | `flaggems_sglang.runtime.backend._<vendor>/<arch>/ops` | 面向具体架构的特化实现，例如 `_nvidia/hopper/ops` |

路由以函数名为依据：厂商特化只需在 `_<vendor>/ops/my_op.py` 中定义 `def my_op(...)`，并在该模块的 `__all__` 中列出即可。厂商未特化的算子会自动回退到通用实现，因此每个厂商只需提供自己真正适配的内核。

解析后的实现直接挂载在包命名空间上，因此无论底层硬件是什么，调用方使用的入口都一致：

```python
import flaggems_sglang

flaggems_sglang.device                    # 设备名，例如 cuda
flaggems_sglang.vendor_name               # 检测到的厂商，例如 nvidia
flaggems_sglang.all_registered_ops()      # 当前设备解析出的算子名
flaggems_sglang.get_op("silu_and_mul")    # 解析后的可调用对象
flaggems_sglang.silu_and_mul.__module__   # 解析实现所在的模块
```

```{toctree}

features.md

```
