# First Quantum Model

This page trains a small quantum model end to end. It needs only the base installation.

## Build, train, and measure

```{code-block} python
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

`fq.Module` exposes the quantum model to PyTorch, `fq.train` owns the optimizer loop, and `outputs` selects what to measure after training.

## A hybrid classical-quantum model

Quantum layers compose with ordinary PyTorch layers. For a complete workflow, run the repository example:

```{code-block} shell
python examples/quick_start.py --mode sv --steps 40
```

The same model can switch representation without a code change:

```{code-block} shell
python examples/quick_start.py --mode mps --steps 40
python examples/quick_start.py --mode tn --steps 40
```

## Next steps

- [Build and Run](build-and-run.md) explains planning, execution, and measurement in detail.
- [Train with PyTorch](training-with-pytorch.md) covers parameter groups, checkpoints, and precision.
- [Run on Hardware](run-on-hardware.md) takes a trained circuit to a provider or QPU.
