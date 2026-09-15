# 分布式多 GPU 执行

跨多个 GPU 运行量子模拟：

```{code-block} shell
# 使用 4 个 GPU 运行
torchrun --nproc_per_node=4 your_script.py
```

```{code-block} python
# 在脚本中，world_sz 通过 torchrun 自动设置
device = fq.DistributedQuantumDevice(n_wires=20, bsz=32, world_sz=4)
```
