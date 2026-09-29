# Build and Run

## Build a circuit

```{code-block} python
import flagquantum as fq

circuit = fq.Circuit(n_qubits=2).h(0).cx(0, 1)
```

`n_qubits` is the preferred public spelling for circuit size. Positional construction, `n_wires=`, and Qiskit-compatible `num_qubits` remain available, and conflicting aliases fail during construction instead of being resolved silently.

Generated gate methods keep their concise positional form and also accept semantic qubit keywords: `h(0)` and `h(qubit=0)` are equivalent, `cx(0, 1)` and `cx(control=0, target=1)` are equivalent, and symmetric two-qubit gates take `qubit1=` and `qubit2=`.

The built-in circuit surface covers Pauli gates (`i`, `x`, `y`, `z`), Clifford gates (`h`, `s`, `sdg`, `sx`, `sxdg`, `t`, `tdg`, `cx`, `cy`, `cz`, `swap`), rotations (`rx`, `ry`, `rz`, `rxx`, `ryy`, `rzz`), phase and generic single-qubit gates (`phase`, `u1`, `u2`, `u3`), controlled rotations (`crx`, `cry`, `crz`, `cphase`), Toffoli and Fredkin (`ccx`, `cswap`), and custom matrix operations.

## Plan, then run

```{code-block} python
circuit = fq.Circuit(n_qubits=2).h(0).cx(0, 1)
options = fq.ExecutionOptions(mode="auto", precision="complex64")
plan = fq.plan(circuit, options=options)
result = fq.run(plan)

print(plan.identity)
print(plan.summary()["recommended_mode"])
print(result.state)
```

A plan records the canonical IR, resolved execution semantics, compiler pipeline, required environment, and the selected decision under one SHA-256 identity. Passing a plan to `fq.run` executes exactly that plan: there is no replanning, recompilation, or silent fallback, and a JSON round trip verifies every fingerprint before execution.

An existing plan is closed to semantic overrides. Passing `options`, `measurements`, or `noise_model` together with a plan raises `TypeError`, and an incompatible environment or world size fails before kernel launch.

## Request measurements

```{code-block} python
outputs = (
    fq.expectation(fq.Z(0) + fq.Z(1), name="magnetization"),
    fq.expectation(fq.X(0) @ fq.Z(1), name="correlation"),
    fq.samples(wires=(0, 1)),
)
plan = fq.plan(circuit, outputs=outputs, options=fq.ExecutionOptions(shots=1024, seed=7))
result = fq.run(plan)

print(result.expectation("magnetization"))
print(result.require_samples())
```

Pauli products use `@`; Hamiltonian sums and real coefficients use ordinary arithmetic. The public output factories are `expectation`, `probabilities`, `samples`, and `counts`. Probabilities and expectations are exact by default; `samples` and `counts` require a positive shot count. Use `result.measurement(index_or_name)` for a specific request, `result.statevector()` when a statevector is required, and `result.native()` only when intentionally depending on an unstable backend-native object.

## Handle errors

```{code-block} python
import flagquantum.errors as fqe

try:
    result = fq.run(fq.plan(circuit, options=options))
except fqe.ValidationError:      # invalid semantic input
    ...
except fqe.PlanningError:        # stale, tampered, or incompatible plan
    ...
except fqe.CapabilityError:      # requested capability is unavailable
    ...
except fqe.ExecutionError:       # execution or training failure
    ...
```

All categories inherit `FlagQuantumError` and a compatible Python built-in exception. Wrong Python types and unknown keyword arguments continue to raise `TypeError`.

## Record and replay

`Circuit(..., record_op=True)` keeps the instruction list that produced a state, and the same circuit can be exported for tools outside FlagQuantum (see [Compile and Target](compile-and-target.md)). A recorded program is the input to deployment packaging, so a circuit that was trained, compiled, or submitted always has an inspectable source.
