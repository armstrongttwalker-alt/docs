# User Guide

This guide covers how to build and run quantum programs with FlagQuantum: circuit
construction, PyTorch training, simulation representations, measurement, noise,
compilation, deployment, hardware evidence, distributed execution, and remote
targets.

::::{grid} 1 2 2 3
:gutter: 1 1 1 2

:::{grid-item-card} {octicon}`play;1.5em;sd-mr-1` Circuits and execution
:link: circuits
:link-type: doc

Build a program, inspect its plan, and execute it through one result contract.

+++
[Learn more »](circuits.md)
:::

:::{grid-item-card} {octicon}`gear;1.5em;sd-mr-1` Training with PyTorch
:link: training
:link-type: doc

`fq.Module`, named parameter groups, checkpoints, and hybrid models.

+++
[Learn more »](training.md)
:::

:::{grid-item-card} {octicon}`cpu;1.5em;sd-mr-1` Simulation modes
:link: simulation-modes
:link-type: doc

Statevector, MPS, tensor-network, JAX kernels, and sharded execution.

+++
[Learn more »](simulation-modes.md)
:::

:::{grid-item-card} {octicon}`graph;1.5em;sd-mr-1` Measurement
:link: measurement
:link-type: doc

Expectation values, probabilities, samples, counts, and adjoint gradients.

+++
[Learn more »](measurement.md)
:::

:::{grid-item-card} {octicon}`zap;1.5em;sd-mr-1` Noise
:link: noise
:link-type: doc

One backend-neutral noise model across exact and trajectory execution.

+++
[Learn more »](noise.md)
:::

:::{grid-item-card} {octicon}`tools;1.5em;sd-mr-1` Compilation
:link: compilation
:link-type: doc

Canonical optimisation, topology-aware routing, and compiler plugins.

+++
[Learn more »](compilation.md)
:::

:::{grid-item-card} {octicon}`package;1.5em;sd-mr-1` Deployment
:link: deployment
:link-type: doc

Sealed packages, cloud backend profiles, and Pauli measurement plans.

+++
[Learn more »](deployment.md)
:::

:::{grid-item-card} {octicon}`telescope;1.5em;sd-mr-1` Digital twins
:link: digital-twin
:link-type: doc

Calibration-conditioned QPU models and their evidence envelope.

+++
[Learn more »](digital-twin.md)
:::

:::{grid-item-card} {octicon}`shield;1.5em;sd-mr-1` Error correction
:link: error-correction
:link-type: doc

Syndrome extraction, decoding, correction, and logical outcomes.

+++
[Learn more »](error-correction.md)
:::

:::{grid-item-card} {octicon}`stack;1.5em;sd-mr-1` Algorithms
:link: algorithms
:link-type: doc

Demonstration-scale algorithm units and their advantage premises.

+++
[Learn more »](algorithms.md)
:::

:::{grid-item-card} {octicon}`server;1.5em;sd-mr-1` Distributed execution
:link: distributed-execution
:link-type: doc

Sharded statevector and rank-owned MPS workloads.

+++
[Learn more »](distributed-execution.md)
:::

:::{grid-item-card} {octicon}`git-branch;1.5em;sd-mr-1` Dynamic circuits
:link: dynamic-circuits
:link-type: doc

Mid-circuit measurement, conditional operations, and backend assessment.

+++
[Learn more »](dynamic-circuits.md)
:::

:::{grid-item-card} {octicon}`plug;1.5em;sd-mr-1` Interoperability
:link: interoperability
:link-type: doc

Ecosystem adapters, execution bridges, and the extension SDK.

+++
[Learn more »](interoperability.md)
:::

:::{grid-item-card} {octicon}`cloud;1.5em;sd-mr-1` Remote execution
:link: remote-execution
:link-type: doc

Compile, submit, and restore remote compute and QPU jobs.

+++
[Learn more »](remote-execution.md)
:::

:::{grid-item-card} {octicon}`file-code;1.5em;sd-mr-1` Examples and tutorials
:link: examples
:link-type: doc

Tutorial notebooks, local workflows, and distributed run scripts.

+++
[Learn more »](examples.md)
:::

:::{grid-item-card} {octicon}`checklist;1.5em;sd-mr-1` Run tests
:link: run-tests
:link-type: doc

Correctness tiers, device lanes, and the release boundary.

+++
[Learn more »](run-tests.md)
:::

::::
