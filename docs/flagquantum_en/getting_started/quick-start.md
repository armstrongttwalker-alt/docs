# Quick start

This page trains a two-qubit model, then shows how to switch the simulation
representation without editing the model.

## Train your first quantum model

Build a two-qubit circuit and learn its rotation angle by minimising the
expectation value of `Z` on wire 0:

```python
import torch
import flagquantum as fq


def circuit(parameters):
    return fq.Circuit(2).ry(0, parameters[0]).cx(0, 1)


model = fq.Module(circuit, n_parameters=1, init=torch.tensor([0.25]))
training = fq.train(
    model,
    optimizer=torch.optim.Adam(model.parameters(), lr=0.05),
    objective=lambda z: z.mean(),
    steps=10,
)

trained_circuit = circuit(next(model.parameters()).detach())
measurement = fq.expectation(fq.Z(0))
result = fq.run(trained_circuit, outputs=measurement)
print(result.expectation())
```

`fq.Module` exposes the quantum model to PyTorch and owns its trainable
parameters; `fq.train` performs `zero_grad`, `backward`, and `step`, and returns
a training result whose `final_loss` and `losses` are stable accessors.

## Inspect a circuit and its plan before running it

```python
import flagquantum as fq

circuit = fq.Circuit(n_qubits=2).h(0).cx(0, 1)
options = fq.ExecutionOptions(mode="auto", precision="complex64")
plan = fq.plan(circuit, options=options)
result = fq.run(plan)

print(plan.identity)
print(plan.summary()["recommended_mode"])
print(result.state)
```

The plan can be serialised and restored. Passing the restored plan to `fq.run`
executes exactly that plan: it is not replanned, and it is not silently replaced
by another backend.

## Run the same model on another representation

`examples/quick_start.py` trains a hybrid classical-quantum model whose exact
solution is known, and switches the simulation representation from the command
line:

```bash
python examples/quick_start.py --mode sv --steps 40
python examples/quick_start.py --mode mps --steps 40
python examples/quick_start.py --mode tn --steps 40
```

Statevector is the recommended first run; the MPS and tensor-network support
boundaries are listed in [Simulation modes](../user_guide/simulation-modes.md).

## Next steps

- [User guide](../user_guide/user-guide.md) — circuits, training, measurement, noise, twins, error correction, deployment, and remote execution.
- [Reference](../reference.md) — the stable API inventory and the executable operator lowering table.
