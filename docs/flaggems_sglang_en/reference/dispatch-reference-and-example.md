# Environment variable references and examples

This page documents the references and examples of environment variables for sglang-plugin-FL.

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

###  System / Debug

| Variable | Default | Description |
| :--- | :--- | :--- |
| `SGLANG_FL_CONFIG` | — | Path to YAML config file (overrides platform auto-detect) |
| `SGLANG_FL_PLATFORM` | (auto) | Force platform: cuda, ascend (overrides auto-detection) |
| `SGLANG_FL_LOG_LEVEL` | INFO | Dispatch system log level: DEBUG, INFO, WARNING, ERROR |
| `SGLANG_PLUGINS` | (all) | SGLang built-in: filter which plugins to load (comma-separated). Not needed — plugin auto-discovered after pip install |

## Examples

```{code-block} python
# Force all ops to reference backend (pure PyTorch, useful for precision debugging)
SGLANG_FL_PREFER=reference python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-0.5B-Instruct \
    --port 30000 --disable-piecewise-cuda-graph

# Per-op: RMSNorm uses vendor, others use flagos
SGLANG_FL_PER_OP="rms_norm=vendor|flagos;silu_and_mul=flagos" \
    python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-0.5B-Instruct \
    --port 30000 --disable-piecewise-cuda-graph

# Skip RotaryEmbedding from OOT dispatch (fall through to SGLang native CUDA)
SGLANG_FL_OOT_BLACKLIST=RotaryEmbedding python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-0.5B-Instruct \
    --port 30000 --disable-piecewise-cuda-graph

# Disable ATen layer, keep only fused op dispatch
USE_FLAGGEMS=0 python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-0.5B-Instruct \
    --port 30000 --disable-piecewise-cuda-graph

# Use YAML config with env var override
SGLANG_FL_CONFIG=./my_config.yaml SGLANG_FL_PREFER=reference \
    python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-0.5B-Instruct \
    --port 30000 --disable-piecewise-cuda-graph
```
