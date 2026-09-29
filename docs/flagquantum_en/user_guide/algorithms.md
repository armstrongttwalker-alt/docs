# Algorithms

FlagQuantum ships algorithm units as ready-to-run examples, at demonstration
scale. Each unit documents its own advantage premise, and the honest reading is
usually that the quantum routine needs an input model this unit does not supply.

## Units

| Unit | Interface | Advantage premise |
| --- | --- | --- |
| QUBO to Ising mapping | `flagquantum.algorithms` | A polynomial classical transformation with no advantage of its own; any benefit belongs to the solver that consumes the Hamiltonian |
| State preparation | `state_preparation` | Prepares a state efficiently given its amplitudes; the classic input is already exponential |
| Oracle building blocks | `oracle` | Reversible classical logic at O(n) Toffoli-style cost, with no advantage premise of its own |
| Truth-table oracle synthesis | `oracle` | Enumerates a truth table classically, so its cost is exponential in register width |
| Grover search | `grover` | Improvement is in query complexity against a synthesised oracle, not end to end |
| Amplitude estimation | `amplitude_estimation` | Quadratic speedup only when the state-preparation unitary is free; no QRAM is supplied |
| Quantum PCA | `pca` | The density matrix is materialised classically; meaningful only at low effective rank |
| Quantum k-medians | `kmedians` | The advantage premise is a free Grover oracle, and the distance table is computed classically |
| Quantum kernel estimation | `quantum_kernel` | The data-access model is not met, and every kernel entry is a sampled estimate |
| Feature selection as a QUBO | `feature_selection` | Builds and evaluates the objective; it does not solve, and the repository has no annealer |
| Frequent-item fractions | `qarm` | Assumes coherent entry-wise database access, which is paid explicitly here |
| Singular values by phase estimation | `svd` | The input state is prepared from the very decomposition the readout estimates |

## Running a unit

Each unit is exposed from its own module rather than from the root namespace, so
examples import it directly. The runnable entry points live under
`examples/algorithms/`, and each prints the values it compares against a
classical reference.

```bash
python examples/algorithms/grover.py
```

## Boundaries

These units are demonstration-scale research surfaces: no performance,
convergence, or hardware claim is attached to them, and they are not selected by
the default runtime. Several of them are deliberately capped in register width
because a wider circuit would need ancillas or a state-preparation cost the unit
does not model.
