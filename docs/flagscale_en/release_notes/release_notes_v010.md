# FlagScale 0.1.0 release

- **Added features**

  - Introduced a unified FlagScale CLI as the single entry point for all operations, with unified multi-chip training support across NVIDIA GPU, Ascend, and MUSA.
  
  - Replaced third-party verl with [VeRL-FL](https://github.com/flagos-ai/verl-FL) and expanded model support to include Qwen3-VL, Qwen2.5-VL, GR00T N1.5, and DeepSeek Engram.

- **Improved features**

    Enhanced CI/CD coverage Megatron-LM-FL integration tests and automated CLI validation workflows are added.

- **Compatibility caveats**

    This is the first stable release built on top of v1.0.0-alpha.0. If you are using or upgrading from a version earlier than v1.0.0-alpha.0, use the main-legacy branch. The main-legacy branch will continue to receive critical bug fixes and minor updates for a period of time.
