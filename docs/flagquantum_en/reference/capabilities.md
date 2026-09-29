# Capability Catalog

Every FlagQuantum capability is published with a maturity level that states the strongest claim that may be made about it. This page summarises how to read those levels and where each family of capabilities currently stands. The authoritative matrix is machine-validated in the upstream repository, and the level of a specific path there wins over any summary.

## Maturity levels

| Level | Meaning |
| --- | --- |
| **Release certified** | Release-gated with audited, reproducible evidence and no unresolved release blocker. |
| **Production supported** | Supported path with compatibility, operational guidance, and target-hardware evidence. |
| **Development evidence** | Executable and tested development result; not a production or general scalability claim. |
| **Experimental** | Research surface without compatibility or production guarantees. |

Maturity applies only to the scope stated for a capability. A local, replicated, sliced, or planned execution path is not distributed scalability evidence, and a stable public API never promotes an experimental backend.

## Current capability map

| Area | Capability | Maturity |
| --- | --- | --- |
| Build, compile, export | Unified circuit API and FlagQuantum IR | Release certified |
| Local simulation | Local statevector simulation and training | Production supported |
| Local simulation | Continuous-time Lindblad density-matrix evolution | Production supported |
| Distributed | Sharded statevector training | Production supported |
| Local simulation | Exact and trajectory-based noisy simulation | Experimental |
| Local simulation | MPS and tensor-network execution and training | Experimental (MPS training carries development evidence) |
| Local simulation | Double-Single FP32 and split real/imag precision paths | Experimental |
| FlagOS | Local statevector CUDA reference through Torch-FL | Development evidence |
| FlagOS | Distributed statevector workloads, capacity expansion, transport observability | Development evidence |
| FlagOS | Domestic single-card certification harness | Review candidate only; no domestic capability is promoted until a real-card result is reviewed |
| Deployment | Circuit packaging and cloud deployment | Development evidence |
| Hardware | Evidence-qualified QPU digital twins | Development evidence |
| Error correction | Repetition-code memory experiment | Development evidence |
| Interoperability | Qiskit, PennyLane, Cirq, and CUDA-Q conversion and execution bridges | Experimental |
| Interoperability | Extension SDK and interoperability adapter contract | Experimental |
| Algorithms | Algorithm units (state preparation, oracles, Grover search, amplitude estimation, PCA, k-medians, quantum kernels, QUBO mapping) | Experimental, demonstration scale |

## Flagship evidence

The strongest published capacity result is a sharded MPS training step on one exact checked-in workload. It is recorded with its per-rank memory, rank count, elapsed time, and topology fingerprint, and it is explicitly not arbitrary statevector capacity, fixed-plan strong scaling, or release evidence. Every public performance claim must point to a checked-in artefact with a digest and to the code version that produced it; documentation, the capability catalog, and the known-limitations list are generated together so a claim cannot drift away from its evidence.

## Algorithm units

The algorithm units are demonstration scale and exist to show that a workflow can be expressed and executed, not to claim an end-to-end advantage. Each unit records the premise its advantage would rest on — free oracle access, a qRAM, a controlled state-preparation unitary, or a fault-tolerant machine — and what this repository pays explicitly instead. Read that premise before drawing any conclusion from a unit's output.
