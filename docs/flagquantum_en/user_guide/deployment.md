# Deployment and Hardware

## Sealed deployment packages

`flagquantum.deployment` binds trained parameters, compiles for a target, and
seals an auditable package whose identity can be verified before submission:

```{code-block} python
import flagquantum.deployment as fqd

backend = fqd.CloudBackendProfile.simulator(2)
package = fqd.create_deployment_package(
    trained_circuit,
    backend=backend,
    shots=1024,
)
```

A deployment package is the artifact a provider journey transports; local
`ExecutionPlan` objects and provider-facing packages stay separate concerns.

## Preflight before submission

```{code-block} python
from flagquantum.services import preflight_deployment, preflight_execution

report = preflight_execution(trained_circuit, target="expectation")
if not report.executable:
    print(report.blockers)

deployment_report = preflight_deployment(trained_circuit, backend=backend, shots=1024)
if deployment_report.approved_for_submission:
    package = deployment_report.package
```

Preflight converts expected failures into structured blockers and validates the
exact package that may later be submitted, without contacting a provider.
Authentication, approval, tenant state, job persistence, and paid-resource
submission stay with the consuming application.

## Remote execution

```{code-block} python
import flagquantum as fq

# Jiuding: GPU simulation in a running workspace
jiuding_result = fq.run(trained_circuit, target="jiuding:gpu", outputs=fq.expectation(fq.Z(0)))

# Quafu: compilation, submission, and estimation from measured shots
quafu_result = fq.run(
    trained_circuit, target="quafu:Baihua", outputs=fq.expectation(fq.Z(0)), shots=1024,
)
```

Both return the canonical `fq.ExecutionResult`. Jiuding computes a simulated
expectation; Quafu estimates one from hardware measurements. Live provider
access is required and is not certified by the local checks.

Detached jobs keep a notebook responsive while a task is queued or running:

```{code-block} python
job = fq.submit(fq.Circuit(2).x(0), target="quafu:Baihua", shots=1024)
job.save("quafu-job.json")

state = job.status()          # queued, running, succeeded, failed, cancelled, unknown
result = job.result()         # raises unless the job succeeded; job.wait(timeout=...) blocks

restored = fq.restore_job("quafu-job.json")   # a later process; restoration never resubmits
```

Receipts are credential-free JSON files that preserve job identity and decoding
context; they never overwrite an existing file and never act as proof of what
hardware executed.

## QPU digital twins

An experimental, provider-neutral model predicts a QPU's measurement
distribution from a frozen calibration snapshot:

```{code-block} python
twin = fq.twin.from_noise_model(
    device_noise_model,
    target="your-provider:your-qpu",
    qubits=(12, 13),
)
prediction = twin.predict(fq.Circuit(2).h(0).cx(0, 1))
```

Twin evidence is qualified by circuit, operations, mapping, physical couplers,
depth, calibration snapshot, and confidence bound. Agreement is total-variation
agreement for classical measurement distributions, not quantum-state fidelity,
and the framework performs no automatic calibration collection, scheduling,
model promotion, or trust decision. Native Quafu support supplies calibration
and execution data; any provider can construct the same model from its own
calibration through the provider-neutral noise and device-profile types.

## Error correction

The repetition-code memory experiment connects syndrome extraction, decoding,
and correction in one local reference circuit:

```{code-block} python
from flagquantum.qec import ErrorEvent, ErrorSchedule, run_repetition_memory_experiment

result = run_repetition_memory_experiment(
    error_schedule=ErrorSchedule((ErrorEvent(round_index=0, wire=1),)),
    rounds=3,
    shots=16,
    seed=0,
)
print(result.logical_error_rate)
```

This is development evidence for one fixed three-data-qubit profile: sweeps
report finite-shot observations only, not logical suppression or thresholds, and
general codes, correlated noise, hard-real-time hardware feedback, gradients,
and distributed execution are unsupported.
