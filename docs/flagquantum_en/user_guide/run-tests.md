# Run Tests

## Install the test dependencies

```{code-block} shell
python -m pip install ".[dev]"
```

## Run the suite

```{code-block} shell
python run_tests.py
```

## Tiered commands

The repository's tier runner selects a meaningful subset for the change at hand:

| Situation | Command | What it proves | What it does not prove |
| --- | --- | --- | --- |
| Daily development or any issue baseline | `python tools/ci_tier.py pr-default` | Fast smoke and unit health for imports, minimal circuits, autograd, and planner helpers | Runtime integration, distributed behaviour, performance, or release readiness |
| Local API, runtime, planner, or compiler changes | `python tools/ci_tier.py pr-runtime` | Seeded integration coverage for local runtime and API behaviour | Multi-process transport, GPU execution, or scalability |
| Distributed planner, audit, or benchmark contract changes | `python tools/ci_tier.py pr-distributed` | CPU distributed semantics, fail-closed gates, benchmark JSON contracts, release-gate validation | Real multi-GPU or multi-node capacity expansion |
| Real multi-GPU or accelerator work | `python tools/ci_tier.py gpu-scheduled` | Accelerator-backed tests plus device-bound Triton kernels | Multi-node transport or release scalability by itself |

The core rule is to run the smallest meaningful tier first and expand by blast
radius. CPU distributed tests prove semantics and fail-closed behaviour only;
they are never scalability evidence, and an empty marker selection is not
verification.

## Optional integration suites

```{code-block} shell
pytest -m qiskit
pytest -m pennylane
pytest -m braket
```

## Correctness certification and the no-progress policy

`docs/correctness_certification.json` is generated from the operator and
lowering registry: every supported operator/backend pair must have a versioned
generated case, and distributed implementation changes must run the required
local GPU lane because CPU simulation cannot replace it.

Long-running jobs report phase, last operation, completed work, memory,
collective state, and rank. A no-progress watchdog classifies stalled input,
collective and participant stalls, rank desynchronization, and memory growth,
preserves diagnostics, terminates the stale job, and verifies process-group
cleanup. Explicit compile and checkpoint budgets keep bounded legitimate work
from being mistaken for a hang.

Release-grade scalability evidence requires a promoted benchmark payload that
passes the distributed release-policy audit, which is a separate gate from the
tiers above.
