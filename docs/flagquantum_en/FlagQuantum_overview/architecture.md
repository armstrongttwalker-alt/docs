# Architecture

FlagQuantum gives quantum AI programs one public model across local
development, accelerated kernels, distributed simulation, and deployment:

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

The invariant behind this layout: backend selection may change execution, but it
must not change the meaning of the program or the result contract.

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

Planning is not execution evidence: a plan describes intent and estimates,
while runtime records describe what actually ran.

## Source map

```text
flagquantum/
+-- __init__.py             # lazy stable `fq` facade
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

Dependencies point inward:

```text
User facade -> Compiler / Runtime / application workflows -> Core
                         |
                         +-- Simulation numerical methods
                         +-- Compute adapters for local resources
                         +-- Remote adapters for external task systems
```

Core does not import orchestration, numerical engines, or vendor integrations.
Compiler transforms programs but does not execute them. Runtime organizes
execution but does not implement numerical kernels. Simulation consumes Core
semantics but does not select resources. Compute and Remote isolate hardware and
external-system details from the other domains, and optional integrations stay
outside the mandatory local PyTorch path.

`simulation` is a numerical-method domain, not a second public runtime: Runtime
calls its engines through explicit entry points, while backend choice,
distributed ownership, recovery, and evidence assembly remain Runtime concerns.

## Execution and training contracts

`fq.run` is the canonical execution entry point and returns
`fq.ExecutionResult` for supported local and distributed modes. Specialized
native functions such as `flagquantum.runtime.run_native`,
`flagquantum.simulation.mps.run_mps`, and
`flagquantum.simulation.tensor_network.run_tensor_network` are advanced
interfaces for callers that need backend-specific objects or controls.

`fq.train` owns the ordinary PyTorch optimization loop. Owner-sharded
statevector and MPS training have separate entry points under
`flagquantum.experimental.distributed`; they are not implied by calling
`fq.train`. Distributed training counts as complete only when forward execution,
gradients, optimizer updates, and checkpoint ownership all preserve the declared
distribution semantics.

For a claim of distributed scalability, one logical workload must be sharded
across ranks. Replicated data parallelism, rank-local kernels, and manual tensor
slicing are reported under their own semantics and are never relabelled as
capacity expansion.

## Public versus internal interfaces

- Public examples use `import flagquantum as fq`.
- Stable names are listed in the generated stable API inventory; everything else
  is experimental, internal, or a migration aid.
- `fq.experimental` carries no compatibility guarantee.
- Compatibility modules support migration; they do not define new stable API.
- Benchmark and research utilities are never runtime dependencies.

Package-root ownership is closed: the Python files directly under
`flagquantum/` (`__init__.py`, `_api.py`, `circuit.py`, `dynamic.py`,
`errors.py`, `gradients.py`, `models.py`, `operators.py`, `training.py`,
`version.py`) are the reviewed public facade, and new implementations belong in
their owning domain.
