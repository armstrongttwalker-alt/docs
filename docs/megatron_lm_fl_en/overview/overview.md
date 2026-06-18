# Megatron-LM-FL Overview

Megatron-LM-FL is a fork of [NVIDIA Megatron-LM](https://github.com/NVIDIA/Megatron-LM) that introduces a **plugin-based architecture** for supporting diverse AI chips, built on top of [FlagOS](https://github.com/flagos-ai), a unified open-source AI system software stack.

While upstream Megatron-LM is optimized exclusively for NVIDIA GPUs, Megatron-LM-FL extends it with a hardware abstraction layer that enables training on multiple platforms — including NVIDIA (CUDA), MetaX, Moore Threads (MUSA), TXDA (Tsingmicro), and NPU (Ascend) — with minimal code intrusion to the core library.

## Project Structure

```
Megatron-LM-FL/
├── megatron/
│   ├── core/                    # Megatron Core (kernels, parallelism, building blocks)
│   │   ├── models/              # Transformer models
│   │   ├── transformer/         # Transformer building blocks
│   │   ├── tensor_parallel/     # Tensor parallelism
│   │   ├── pipeline_parallel/   # Pipeline parallelism
│   │   ├── distributed/         # Distributed training (FSDP, DDP)
│   │   ├── optimizer/           # Optimizers
│   │   ├── datasets/            # Dataset loaders
│   │   ├── inference/           # Inference engines
│   │   └── export/              # Model export (e.g. TensorRT-LLM)
│   ├── plugin/                  # FL plugin system (multi-chip support)
│   │   ├── platform/            # Hardware platform abstraction
│   │   ├── distributed/         # Distributed training overrides
│   │   ├── optimizer/           # Optimizer overrides
│   │   └── decorators.py        # @overridable / @override mechanism
│   ├── training/                # Training scripts
│   ├── legacy/                  # Legacy components
│   └── post_training/           # Post-training (RLHF, etc.)
├── examples/                    # Ready-to-use training examples
├── tools/                       # Utility tools
├── tests/                       # Comprehensive test suite
└── docs/                        # Documentation
```
