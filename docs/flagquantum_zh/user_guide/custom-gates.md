# 注册自定义门

使用您自己的门定义扩展 FlagQuantum：

```{code-block} python
from flagquantum.ops import register_gate
import torch

# 定义自定义门矩阵
my_gate = torch.tensor([[0, 1], [1, 0]], dtype=torch.complex64)
register_gate("my_gate", my_gate)

# 现在可以通过以下方式使用：
# - fq.ops.registry.my_gate（函数式）
# - fq.ops.registry.my_gate_inv（逆）
# - fq.ops.registry.MY_GATE（算符类）
```
