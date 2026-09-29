# Release Notes

## v0.2.0

**Release date**: 2026-09-11

- **Added features**

  - Established FlagQuantum IR, `fq.Circuit`, `fq.Module`, `fq.run`, runtime
    planning, explicit sharded statevector and MPS execution, distributed
    training, deployment packaging, and versioned result contracts as the
    maintained product architecture.

  - PyTorch-native training with flat, named, and symbolic parameter groups,
    per-module precision policy, and module checkpoint and restore.

  - Choice of statevector, matrix product state, and tensor-network execution
    from one program, with an explainable runtime plan and no silent fallback.

  - Explicitly selectable compiler journeys: target-independent optimization,
    target-aware compilation with a coupling map, and compiler-plugin selection
    for a named provider target.

  - Sealed deployment packages, Pauli measurement plans for shot-based hardware,
    and remote execution against Quafu hardware and Jiuding managed compute.

  - Backend-neutral noise models with exact density-matrix evolution and
    reproducible trajectory execution, plus a memory-bounded selection path.

  - Stable error categories for validation, planning, capability, and execution
    failures.

- **Removed**

  - The pre-release v0.1 `DistributedQuantumDevice`, `GeneralEncoder`,
    `InvertibleUnitary`, DTensor interchange helpers, device-oriented gates, and
    the device-oriented measurement path, without a compatibility layer. They
    are not part of the v0.2 product or its capability evidence.

- **Enhanced features**

  - Distributed statevector training with owner-sharded optimizer state,
    checkpoint/resume, cancellation, and structured lifecycle progress.

  - Rank-owned MPS training with variable bond dimension, boundary transport,
    and matched checkpoint/restart equivalence.

  - Compiler plugins discovered as independently installed packages with
    entry-point identity, capability negotiation, and fail-closed errors.

  - FlagOS platform runtime behind an explicit provider selection, with the
    CUDA path unchanged and no vendor branches inside FlagQuantum.

## Unreleased

- QPU digital twins: calibration-conditioned, provider-neutral models with
  validation series, drift comparison, frozen evidence envelopes, exact-circuit
  regional composition, and prospective incumbent-versus-candidate comparison.

- Detached remote jobs: `fq.submit()` and `fq.restore_job()` for Quafu counts and
  Jiuding managed programs, with credential-free receipts and unchanged
  synchronous `fq.run()` behaviour.

- Direct Quafu hardware execution without a local compiler dependency, with
  service compilation by default and explicit local precompilation on request.

- Interoperability adapters for Qiskit, PennyLane, Cirq, and CUDA-Q, plus
  explicit local execution bridges for PennyLane Lightning, Cirq Simulator, and
  Qiskit Aer.

- Extension SDK for backends, compilers, compiler passes, kernels, operators,
  devices, providers, measurement collectors, and planners.

- Quantum algorithm units at demonstration scale, each recording the premise its
  advantage statement depends on, together with staged hybrid VQE and ADAPT-VQE
  optimization helpers.

- Noisy simulation beyond the exact density path: batched and MPS quantum
  trajectories, readout confusion, and calibration-derived timing and idle
  noise.

- Continuous-time Lindblad evolution and a repetition-code memory experiment
  connecting syndrome extraction, decoding, and correction.
