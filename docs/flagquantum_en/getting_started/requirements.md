# Requirements

## Software requirements

| Item | Requirement |
| --- | --- |
| Python | 3.10, 3.11, or 3.12 |
| PyTorch | `>=2.5,<2.14` |

Only PyTorch is required for the local PyTorch path. Every integration is an
optional extra, so the minimal installation stays small and imports lazily.

## Optional extras

| Extra | Adds |
| --- | --- |
| `dev` | Test, lint, type-check, packaging, and notebook tooling |
| `jax` | JAX-backed simulation kernels behind the PyTorch interface |
| `cuda` | Triton kernels for local GPU execution |
| `cotengra` | Contraction-path search for tensor-network workloads |
| `qiskit` | Qiskit Python IR and Qiskit Aer bridges |
| `pennylane` | PennyLane QuantumScript conversion and Lightning execution |
| `cirq` | Cirq conversion and Simulator execution |
| `braket` | Amazon Braket conversion |
| `cudaq` | CUDA-Q kernel export (Linux only) |
| `quafu` | Direct Quafu hardware submission without a local compiler |
| `azure` | Azure Quantum target packaging |
| `interop-all` | All interoperability adapters in one command |
| `viz` | Matplotlib-based circuit drawing |
| `examples` | Dependencies used by the tutorial notebooks and example scripts |

On Python 3.10 the `cirq`, `braket`, `cudaq`, `pennylane`, and `quafu` extras
are unavailable because the upstream packages require a newer interpreter.

## Execution targets

| Target | Selection | Support level |
| --- | --- | --- |
| Local CPU | Default | Production supported |
| One CUDA GPU | `fq.ExecutionOptions(device="cuda:0")` | Local correctness evidence |
| Several ranks | Initialized process group plus `torchrun` | Sharded statevector training is production supported |
| FlagOS logical device | Explicit provider selection through Torch-FL | Development evidence |
| Remote compute (Jiuding) | `target="jiuding:gpu"` | Experimental |
| Quantum hardware (Quafu) | `target="quafu:<backend>"` | Experimental |

CUDA is the only accelerator selected automatically. The FlagOS logical device
is never chosen implicitly, and no domestic accelerator is certified by
FlagQuantum alone: the current CUDA-backed reference records the joint
integration path, not vendor hardware quality. See
[Capabilities](../reference/capabilities.md) for the exact scope of every path.
