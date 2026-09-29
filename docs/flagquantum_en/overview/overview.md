# Overview

FlagQuantum is a distributed, differentiable quantum computing framework built on PyTorch. It turns quantum circuits into trainable models: the same program is trained with ordinary PyTorch optimizers, simulated with different representations, scaled across ranks when a workload needs it, and evaluated on remote compute or quantum hardware. It is part of the FlagOS ecosystem — a unified, open-source AI system software stack that integrates diverse models, systems, and chips.

## Why FlagQuantum?

A quantum program has three separable concerns: the circuit, the measurement request, and the execution target. FlagQuantum keeps them explicit.

- A circuit is built once with `fq.Circuit` and stays representation-neutral in FlagQuantum IR.
- Execution is selected at run time — local statevector, MPS, tensor-network, sharded, or a remote target — without rewriting the model.
- Training keeps PyTorch semantics: `fq.Module` returns autograd tensors, and `fq.train` is an ordinary caller-owned optimizer loop.

The architectural invariant is that backend selection may change execution, but it must not change the meaning of the program or the result contract it returns.

## Entry points

| Goal | Primary interface |
| --- | --- |
| Build a program | `fq.Circuit` |
| Inspect its stable representation | `fq.CircuitIR` |
| Plan before executing | `fq.plan`, `Circuit.runtime_plan` |
| Execute locally | `fq.run` |
| Define a trainable quantum layer | `fq.Module` |
| Train | `fq.train` |
| Measure | `fq.expectation`, `fq.probabilities`, `fq.samples`, `fq.counts` |
| Compile or optimize | `fq.compile`, `flagquantum.compiler.optimize` |
| Package for a target | `flagquantum.deployment.create_deployment_package` |
| Run remotely | `fq.run(target=...)`, `fq.submit`, `fq.restore_job` |

## Capability maturity

Support is specific to each backend and workload. Every capability is graded, and the grade applies only to the scope that was actually verified:

| Level | Meaning |
| --- | --- |
| Release certified | Release-gated with audited, reproducible evidence and no unresolved release blocker. |
| Production supported | Supported path with compatibility, operational guidance, and target-hardware evidence. |
| Development evidence | Executable and tested development result; not a production or general scalability claim. |
| Experimental | Research surface without compatibility or production guarantees. |

A stable public API does not promote an experimental backend, and CPU semantic evidence does not promote a distributed capability. The [Reference](../reference.md) page lists the certified stable names; advertised performance claims require a checked-in audited artifact.

## How it fits into FlagOS

FlagQuantum depends on PyTorch, not on a vendor runtime. Domestic accelators are reached through the FlagOS unified multi-chip layer, which owns physical-device detection, vendor runtimes, and the logical `flagos:0` device; FlagQuantum itself contains no vendor dispatch and records the routing evidence it receives. See [Architecture](architecture.md) for the layer boundaries and [Remote execution](../user_guide/remote-execution.md) for provider paths.

## Where to start

- [Install](../getting_started/install.md) FlagQuantum and train a two-qubit model in the [quick start](../getting_started/quick-start.md).
- Choose a representation in [Simulation modes](../user_guide/simulation-modes.md) without touching the model.
- Check what is verified before relying on a path: [Capabilities](../reference.md) and the upstream validation scope.
