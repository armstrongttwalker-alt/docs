# Noisy Simulation

FlagQuantum uses one backend-neutral `NoiseModel` for exact density-matrix evolution, batched statevector trajectories, and MPS quantum trajectories. The exact path is the small-system correctness oracle; trajectory paths report sampling statistics, and the MPS path additionally reports truncation data.

## Define a noise model

```{code-block} python
import flagquantum as fq
import flagquantum.runtime as fqr
import flagquantum.noise as fqn

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
```

Built-in channels include depolarizing, bit flip, phase flip, amplitude damping, thermal relaxation, and readout error. A device profile can additionally supply gate durations and idle-time noise, which the runtime lowers into channels on the gates and idle windows that actually occur.

## Trajectory simulation

```{code-block} python
sampled = fqr.run_noisy_mps(
    circuit,
    noise,
    trajectories=4096,
    min_trajectories=128,
    target_standard_error=1e-3,
    seed=42,
    retain_trajectories=False,
)
print(sampled.expectation_z_mean)
print(sampled.statistics.standard_error)
print(sampled.converged, sampled.stopped_early)
```

Adaptive stopping is available on a single rank; when the exact density matrix would exceed an explicit memory budget, the stable `fq.run` entry point can select noisy MPS trajectories instead, but only if the caller opts in to approximation — otherwise planning fails rather than changing the semantics of the program silently.

## Reproducibility

A `NoiseModel` carries a versioned identity, and that identity is part of the plan. A plan round trip re-verifies the model payload and its digest, so a noisy result can be reproduced from the stored plan instead of from a re-typed noise definition.

## Continuous-time evolution

Time-independent Markovian systems can be evolved with a dense Hamiltonian and Lindblad collapse operators on a fixed time grid:

```{code-block} shell
python examples/lindblad_evolution.py
```

This path is CPU-only for complex64 and complex128, and the grid controls the accuracy of the fixed-step fourth-order Runge-Kutta integrator.

## Boundaries

Pulse overlap, crosstalk, leakage, provider calibration adapters, distributed adaptive stopping, batched statevector trajectories, and noisy gradients are not supported. Multi-wire MPS channels use an explicit dense correctness fallback instead of a silent approximation, and the exact supported scope of each noisy path is recorded in the capability catalog.
