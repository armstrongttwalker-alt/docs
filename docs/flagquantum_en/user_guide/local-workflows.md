# Local Workflows

Local execution is the zero-configuration path. It needs no provider account, compiler plugin, task scheduler, or network connection.

## Simulate

```{code-block} python
import flagquantum as fq

circuit = fq.Circuit(2).h(0).cx(0, 1)
result = fq.run(circuit)
state = result.to_statevector()
```

CPU statevector execution is the default. Select one locally controlled GPU explicitly when needed:

```{code-block} python
result = fq.run(
    circuit,
    options=fq.ExecutionOptions(device="cuda:0"),
)
```

`ExecutionOptions.device` describes a device controlled by the current process. The `target` argument is reserved for external execution destinations such as a Jiuding GPU workspace or Quafu hardware.

## Measure

Request the scientific result you need instead of manually inspecting the statevector:

```{code-block} python
probabilities = fq.run(
    circuit,
    outputs=fq.probabilities(),
).probabilities

correlation = fq.run(
    circuit,
    outputs=fq.expectation(fq.Z(0) @ fq.Z(1)),
).expectation()

counts = fq.run(
    circuit,
    outputs=fq.counts(),
    shots=1024,
).counts[0]
```

Probabilities and expectations are exact by default. Counts and samples require an explicit shot count. Local execution preserves its batch dimension, so `counts` returns one dictionary per batch item and `[0]` selects the default single-circuit batch.

## Choose a simulation representation

The same program can run under different representations without being rewritten:

```{code-block} python
statevector_result = fq.run(circuit, options=fq.ExecutionOptions(mode="statevector"))
mps_result = fq.run(circuit, options=fq.ExecutionOptions(mode="mps"))
tensor_result = fq.run(circuit, options=fq.ExecutionOptions(mode="tensor_network"))
```

Statevector simulation is the recommended first run. MPS suits large low-entanglement systems, and tensor networks suit structured contraction workloads; each representation carries its own support boundary.

## Precision

Precision is resolved once per execution. `complex64` implies float32 parameters, and `complex128` implies float64. Use an explicit runtime configuration for long-lived or distributed work so that circuits, plans, and workers agree:

```{code-block} python
from flagquantum.runtime.configuration import RuntimeConfig

config = RuntimeConfig(device="cuda", complex_dtype="complex128")
circuit = fq.Circuit(4, config=config)
```

## Draw a circuit

```{code-block} python
print(circuit.draw())                 # terminal text form
figure, axes = circuit.draw(format="mpl")   # publication-quality figure
```

## Run the maintained local paths

```{code-block} shell
python -m examples.local.simulate
python -m examples.local.measure
python -m examples.local.train
```

Continue with the single-machine examples for explicit simulator selection, larger models, and configurable CPU/GPU runs.
