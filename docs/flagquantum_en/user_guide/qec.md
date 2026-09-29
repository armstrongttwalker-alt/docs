# Quantum Error Correction

QEC connects syndrome extraction, decoding, correction, and logical-result analysis. The long-term direction is a complete workflow for fault-tolerant quantum computing research, including logical operations and hardware feedback.

QEC owns codes, decoder semantics, detection events, and Pauli frames. It composes compiler control flow, runtime feedback, simulation kernels, noise models, and remote hardware interfaces.

## Start with a memory experiment

A three-data-qubit repetition-code memory experiment injects an error and follows it through syndrome extraction, decoding, and correction:

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

The experiment reports syndrome histories, correction actions, and final logical outcomes, and feedback traces separate true and observed bits, actions, and frame evolution.

## What the reference implementation covers

- A fixed repetition-code profile with bounded deterministic error schedules.
- Replaceable per-round trajectory decoding with physical-X or Pauli-frame-X actions.
- A temporal rule that rejects an isolated readout excursion, requiring a following round to confirm a data error.
- A circuit-location stochastic profile with independent bit flips after parity-check operations and independent readout confusion.

## Run and verify

```{code-block} shell
python -m pytest tests/qec -q
```

Check syndrome histories, correction actions, and final logical outcomes for known injected errors. Decoder changes must also cover readout faults and errors near the final round.

## Boundaries

- Sweeps report finite-shot observations only; logical suppression and threshold claims require separate statistical and scaling evidence.
- The temporal rule is not maximum-likelihood decoding, and repeated readout faults can mimic data errors.
- Batched decoder feedback, general channels and codes, correlated or timing noise, hard-real-time provider control, gradients, and distributed execution remain outside the current capability.
