# Interoperability

External frameworks connect through one candidate-stable, framework-neutral
adapter protocol under `flagquantum.ecosystem`. The default registry stores
import-safe descriptors and loads an implementation only when requested, so
importing an adapter never imports its dependency.

```{code-block} python
from flagquantum.ecosystem import available_adapters, get_adapter

assert available_adapters() == ("braket", "cirq", "cudaq", "pennylane", "qiskit")
adapter = get_adapter("qiskit")
result = adapter.import_program(external_circuit)
flagquantum_ir = result.ir
```

Registries are immutable: adding a descriptor returns a new registry and cannot
alter the process-wide default. Every adapter must pass the same identity,
lossless round-trip, fail-closed, and explicit-loss checks through
`run_adapter_conformance()`, which emits a versioned
`flagquantum_interop_conformance_v1` payload.

## Qiskit

```{code-block} python
from flagquantum.ecosystem.qiskit import (
    from_qiskit, to_qiskit, import_qiskit, export_qiskit, run_qiskit_conformance,
)
```

Certified against Qiskit 2.0.x/2.5.x with Aer 0.17.x for operations, wire order,
statevectors, classical bits, arithmetic parameter expressions, custom unitaries
up to three qubits, and round trips. Functions, powers, other symbolic
operations, and control flow fail closed; named or multiple registers require
explicit lossy flattening.

The Qiskit Aer bridge executes one fully bound, single-batch circuit on local CPU
Aer and returns an owned `ExecutionResult` with explicit wire order, seed, and
CPU thread controls.

## PennyLane

```{code-block} python
from flagquantum.ecosystem.pennylane import from_pennylane, to_pennylane, run
```

PennyLane 0.44.1/0.45.1 on Python 3.11 or newer supports static `QuantumScript`
conversion with complex128 semantics. QNodes, device execution, shots,
measurements, trainable parameters, and arbitrary wire labels without explicit
flattening are out of scope for v1. The Lightning bridge executes one fully
bound circuit on local CPU `lightning.qubit` and returns an owned
`ExecutionResult`; it does not support gradients, noise models, dynamic
circuits, automatic routing, GPU, or fallback.

## Cirq and CUDA-Q

```{code-block} python
from flagquantum.ecosystem.cirq import from_cirq, to_cirq, run
from flagquantum.ecosystem.cudaq import export_cudaq, to_cudaq
```

Cirq support covers the contract gate subset, contiguous `LineQubit` indices,
bound real parameters, and an explicit qubit order; the Simulator bridge
executes one fully bound circuit locally. CUDA-Q export is deliberately
one-way, does not execute the kernel, and reverses bit axes explicitly because
CUDA-Q treats wire zero as least-significant.

## Dynamic circuits

```{code-block} python
from flagquantum.dynamic import DynamicCircuit

circuit = DynamicCircuit(2)
circuit.h(0)
circuit.measure(0, classical_bit=0)
circuit.conditional("x", 1, classical_bit=0)

report = fq.experimental.dynamic.assess_dynamic_backend(circuit, backend)
result = fq.experimental.dynamic.run_dynamic(circuit, shots=128, seed=7)
stable_result = result.to_execution_result()
```

Builders are candidate-stable pending API-owner approval, while dynamic
execution and backend assessment remain experimental. Local dynamic noise is
limited to one-wire bit-flip channels and independent readout confusion, and
provider-noise execution fails closed. No real IQM QPU task has been used; the
Braket IQM integration was validated through the real SDK serializer and a
mocked task contract only.

## Boundary

Conversion does not install dependencies, sandbox third-party Python, or
certify provider hardware. External framework objects never enter the
compiler, PyTorch runtime, Torch-FL, accelerator, or QPU layers.
