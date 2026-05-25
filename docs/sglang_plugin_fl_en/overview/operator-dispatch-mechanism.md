# Operator Dispatch Mechanism

The core dispatch mechanism uses an AROUND hook on `MultiPlatformOp.dispatch_forward()` combined with a standardized dispatch system shared with vllm-plugin-FL.

## Dispatch Flow

```
dispatch_forward() called for an op (e.g. RMSNorm)
  → AROUND hook intercepts
    → Check OOT_WHITELIST/OOT_BLACKLIST
    → Find bridge function via MRO (RMSNorm → rms_norm_bridge)
    → Return bridge function as the forward method
  → SGLang calls the bridge function with framework args:
      rms_norm_bridge(self, x, residual, post_residual_addition)
    → Bridge handles SGLang-specific params (post_residual_addition → merge into residual)
    → Bridge calls dispatch.call_op("rms_norm", obj, x, residual)
      → OpManager resolves best impl via policy (flagos > vendor > reference)
      → Calls the selected backend: rms_norm_flaggems(obj, x, residual)
```

## Bridge Layer

The bridge layer decouples framework-specific parameters from the standardized op signatures. Vendor backends only need to implement the standard signatures — the same implementation works for both sglang-plugin-FL and vllm-plugin-FL.

| Op | Standard Signature |
|----|-------------------|
| `silu_and_mul` | `fn(obj, x: Tensor) -> Tensor` |
| `rms_norm` | `fn(obj, x: Tensor, residual: Optional[Tensor] = None) -> Tensor \| tuple[Tensor, Tensor]` |
| `rotary_embedding` | `fn(obj, query, key, cos, sin, position_ids, rotary_interleaved=False, inplace=True) -> tuple[Tensor, Tensor]` |

## Dispatch Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  SGLang AROUND Hook        │  vLLM forward_oot override     │
│  (bridge/rms_norm.py)      │  (vllm_fl/ops/layernorm.py)    │
└────────────┬───────────────┴────────────────┬───────────────┘
             │                                │
             ▼                                ▼
┌─────────────────────────────────────────────────────────────┐
│  dispatch.call_op("rms_norm", obj, x, residual)             │
│  OpManager → SelectionPolicy → OpRegistry → resolve impl    │
└──────────────────────────┬──────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
   ┌─────────────┐  ┌───────────┐  ┌──────────────┐
   │ DEFAULT     │  │ VENDOR    │  │ REFERENCE    │
   │ (FlagGems)  │  │ (Ascend/  │  │ (PyTorch)    │
   │ priority=150│  │  CUDA)    │  │ priority=50  │
   │             │  │ priority= │  │              │
   │             │  │   100     │  │              │
   └─────────────┘  └───────────┘  └──────────────┘
```

## ATen Replacement

```
Plugin loads → flag_gems.enable(record=True)
  → PyTorch dispatch table registers Triton kernels for ATen ops
  → On first inference call, each replaced op is logged
  → _AtenOnlyFilter ensures only flag_gems.ops.* calls are recorded
    (excludes internal FlagGems calls from Layer 2 flagos implementations)
```
