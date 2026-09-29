# FlagGems-sglang Overview

FlagGems-sglang is part of [FlagOS](https://flagos.io/). It is a high-performance operator library designed for multiple hardware backends. It provides optimized implementations of common SGLang operators and supports high-performance inference and deployment for a variety of widely used models.

FlagGems-sglang is a high-performance deep learning operator library implemented using the [Triton programming language](https://github.com/openai/triton) launched by OpenAI.

By integrating with SGLang, FlagGems-sglang accelerates inference workloads through optimized Triton kernels that replace default operator implementations, delivering significant performance gains across diverse hardware platforms.

The library ships 40 generic operators. They cover activation and gating, attention, Mamba and SSM chunks and scans, chunked cumulative sums, Mixture-of-Experts routing and reduction, LoRA projections, normalization, INT8 quantization, rotary positional embedding, sampling and speculative decoding. See [Operator List](../reference/operator_list.md) for the full set.

## Multi-level operator routing

Every operator is resolved for the current device by a three-level registrar; later levels override earlier ones on a name collision:

| Priority | Source | Purpose |
|----------|--------|---------|
| 0 | `flaggems_sglang.ops` | Generic Triton implementation |
| 1 | `flaggems_sglang.runtime.backend._<vendor>/ops` | Per-vendor specialization |
| 2 | `flaggems_sglang.runtime.backend._<vendor>/<arch>/ops` | Per-architecture specialization, for example `_nvidia/hopper/ops` |

Routing is driven by function name: a vendor override defines `def my_op(...)` in `_<vendor>/ops/my_op.py` and lists it in that module's `__all__`. Operators a vendor does not specialize automatically fall back to the generic implementation, so each vendor ships only the kernels it actually adapts.

The resolved implementation is attached to the package namespace, so callers use one entry point regardless of the underlying hardware:

```python
import flaggems_sglang

flaggems_sglang.device                    # device name, for example cuda
flaggems_sglang.vendor_name               # detected vendor, for example nvidia
flaggems_sglang.all_registered_ops()      # operator names resolved for this device
flaggems_sglang.get_op("silu_and_mul")    # resolved callable
flaggems_sglang.silu_and_mul.__module__   # module the resolved implementation came from
```

```{toctree}

features.md

```
