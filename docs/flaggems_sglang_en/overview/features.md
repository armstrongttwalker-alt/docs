# Features

FlagGems-sglang provides the following key features:

- **Operators have undergone deep performance tuning** — Each operator is carefully optimized for throughput and latency across multiple hardware backends.
- **Triton kernel call optimization** — Kernel launch overhead is minimized through specialized Triton kernel patterns and autotuning.
- **Flexible multi-backend support mechanism** — The library supports a variety of GPU hardware platforms, allowing operators to run efficiently regardless of the underlying device.
- **Support for common SGLang operators** — Includes optimized implementations of operators frequently used in SGLang inference, such as `relu`, `outer`, and flashinfer-related operators.
