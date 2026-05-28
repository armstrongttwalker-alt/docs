# Operator dispatch user guide

You can configure whether to use FlagGems or native vendor backend at per-operator granularity. Dispatching operators through environment variables takes higher priority than dispatching through configuration file.  

## Dispatch through environment variables

Individual operators can be overridden via environment variables (higher priority than config file):

```{code-block} bash
# Format: FLAGOS_OP_<op_name>=cuda|flaggems
# Replace "." in operator names with "__"
export FLAGOS_OP_mm=cuda
export FLAGOS_OP_mm__out=cuda
```

## Dispatch through configuration file

Default path is `torch_fl/backends.conf`, can be overridden via the `FLAGOS_BACKEND_CONFIG` environment variable.

```{code-block} bash
# Format: op_name = backend
# backend: "flagos" | "flaggems" | "cuda"
# Operators not listed default to flagos (FlagGems)
mm = cuda
bmm = flagos
cat = cuda
```

## C++ stub-only mode

You can disable the FlagGems Python-layer registration entirely, leaving only the C++ unified wrapper active. This is useful for verifying that all required operators are covered by C++ stubs.

```{code-block} bash
# Required: tell FlagGems C++ native API where to find Triton kernel sources
export FLAGGEMS_SOURCE_DIR=$(python -c "import os;import flag_gems;print(os.path.dirname(flag_gems.__file__))")

# Disable Python-layer FlagGems registration
export FLAGOS_DISABLE_FLAGGEMS_PY=1

python your_script.py
```

In this mode, all operator dispatch is handled by the C++ dispatch stub (`backends.conf` routing), with no Python-layer `torch.library` registrations from FlagGems.


## Debug Dispatch

```{code-block} bash
export FLAGOS_LOG_DISPATCH=1  # Print backend selection for each operator dispatch
```

## Runtime environment variables

| Variable | Description |
|----------|-------------|
| `FLAGOS_DISABLE_FLAGGEMS_PY` | Set to `1` to disable FlagGems Python-layer registration (required on Ascend) |
| `FLAGGEMS_SOURCE_DIR` | FlagGems source directory (required when C++ native API ops route to `flaggems` backend) |
| `FLAGOS_BACKEND_CONFIG` | Override path for `backends.conf` (use `torch_fl/backends_ascend.conf` on Ascend) |
| `FLAGOS_LOG_DISPATCH` | Set to `1` to print backend selection for each operator dispatch |
| `FLAGOS_OP_<name>` | Per-operator backend override (replace `.` with `__` in op names) |

