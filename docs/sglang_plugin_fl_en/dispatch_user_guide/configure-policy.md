# Configure Dispatch Policy

The dispatch system supports both YAML configuration and environment variables for fine-grained control.

## YAML Config File

The plugin ships with a sample config file with all available options. Copy it and customize:

```{code-block} shell
# Copy the sample config
cp $(python -c "from sglang_fl.config import _CONFIG_DIR; print(_CONFIG_DIR / 'sample.yaml')") my_config.yaml

# Edit as needed, then launch with it
SGLANG_FL_CONFIG=./my_config.yaml python -m sglang.launch_server \
    --model-path Qwen/Qwen2.5-0.5B-Instruct \
    --port 30000 --disable-piecewise-cuda-graph
```

If `SGLANG_FL_CONFIG` is not set, the plugin uses sensible defaults (equivalent to `prefer: flagos` on CUDA). You only need a YAML file when you want to customize behavior.

### Config Fields

```yaml
# Global backend preference: flagos | vendor | reference
prefer: flagos

# Per-op backend priority (ordered list, first available wins)
op_backends:
  rms_norm: [vendor, flagos, reference]
  silu_and_mul: [flagos, vendor, reference]

# Layer 2 fused ops to skip (fall through to SGLang native CUDA)
# Available: SiluAndMul, RMSNorm, RotaryEmbedding
oot_blacklist:
  - RotaryEmbedding

# Layer 1 ATen ops to exclude from FlagGems Triton replacement
flagos_blacklist:
  - mul
  - sub
```

| Field | Description |
|-------|-------------|
| `prefer` | Global backend preference: `flagos`, `vendor`, `reference` |
| `op_backends` | Per-op ordered backend list (first available wins, can list 1–3 backends) |
| `oot_blacklist` | Layer 2 fused ops to skip from OOT dispatch (fall through to SGLang native CUDA) |
| `flagos_blacklist` | Layer 1 ATen ops to exclude from FlagGems replacement (fall through to PyTorch native) |

## Common Recipes

### 1. Skip RotaryEmbedding from OOT Dispatch

```yaml
# my_config.yaml
prefer: flagos
oot_blacklist:
  - RotaryEmbedding
```

Expected dispatch log: only SiluAndMul and RMSNorm appear, no RotaryEmbedding.

### 2. Force RMSNorm to Use Vendor Backend

```yaml
# my_config.yaml
prefer: flagos
op_backends:
  rms_norm: [vendor, flagos, reference]
```

Expected dispatch log: `RMSNorm → vendor(vendor.nvidia)`, `SiluAndMul → flagos(flagos)`.

### 3. Use Pure PyTorch Reference for All Ops

```yaml
# my_config.yaml
prefer: reference
```

Expected dispatch log: all ops → `reference(reference)`.
