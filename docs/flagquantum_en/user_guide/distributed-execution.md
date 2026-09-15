# Distributed multi-GPU execution

Run quantum simulations across multiple GPUs:

```{code-block} shell
# Run with 4 GPUs
torchrun --nproc_per_node=4 your_script.py
```

```{code-block} python
# In your script, world_sz is set automatically via torchrun
device = fq.DistributedQuantumDevice(n_wires=20, bsz=32, world_sz=4)
```
