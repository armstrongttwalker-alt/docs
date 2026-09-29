# Examples and Tutorials

## Learning path

Tutorials teach the concepts behind the runnable examples and should be read in
order, though each notebook stands alone.

| Order | Notebook | Learning goal |
| --- | --- | --- |
| 00 | Understanding states | State tensors, amplitudes, probabilities, and qubit order |
| 01 | Basic operations | Single-qubit and two-qubit operations |
| 02 | Measurement | Measuring states and interpreting expectation values |
| 03 | Parameterized gates | Trainable gates and gradients |
| 04 | Quantum circuit builder | Building and inspecting reusable circuits |
| 05 | Quantum machine learning | Training a small QML model end to end |
| 06 | VQE statevector | Training a small VQE model with local statevector simulation |
| 07 | Runtime selection | Comparing statevector, MPS, and tensor-network summaries |
| 08 | PyTorch and JAX layer | Training an `fq.Module` backed by a JAX quantum kernel |
| 09 | Gradient precision and speed | Comparing gradient precision and value+gradient speed across runtimes |

Run notebooks in a fresh kernel and keep stored outputs empty; the JAX tutorial
requires the optional `jax` extra. Support boundaries belong in
[Capabilities](../reference/capabilities.md).

## Recommended entry points

| Goal | Recommended entry |
| --- | --- |
| Learn circuits, measurements, gradients, and QML | Tutorial notebooks |
| Verify the local CPU or one-GPU path | `single_machine_quantum_ai/00_local_fast_path_check.py` |
| Train a local statevector VQE | `single_machine_quantum_ai/01_vqe_statevector.py` |
| Train with MPS | `single_machine_quantum_ai/03_mps_training.py` |
| Use a JAX kernel through PyTorch | `single_machine_quantum_ai/04_jax_kernel_torch_layer.py` |
| Inspect sharded statevector ownership | `distributed_statevector_topologies/` |
| Inspect rank-owned MPS execution | `distributed_mps/variable_bond_capacity_8gpu.py` |
| Train and package a circuit | `train_parameterized_circuit_then_deploy.py` |
| Build an extension | `extensions/reference_extensions.py` |

```{code-block} shell
python -m examples.local.simulate
python -m examples.local.measure
python -m examples.local.train
python -m examples.cpu_statevector
python examples/quick_start.py --mode sv --steps 40
python examples/quick_start.py --mode mps --steps 40
```

The curated single-machine examples initialise no distributed backend and make
no distributed scalability claim. The 1000-qubit dimer example is a
structure-aware MPS benchmark, not a claim about arbitrary 1000-qubit circuits.

## Remote examples

```{code-block} shell
python examples/remote/quafu_bell.py
python examples/remote/jiuding_workspace_bell.py
```

The Quafu path compiles and validates a circuit before submitting it to
hardware; the Jiuding path reuses a running workspace for low-latency remote
compute. Both require provider credentials and configured remote resources, and
a single visible Jiuding workspace is selected automatically.

## Plan before executing

```{code-block} python
import flagquantum as fq

circuit = fq.Circuit(n_qubits=4).h(0).cx(0, 1).rzz(1, 2, theta=0.2)
plan = circuit.runtime_plan(prefer_jax=True, require_gradients=True)
print(plan.summary())
```

A plan explains intended execution; it is not benchmark evidence. Performance
and scalability statements must use runtime-generated records and report their
`distribution_semantics`.
