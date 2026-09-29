# Requirements

FlagQuantum runs on Python 3.10 to 3.12 and requires PyTorch 2.5 or newer. The
released package depends on PyTorch only; everything else is an optional extra.

## Software requirements

| Item | Requirement |
| --- | --- |
| Python | 3.10, 3.11, or 3.12 (`>=3.10,<3.13`) |
| PyTorch | `>=2.5,<2.14` |
| Operating system | Linux, macOS, or Windows, CPU or one accelerator |

Optional extras are declared in `pyproject.toml` and installed with
`pip install "flagquantum[<extra>]"`:

| Extra | Adds |
| --- | --- |
| `dev` | pytest, coverage, xdist, ruff, black, mypy, pre-commit |
| `jax` | JAX kernels behind the PyTorch interface |
| `cotengra` | Tensor-network contraction path search |
| `cuda` | Triton kernels for supported local gate paths |
| `viz` | Matplotlib for circuit drawing |
| `qiskit` | Qiskit and Aer conversion and execution bridge |
| `pennylane` | PennyLane conversion and Lightning execution bridge |
| `cirq` | Cirq conversion and Simulator execution bridge |
| `cudaq` | CUDA-Q kernel export (Linux only) |
| `braket`, `azure`, `quafu` | Additional provider adapters |
| `examples` | Dataset and transformer helpers used by larger examples |
| `all` | Development, plotting, JAX, Triton, and example dependencies |

## Hardware platforms

| Platform | Status |
| --- | --- |
| CPU | Default local path; exact statevector simulation and training |
| One CUDA GPU | Single-device execution selected explicitly in `ExecutionOptions` |
| Multiple ranks | Sharded statevector and rank-owned MPS execution over Gloo or NCCL |
| FlagOS accelerators | Reached through the FlagOS unified multi-chip layer and its logical `flagos:0` device |

FlagQuantum performs no vendor detection and contains no vendor branches. Physical-device detection, the vendor runtime, and the mapping from `flagos:0` to a physical card belong to the FlagOS provider integration; FlagQuantum records the runtime identity and route evidence it is given. A domestic accelerator is therefore not certified merely because an integration path exists.

## Multi-node expectations

Distributed support is environment-specific. In the reviewed setup, a two-node
A800 deployment with one device per node runs forward, gradient, and
training/resume workloads over NCCL and TCP; multi-node release certification is
a separate, evidence-gated step.
