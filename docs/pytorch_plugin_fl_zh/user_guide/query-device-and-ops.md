# 查询设备和算子信息

```python
# 检查设备是否可用
torch_fl.flagos.is_available()

# 设备数量
torch_fl.flagos.device_count()

# 当前设备索引
torch_fl.flagos.current_device()

# 同步设备
torch_fl.flagos.synchronize()

# 检查 FlagGems 算子是否已注册
torch_fl.is_flaggems_enabled()

# 已注册的算子列表
torch_fl.get_registered_ops()
```

