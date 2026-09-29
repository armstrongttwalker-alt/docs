# Capabilities

FlagQuantum separates what a pathway *is* from how strongly it is supported.
Maturity applies only to the scope stated for each capability, and a local,
replicated, sliced, or planned execution path is never distributed scalability
evidence.

## How to read maturity

| Level | Meaning | Permitted claim |
| --- | --- | --- |
| Release certified | Release-gated with audited, reproducible evidence and no unresolved release blocker | The named release artifact is certified for its exact declared scope |
| Production supported | Supported path with integration, hardware, and operational evidence | The documented workload and environment are supported in production |
| Development evidence | Executable and tested development result | The constrained path was executed; no production or scalability claim |
| Experimental | Research surface without compatibility or production guarantees | The implementation is available for evaluation |

## Current capability levels

| Capability | Level | Boundary |
| --- | --- | --- |
| Unified circuit API and FlagQuantum IR | Release certified | IR v1; incompatible schema changes require an explicit migration |
| Local statevector simulation and training | Production supported | Capacity is bounded by one device; distributed capacity is a separate capability |
| Sharded statevector training | Production supported | Multi-node release certification still depends on promoted audited hardware evidence |
| Continuous-time Lindblad evolution | Production supported | Dense time-independent Hamiltonians on finite grids, CPU complex64/complex128 only |
| FlagOS local statevector CUDA reference | Development evidence | CUDA-backed reference path; it does not certify a domestic accelerator and does not authorize a scalability claim |
| FlagOS distributed statevector workloads | Development evidence | complex64/complex128 on one CUDA-backed A800 node at 2, 4, and 8 cards; communication route and host staging unattributed; multi-node, performance, and release certification not established |
| FlagOS statevector capacity expansion | Development evidence | One exact 32-qubit complex128 forward workload on an eight-A800 node; backward, optimizer, determinism replay, and general scalability not established |
| FlagOS distributed transport observability | Development evidence | Four collectives at 2, 4, and 8 ranks; device activity capture was incomplete, and FlagCX use is not established |
| Differentiable and sharded MPS training | Development evidence | Single-node and dual-node execution plus matched checkpoint/restart; boundary instructions execute serially by owner, and layer-parallel contraction, soak, and a sealed fault matrix remain incomplete |
| Double-Single FP32 numerical primitives | Experimental | Software-extended precision on FP32 hardware; device-only trigonometry, optimized kernels, distributed collectives, and production use are uncertified |
| Split real/imag FP32 paths (P0-P5) | Experimental | Explicit forward-only to bounded-autograd paths, never selected by the default runtime; custom matrices, compiled execution, distributed execution, and domestic-hardware certification remain unsupported |
| Constrained local MPS TEBD | Experimental | Static real one-site and adjacent two-site Pauli terms on an open chain, batch one, second-order imaginary-time evolution, product initial states only |
| Tensor-network execution and training | Experimental | General reverse contraction and production distributed transport are not certified; noise channels fail closed |
| Exact and trajectory-based noisy simulation | Experimental | Validated Markovian channels, device profiles, readout confusion, and reproducible MPS trajectories; pulse effects, crosstalk, leakage, distributed adaptive stopping, and noisy gradients are unsupported |
| Circuit packaging and cloud deployment | Development evidence | Provider support and credential behaviour vary; no provider is release-certified by this matrix |
| Evidence-qualified QPU digital twins | Development evidence | Agreement is total-variation agreement for measurement distributions, not state fidelity, and is specific to declared circuits, mappings, couplers, depth, and calibration snapshots |
| Interoperability adapters | Experimental | The adapter protocol is candidate-stable pending approval; common conformance does not certify provider hardware or numerical equivalence |
| Qiskit, PennyLane, Cirq, and Qiskit Aer bridges | Experimental | Single fully bound circuit per call, explicit wire order and seed; no gradients, noise models, dynamic circuits, or automatic routing in the bridges |
| Dynamic circuits and backend assessment | Experimental | Local dynamic noise is limited to one-wire bit flips and independent readout confusion; no real IQM QPU task was used |
| Repetition-code memory experiment | Development evidence | One fixed three-data-qubit profile; sweeps report finite-shot observations, not logical suppression or thresholds |
| Quantum algorithm units | Experimental | Demonstration scale; each unit records the premise its advantage statement depends on |
| Extension SDK | Experimental | Protocol approved but not frozen; compiler plugins exchange `CircuitIR` only |

## Validated public performance claims

The repository publishes measured results only when they identify a checked-in
raw JSON artifact and its digest, match the recorded code version, and state
their exact scope and metadata boundary. The currently published claim is one
exact-workload MPS capacity result: a single batch-one complex64 training step
for a 131,072-site, bond-dimension-768 workload on 16 ranks, recorded as
development evidence with an explicit note that it is not arbitrary statevector
capacity, fixed-plan strong scaling, or release evidence.

Performance comparisons require matched workloads, precision, measurement
methodology, and auditable artifacts. Historical figures retained in the
repository's history record their original experiments and do not certify the
present release.

## Related gates

Support promotion is mechanical: capabilities come from the repository's
machine-validated maturity matrix, and promotion requires every evidence field
for the target level to be present and the capability-maturity check to pass.
Marketing text, benchmark summaries, and release notes are not permitted to
assign a stronger status than that matrix.
