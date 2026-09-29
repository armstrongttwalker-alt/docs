# Train with PyTorch

Execution and training are deliberately separate. `fq.Module` owns trainable quantum parameters and behaves like an ordinary PyTorch module, and `fq.train` provides a minimal optimizer loop when you do not need a custom one.

## A trainable module

```{code-block} python
import flagquantum as fq
import torch

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

`module(inputs)` and `module.forward(inputs)` always return an autograd-compatible tensor. `module.execute(inputs)` returns `fq.ExecutionResult` when the caller needs provenance, runtime diagnostics, or explicit backend information. `fq.run` accepts a circuit, IR, or plan — not a module — and never updates parameters.

## Named parameter groups

```{code-block} python
def named_circuit(parameters):
    return (fq.Circuit(2)
            .ry(0, parameters["encoder"][0])
            .rx(1, parameters["readout"]))

model = fq.Module(
    named_circuit,
    parameters={"encoder": (4,), "readout": ()},
    init={"encoder": "uniform", "readout": 0.1},
    seed=42,
)
```

`init="uniform"` samples angles from [0, 2π), `init="normal"` samples from a zero-mean normal distribution with standard deviation 0.01, and `seed` uses a module-local generator so PyTorch's global random state is untouched.

## Observables

`RuntimePolicy(observable="z", observable_wires=(0, 1))` keeps one value per requested wire instead of reducing the observable axis; `observable="z_sum"` sums that axis. Vector-valued Z execution is supported by the local PyTorch statevector, MPS, and tensor-network paths. JAX and distributed statevector execution are single-observable and fail closed when fallback is disabled.

## Checkpoints and precision

Module parameters and policy participate in `state_dict()` save and load; the circuit builder stays application code and must be supplied when the module is reconstructed. `Module.save_checkpoint()` and `Module.load_checkpoint()` own resume semantics, and the precision policy travels with them. Checkpointing is not a hidden option of `fq.train`.

## Hybrid models

The repository's quick-start example trains a `torch.nn.Linear` encoder together with an `fq.Module` quantum layer in one optimizer loop and reports correctness against an analytically known target:

```{code-block} shell
python examples/quick_start.py --mode sv --steps 40
```

Training with an optional JAX kernel behind the PyTorch interface is shown in `examples/single_machine_quantum_ai/04_jax_kernel_torch_layer.py`. First-order gradients are supported across that bridge; double backward is not, and raises instead of returning an approximate value.

## Distributed training

Owner-sharded statevector and MPS training are separate experimental entry points under `flagquantum.experimental.distributed`. They are not implied by calling `fq.train`, and they are complete only when forward execution, gradients, optimizer updates, and checkpoint ownership all preserve the declared distribution. See [Distributed Execution](distributed-execution.md).
