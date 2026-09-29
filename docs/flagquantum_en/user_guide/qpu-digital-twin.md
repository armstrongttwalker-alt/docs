# QPU Digital Twin

A digital twin is a calibration-conditioned model of one QPU. It predicts the measurement distribution you would see on hardware, and it keeps that prediction tied to evidence: which circuits were validated, on which physical couplers, at which depth, at which calibration snapshot, and with which confidence bound.

## Build a Twin for any QPU

Start from a `NoiseModel` carrying a device profile. The execution target and the ordered physical mapping become part of the immutable Twin identity:

```{code-block} python
import flagquantum as fq

twin = fq.twin.from_noise_model(
    device_noise_model,
    target="your-provider:your-qpu",
    qubits=(12, 13),
)
prediction = twin.predict(fq.Circuit(2).h(0).cx(0, 1))
```

The framework side is provider-neutral: any QPU integration can build the same model after converting its calibration into FlagQuantum's noise and device-profile types. A native Quafu calibration path is included.

## What a prediction is

- Predictions cover the full computational-basis measurement distribution. Agreement is a total-variation agreement between measured distributions, not a quantum-state fidelity.
- `evidence_report()` is offline and never touches hardware.
- A validation run binds the corresponding all-qubit measurement when it emits the program for hardware submission; submission itself is always explicit.

## Qualify evidence by topology and depth

`TwinCircuitSupport` narrows a statistical envelope to the directed physical couplers and maximum circuit depth that were actually validated. It does not infer support merely because a coupler exists on the device, and it fails closed for untested interactions, reversed directions, excessive depth, or operations of arity greater than two.

Overlapping contemporaneous cells from one QPU can be composed into a connected-region coverage report for circuit-mapping checks, preserving directed edges and conservative limits. Local statistical bounds are never combined into a region-level accuracy claim.

## Validate against hardware

The validation workflow is deliberately explicit and resumable:

- freeze the circuits you intend to validate and the comparator they will be compared against;
- submit each task explicitly and checkpoint each receipt;
- assemble the ordered results into one simultaneous confidence statement;
- keep Twin↔QPU agreement, noiseless reference agreement, and QPU repeatability as separate quantities.

Receipts are credential-free JSON and restoration never resubmits, polls, or retries: those remain explicit provider calls.

## Track drift over time

Calibration drift and prediction accuracy can be aligned across chronological snapshots for the same fixed circuits, so a chart-ready series of Twin↔QPU agreement, reference agreement, repeatability, and verified bounds is available without claiming causality or choosing a promotion policy. Histories persist offline with private permissions and refuse destructive replacement.

## Compare candidates prospectively

An incumbent and a candidate model can be compared on the exact same prospectively collected hardware counts. The result reports a conservative finite-shot interval and returns `improved`, `degraded`, or `inconclusive`; it never promotes a model automatically, and no model is promoted without an explicit application decision.

## Boundaries

- Evidence remains specific to declared circuits, operations, mappings, physical couplers, depth, calibration snapshots, and confidence bounds.
- Holdout evidence applies only to the prospectively declared circuits; it does not establish arbitrary-circuit accuracy or training generalization.
- Automatic calibration collection, scheduling, region-wide statistical inference, trust policy, model promotion, and release-certified provider support are outside the framework.
