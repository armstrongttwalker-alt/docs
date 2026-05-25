# Debugging

## Dispatch Logging

Enable dispatch logging to see which backend is selected for each operator:

```{code-block} shell
export FLAGOS_LOG_DISPATCH=1
python your_script.py
```

This prints the backend selection for each operator dispatch to stdout.

## Testing

```{code-block} shell
export TORCH_DEVICE_BACKEND_AUTOLOAD=0

# Basic operator tests
pytest tests/integration/test_factory_ops.py -v --device cuda
pytest tests/integration/test_factory_ops.py -v --device flagos
```

## Common Issues

| Symptom | Cause & Fix |
|---------|-------------|
| NaN output on CUDA 12.2 | Known precision issue. Upgrade to CUDA 12.9 or higher. |
| Import error on MACA | Ensure `torch_fl` is imported before `torch`. |
| FlagGems ops not registered on Ascend | Set `FLAGOS_DISABLE_FLAGGEMS_PY=1` and use `backends_ascend.conf`. |
| `device_count()` returns 0 | Check hardware SDK installation and environment variables. |
