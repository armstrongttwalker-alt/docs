# Compiler and Remote Targets

Compilation transforms a program; execution runs it. FlagQuantum keeps the two separate so that a compiled artifact can be inspected, sealed, and submitted without ambiguity about what will run.

## Target-independent optimization

```{code-block} python
import flagquantum as fq
import flagquantum.compiler as compiler

circuit = fq.Circuit(2).h(0).h(0).cx(0, 1)
optimized_ir = compiler.optimize(circuit)

result = fq.run(optimized_ir, options=fq.ExecutionOptions(mode="auto"))
```

`optimize` returns a new `CircuitIR`, leaves the input unchanged, and applies canonical rewrites to a fixed point.

## Target-aware compilation

Provide an explicit coupling map when the emitted program must respect a topology:

```{code-block} python
coupling = compiler.CouplingMap.line(circuit.n_qubits)
compiled_ir = compiler.compile(
    circuit,
    coupling_map=coupling,
    routing_strategy="auto",
)
```

The compiler emits only topology-valid two-qubit operations and records its routing decision in the compiled IR metadata. It does not select or invoke an execution backend.

## Compile for a provider

```{code-block} python
result = fq.run(
    circuit,
    compiler="qsteed",
    target="quafu:Baihua",
    shots=1024,
)
counts = result.measurement("counts").value[0]
```

This path compiles, packages, submits, and waits for the remote result without changing the `fq.ExecutionResult` return type. It never selects or substitutes a compiler or provider implicitly.

Optional arguments keep the journey inspectable:

- `name` labels the deployment; omitting it uses the deployment default, and the provider-assigned task ID remains independent of that display name.
- `target_qubits` gives an optional ordered logical-to-physical mapping. When provided, compilation fails unless the target snapshot proves the mapping is valid and connected; an explicit mapping is never silently replaced.

## Measure a Hamiltonian on hardware

A Pauli expectation can use the same entry point. The circuit is compiled once, then qubit-wise-commuting terms are measured in separate sealed jobs without changing the selected physical-qubit mapping:

```{code-block} python
energy = fq.run(
    circuit,
    outputs=fq.expectation(0.5 * (fq.X(0) @ fq.X(1)) + fq.Z(0)),
    compiler="qsteed",
    target="quafu:Baihua",
    shots=4096,
).expectation()
```

Shots apply to each measurement group. The statistics report the estimator standard error, the number of groups, per-group shots, and total shots; provenance records every provider task and deployment identity. Mixed outputs and unsupported remote outputs fail before compilation or submission.

## Detached submission and restore

Long-running remote work does not have to block a notebook:

```{code-block} python
job = fq.submit(fq.Circuit(2).x(0), target="quafu:Baihua", shots=1024)
job.save("quafu-job.json")
print(job.status())
```

Normalized states are `queued`, `running`, `succeeded`, `failed`, `cancelled`, and `unknown`; a provider state that only means "compilation finished" maps to `queued`, and unknown states never count as success. `job.result()` does not poll, `job.wait(timeout=...)` blocks deliberately, and `job.cancel()` requests cancellation that should be confirmed by a later status query.

Receipts are credential-free JSON, saving never overwrites an existing file, and restoring a job never resubmits. Configure credentials again after a restart, and reconcile with the provider before retrying a submission whose network response was lost.

## Packaging a trained program

A deployment package binds trained parameters, target compilation, and auditable identity so that a program can be saved, signed, or submitted later:

```{code-block} python
import flagquantum.deployment as deployment

package = deployment.create_deployment_package(
    circuit=trained_circuit,
    backend=deployment.CloudBackendProfile.simulator(4),
    shots=1024,
)
```

Preflight helpers validate a program against a target and identity-check the exact package that may later be submitted, without contacting a provider or consuming remote capacity.
