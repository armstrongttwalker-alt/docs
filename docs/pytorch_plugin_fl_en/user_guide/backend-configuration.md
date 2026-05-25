# Backend Configuration

You can configure whether to use FlagGems or native vendor backend at per-operator granularity.

## Configuration File

Default path is `torch_fl/backends.conf`, can be overridden via `FLAGOS_BACKEND_CONFIG` environment variable.

```ini
# Format: op_name = backend
# backend: "flagos" | "flaggems" | "cuda"
# Operators not listed default to flagos (FlagGems)
mm = cuda
bmm = flagos
cat = cuda
```

## Environment Variable Override

Individual operators can be overridden via environment variables (higher priority than config file):

```{code-block} shell
# Format: FLAGOS_OP_<op_name>=cuda|flaggems
# Replace "." in operator names with "__"
export FLAGOS_OP_mm=cuda
export FLAGOS_OP_mm__out=cuda
```

## Runtime Environment Variables

| Variable | Description |
|----------|-------------|
| `FLAGOS_DISABLE_FLAGGEMS_PY` | Set to `1` to disable FlagGems Python-layer registration (required on Ascend) |
| `FLAGGEMS_SOURCE_DIR` | FlagGems source directory (required when C++ native API ops route to `flaggems` backend) |
| `FLAGOS_BACKEND_CONFIG` | Override path for `backends.conf` (use `torch_fl/backends_ascend.conf` on Ascend) |
| `FLAGOS_LOG_DISPATCH` | Set to `1` to print backend selection for each operator dispatch |
| `FLAGOS_OP_<name>` | Per-operator backend override (replace `.` with `__` in op names) |
