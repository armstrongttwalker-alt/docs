# Architecture

FlagQuantum gives a quantum AI program one public model across local development, accelerated kernels, distributed simulation, and deployment:

```text
fq.Circuit / fq.Module
          |
          v
   FlagQuantum IR
          |
          +-- compile and export
          +-- local statevector, MPS, and tensor-network runtimes
          +-- optional JAX kernels behind the PyTorch interface
          +-- sharded statevector and MPS execution
          +-- deployment packages for provider and hardware targets
```

The architectural invariant is simple: backend selection may change execution, but it must not change the meaning of the program or the result contract.

## Core layers

| Layer | Responsibility | Entry point |
| --- | --- | --- |
| User API | Circuit construction, PyTorch modules, planning, execution, training, deployment | `import flagquantum as fq` |
| Compilation | Transform circuits and legalize target output without executing them | `fq.compile`, `flagquantum.compiler` |
| FlagQuantum IR | Versioned operators, measurements, metadata, serialization, validation | `fq.CircuitIR` |
| Planning | Select a representation and execution policy; explain blockers and fallbacks | `fq.plan`, `Circuit.runtime_plan` |
| Runtime | Execute locally or across ranks and return typed evidence | `fq.run`, `fq.ExecutionResult` |
| Training | Preserve PyTorch autograd and optimizer semantics across supported runtimes | `fq.Module`, `fq.train` |
| Deployment | Bind trained parameters, compile for a target, seal an auditable package | `flagquantum.deployment.create_deployment_package` |

A plan describes intent and estimates; it is never execution or benchmark evidence. Runtime records describe what actually ran.

## Source map

```text
flagquantum/
+-- _api.py                 # root compile, plan, and run composition
+-- circuit.py              # circuit construction
+-- core/                   # backend-neutral IR and shared semantics
+-- compiler/               # validation, optimization, lowering, code generation
+-- runtime/                # planning, execution lifecycle, results, coordination
+-- simulation/             # numerical methods and kernels
+-- noise/                  # backend-neutral noise models and channels
+-- observables/            # user-facing measurement construction
+-- qec/                    # error-correction workflows and domain models
+-- twin/                   # hardware digital-twin models
+-- compute/                # resources controlled by the current process
+-- remote/                 # external task systems and result retrieval
+-- ecosystem/              # framework and format adapters
+-- deployment/             # sealed target-neutral execution packages
+-- services/               # reusable multi-step application workflows
+-- algorithms/             # user-facing algorithm composition
+-- benchmarking/           # reproducible measurement and evidence generation
+-- drawer/                 # circuit visualization
+-- testing/                # reusable correctness and conformance helpers
+-- experimental/           # explicitly unstable APIs
```

## Dependency direction

Dependencies point inward: the user facade calls the compiler, runtime, and application workflows; those call `core`. Numerical methods, local compute adapters, and remote adapters sit beside them and are not consulted by `core`.

- Core does not import orchestration, numerical engines, or vendor integrations.
- The compiler transforms programs but does not execute them.
- Runtime organizes execution but does not implement numerical kernels.
- `simulation` is a numerical-method domain, not a second public runtime.
- Compute and remote isolate hardware and external-system details from other domains.
- Optional integrations stay outside the mandatory local PyTorch path.

## Execution and training contracts

`fq.run` is the canonical execution entry point and returns `fq.ExecutionResult` for supported local and distributed modes. Specialized native functions are advanced interfaces and may expose backend-specific objects.

`fq.train` owns the ordinary PyTorch optimization loop. Owner-sharded statevector and MPS training have separate experimental distributed entry points and are not implied by calling `fq.train`. Distributed training counts as complete only when forward execution, gradients, optimizer updates, and checkpoint ownership all preserve the declared distribution semantics.

For a claim of distributed scalability, one logical workload must be sharded across ranks. Replicated data parallelism, rank-local kernels, and manual tensor slicing are reported under their own semantics and are never relabelled as capacity expansion.

## Public versus internal interfaces

- Public examples use `import flagquantum as fq`.
- Stable names are listed in the [stable API inventory](../reference.md).
- `fq.experimental` carries no compatibility guarantee.
- Compatibility modules support migration; they do not define new stable API.
- Benchmark and research utilities must not become runtime dependencies.
