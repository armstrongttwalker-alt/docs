# API Reference

FlagQuantum exposes one curated Python interface: `import flagquantum as fq`.
Build a circuit, inspect its runtime plan, execute it through a stable result
contract, and train parameterized programs with PyTorch.

Exact stable names are defined by the repository's `public_api_v1.json`, verified
by executable contract tests, and rendered in the stable API inventory below.

## API map

| Task | Primary interface | Result |
| --- | --- | --- |
| Build a program | `fq.Circuit` | Circuit backed by FlagQuantum IR |
| Optimize a program | `flagquantum.compiler.optimize` | `fq.CircuitIR` |
| Compile for a selected tool and target | `fq.compile` | `fq.CircuitIR` |
| Inspect execution | `fq.plan`, `Circuit.runtime_plan` | Explainable runtime plan |
| Execute locally or remotely | `fq.run` | `fq.ExecutionResult` |
| Submit a detached job | `fq.submit`, `fq.restore_job` | Job handle with credential-free receipt |
| Define a trainable quantum layer | `fq.Module` | PyTorch module |
| Train | `fq.train` | `fq.TrainingResult` |
| Package for a target | `flagquantum.deployment.create_deployment_package` | Sealed deployment package |

## Stable API inventory

| API | Stability | Verification |
| --- | --- | --- |
| `fq.Circuit` | Stable | executable contract |
| `fq.CircuitIR` | Stable | executable contract |
| `fq.ExecutionOptions` | Stable | executable contract |
| `fq.ExecutionPlan` | Stable | executable contract |
| `fq.ExecutionResult` | Stable | executable contract |
| `fq.I` | Stable | executable contract |
| `fq.IRSerializationError` | Stable | executable contract |
| `fq.IRValidationError` | Stable | executable contract |
| `fq.IR_VERSION` | Stable | executable contract |
| `fq.Instruction` | Stable | executable contract |
| `fq.MeasurementResult` | Stable | executable contract |
| `fq.Module` | Stable | executable contract |
| `fq.Observable` | Stable | executable contract |
| `fq.OutputRequest` | Stable | executable contract |
| `fq.Parameter` | Stable | executable contract |
| `fq.ParameterExpression` | Stable | executable contract |
| `fq.RuntimePolicy` | Stable | executable contract |
| `fq.TrainingResult` | Stable | executable contract |
| `fq.X` | Stable | executable contract |
| `fq.Y` | Stable | executable contract |
| `fq.Z` | Stable | executable contract |
| `fq.__version__` | Stable | executable contract |
| `fq.compile` | Stable | executable contract |
| `fq.counts` | Stable | executable contract |
| `fq.expectation` | Stable | executable contract |
| `fq.experimental` | Stable | executable contract |
| `fq.plan` | Stable | executable contract |
| `fq.probabilities` | Stable | executable contract |
| `fq.restore_job` | Stable | executable contract |
| `fq.run` | Stable | executable contract |
| `fq.samples` | Stable | executable contract |
| `fq.submit` | Stable | executable contract |
| `fq.train` | Stable | executable contract |
| `fq.twin` | Stable | executable contract |

`fq.experimental` is a stable import path, but its contents carry no
compatibility guarantee. Compatibility imports are migration aids and are not
implied stable.

## Errors

Catch stable lifecycle categories from `flagquantum.errors`:

```python
import flagquantum.errors as fqe

try:
    result = fq.run(fq.plan(circuit, options=options))
except fqe.ValidationError:
    ...  # invalid semantic input
except fqe.PlanningError:
    ...  # stale, tampered, or incompatible plan
except fqe.CapabilityError:
    ...  # requested capability is unavailable
except fqe.ExecutionError:
    ...  # execution or training failure
```

All categories inherit `FlagQuantumError` and the compatible Python built-in
exception (`ValueError`, `RuntimeError`, or `NotImplementedError`). Wrong Python
types and unknown keyword arguments raise `TypeError`, and specific errors such
as `IRValidationError`, `IRSerializationError`, and
`flagquantum.training.TrainingStateError` remain available inside the
corresponding category.

## Result contract

`ExecutionResult.diagnostics()` returns a versioned envelope with `metrics`,
`provenance`, `runtime`, and `compatibility` sections whose keys may grow
compatibly. `TrainingResult.final_loss` and its versioned `summary()` provide
stable training output access. Result summaries carry schema and version fields,
and backend-native attributes are not forwarded implicitly: use
`result.native()` when intentionally depending on one.

## Stability boundaries

- A planner result describes intent and estimates; it is never runtime or
  benchmark evidence.
- Operator and backend support comes from the executable lowering registry in
  [Operator Capabilities](operator-capabilities.md).
- Runtime evidence must satisfy the repository's typed runtime contracts.
- Examples in stable documentation are executed by documentation contract tests,
  and new public names must first be importable, snapshot-tested, and added to
  the stable API manifest.
