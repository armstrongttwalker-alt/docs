# Configure backend selection

The dispatch system supports multiple ways to configure backend selection:

1. **User-specified configuration file (YAML)** - Complete override
2. **Environment variables** - Override specific items
3. **Platform-specific configuration file** - Auto-detected defaults
4. **Built-in default values**

## Configuration priority

```
┌─────────────────────────────────────────────────────────────────┐
│                    Configuration Priority                        │
│                  (Highest to Lowest)                             │
├─────────────────────────────────────────────────────────────────┤
│  1. VLLM_FL_CONFIG        │ User config file, complete override │
│  2. Environment Variables │ Override specific items              │
│  3. Platform Config File  │ ascend.yaml / cuda.yaml defaults     │
│  4. Built-in Defaults     │ Code-defined default values          │
└─────────────────────────────────────────────────────────────────┘
```

```{note}
- Environment variables can override specific items from platform config
- If user doesn't set any environment variable, platform config is used
- Users can also modify platform config files directly
```

The dispatch system applies configuration in the following order:

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Configuration Resolution                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  VLLM_FL_CONFIG set?                                                 │
│       │                                                               │
│       ├── Yes ──▶ Use user config file (complete override)           │
│       │                                                               │
│       └── No ──▶ For each setting:                                   │
│                       │                                               │
│                       ├── Env var set? ──▶ Use env var value         │
│                       │                                               │
│                       └── Not set ──▶ Use platform config value      │
│                                              │                        │
│                                              └── Not found ──▶ Default│
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## User-specified configuration file (YAML)

Set the `VLLM_FL_CONFIG` environment variable to specify a YAML configuration file that completely overrides all other settings:

```bash
export VLLM_FL_CONFIG=/path/to/vllm_fl_dispatch.yaml
```

### Example configuration file

```{code-block}yaml
# vllm_fl_dispatch.yaml

# Preferred backend type: flagos, vendor, or reference
prefer: vendor

# Strict mode:
#   true  = fail immediately on error, no fallback
#   false = try next backend on failure (default)
strict: false

# Vendor whitelist (optional)
allow_vendors:
  - cuda

# Vendor blacklist (optional)
deny_vendors:
  - ascend

# Per-operator backend selection order (optional)
# Only the backends listed will be tried, in the specified order.
op_backends:
  rms_norm:
    - vendor        # Try any available vendor first
    - flagos        # Then try flagos
    # reference not listed, so it won't be used for rms_norm

  silu_and_mul:
    - vendor:cuda   # Only try CUDA, not other vendors
    - flagos
    - reference

# FlagGems operator blacklist (optional)
# These operators will NOT use FlagGems implementation
flagos_blacklist:
  - to_copy
  - zeros
  - mm

# OOT operator blacklist (optional)
# These operators will NOT be registered as OOT replacements
oot_blacklist:
  - fused_moe
```

#### Token type explanations

| Token | Description |
|-------|-------------|
| `flagos` | FlagOS default implementation |
| `reference` | PyTorch reference implementation |
| `vendor` | Any available vendor backend (auto-detects hardware) |
| `vendor:cuda` | Only CUDA vendor backend |
| `vendor:ascend` | Only Ascend vendor backend |

**Note**: When using `vendor` (without specifying a vendor name), the system automatically selects an available vendor backend based on hardware detection.

#### More op backends selection example

```yaml
op_backends:
  mul:
    - flagos
  silu_and_mul:
    - flagos
    - vendor
    - reference
```

## Environment variables

Environment variables can override specific items from platform config. If not set, values from platform config file are used.

### Core Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `VLLM_FL_PREFER_ENABLED` | `true` | Global switch. Set `false` to disable all dispatch features |
| `VLLM_FL_CONFIG` | (none) | Path to YAML config file (complete override) |
| `VLLM_FL_PLATFORM` | (auto) | Force platform: `ascend`, `cuda` |

### Backend Selection

| Variable | Default | Description |
|----------|---------|-------------|
| `VLLM_FL_PREFER` | `flagos` | Preferred backend: `flagos`, `vendor`, `reference` |
| `VLLM_FL_STRICT` | `0` | Strict mode: `1` = fail on error, `0` = try fallback |
| `VLLM_FL_PER_OP` | (none) | Per-operator order: `op1=a\|b\|c;op2=x\|y` |
| `VLLM_FL_ALLOW_VENDORS` | (none) | Vendor whitelist, comma-separated |
| `VLLM_FL_DENY_VENDORS` | (none) | Vendor blacklist, comma-separated |

### FlagGems Control

| Variable | Default | Description |
|----------|---------|-------------|
| `USE_FLAGGEMS` | `true` | Enable/disable FlagGems |
| `VLLM_FL_FLAGOS_WHITELIST` | (none) | FlagGems ops whitelist (mutually exclusive with blacklist) |
| `VLLM_FL_FLAGOS_BLACKLIST` | (none) | FlagGems ops blacklist (mutually exclusive with whitelist) |

**Priority**: `WHITELIST` > `BLACKLIST` (env) > `flagos_blacklist` (config file)

### OOT Operator Control

| Variable | Default | Description |
|----------|---------|-------------|
| `VLLM_FL_OOT_ENABLED` | `1` | Enable OOT operator registration |
| `VLLM_FL_OOT_WHITELIST` | (none) | OOT ops whitelist |
| `VLLM_FL_OOT_BLACKLIST` | (none) | OOT ops blacklist |

**Priority**: `WHITELIST` > `BLACKLIST` (env) > `oot_blacklist` (config file)

### Debug & Logging

| Variable | Default | Description |
|----------|---------|-------------|
| `VLLM_FL_LOG_LEVEL` | `INFO` | Log level: `DEBUG`, `INFO`, `WARNING`, `ERROR` |
| `VLLM_FL_DISPATCH_DEBUG` | `0` | Enable dispatch debug mode |

### Plugins

| Variable | Default | Description |
|----------|---------|-------------|
| `VLLM_FL_PLUGIN_MODULES` | (none) | External plugin modules, comma-separated |
| `VLLM_FL_OP_CONFIG` | (none) | Operator config JSON file path |

### Other environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `FLAGCX_PATH` | (none) | FlagCX library path (enables FlagCX communication backend) |
| `FLAGGEMS_ENABLE_OPLIST_PATH` | `/tmp/flaggems_enable_oplist.txt` | FlagGems enabled ops list file |

### Examples

```bash
# Use platform default config (auto-detected)
# Nothing to set - just run your application

# Override only the prefer setting (other items from platform config)
export VLLM_FL_PREFER=vendor

# Override FlagGems blacklist (overrides config file blacklist)
export VLLM_FL_FLAGOS_BLACKLIST="mm,to_copy,zeros"

# Use whitelist instead (completely ignores any blacklist)
export VLLM_FL_FLAGOS_WHITELIST="silu_and_mul,rms_norm"

# Specify per-operator order
export VLLM_FL_PER_OP="rms_norm=vendor|flagos|reference"

# Use completely custom config file
export VLLM_FL_CONFIG=/path/to/my_config.yaml

# Force specific platform
export VLLM_FL_PLATFORM=ascend

# Enable debug logging
export VLLM_FL_LOG_LEVEL=DEBUG
```

### Whitelist vs Blacklist Priority

For FlagGems and OOT operators:

```
WHITELIST (env) ──▶ Completely overrides blacklist
       │
       └── Not set ──▶ BLACKLIST (env) ──▶ Overrides config blacklist
                              │
                              └── Not set ──▶ Config file blacklist
                                                    │
                                                    └── Not set ──▶ Allow all
```

```{note}
- Whitelist and blacklist environment variables are mutually exclusive (error if both set)
- If whitelist is set, it completely ignores any blacklist (env or config)
- Environment blacklist overrides config file blacklist (not merged)
```

#### Example: Combined environment variables

```bash
# Platform config (ascend.yaml) has:
#   prefer: flagos
#   flagos_blacklist: [to_copy, zeros, mm, ...]

# User overrides only prefer, blacklist still from config
export VLLM_FL_PREFER=vendor

# Result:
#   prefer: vendor (from env)
#   flagos_blacklist: [to_copy, zeros, mm, ...] (from config)
```

```bash
# User wants to override blacklist too
export VLLM_FL_PREFER=vendor
export VLLM_FL_FLAGOS_BLACKLIST="custom_op1,custom_op2"

# Result:
#   prefer: vendor (from env)
#   flagos_blacklist: [custom_op1, custom_op2] (from env, config ignored)
```

```{note}
- **Environment variables override, not merge**: Setting an env var replaces the config value entirely
- **`VLLM_FL_PREFER` sets preference, not exclusivity**: It defines the selection order but will fall back to other backends if the preferred one is unavailable
- **To force a specific backend**: Combine `PREFER` with `DENY_VENDORS` or use `PER_OP` to exclude unwanted backends
- **`VLLM_FL_STRICT=1`**: Enables strict mode — fails immediately if the primary implementation fails, no fallback is attempted
```

### Fallback mechanism

When `VLLM_FL_STRICT=0` (default), if the primary implementation fails, the system automatically tries other available implementations:

```
Op 'rms_norm' using 'default.flagos' (kind=flagos, vendor=None)
[WARNING] Implementation 'default.flagos' failed for op 'rms_norm': ...
Op 'rms_norm' fallback to 'reference.torch' (kind=reference, vendor=None)
```

## Platform-specific configuration

The system automatically detects hardware and loads the corresponding configuration file from `config/` directory:

| Platform | Config File | Auto-Detection |
|----------|-------------|----------------|
| Ascend NPU | `config/ascend.yaml` | `torch.npu.is_available()` |
| NVIDIA GPU | `config/cuda.yaml` | `torch.cuda.is_available()` |

You can force a specific platform using `VLLM_FL_PLATFORM` environment variable:

```bash
export VLLM_FL_PLATFORM=ascend  # Force Ascend config
export VLLM_FL_PLATFORM=cuda    # Force CUDA config
```

## Operator List

This reference lists all operators supported by vllm-plugin-FL and their backend availability.

### Supported operators

| Operator | Description | FlagGems | Reference | Vendor |
|----------|-------------|----------|-----------|--------|
| `silu_and_mul` | SiLU activation + element-wise multiplication | ✓ | ✓ | ✓ |
| `rms_norm` | RMS normalization | ✓ | ✓ | ✓ |
| `rotary_embedding` | Rotary position embedding | ✓ | ✓ | ✓ |
| `attention_backend` | Attention backend class path | ✓ | - | ✓ |

### Backend priorities

The dispatch system selects operators based on the following priority hierarchy，Priority values are spaced by 50 to allow future insertion of intermediate priorities.

1. **FlagGems** (DEFAULT) — Priority 150
2. **Vendor-specific** — Priority 100
3. **PyTorch Reference** — Priority 50

Higher priority values are preferred. When an implementation is unavailable, the system falls back to the next priority level.