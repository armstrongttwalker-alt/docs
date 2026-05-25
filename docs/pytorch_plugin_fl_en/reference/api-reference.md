# API Reference

This page documents the key APIs for PyTorch-Plugin-FL.

## Device Module

The plugin exposes a `flagos` device module through `torch_fl.flagos`.

### `torch_fl.flagos.is_available() -> bool`

Check if the flagos device is available.

### `torch_fl.flagos.device_count() -> int`

Return the number of flagos devices.

### `torch_fl.flagos.current_device() -> int`

Return the current device index.

### `torch_fl.flagos.synchronize()`

Synchronize all flagos devices.

### `torch_fl.flagos.device(index) -> context manager`

Set the current flagos device for the context.

```python
with torch_fl.flagos.device(0):
    a = torch.randn(10, 10, device="flagos")
```

## Utility Functions

### `torch_fl.is_flaggems_enabled() -> bool`

Check if FlagGems operators are registered.

### `torch_fl.get_registered_ops() -> list`

Return a list of registered operators.

## Environment Variables — Complete Reference

### Build-Time Variables

| Variable | Description |
|----------|-------------|
| `ACCELERATOR` | Hardware platform: `cuda`, `maca`, `ascend` |
| `CUDA_HOME` | CUDA toolkit path |
| `MACA_PATH` | MACA SDK path |
| `ASCEND_HOME` | CANN toolkit path |
| `FLAGGEMS_DIR` | FlagGems C++ library path |
| `FLAGGEMS_KERNEL` | Enable FlagGems kernel build |
| `CUDA_KERNEL` | Enable CUDA kernel build |
| `ASCEND_KERNEL` | Enable Ascend kernel build |

### Runtime Variables

| Variable | Description |
|----------|-------------|
| `FLAGOS_DISABLE_FLAGGEMS_PY` | Disable Python-layer FlagGems registration |
| `FLAGGEMS_SOURCE_DIR` | FlagGems source directory |
| `FLAGOS_BACKEND_CONFIG` | Override `backends.conf` path |
| `FLAGOS_LOG_DISPATCH` | Enable dispatch logging |
| `FLAGOS_OP_<name>` | Per-operator backend override |
