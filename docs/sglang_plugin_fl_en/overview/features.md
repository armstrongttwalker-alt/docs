# Features

SGLang's inference engine relies on NVIDIA-specific components: flashinfer for attention, sgl_kernel for fused CUDA kernels, and NCCL for distributed communication. Running on alternative hardware (Huawei Ascend, Cambricon MLU, Iluvatar, etc.) would otherwise require invasive source modifications.

sglang-plugin-FL provides a non-intrusive adaptation layer through three levels of replacement:

## Layer 1 — ATen Operators

Replaces PyTorch's low-level ops (matmul, softmax, embedding, etc.) with FlagGems Triton kernels via PyTorch's dispatch mechanism. When `flag_gems.enable()` is called, the PyTorch dispatch table registers Triton kernels for ATen ops, providing hardware-accelerated implementations without code changes.

## Layer 2 — SGLang Fused Kernels

Intercepts SGLang's custom fused ops (SiluAndMul, RMSNorm, RotaryEmbedding) via HookRegistry AROUND hooks, routing through a standardized dispatch system to select the best available backend:

- **FlagGems** — Triton-based implementations (default, highest priority)
- **Vendor** — Chip-native implementations (e.g., CUDA sgl_kernel, Ascend CANN)
- **Reference** — Pure PyTorch fallback implementations

## Layer 3 — Distributed Communication

Replaces NCCL-based collectives with CommunicatorFL (backed by FlagCX or torch.distributed), enabling multi-card inference on any hardware. Supports all_reduce, all_gather, reduce_scatter, send, and recv operations.

```
┌──────────────────────────────────────────────────────────────┐
│                       SGLang Runtime                         │
├──────────────────────────────────────────────────────────────┤
│  Layer 1: ATen Ops (flag_gems.enable → PyTorch dispatch)     │
│    torch.mm / torch.add / torch.softmax / ...                │
│      → FlagGems Triton kernels                               │
├──────────────────────────────────────────────────────────────┤
│  Layer 2: SGLang Fused Ops (AROUND hook on dispatch_forward) │
│    SiluAndMul / RMSNorm / RotaryEmbedding                    │
│      → flagos (FlagGems Triton) | vendor (chip-native) | ref │
├──────────────────────────────────────────────────────────────┤
│  Layer 3: Communication (AROUND hooks on GroupCoordinator)   │
│    all_reduce / all_gather / reduce_scatter / send / recv    │
│      → CommunicatorFL (FlagCX / torch.distributed)           │
├──────────────────────────────────────────────────────────────┤
│  Triton JIT / Vendor Native → GPU / NPU Kernels              │
└──────────────────────────────────────────────────────────────┘
```

## Verified Models

| Model | TP | Status |
|-------|-----|--------|
| Qwen3.6-27B (Hybrid Attention + FLA + MoE) | tp=1 | Verified |
| Qwen3.6-35B-A3B (MoE, 256 experts) | tp=1 | Verified |
| Qwen2.5-14B-Instruct | tp=8 | Verified |

## Key Benefits

- **Zero code changes** — Run SGLang on any supported hardware using the same commands
- **Non-intrusive** — Plugin-based architecture that doesn't modify SGLang source code
- **Flexible dispatch** — Per-operator backend selection with automatic fallback
- **Vendor extensible** — Chip vendors can integrate by implementing a standard backend interface
- **Shared implementations** — Vendor backends work across both sglang-plugin-FL and vllm-plugin-FL
