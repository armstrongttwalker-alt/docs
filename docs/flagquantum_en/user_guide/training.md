# Training with PyTorch

Execution and training are intentionally separate. `fq.Module` owns the
trainable quantum parameters, circuit builder, observable selection, runtime
policy, and precision, while `fq.train` is a minimal optimizer loop you can
replace with your own.

## A trainable quantum layer

```{code-block} python
import torch
import flagquantum as fq


def build_circuit(parameters, inputs=None):
    return (
        fq.Circuit(n_qubits=2)
        .ry(0, theta=parameters[0])
        .cx(0, 1)
        .ry(1, theta=parameters[1])
    )


module = fq.Module(
    build_circuit,
    n_parameters=2,
    policy=fq.RuntimePolicy(observable_wires=(1,)),
)
optimizer = torch.optim.Adam(module.parameters(), lr=0.01)

training = fq.train(
    module,
    optimizer=optimizer,
    objective=lambda value: value.mean(),
    steps=100,
)
print(training.final_loss)
```

`module(inputs)` and `module.forward(inputs)` always return an autograd tensor
and use a tensor-only local training path. Use `module.execute(inputs)` when you
need an `ExecutionResult` with provenance, runtime diagnostics, or explicit
backend compatibility information. `fq.run` accepts a circuit, IR, or plan —
never a module — and never updates parameters.

## Parameter groups

Flat, named, and symbolic parameters are supported:

```{code-block} python
def named_circuit(parameters):
    return (
        fq.Circuit(2)
        .ry(0, parameters["encoder"][0])
        .rx(1, parameters["readout"])
    )


model = fq.Module(
    named_circuit,
    parameters={"encoder": (4,), "readout": ()},
    init={"encoder": "uniform", "readout": 0.1},
    seed=42,
)
```

`init="uniform"` samples angles from `[0, 2*pi)`, `init="normal"` samples a
zero-mean normal distribution with standard deviation 0.01, and `seed` uses a
module-local generator without resetting PyTorch's global random state. A
symbolic circuit can be used directly: its `fq.Parameter` names are inferred,
registered as scalar parameters, and bound automatically on execution.

## Observables and result shape

`RuntimePolicy(observable="z", observable_wires=(0, 1))` keeps the observable
axis instead of reducing it, so the leading dimension is the circuit batch
dimension and unbatched circuits return `(1, observable_count)`. Use
`observable="z_sum"` when the observable axis should be summed. Vector-valued Z
execution is available on the local statevector, MPS, and tensor-network fast
paths; JAX and distributed statevector execution remain single-observable and
fail closed when fallback is disabled.

## Checkpoints, precision, and hybrid models

`Module.parameters()` and the runtime policy participate in `state_dict()`
save/load, with checkpoint and restore handled by
`Module.save_checkpoint()` / `Module.load_checkpoint()`. Checkpoint/resume
deliberately stays on the module rather than becoming a hidden option of
`fq.train`.

`fq.Module` owns one end-to-end precision choice through `PrecisionPolicy`:
circuit builders that omit `dtype` inherit it, and an explicit
`ExecutionOptions.precision` or circuit dtype that disagrees fails before
execution instead of silently casting.

A hybrid model is ordinary PyTorch: place a classical `nn.Linear` encoder
before the quantum layer and train both sides from one `loss.backward()` call.
The repository's `examples/quick_start.py` trains exactly that model with an
analytical target, so it reports correctness as well as loss.

## Distributed training

Under an initialized multi-rank process group, the same statevector module and
result surface use the native sharded statevector runtime; distribution topology
comes from the execution environment rather than a second mode vocabulary.
Owner-sharded statevector and MPS training have separate experimental entry
points under `flagquantum.experimental.distributed` and are not implied by
calling `fq.train`. See [Distributed Execution](distributed-execution.md).
