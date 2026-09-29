# Measurement

Describe mathematical observables with `fq.X`, `fq.Y`, and `fq.Z`, then request
named outputs from `fq.plan` or `fq.run`. Pauli products use `@`; Hamiltonian
sums and real coefficients use ordinary arithmetic.

```{code-block} python
import flagquantum as fq

outputs = (
    fq.expectation(fq.Z(0) + fq.Z(1), name="magnetization"),
    fq.expectation(fq.X(0) @ fq.Z(1), name="correlation"),
    fq.samples(wires=(0, 1)),
)
plan = fq.plan(
    circuit,
    outputs=outputs,
    options=fq.ExecutionOptions(shots=1024, seed=7),
)
result = fq.run(plan)

z_sum = result.expectation("magnetization")
xz_value = result.expectation("correlation")
bit_samples = result.require_samples()
```

## Output kinds

The public output factories are `expectation`, `probabilities`, `samples`, and
`counts`:

| Output | Meaning | Shots |
| --- | --- | --- |
| `fq.expectation(...)` | Exact or estimated Pauli expectation value | Not required |
| `fq.probabilities()` | Exact joint marginal over the requested wires | Not required |
| `fq.samples(wires=...)` | Computational-basis samples | Required |
| `fq.counts(wires=...)` | Aggregated bitstring counts | Required |

Sampling and counts accept computational-basis wires or one unweighted Pauli
product, and require a positive shot count. Read results through
`result.expectation()`, `result.expectations`, `result.probabilities`,
`result.samples`, and `result.counts`. Unsupported output kinds and missing shot
counts fail before execution.

`probabilities` reduces the distribution a statevector or density-matrix result
already carries over the complement of the requested wires, and normalizes a
marginal whose total is not one. An MPS or tensor-network result keeps the
parity route instead of materializing a dense state, and the default limit of
eight wires bounds the marginal width; set `max_marginal_wires` explicitly to
request a wider one.

## Local adjoint Hamiltonian gradients

For batch-size-one statevector circuits with real, constant-coefficient Z and ZZ
terms, `Hamiltonian.expectation` exposes a memory-bounded adjoint path:

```{code-block} python
import torch
import flagquantum as fq
from flagquantum import algorithms as fqa

theta = torch.tensor(0.2, dtype=torch.float64, requires_grad=True)
circuit = fq.Circuit(3, dtype=torch.complex128).ry(0, theta).cx(0, 1)
hamiltonian = fqa.Hamiltonian((
    fqa.pauli_term(0.7, "ZZ", (0, 1)),
    fqa.pauli_term(0.2, "Z", (2,)),
))

energy = hamiltonian.expectation(circuit, differentiation="adjoint")
energy.backward()
```

The default remains `differentiation="autograd"`. Adjoint mode rejects X/Y
terms, trainable or complex coefficients, and batched circuits instead of
silently switching to a different algorithm.

## Measurement on hardware

Use `create_pauli_measurement_plan` to measure a Hamiltonian containing X, Y,
and Z terms on shot-based hardware. The plan greedily groups
qubit-wise-commuting terms, appends the required basis rotations, and creates one
sealed deployment package per group:

```{code-block} python
import flagquantum.deployment as fqd

plan = fqd.create_pauli_measurement_plan(
    circuit,
    hamiltonian,
    backend=backend,
    shots=4096,
)

results = tuple(provider.run(package) for package in plan.packages)
energy = plan.expectation(tuple(result.counts for result in results))
```

X measurements append H, Y measurements append RZ(-pi/2) followed by H, and
aggregation validates group count, shot totals, bitstring widths, and real
coefficients before producing an expectation value. Each package records its
group index, term indices, basis, routing evidence, and sealed deployment
identity.

Core IR measurement nodes stay available to runtime implementers for advanced
features such as bounded postselection, but they are intentionally absent from
the root user API.
