# 使用算子

安装 FlagGems-sglang 后，直接导入该包并调用算子即可。针对当前设备解析出的每个算子都挂载在包命名空间上，因此无论底层硬件是什么，调用方式都保持一致。

下例使用两个已导出的算子 `silu_and_mul` 与 `fused_rmsnorm`：

```python
import torch
import flaggems_sglang

# 创建张量；hidden_states 形状为 [..., 2d]
x = torch.randn(1024, 4096, device=flaggems_sglang.device)

# 门控 SiLU：out = silu(x[..., :d]) * x[..., d:]
y = flaggems_sglang.silu_and_mul(x)

# 对最后一维做融合 RMSNorm
weight = torch.ones(2048, device=flaggems_sglang.device)
z = flaggems_sglang.fused_rmsnorm(y, weight, eps=1e-5)
```

查看当前机器解析到哪个实现：

```python
print(flaggems_sglang.device, flaggems_sglang.vendor_name)
print(flaggems_sglang.silu_and_mul.__module__)
print(len(flaggems_sglang.all_registered_ops()), "operators registered")
```

完整的算子列表请参见[算子列表](../reference/operator_list.md)。
