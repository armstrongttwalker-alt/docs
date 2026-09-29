# Release Notes

Release notes describe user-visible behaviour and support-boundary changes.
Benchmark claims require audited artifacts and are not inferred from this page.

## v0.2.0

**Release date**: 2026-09-11

- **Added Features**

  - **Unified program model** — `fq.Circuit`, `fq.Module`, `fq.run`, `fq.train`, and `fq.plan` form one curated public interface over versioned FlagQuantum IR, with an inspectable execution plan, typed results, and fail-closed validation.
  - **Representation choice per run** — local statevector, MPS, and tensor-network execution are selected from the same program, with optional JAX kernels available behind the PyTorch interface.
  - **Distributed execution** — owner-sharded statevector and rank-owned MPS forward, gradient, and training paths run one logical workload across ranks, with explicit distribution semantics.
  - **Noise and precision options** — one backend-neutral noise model drives exact density-matrix evolution, batched statevector trajectories, and MPS trajectories, and software-expanded Double-Single arithmetic extends precision on FP32-only devices.
  - **Hardware execution paths** — explicit compiler and provider selection compiles, packages, submits, and returns results through the same `fq.ExecutionResult` contract, including grouped Pauli measurements for shot-based hardware.
  - **Ecosystem adapters** — framework-neutral conversion for PennyLane, Qiskit, Cirq, and CUDA-Q, plus explicit execution bridges for local PennyLane Lightning, Qiskit Aer, and Cirq simulators.
  - **Deployment and extension surface** — sealed deployment packages bind trained parameters to a target, and an extension SDK supports backend, kernel, operator, compiler-pass, device, provider, measurement-collector, and planner plugins with capability negotiation.
  - **Evidence discipline** — every capability carries a maturity level, and public performance claims require a checked-in artifact with a digest and a recorded environment.

- **Changed**

  - The stable root API is bounded by a checked manifest; experimental and compatibility imports no longer silently expand the supported surface.
  - Runtime configuration is immutable, task-scoped, and carried through compile, plan, and execution boundaries instead of process-global state.

- **Removed**

  - The pre-release v0.1 device-oriented interface — `DistributedQuantumDevice`, `GeneralEncoder`, the invertible-unitary helper, DTensor interchange helpers, and the device-oriented gate and measurement paths — is not part of the v0.2 product and was removed without a compatibility layer.

## v0.1.0

**Release date**: 2026-06-24

- **Added Features**

  - Initial release of FlagQuantum: a PyTorch-based distributed quantum statevector simulator.
  - Multi-GPU statevector simulation with automatic resharding during gate operations.
  - Gate set covering Pauli, Clifford, rotation, and controlled gates, with trainable parameters.
  - Memory-efficient invertible backpropagation and custom gate registration.
  - Post-selection and depolarising noise models, plus angle, amplitude, and basis encodings.
  - Circuit visualisation in text and Matplotlib modes, and an OpenQASM exporter for real hardware platforms.
