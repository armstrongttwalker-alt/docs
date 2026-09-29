# Basic Usage

## Build a circuit

```{code-block} python
import flagquantum as fq

circuit = fq.Circuit(n_qubits=2).h(0).cx(0, 1)
```

`n_qubits` is the preferred public name for circuit size. Positional
`Circuit(2)`, `n_wires=2`, and the legacy `nqubits=2` remain compatible, and
conflicting aliases fail during construction. Internal IR, compiler, and runtime
mappings continue to use *wire* for logical mappings.

Generated gate methods keep their concise positional form and also accept
semantic qubit keywords: `h(0)` and `h(qubit=0)` are equivalent, `cx(0, 1)` and
`cx(control=0, target=1)` are equivalent, symmetric two-qubit gates use
`qubit1=` and `qubit2=`, and the generic `Circuit.gate(...)` keeps `wires=`.
Duplicate, conflicting, or missing qubit arguments fail before an instruction is
added.

## Plan, then run

```{code-block} python
import flagquantum as fq

circuit = fq.Circuit(n_qubits=2).h(0).cx(0, 1)
options = fq.ExecutionOptions(mode="auto", precision="complex64")
plan = fq.plan(circuit, options=options)
result = fq.run(plan)

print(plan.identity)
print(plan.summary()["recommended_mode"])
print(result.plan.identity)
print(result.state)
```

`fq.run(...) -> fq.ExecutionResult` is the single recommended execution entry
point, and `Circuit.run(...)` is equivalent to `fq.run(circuit, ...)`.
`ExecutionOptions` owns backend-neutral configuration; measurement requests and
an optional `flagquantum.noise.NoiseModel` are semantic program inputs. Unknown
keyword arguments fail before planning.

## Reproducible plans

Pass a plan straight to `fq.run` for an inspectable, reproducible execution: the
supplied plan is validated and executed without replanning or recompiling, and
`result.plan is plan` holds in the same process. Plan identity covers the
canonical IR, resolved execution semantics, compiler pipeline, required
environment, and the selected decision, and a JSON round trip verifies every
fingerprint before execution:

```{code-block} python
text = plan.to_json()
restored = fq.ExecutionPlan.from_json(text)
result = fq.run(restored)
assert result.plan.identity == plan.identity
```

An existing plan is closed to semantic overrides: passing `options`,
`measurements`, or `noise_model` alongside it raises `TypeError`, and an
environment or world-size incompatibility fails before kernel launch rather than
replanning or falling back.

## Read the result

```{code-block} python
state = result.statevector()
energy = fq.run(circuit, outputs=fq.expectation(fq.Z(0))).expectation()
diagnostics = result.diagnostics()   # versioned metrics, provenance, runtime, compatibility
```

Use `result.measurement(index_or_name)` for a specific request and
`result.native()` only when intentionally depending on an unstable
backend-native object; backend attributes are not forwarded implicitly.

## Select a device or target

`ExecutionOptions.device` describes a device controlled by the current process,
while `target` names an external execution destination:

```{code-block} python
local = fq.run(circuit, options=fq.ExecutionOptions(device="cuda:0"))

remote = fq.run(
    circuit,
    compiler="qsteed",
    target="quafu:Baihua",
    shots=1024,
    name="bell calibration",
)
counts = remote.measurement("counts").value[0]
```

The remote journey compiles, packages, submits, and waits for the result without
changing the `fq.ExecutionResult` return type, and it never selects a compiler,
provider, or fallback implicitly.

## Advanced interfaces

`flagquantum.runtime.run_native`, `flagquantum.simulation.mps.run_mps`, and
`flagquantum.simulation.tensor_network.run_tensor_network` exist for callers that
explicitly need native backend result objects or backend-specific controls.
Prefer `fq.run` unless one of those is required.
