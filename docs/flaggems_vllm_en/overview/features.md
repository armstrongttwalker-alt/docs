# Features

FlagGems-vLLM provides the following key features:

- **Operators have undergone deep performance tuning** — Each operator is carefully optimized for throughput and latency across multiple hardware backends.
- **Triton kernel call optimization** — Kernel launch overhead is minimized through specialized Triton kernel patterns and autotuning.
- **Flexible multi-backend support mechanism** — The library supports a variety of GPU hardware platforms, allowing operators to run efficiently regardless of the underlying device.
- **Support for common vLLM operators** — Includes optimized implementations of operators frequently used in vLLM inference, such as `moe_align_block_size`, `relu`, and more.
