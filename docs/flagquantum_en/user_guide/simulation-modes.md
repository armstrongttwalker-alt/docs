# Simulation Modes

One program, several execution representations. `ExecutionOptions(mode=...)`
selects one explicitly, and `Circuit.runtime_plan(...)` explains what the
planner would select and why.

## Statevector

The default and the reference implementation. Probabilities and expectations are
exact, small and medium circuits run with zero configuration, and the local
PyTorch path supports training with vector-valued Z observables.

```{code-block} python
import flagquantum as fq

result = fq.run(
    fq.Circuit(4).h(0).cx(0, 1),
    outputs=fq.expectation(fq.Z(0) @ fq.Z(1)),
)
print(result.expectation())
```

Capacity is bounded by one device; for larger states use the sharded runtime or
a low-entanglement representation. On a CUDA-backed FlagOS logical device, the
local statevector path is gated by a packaged operator profile and attached
evidence.

## Matrix product states

MPS is the low-entanglement representation: cost follows bond dimension rather
than state size, and rank-owned MPS training distributes one state across
several devices.

```{code-block} python
from flagquantum.simulation.mps import run_mps

result = run_mps(circuit, max_bond=64)
```

MPS execution reports truncation data, so a caller can see the approximation the
representation introduced. Boundary instructions still execute serially by
owner, the only public capacity measurement is one exact-workload result, and
general scalability or release evidence is not claimed. A constrained MPS TEBD
path covers static real one-site and adjacent two-site Pauli terms on an open
chain with second-order imaginary-time evolution; real-time evolution, periodic
and nonlocal terms, gradients, and TDVP are unsupported.

## Tensor networks

Contraction-based execution for structured circuits, with slicing, contraction
ordering, and differentiable reverse contraction.

```{code-block} python
from flagquantum.simulation.tensor_network import run_tensor_network

result = run_tensor_network(circuit)
```

General reverse contraction and production distributed transport are not
certified, and noise channels are unsupported in this mode: they fail closed
instead of falling back to statevector.

## Density matrix

Exact noise evolution for small systems, used as the correctness oracle for the
trajectory paths.

```{code-block} python
import flagquantum as fq
import flagquantum.noise as fqn

noise = fqn.NoiseModel().add("x", fqn.bit_flip_channel(0.01))
result = fq.run(
    circuit,
    noise_model=noise,
    options=fq.ExecutionOptions(mode="density_matrix"),
)
```

Continuous-time Lindblad evolution adds dense time-independent Hamiltonians with
Markovian collapse operators on finite strictly increasing time grids, on CPU
complex64/complex128 only.

## Choosing a mode

```{code-block} python
plan = circuit.runtime_plan(require_gradients=True)
print(plan.summary())
```

Rules that hold across modes:

- The planner reports intent and estimates; runtime records report what ran.
- A representation is never silently substituted: an unsupported request fails
  during planning instead of falling back.
- Precision is resolved once per execution: `complex64` implies float32
  parameters and `complex128` implies float64.
- Advanced modes are labelled by maturity, and a mode being reachable is not a
  production or scalability claim.
