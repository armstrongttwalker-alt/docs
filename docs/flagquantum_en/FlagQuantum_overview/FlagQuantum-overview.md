# FlagQuantum Overview

FlagQuantum is sharded, differentiable quantum simulation and training in
PyTorch, reaching domestic accelerators through FlagOS. It is a PyTorch-first
framework for differentiable quantum computing and quantum AI: circuits become
trainable models, and the same program can be executed locally, sharded across
ranks, or evaluated on quantum hardware.

FlagQuantum is part of the FlagOS ecosystem, an open-source AI system software
stack that integrates models, systems, and chips behind one software layer.

## Why FlagQuantum?

As quantum circuits grow in qubit count and depth, exact classical simulation
becomes expensive, and the useful question shifts from "how large a state can I
hold" to "which representation fits this circuit, and what evidence do I have
for this execution path". FlagQuantum addresses both:

- **Train with PyTorch.** Quantum layers are ordinary `torch.nn` modules with
  autograd and familiar optimizers; classical and quantum layers train in one
  loop.
- **Choose the representation from one program.** Statevector, matrix product
  state (MPS), and tensor-network execution are selected from the same circuit
  without rewriting the model.
- **Plan before executing.** `fq.plan` explains the representation, gradient
  support, and blockers, and execution does not silently fall back to a
  different path.
- **Keep support claims explicit.** Implemented APIs, passing correctness
  checks, development evidence, and release-certified capabilities are separate
  levels, and each capability is published with its own scope.

## One programming model

```python
import torch
import flagquantum as fq


def circuit(parameters):
    return fq.Circuit(2).ry(0, parameters[0]).cx(0, 1)


model = fq.Module(circuit, n_parameters=1, init=torch.tensor([0.25]))
training = fq.train(
    model,
    optimizer=torch.optim.Adam(model.parameters(), lr=0.05),
    objective=lambda z: z.mean(),
    steps=10,
)

trained_circuit = circuit(next(model.parameters()).detach())
result = fq.run(trained_circuit, outputs=fq.expectation(fq.Z(0)))
print(result.expectation())
```

The architectural invariant is simple: backend selection may change execution,
but it must not change the meaning of the program or the result contract.

## Where a program can run

| Execution target | How it is selected | Current support |
| --- | --- | --- |
| Local CPU statevector | Default | Production supported |
| One CUDA GPU | `fq.ExecutionOptions(device="cuda:0")` | Local correctness evidence |
| Several ranks, sharded statevector | Initialized multi-rank process group | Production supported |
| Sharded MPS training | Rank-owned MPS entry points | Development evidence |
| FlagOS logical device (`flagos`) | Explicit provider selection through Torch-FL | Development evidence |
| Remote compute (Jiuding workspace) | `target="jiuding:gpu"` | Experimental |
| Quantum hardware (Quafu) | `target="quafu:<backend>"` | Experimental, one recorded hardware check |

Support is specific to each backend and workload. The CUDA reference and the
distributed workloads are development evidence, not production or general
scalability claims, and FlagQuantum does not certify any domestic accelerator
by itself. See [Capabilities](../reference/capabilities.md) for the current
boundary of each path.

## Long-term direction

The roadmap moves toward one durable workflow: build once, train with PyTorch,
choose statevector, MPS, or tensor-network execution, scale across chips when
the workload requires it, and deploy the trained program to quantum hardware.
Near-term work covers local development, the FlagOS multi-chip backend, sharded
training, and the training-to-hardware loop; fault-tolerant quantum computing
research is a longer-term goal.

## Acknowledgments

FlagQuantum references the following projects and organizations:

- **[NVIDIA CUDA-Q](https://github.com/NVIDIA/cuda-quantum)** — GPU-accelerated
  quantum circuit simulation and distributed quantum computing.
- **[MIT TorchQuantum](https://github.com/mit-han-lab/torchquantum)** —
  PyTorch-native quantum circuit representations.
- **[IonQ TQD](https://github.com/ionq/torchquantum-dist)** — efficient state
  representations.
- **[Xanadu PennyLane](https://github.com/PennyLaneAI/pennylane)** — functional
  API design and integration with classical machine learning frameworks.
- **[IBM Qiskit](https://github.com/Qiskit/qiskit)** — quantum circuit
  construction and statevector simulation concepts.
