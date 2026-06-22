# 基本用法

## 导入并注册设备

```{code} python
import torch
import torch_fl  # 导入会自动注册 FlagGems 算子

# 在 flagos 设备上创建张量
x = torch.randn(1000, 1000, device="flagos")
y = torch.randn(1000, 1000, device="flagos")

# 所有操作自动使用 FlagGems Triton 内核
z = x + y
mm_result = torch.mm(x, y)
softmax_result = torch.softmax(x, dim=-1)
```

```{note}
**MetaX（MACA）硬件上的导入顺序**：
在 MetaX（MACA）硬件上，您必须在导入 `torch` 之前导入 `torch_fl`，因为 PyTorch 自带的 CUDA 12.x 运行时与 MACA 的 cu-bridge（CUDA 11.6 兼容层）存在 ABI 不兼容。`torch_fl` 会预加载一个 shim 库以提供所需的符号版本。
```


## 在设备之间传输数据

```python
# CPU 到 flagos
cpu_tensor = torch.randn(3, 3)
flagos_tensor = cpu_tensor.to("flagos")

# flagos 回到 CPU
back_to_cpu = flagos_tensor.cpu()
```

## 管理设备上下文

```python
with torch_fl.flagos.device(0):
    a = torch.randn(10, 10, device="flagos")
```
