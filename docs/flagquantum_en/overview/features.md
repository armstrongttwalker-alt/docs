# Features

This page summarises what FlagQuantum provides. Each area links to the guide that
covers its interface and its evidence boundary.

## PyTorch-native quantum training

- `fq.Module` owns trainable quantum parameters and behaves as an ordinary PyTorch module: `forward()` returns an autograd tensor, so existing optimizers, losses, and training loops work unchanged.
- `fq.train` runs a minimal `zero_grad` / `backward` / `step` loop for a single module and returns a versioned training result.
- Classical and quantum layers compose in one model and receive gradients from the same `loss.backward()` call.
- Parameters may be flat or named groups, and checkpoints belong to the module.

## One program, several representations

- Local statevector simulation is the default exact path.
- Matrix product state (MPS) simulation targets large, low-entanglement systems.
- Tensor-network execution supports contraction-based workflows.
- Sharded statevector and rank-owned MPS execution extend one logical workload across ranks.
- Optional JAX kernels run behind the same PyTorch interface.

## Circuits, compilation, and planning

- `fq.Circuit` builds programs with concise gate methods, and FlagQuantum IR is the versioned representation shared by execution, compilation, and deployment.
- `flagquantum.compiler.optimize` applies target-independent canonical rewrites to a fixed point.
- `flagquantum.compiler.compile` targets an explicit coupling map and emits only topology-valid two-qubit operations, recording its routing decision.
- `fq.plan` returns an explainable runtime plan with explicit blockers and no silent fallback, and an existing plan executes exactly without replanning.

## Measurement, noise, and precision

- Named outputs: Pauli expectation values, exact probabilities, samples, and counts.
- Gradients include native autograd and a memory-bounded local adjoint path for Z/ZZ Hamiltonians.
- A backend-neutral noise model covers exact density-matrix evolution, batched statevector trajectories, and MPS quantum trajectories.
- Precision is an explicit per-execution decision, including software-expanded Double-Single arithmetic on FP32-only devices.

## Deployment and hardware execution

- Sealed deployment packages bind trained parameters and compile for a target.
- Grouped Pauli measurement plans create one package per qubit-wise-commuting group for shot-based hardware.
- Remote compute and provider targets are addressed by name, with credential-free job receipts that survive a process restart.

## Digital twins and error correction

- Calibration-conditioned QPU digital twins predict measurement distributions, then connect those predictions to traceable hardware evidence, drift histories, and holdout validation.
- A repetition-code memory experiment connects syndrome extraction, decoding, correction, and logical-result analysis for fault-tolerance research.

## Ecosystem and extension

- Framework-neutral adapters convert to and from PennyLane, Qiskit, Cirq, and CUDA-Q, and explicit bridges execute supported circuits on local PennyLane Lightning, Qiskit Aer, and Cirq simulators.
- An extension SDK supports backend, kernel, operator, compiler-pass, device, provider, measurement-collector, and planner extensions with manifest identity, capability negotiation, and lifecycle containment.

## Evidence discipline

Implemented APIs, passing correctness checks, historical measurements, and research goals are three different things. Each capability is graded as release certified, production supported, development evidence, or experimental, and the grade is bound to the exact workload and environment that was validated.
