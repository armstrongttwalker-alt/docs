# Features

## Program model

- **Unified circuit API and FlagQuantum IR** (release certified). `fq.Circuit`,
  `fq.CircuitIR`, `fq.ExecutionPlan`, and `fq.ExecutionResult` share one
  versioned representation across construction, compilation, planning,
  execution, and deployment.
- **PyTorch-native training** (production supported). `fq.Module` owns trainable
  parameters and returns an autograd tensor from `forward()`, so ordinary
  PyTorch optimizers and hybrid classical-quantum models work without adapters.
  Flat, named, and symbolic parameter groups are supported, along with
  checkpoint and restore.
- **Explainable planning.** `fq.plan` records the selected representation,
  required environment, and blockers. Plans carry a SHA-256 identity, survive
  JSON round trips, and are executed exactly as supplied, without replanning,
  recompilation, or silent fallback.

## Simulation and training

- **Local statevector simulation and training** (production supported) — the
  zero-configuration path, exact by default for probabilities and expectations.
- **Sharded statevector training** (production supported) — one logical
  statevector distributed across ranks, with owner-sharded forward execution,
  reverse-mode gradients, optimizer state, and checkpoint/resume.
- **Differentiable and sharded MPS training** (development evidence) — rank-owned
  matrix product states for low-entanglement systems, with variable bond
  dimension, checkpointing, and matched restart evidence.
- **Tensor-network execution and training** (experimental) — slicing,
  contraction, and differentiable reverse contraction for structured circuits.
- **Constrained local MPS TEBD** (experimental) — second-order imaginary-time
  evolution for static one-site and adjacent two-site Pauli terms on an open
  chain.
- **Continuous-time Lindblad evolution** (production supported) — dense
  time-independent Hamiltonians on finite grids, CPU complex64/complex128.
- **Multiple gradient paths.** Autograd for supported representations, a
  memory-bounded adjoint path for local Z/ZZ Hamiltonian gradients, and an
  explicit parameter-shift path on the split FP32 experimental line.

## Precision and numerical trust

- **One resolved precision per execution.** `complex64` implies float32
  parameters, `complex128` implies float64, and planning, state allocation, gate
  matrices, and parameter tensors all follow that decision.
- **Double-Single FP32 arithmetic** (experimental) — a software-extended
  precision ladder for devices without native FP64, with explicit acceptance
  contracts and fail-closed accuracy requirements.
- **Fail-closed accuracy requirements.** A requested accuracy that exceeds the
  certified evidence is rejected during planning instead of returning an
  unverified result.

## Noise

- **Backend-neutral `NoiseModel`** (experimental) — Markovian Kraus channels,
  readout confusion, thermal relaxation, depolarizing and other built-in
  channels, plus calibration-conditioned device profiles.
- **Two execution styles** — exact density-matrix evolution as the small-system
  correctness oracle, and batched statevector or MPS quantum trajectories with
  sampling statistics and truncation reporting.

## distributed execution

- **Sharded runtime semantics.** Distribution topology comes from the execution
  environment; results report their `distribution_semantics`, and replicated,
  sliced, or rank-local execution is never relabelled as capacity expansion.
- **FlagOS distributed workloads** (development evidence) — complex64/complex128
  forward, reverse, and bounded training trajectories on one CUDA-backed A800
  node at 2, 4, and 8 cards, with explicit negative results recorded.
- **Transport observability** (development evidence) — collective-level
  correctness and logical residency checks for the tested collective matrix.

## Compilation and deployment

- **Compiler optimization and target-aware compilation.** `compiler.optimize`
  applies target-independent canonicalization to a fixed point;
  `compiler.compile` legalizes two-qubit operations for a concrete coupling map
  and records its routing decision.
- **Sealed deployment packages.** `flagquantum.deployment` binds trained
  parameters, compiles for a target, and produces an identity-checked package
  that can be submitted later.
- **Pauli measurement plans.** `create_pauli_measurement_plan` groups
  qubit-wise-commuting Hamiltonian terms and emits one sealed package per group.
- **Remote execution.** `fq.run(..., target=...)`, `fq.submit()`, and
  `fq.restore_job()` cover synchronous and detached Quafu hardware tasks and
  Jiuding managed compute jobs, all returning the canonical result contract.

## Hardware integration

- **QPU digital twins** (development evidence) — calibration-conditioned,
  provider-neutral models with validation series, drift comparison, frozen
  evidence envelopes, exact-circuit regional composition, and prospective
  candidate comparison.
- **Repetition-code memory experiment** (development evidence) — a local
  reference circuit connecting syndrome extraction, decoding, correction, and
  logical-result analysis.
- **FlagOS accelerator route** (development evidence) — a Torch-FL-backed
  platform runtime with no vendor branches inside FlagQuantum, plus a
  provisioner-attested single-card certification harness.

## Ecosystems and extensibility

- **Interoperability adapters** (experimental) — Qiskit, PennyLane, Cirq, and
  CUDA-Q conversion, with local PennyLane Lightning, Cirq Simulator, and Qiskit
  Aer execution bridges.
- **Extension SDK** (experimental) — backends, circuit compilers, compiler
  passes, kernels, operators, devices, providers, measurement collectors, and
  planners as independently installed packages.
- **Quantum algorithm units** (experimental, demonstration scale) — QUBO/Ising
  mapping, state preparation, oracle synthesis, Grover search, amplitude
  estimation, quantum PCA, quantum k-medians, quantum kernel methods, and
  feature selection, each with its advantage premise recorded.
