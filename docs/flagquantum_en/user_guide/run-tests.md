# Run tests

FlagQuantum tests are organised in tiers. Run the smallest meaningful tier
first, then expand by blast radius.

## Install test dependencies

```bash
python -m pip install "flagquantum[dev]"
```

## Quick start

| Situation | Command |
| --- | --- |
| Daily development or an issue baseline | `python tools/ci_tier.py pr-default` |
| Local API, runtime, planner, or compiler changes | `python tools/ci_tier.py pr-runtime` |
| Distributed planner, audit, or benchmark contract changes | `python tools/ci_tier.py pr-distributed` |
| Real multi-GPU or accelerator testing | `python tools/ci_tier.py gpu-scheduled` |

An empty marker selection is not verification: a tier that collects nothing has
proved nothing.

## What each tier proves

- The default tier covers imports, minimal circuits, autograd, and pure
  planner/audit helpers.
- The runtime tier covers seeded local runtime and API behaviour.
- The distributed CPU tier covers multi-process semantics, fail-closed gates,
  benchmark JSON contracts, and release-gate validation. It never stands in for
  real multi-card capacity expansion.
- Device tiers cover accelerator-backed tests and device-bound kernels; one GPU
  covers local parity, two cover mandatory sharded semantics, and scheduled
  wider runs cover rank count, topology, partition, and collective behaviour.

## Release boundary

Long-running jobs report phase, last operation, completed work, memory,
collective state, and rank, and a no-progress watchdog classifies stalls instead
of leaving a silent hang. Release-grade scalability evidence requires a promoted
benchmark payload that passes the release policy and audit commands; correctness
suites, coverage numbers, and device smoke runs are not release evidence.
