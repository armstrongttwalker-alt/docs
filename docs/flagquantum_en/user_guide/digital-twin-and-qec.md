# Digital Twins and Error Correction

## QPU digital twins

A digital twin is a calibration-conditioned model of a physical QPU. It predicts the measurement distribution of a circuit offline, and its predictions are compared with traceable hardware evidence rather than with an ideal simulator.

```{code-block} python
import flagquantum as fq

twin = fq.twin.from_noise_model(
    device_noise_model,
    target="your-provider:your-qpu",
    qubits=(12, 13),
)
prediction = twin.predict(fq.Circuit(2).h(0).cx(0, 1))
```

The execution target and the ordered physical mapping are part of the twin's immutable identity, so a prediction always names the device, the calibration snapshot, and the mapping it used. A twin can be saved and restored, compared across calibration snapshots, and validated against recorded hardware tasks.

Validation evidence is narrowed to the directed physical couplers and circuit depth that were actually exercised: `TwinCircuitSupport` refuses to extend a bound to an untested interaction, a reversed direction, an excessive depth, or an operation of arity greater than two. Overlapping support cells from one device can be composed into a structural region, but local bounds are never combined into a region-level accuracy claim, and composition never infers cross-cell correlated noise.

Agreement is agreement of classical measurement distributions (total-variation), not quantum-state fidelity. A twin does not route or submit work; submissions stay explicit.

## Quantum error correction

The error-correction namespace connects syndrome extraction, decoding, correction, and logical-result analysis. A memory experiment returns a logical error rate together with the syndrome and correction records that produced it:

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

Supported today: one fixed three-data-qubit repetition-code profile, bounded deterministic X-error schedules, replaceable per-round trajectory decoding with physical-X or Pauli-frame-X actions, a two-round temporal rule that rejects an isolated readout excursion, independent bit flips after parity-check CNOTs, and independent syndrome and final-readout confusion. Feedback traces separate true and observed bits, actions, and frame evolution.

The temporal rule is not maximum-likelihood decoding, and repeated readout faults can mimic data errors. Sweeps report finite-shot observations only. General codes and channels, correlated or timing noise, batched decoder feedback, hard-real-time or provider control, gradients, and distributed execution are not supported, and logical-suppression or threshold claims require separate statistical and scaling evidence.
