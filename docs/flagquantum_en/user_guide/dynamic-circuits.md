# Dynamic circuits

Dynamic circuits add mid-circuit measurement and classical control.

## Build and run

```python
import flagquantum as fq
from flagquantum.dynamic import DynamicCircuit

circuit = DynamicCircuit(2)
circuit.h(0)
circuit.measure(0, classical_bit=0)
circuit.conditional("x", 1, classical_bit=0)

result = fq.experimental.dynamic.run_dynamic(circuit, shots=128, seed=7)
stable_result = result.to_execution_result()
```

`DynamicCircuit` and its IR encoding are candidate-stable pending API-owner
approval; execution and backend assessment remain experimental. The stable
dynamic path will keep returning the canonical `fq.ExecutionResult`, and
provider-native state will not be frozen into that contract.

## Execution strategies

`run_dynamic(..., strategy="auto")` uses batched statevector trajectories for
eligible workloads of at least 32 shots and falls back to the reference
trajectory path when batching would exceed `max_batched_bytes` (256 MiB by
default) or the input is already batched. Callers may request
`strategy="trajectory"` or `"batched"` explicitly, and
`statistics["gate_execution_strategy"]` records the selected path for benchmark
attribution.

## Backend assessment

```python
report = fq.experimental.dynamic.assess_dynamic_backend(circuit, backend)
assert report.compatible, report.blockers
```

The preflight is read-only and makes no task submission. Local dynamic noise is
limited to one-wire bit-flip channels matched to executed gates plus independent
readout confusion on explicit measurements and final sampling; other channels,
correlated readout, device-profile timing noise, and provider-noise execution
fail closed rather than approximating silently. Provider-neutral conformance
passes locally and on Qiskit Aer, and a real dynamic QPU execution is not
claimed.
