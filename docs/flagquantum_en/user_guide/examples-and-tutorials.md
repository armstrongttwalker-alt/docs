# Examples and Tutorials

## Tutorials

Ten notebooks in `examples/tutorials` teach the concepts behind the runnable examples and are meant to be read in order, though each stands alone:

| # | Notebook | Learning goal |
| --- | --- | --- |
| 00 | `00_understanding_states.ipynb` | State tensors, amplitudes, probabilities, and qubit order |
| 01 | `01_basic_operations.ipynb` | Single-qubit and two-qubit operations |
| 02 | `02_measurement.ipynb` | Measurement and expectation values |
| 03 | `03_parameterized_gates.ipynb` | Trainable gates and gradients |
| 04 | `04_quantum_circuit_builder.ipynb` | Build and inspect reusable circuits |
| 05 | `05_quantum_machine_learning.ipynb` | Train a small QML model end to end |
| 06 | `06_vqe_statevector.ipynb` | Train a small VQE model with local statevector simulation |
| 07 | `07_runtime_selection_statevector_mps_tn.ipynb` | Compare statevector, MPS, and tensor-network summaries |
| 08 | `08_pytorch_jax_qml_layer.ipynb` | Train an `fq.Module` backed by a JAX quantum kernel |
| 09 | `09_gradient_precision_speed_benchmark.ipynb` | Compare gradient precision and value-plus-gradient speed across runtimes |

Tutorial 08 needs the optional JAX dependency. Stored notebook outputs are intentionally empty so a reader always runs the current code.

## Script examples

| Goal | Example |
| --- | --- |
| Learn circuits, measurements, and gradients | `examples/tutorials` |
| Run one algorithm unit end to end | `examples/algorithms` |
| Verify the local CPU or one-GPU path | `examples/single_machine_quantum_ai` |
| Train a local statevector VQE | `examples/single_machine_quantum_ai/01_vqe_statevector.py` |
| Train with MPS, up to structured thousand-qubit systems | `examples/single_machine_quantum_ai/03_mps_training.py`, `05_mps_1000q_dimer_training.py` |
| Use a JAX kernel through PyTorch | `examples/single_machine_quantum_ai/04_jax_kernel_torch_layer.py` |
| Inspect sharded statevector ownership | `examples/distributed_statevector_topologies` |
| Inspect rank-owned MPS execution | `examples/distributed_mps` |
| Train and package a circuit | `examples/train_parameterized_circuit_then_deploy.py` |
| Build an extension | `examples/extensions/reference_extensions.py` |
| Run on a provider | `examples/remote/quafu_bell.py`, `examples/remote/jiuding_workspace_bell.py` |

## Suggested smoke runs

```{code-block} shell
python -m examples.local.simulate
python -m examples.local.measure
python -m examples.local.train
python -m examples.cpu_statevector
python -m examples.quick_start --mode sv --steps 40
```

These commands need neither credentials nor optional backends. The curated single-machine examples do not initialise distributed backends and make no distributed scalability claim.
