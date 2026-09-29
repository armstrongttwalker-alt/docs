# Run on Hardware

FlagQuantum keeps one execution contract across local, remote compute, and quantum-hardware targets. The circuit and the requested observable stay explicit; the target changes where the program runs, not what the result means.

## Compile, package, submit

```{code-block} python
import flagquantum as fq

circuit = fq.Circuit(2).h(0).cx(0, 1)
result = fq.run(
    circuit,
    compiler="qsteed",
    target="quafu:Baihua",
    shots=1024,
    name="bell calibration",
)
counts = result.measurement("counts").value[0]
```

This path compiles, packages, submits, and waits for the remote result without changing the `fq.ExecutionResult` return type. It never selects or substitutes a compiler or provider implicitly, and an unsupported remote output fails before compilation or submission.

One Pauli expectation can use the same entry point. The circuit is compiled once, qubit-wise-commuting terms are measured in separate sealed jobs without changing the selected physical mapping, and the measurement statistics report the estimator standard error, the group count, per-group shots, and total shots:

```{code-block} python
energy = fq.run(
    circuit,
    outputs=fq.expectation(0.5 * (fq.X(0) @ fq.X(1)) + fq.Z(0)),
    compiler="qsteed",
    target="quafu:Baihua",
    shots=4096,
).expectation()
```

## Submit without blocking

`fq.run()` waits for a result. When a notebook should stay available while a task is queued, submit it and query later:

```{code-block} python
job = fq.submit(fq.Circuit(2).x(0), target="quafu:Baihua", shots=1024)
job.save("quafu-job.json")
print(job.id)
```

Submission waits only for preparation and the provider's acknowledgement. `status()` queries once and normalises the provider state to `queued`, `running`, `succeeded`, `failed`, `cancelled`, or `unknown`; provider states that mean "compilation finished" are reported as queued, not as completed execution. `result()` does not poll and raises unless the job has succeeded; use `job.wait(timeout=...)` to block deliberately. `job.cancel()` requests cancellation and the state must be queried afterwards to confirm it. Interrupting a cell or closing a notebook is not cancellation.

## Restore after a restart

```{code-block} python
job = fq.restore_job("quafu-job.json")
print(job.status())
```

The receipt is JSON, contains job identity and decoding context but no credentials, is written once, and never overwrites an existing file. Restoration never resubmits. If a submission loses its network response, reconcile with the provider before retrying: the server may already have accepted the job.

## Managed compute targets

A running Jiuding workspace can execute a circuit as a remote compute target. Sampling and count reduction execute without returning a full statevector:

```{code-block} python
result = fq.run(
    circuit,
    target="jiuding:gpu",
    outputs=(fq.samples(wires=(0, 1)), fq.counts(wires=(0, 1))),
    shots=1024,
)
```

Inspect `result.runtime` and `result.provenance` for the selected device, result transfer, counts aggregation, and any CPU-fallback evidence. The Jiuding path and the Quafu provider path both require live provider access and credentials, and their evidence scope is recorded with their guides in the upstream repository.

## Packaging for a provider

`flagquantum.deployment.create_deployment_package` binds trained parameters, compiles for a target, and seals an auditable package. `flagquantum.services.preflight_deployment` validates a program against a target and identity-checks the exact package that may later be submitted, without contacting the provider or consuming remote capacity.
