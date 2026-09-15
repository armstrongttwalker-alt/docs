# Register custom gates

Extend FlagQuantum with your own gate definitions:

```{code-block} python
from flagquantum.ops import register_gate
import torch

# Define custom gate matrix
my_gate = torch.tensor([[0, 1], [1, 0]], dtype=torch.complex64)
register_gate("my_gate", my_gate)

# Now available as:
# - fq.ops.registry.my_gate (functional)
# - fq.ops.registry.my_gate_inv (inverse)
# - fq.ops.registry.MY_GATE (operator class)
```
