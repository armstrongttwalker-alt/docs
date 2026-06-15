# How plugin works ?

## Load plugin

SGLang discovers and loads the plugin automatically at startup via setuptools entry_points.

The plugin registers two entry_points in `pyproject.toml`:

```{code-block} python
[project.entry-points."sglang.srt.plugins"]
sglang_fl = "sglang_fl:load_plugin"

[project.entry-points."sglang.srt.platforms"]
sglang_fl = "sglang_fl:activate_platform"
```

## Dispatch hook

The core mechanism uses an AROUND hook on `MultiPlatformOp.dispatch_forward()` combined with a standardized dispatch system:

```{code-block} python
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
The bridge layer decouples framework-specific parameters from the standardized op signatures. Vendor backends only need to implement the standard signatures — the same impl works for both sglang-plugin-FL and vllm-plugin-FL.

## Dispatch Architecture (shared with vllm-plugin-FL)

```{code-block} python
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
Chip vendors implement the **same backend interface** for both frameworks. The only framework-specific code is the bridge layer, which is maintained by the plugin.

## ATen replacement

```{code-block} python
Plugin loads → flag_gems.enable(record=True)
  → PyTorch dispatch table registers Triton kernels for ATen ops
  → On first inference call, each replaced op is logged
  → _AtenOnlyFilter ensures only flag_gems.ops.* calls are recorded
    (excludes internal FlagGems calls from Layer 2 flagos implementations)
```
