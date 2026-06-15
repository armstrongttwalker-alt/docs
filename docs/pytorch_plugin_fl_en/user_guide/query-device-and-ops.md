# Query device and operator information

```python
# Check if device is available
torch_fl.flagos.is_available()

# Number of devices
torch_fl.flagos.device_count()

# Current device index
torch_fl.flagos.current_device()

# Synchronize device
torch_fl.flagos.synchronize()

# Check if FlagGems operators are registered
torch_fl.is_flaggems_enabled()

# List of registered operators
torch_fl.get_registered_ops()
```

