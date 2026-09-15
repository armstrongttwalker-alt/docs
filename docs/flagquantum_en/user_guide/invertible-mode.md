# Invertible mode

For large circuits requiring gradient computation, use invertible mode to reduce memory usage:

```{code-block} python
device = fq.DistributedQuantumDevice(n_wires=10, bsz=64, invertible=True)
# Uses less memory during backpropagation
```
