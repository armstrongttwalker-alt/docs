# Runtime Planning

A plan explains what the runtime intends to do before anything runs. It selects a representation and an execution policy, and it reports blockers and fallbacks instead of silently changing the program's semantics.

## Inspect a plan

```{code-block} python
import flagquantum as fq

circuit = (
    fq.Circuit(n_qubits=4)
    .h(0)
    .cx(0, 1)
    .rzz(1, 2, theta=0.2)
)

plan = circuit.runtime_plan(prefer_jax=True, require_gradients=True)
print(plan.summary())
```

The same planning entry point is available directly:

```{code-block} python
plan = fq.plan(circuit, options=fq.ExecutionOptions(mode="auto"))
print(plan.summary()["recommended_mode"])
```

## Plans are executable and reproducible

Pass the result of `fq.plan` directly to `fq.run` for an inspectable and reproducible execution. The supplied plan is validated and executed without replanning or recompiling, and plan identity covers the canonical IR, the resolved execution semantics, the compiler pipeline, the required environment, and the selected decision:

```{code-block} python
plan = fq.plan(circuit, options=fq.ExecutionOptions(mode="auto", precision="complex64"))
result = fq.run(plan)
assert result.plan.identity == plan.identity
```

JSON round trips verify all fingerprints and the final identity before execution, and an existing plan is closed to semantic overrides: passing `options`, `measurements`, or `noise_model` alongside it raises `TypeError`. An environment or world-size incompatibility fails before kernel launch instead of silently replanning or falling back.

## Planning is not evidence

A planner result describes intent and estimates. It is never runtime evidence, benchmark evidence, or a scalability claim. Performance and capacity statements must come from runtime-generated records that state their distribution semantics.

## Fail-closed behavior

- Unknown execution options fail before planning rather than being ignored.
- Unsupported output kinds and missing shot counts fail before execution.
- A request that cannot be honored on the selected path raises a capability or planning error instead of switching representation behind the caller's back.
- Distributed execution is described by the execution environment; a conflicting world size or precision fails up front.

## Related

- [Local Workflows](local-workflows.md) — executing a planned program locally.
- [Compiler and Remote Targets](compiler-and-remote.md) — compiling for a topology or a provider.
- [Training](training.md) — how the module and the runtime policy interact.
