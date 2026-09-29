# Algorithms

`flagquantum.algorithms` composes the runtime into runnable algorithm units.
They are demonstration-scale teaching and reference implementations: each unit
records the premise its advantage statement depends on, and none of them
certifies performance, convergence, or hardware behaviour.

## Units

| Unit | Entry point | Advantage premise recorded |
| --- | --- | --- |
| QUBO to Ising mapping | `flagquantum.algorithms.qubo` | Polynomial classical transformation; any advantage belongs to the consuming solver |
| Quantum state preparation | `state_preparation` | Input is already exponential, so efficiency is shown given the amplitudes |
| Oracle building blocks and truth-table synthesis | `primitives.oracle` | Reversible classical logic; a truth table is enumerated classically |
| Grover search | `grover` | Query-complexity improvement against a synthesized oracle |
| Quantum amplitude estimation | `amplitude_estimation` | Quadratic speed-up only when state preparation is free |
| Quantum PCA | `pca` | Low effective rank only; the density matrix is materialized classically |
| Quantum k-medians | `kmedians` | Requires a free oracle; distances are computed classically |
| Quantum kernel estimation and kernel ridge classification | `quantum_kernel` | Assumes the feature states are available; sampling cost is the paper's own |
| Feature selection as a QUBO | `feature_selection` | Builds an objective; the solver owns any advantage |
| Frequent-item fractions by amplitude estimation | `qarm` | Requires coherent database access, which is not exercised |
| Singular values by phase estimation | `svd` | Assumes an input model; the decomposition is computed classically here |

## Variational training

The optimization helpers drive local VQE and ADAPT-VQE workflows with staged
hybrid parameter groups: combinations of Adam/AdamW/SGD/L-BFGS, exact full or
block quantum natural gradient, and Rotosolve, with per-step gradient, update,
and evaluation diagnostics. Heisenberg helpers provide phase-augmented,
bond-resolved HVA ansatze, dimer-singlet initialization, and exact small-system
energy references, so a run can report an explicit exact-energy convergence
decision instead of treating a decreasing loss as convergence.

```{code-block} python
from flagquantum import algorithms as fqa

hamiltonian = fqa.Hamiltonian((
    fqa.pauli_term(0.7, "ZZ", (0, 1)),
    fqa.pauli_term(0.2, "Z", (2,)),
))
print(hamiltonian.expectation(circuit))
```

## Read the boundary

Every unit documents what its speed-up or capability statement assumes, and
several of them require oracles, qRAM, or input models that the unit does not
supply, so no end-to-end advantage follows at demonstration scale. Where a unit
publishes a narrower limit, respect it: phase oracles above three evaluation
wires need caller-supplied ancillas that must enter in |0>, and a dirty ancilla
produces a silently wrong answer. Treat the recorded premises as part of the
interface, not as fine print.
