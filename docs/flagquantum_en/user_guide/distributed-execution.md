# Distributed execution

Distributed execution keeps one logical workload and shards it across ranks.

## Sharded statevector

An initialised multi-rank process group changes the runtime, not the program:

```bash
torchrun --nproc_per_node=4 your_script.py
```

```python
import flagquantum as fq

module = fq.Module(build_circuit, n_parameters=2)
```

The same module and result surface then use the native sharded statevector
runtime, with amplitude ownership kept local to each rank. Full-state
materialisation is forbidden on that path, forward-only training blockers are
reported explicitly, and the distribution topology is taken from the execution
environment.

## Rank-owned MPS

MPS execution can also distribute one state across ranks:

```bash
python examples/distributed_mps/variable_bond_capacity_8gpu.py
```

In the reviewed evidence, one batch-one complex64 MPS training step for the
checked-in all-rank and all-boundary workload reached 131,072 sites at bond
dimension 768 across 16 ranks, with a maximum of 72.41 GiB peak allocated memory
per rank and a cumulative discarded weight of 8.39e-06. That is one exact
workload, not a fixed-plan strong-scaling result.

## Distributed training

Owner-sharded statevector and MPS training are available through explicit
experimental entry points under `flagquantum.experimental.distributed`, with
owner-sharded optimizer state, checkpoint/resume, cancellation, and progress
reporting. They are not implied by calling `fq.train`, and distributed training
counts as complete only when forward execution, gradients, optimizer updates,
and checkpoint ownership all preserve the declared distribution semantics.

## Semantics that must be stated

- Replicated data parallelism is throughput, not capacity expansion.
- Rank-local kernels and manual tensor slicing are reported under their own
  semantics.
- CPU distributed runs prove semantics and fail-closed behaviour; they never
  stand in for real accelerator capacity evidence.
- Multi-node release certification requires promoted audited hardware evidence.
