# Features

- **Unified multi-chip backend**

Leverages FlagGems (unified operator library) and FlagCX (unified communication library) to provide chip-agnostic inference capabilities. The same model can run on different hardware without code modifications.

- **Flexible operator dispatch**

Implements a priority-based dispatch system that selects between FlagGems, vendor-specific, and PyTorch reference implementations. Operators can be configured per-backend with automatic fallback on failure.

- **Platform auto-detection**

Automatically detects hardware and loads platform-specific configuration. Supports NVIDIA GPU, Ascend NPU, T-Head, Iluvatar, MetaX, Moore Threads, Tsingmicro, Hygon DCU, and Sunrise chips.

- **Extensible vendor backend**

Supports built-in vendor backends (CUDA, Ascend), external plugin packages via setuptools entry points, and environment-based plugin modules.