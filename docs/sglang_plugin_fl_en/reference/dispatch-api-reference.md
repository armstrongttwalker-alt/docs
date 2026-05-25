# API Reference

This page documents the key APIs and configuration options for sglang-plugin-FL.

## Environment Variables — Complete Reference

### Layer 2 — Fused Op Dispatch

| Variable | Default | Description |
|----------|---------|-------------|
| `SGLANG_FL_OOT_ENABLED` | `1` | Master switch: `0` disables Layer 2 |
| `SGLANG_FL_PREFER` | `flagos` | Global backend: `flagos`, `vendor`, `reference` |
| `SGLANG_FL_PER_OP` | — | Per-op priority: `rms_norm=vendor\|flagos` |
| `SGLANG_FL_OOT_BLACKLIST` | — | Skip ops from OOT dispatch |
| `SGLANG_FL_OOT_WHITELIST` | — | Only dispatch listed ops |
| `SGLANG_FL_STRICT` | `0` | Disable fallback on error |
| `SGLANG_FL_DISPATCH_LOG` | — | Dispatch log file path |

### Layer 1 — ATen Replacement

| Variable | Default | Description |
|----------|---------|-------------|
| `USE_FLAGGEMS` | `1` | Master switch for ATen replacement |
| `SGLANG_FL_FLAGOS_WHITELIST` | — | Only listed ops use FlagGems |
| `SGLANG_FL_FLAGOS_BLACKLIST` | — | Listed ops skip FlagGems |
| `SGLANG_FLAGGEMS_RECORD` | `0` | Record ATen replacements |
| `SGLANG_FLAGGEMS_LOG_PATH` | — | ATen replacement log path |

### Layer 3 — Communication

| Variable | Default | Description |
|----------|---------|-------------|
| `SGLANG_FL_DIST_BACKEND` | `nccl` | Backend: `nccl`, `hccl`, `flagcx` |
| `FLAGCX_PATH` | — | FlagCX install path |

## Dispatch Log

See which backend each fused op resolved to (written at server startup):

```{code-block} shell
rm -f /tmp/dispatch.log
SGLANG_FL_DISPATCH_LOG=/tmp/dispatch.log \
  python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-0.5B-Instruct \
    --port 30000 --disable-piecewise-cuda-graph

sort -u /tmp/dispatch.log
# [OOT-DISPATCH] SiluAndMul → flagos(flagos)
# [OOT-DISPATCH] RMSNorm → flagos(flagos)
# [OOT-DISPATCH] RotaryEmbedding → flagos(flagos)
```

## ATen Replacement Log

Record which PyTorch ATen ops were replaced by FlagGems:

```{code-block} shell
rm -f /tmp/gems_aten.txt
SGLANG_FLAGGEMS_RECORD=1 SGLANG_FLAGGEMS_LOG_PATH=/tmp/gems_aten.txt \
  python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-0.5B-Instruct \
    --port 30000 --disable-piecewise-cuda-graph

# After first inference request:
sort -u /tmp/gems_aten.txt
```

The log uses `_AtenOnlyFilter` to record only `flag_gems.ops.*` namespace calls, excluding internal FlagGems calls triggered by Layer 2 implementations.

## Precision Bisection

When numerical differences appear, isolate the responsible layer:

```{code-block} shell
# Step 1: Disable everything — confirm vanilla SGLang works
SGLANG_PLUGINS="__none__" python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-0.5B-Instruct \
    --port 30000 --disable-piecewise-cuda-graph

# Step 2: Enable only Layer 2 (fused ops), disable ATen replacement
USE_FLAGGEMS=0 python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-0.5B-Instruct \
    --port 30000 --disable-piecewise-cuda-graph

# Step 3: Per-op isolation
USE_FLAGGEMS=0 \
SGLANG_FL_PER_OP="silu_and_mul=flagos;rms_norm=reference" \
    python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-0.5B-Instruct \
    --port 30000 --disable-piecewise-cuda-graph

# Step 4: Disable Layer 2, only ATen replacement active
SGLANG_FL_OOT_ENABLED=0 python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-0.5B-Instruct \
    --port 30000 --disable-piecewise-cuda-graph
```

If output diverges at Step N but not Step N-1, the responsible layer/op is isolated.

## Common Issues

| Symptom | Cause & Fix |
|---------|-------------|
| `dispatch.log` is empty | Plugin not loaded — check `pip show sglang_fl` |
| `gems_aten.txt` is empty | `USE_FLAGGEMS=0` is set, or whitelist excludes the op |
| `forward_cuda` error on non-NVIDIA | An op lacks OOT registration — register it or add to whitelist |
| `ImportError: sgl_kernel` | Normal on non-CUDA — the OOT dispatch bypasses `forward_cuda` |
| tp>1 hangs at startup | Check GPU count, NCCL env vars, model TP compatibility |
| OOM at engine startup | Reduce `--mem-fraction-static` (default 0.5) |
