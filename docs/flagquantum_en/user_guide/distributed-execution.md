# Distributed Execution

FlagQuantum distributes one logical workload, not copies of it. Distribution
topology comes from the execution environment, and every result reports its
`distribution_semantics` so replicated, rank-local, sliced, and sharded
execution stay distinguishable.

## Sharded statevector

Under an initialized multi-rank process group, the same circuit, module, and
result surface use the native sharded statevector runtime:

```{code-block} shell
torchrun --nproc_per_node=4 your_script.py
```

```{code-block} python
import torch
import flagquantum as fq

def circuit(parameters, inputs=None):
    return fq.Circuit(n_qubits=20, bsz=32).ry(0, parameters[0]).cx(0, 1)

module = fq.Module(circuit, n_parameters=1, policy=fq.RuntimePolicy(observable="z"))
training = fq.train(module, optimizer=torch.optim.Adam(module.parameters()), steps=10)
```

The sharded runtime owns amplitude ownership, cross-rank reduction for
gradients, rank-local rematerialization for shared-parameter circuits, and
checkpoint/resume. Full-state materialization is forbidden on this path, and
forward-only training or release blockers are reported explicitly.

## Rank-owned MPS training

Long, low-entanglement circuits are the MPS case: one state is sharded across
ranks with owner-local boundaries, backward execution, optimizer state, and
matched checkpoint/restart equivalence.

```{code-block} shell
bash examples/distributed_statevector_topologies/run.sh
python examples/distributed_mps/variable_bond_capacity_8gpu.py
```

## Distributed training entry points

Owner-sharded statevector and MPS training have their own entry points and are
not implied by `fq.train`:

```{code-block} python
from flagquantum.experimental.distributed import train_distributed_statevector

result = train_distributed_statevector(
    module,
    optimizer=torch.optim.SGD(module.parameters(), lr=0.05),
    steps=200,
    checkpoint_dir="./checkpoints",
)
```

These paths add multi-step native PyTorch training with owner-sharded optimizer
state, structured lifecycle progress, memory preflight, and cancellation.
Distributed training counts as complete only when forward execution, gradients,
optimizer updates, and checkpoint ownership all preserve the declared
distribution semantics.

## Evidence and claim boundary

- The recorded distributed workloads are development evidence: complex64 and
  complex128 forward, reverse, and bounded training trajectories on one
  CUDA-backed A800 node at 2, 4, and 8 cards, plus single-node MPS scale,
  boundary transport, and checkpoint/restart checks. Multi-node execution was
  probed with two nodes and one A800 per node over NCCL/TCP.
- Communication attribution is incomplete in the recorded evidence: the inner
  transport route and host staging remain unattributed, and FlagCX use is not
  established.
- CPU distributed tests prove semantics and fail-closed behaviour only. They are
  never scalability evidence.
- Release-grade scalability evidence requires a promoted benchmark payload that
  passes the distributed release-policy audit.
- Capacity expansion means one logical workload that does not fit on one device.
  Replicated data parallelism and manual slicing are reported under their own
  semantics.
