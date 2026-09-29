# Noisy Simulation

FlagQuantum uses one backend-neutral `NoiseModel` for exact density-matrix
evolution, batched statevector trajectories, and MPS quantum trajectories. The
exact path is the small-system correctness oracle; trajectory paths report
sampling statistics, and the MPS path additionally reports truncation data.

```{code-block} python
import flagquantum as fq
import flagquantum.noise as fqn
import flagquantum.runtime as fqr

circuit = fq.Circuit(2).h(0).cx(0, 1)
noise = (
    fqn.NoiseModel()
    .add("h", fqn.thermal_relaxation_channel(t1=50_000, t2=70_000, duration=35))
    .add("cx", fqn.depolarizing_channel(0.01))
    .add_readout(0, fqn.ReadoutError(((0.98, 0.02), (0.07, 0.93))))
)

exact = fq.run(
    circuit,
    noise_model=noise,
    options=fq.ExecutionOptions(mode="density_matrix"),
    outputs=fq.expectation(fq.Z(0) + fq.Z(1)),
)
print(exact.expectation())

sampled = fqr.run_noisy_mps(
    circuit,
    noise,
    trajectories=4096,
    min_trajectories=128,
    target_standard_error=1e-3,
    seed=42,
)
print(noise.identity)
print(sampled.expectation_z_mean, sampled.statistics.standard_error)
print(sampled.converged, sampled.stopped_early)
```

## Built-in channels

`bit_flip`, `phase_flip`, `depolarizing`, and `amplitude_damping` channels,
thermal relaxation with gate timing, readout confusion matrices, and
calibration-conditioned device profiles with gate and idle noise lowering.

## Selection under a memory budget

The stable `fq.run(...)` entry point can select noisy MPS trajectories when the
exact density matrix would exceed an explicit memory budget. Approximation is
opt-in: without that budget, planning fails rather than silently changing the
semantics of the request.

## Reproducibility

A noise model has an identity that participates in plan verification, so a
versioned model survives a plan JSON round trip and a changed model is detected
instead of being applied silently. Trajectory runs accept an explicit seed and
report their sampling statistics.

## Support boundary

Validated Markovian Kraus channels, timestamped device profiles, ASAP gate and
idle thermal lowering, classical readout confusion, exact density execution, and
reproducible MPS trajectories with single-rank adaptive stopping are available.
Pulse overlap, crosstalk, leakage, provider calibration adapters, distributed
adaptive stopping, batched statevector trajectories, production multi-GPU
scheduling, and noisy gradients are unsupported. Multi-wire MPS channels use an
explicit dense correctness fallback.
