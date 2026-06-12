# FlagAudio Overview

FlagAudio is part of [FlagOS](https://flagos.io/Home). FlagAudio is a multi-backend computing library that adheres to Audio standard interfaces. It delivers a high-performance computing solution designed for audio signal processing and speech AI applications, offering a complete processing chain from raw audio to model input.

FlagAudio is a high-performance general-purpose operator library implemented using the [Triton programming language](https://github.com/triton-lang/triton) launched by OpenAI.

## Features

- **Deep performance tuning** — All audio operators have undergone extensive optimization for throughput and latency.
- **Triton kernel call optimization** — Kernel launch patterns minimize overhead and maximize hardware utilization.
- **Flexible multi-backend support** — A pluggable backend mechanism targets different chip vendors through a unified API.
