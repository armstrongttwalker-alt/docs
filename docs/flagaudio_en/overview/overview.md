# FlagAudio Overview

FlagAudio is a multi-backend computing library that adheres to Audio standard interfaces. It is part of the [FlagOS](https://flagos.io/) ecosystem and delivers a high-performance computing solution designed for audio signal processing and speech AI applications, offering a complete processing chain from raw audio to model input.

FlagAudio is implemented using the [Triton programming language](https://github.com/openai/triton) launched by OpenAI, enabling portable kernel code across diverse hardware.

## Features

- **Deep performance tuning** — All audio operators have undergone extensive optimization for throughput and latency.
- **Triton kernel call optimization** — Kernel launch patterns minimize overhead and maximize hardware utilization.
- **Flexible multi-backend support** — A pluggable backend mechanism targets different chip vendors through a unified API.
