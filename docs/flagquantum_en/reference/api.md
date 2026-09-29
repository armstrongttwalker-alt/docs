# API Reference

FlagQuantum exposes one curated Python interface: `import flagquantum as fq`.

## API map

| Task | Primary interface | Result |
| --- | --- | --- |
| Build a program | `fq.Circuit` | Circuit backed by FlagQuantum IR |
| Optimise a program | `flagquantum.compiler.optimize` | `fq.CircuitIR` |
| Compile for a selected tool and target | `fq.compile` | `fq.CircuitIR` |
| Inspect execution | `fq.plan`, `Circuit.runtime_plan` | Explainable runtime plan |
| Execute locally or remotely | `fq.run` | `fq.ExecutionResult` |
| Submit without blocking | `fq.submit`, `fq.restore_job` | Job handle with status, result, cancel |
| Define a trainable quantum layer | `fq.Module` | PyTorch module |
| Train | `fq.train` | `fq.TrainingResult` |
| Measure | `fq.expectation`, `fq.probabilities`, `fq.samples`, `fq.counts` | Output requests |
| Package for a target | `flagquantum.deployment.create_deployment_package` | Sealed deployment package |

## Errors

Stable lifecycle categories live in `flagquantum.errors`: `ValidationError` for invalid semantic input, `PlanningError` for a stale, tampered, or incompatible plan, `CapabilityError` for an unavailable requested capability, and `ExecutionError` for an execution or training failure. All of them inherit `FlagQuantumError` and their compatible Python built-in exception, so both the narrow and the general `except` clause work.

## Runtime configuration

`RuntimeConfig` records backend, device, real and complex precision, JAX precision, matrix-multiplication policy, and drawing style. A circuit captures a configuration when it is constructed and embeds a versioned manifest in its IR and plans, so distributed workers rebuild the same policy instead of inheriting mutable process state. `runtime_config(...)` provides context-local temporary overrides.

## Measurements

`fq.expectation`, `fq.probabilities`, `fq.samples`, and `fq.counts` describe what to measure. Pauli products use `@`, Hamiltonian sums and real coefficients use ordinary arithmetic, and sampling or counts accept computational-basis wires or one unweighted Pauli product. Results expose `expectation()`, `expectations`, `probabilities`, `samples`, `counts`, and `measurement(index_or_name)`.

## Operators and extension points

- `flagquantum.operators` reports the registered gate set and per-gate information.
- `flagquantum.ecosystem` holds framework adapters (Qiskit, PennyLane, Cirq, CUDA-Q, Amazon Braket) behind one candidate-stable protocol with an immutable registry.
- `flagquantum.ecosystem.extensions` holds the pre-freeze extension SDK for backends, compilers, passes, kernels, operators, devices, providers, measurement collectors, and planners.
- `flagquantum.services` holds reusable multi-step workflows such as execution and deployment preflight.
- `flagquantum.experimental` carries no compatibility guarantee and is where distributed training and dynamic-circuit execution currently live.

## Stability boundaries

- Only the checked manifest defines the stable surface; experimental and compatibility imports do not silently expand it.
- Compatibility imports exist for migration and are not implied stable.
- A planner result describes intent and estimates; it is never runtime or benchmark evidence.
- Operator and backend support comes from the executable lowering registry, not from prose.
- Documentation examples are executed by documentation contract tests, and a new public name must first be importable, snapshot-tested, and added to the manifest.
