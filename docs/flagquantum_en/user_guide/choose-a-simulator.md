# Choose a Simulator

FlagQuantum selects a simulation representation from the same program. The choice changes resource use and numerical behaviour, not the meaning of the circuit or the result contract.

| Representation | Select with | Strength | Boundary |
| --- | --- | --- | --- |
| Statevector | `mode="statevector"` or `mode="auto"` | Exact amplitudes, exact expectations, full measurement set | Memory grows with 2ⁿ; a shared state must fit on one device unless sharded |
| Density matrix | `mode="density_matrix"` | Exact noisy evolution | Memory grows with 4ⁿ; small-system correctness oracle for noise work |
| MPS | `mode="mps"` | Low-entanglement circuits with far larger qubit counts | Approximate; truncation is reported |
| Tensor network | `mode="tensor_network"` | Contraction-path execution with native slicing | Experimental; unsupported instructions fail closed instead of falling back |

## Inspect the decision before running

```{code-block} python
circuit = fq.Circuit(n_qubits=4).h(0).cx(0, 1).rzz(1, 2, theta=0.2)
plan = circuit.runtime_plan(prefer_jax=True, require_gradients=True)
print(plan.summary())
```

The planner reports the selected representation, gradient support, and the blockers that would prevent a request from running. Use `fq.plan(circuit, options=...)` when the execution options are part of the decision. A plan is an explanation of intent; it is not benchmark evidence.

## Precision

Each execution resolves complex precision once. `complex64` implies float32 parameters and real components; `complex128` implies float64. An explicit `ExecutionOptions.precision` or circuit dtype must agree with the module's own precision choice, otherwise the module fails before execution instead of silently casting.

`RuntimeConfig` is the immutable execution policy for long-lived or distributed work:

```{code-block} python
from flagquantum.runtime.configuration import RuntimeConfig, runtime_config

config = RuntimeConfig(device="cuda")
circuit = fq.Circuit(4, config=config)

with runtime_config(complex_dtype="complex128"):
    precise = fq.Circuit(2)   # captures complex128
```

Overrides are context-local: nested contexts restore exactly, asyncio tasks inherit a snapshot, threads start from their own default, and processes rebuild the policy from the plan's manifest rather than inheriting mutable state.

## Software-extended precision

On devices without native double precision, FlagQuantum can represent the requested logical precision with paired FP32 values ("Double-Single"). This is a backend representation of the requested precision, not a second user-facing precision. The split real/imag and Double-Single paths are explicitly experimental, are never selected by the default runtime, and expose their own acceptance evidence; their supported scope is recorded in the capability catalog.
