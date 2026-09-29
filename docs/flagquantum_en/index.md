# FlagQuantum Documentation

```{button-ref} getting_started/getting-started
:ref-type: myst
:color: primary
:class: sd-btn-lg sd-px-4 sd-py-2 sd-fw-bold

Getting Started
```

::::{grid} 1 2 2 3
:gutter: 1 1 1 2

:::{grid-item-card} {octicon}`browser;1.5em;sd-mr-1` Overview
:link: FlagQuantum_overview/FlagQuantum-overview
:link-type: doc

What FlagQuantum is, the representations it can run, and the evidence behind each support level.

+++
[Learn more »](FlagQuantum_overview/FlagQuantum-overview.md)
:::

:::{grid-item-card} {octicon}`book;1.5em;sd-mr-1` Getting Started
:link: getting_started/getting-started
:link-type: doc

Requirements and step-by-step installation for a local CPU or GPU environment.

+++
[Learn more »](getting_started/getting-started.md)
:::

:::{grid-item-card} {octicon}`broadcast;1.5em;sd-mr-1` User Guide
:link: user_guide/user-guide
:link-type: doc

Build and run circuits, train with PyTorch, choose a simulator, scale across ranks, and deploy.

+++
[Learn more »](user_guide/user-guide.md)
:::

:::{grid-item-card} {octicon}`bookmark;1.5em;sd-mr-1` Reference
:link: reference/api
:link-type: doc

Stable Python API, operator and lowering coverage, and current capability boundaries.

+++
[Learn more »](reference/api.md)
:::

::::

---

```{toctree}
:caption: 📑 Release Notes
:maxdepth: 2
:hidden:

release_notes/release-notes.md
```

```{toctree}
:caption: 📚 Overview
:maxdepth: 2
:hidden:

FlagQuantum_overview/FlagQuantum-overview.md
FlagQuantum_overview/features.md
FlagQuantum_overview/architecture.md
```

```{toctree}
:caption: 📚 Getting Started
:maxdepth: 2
:hidden:

getting_started/getting-started.md
getting_started/requirements.md
getting_started/install.md
```

```{toctree}
:caption: 📚 User Guide
:maxdepth: 2
:hidden:

user_guide/user-guide.md
user_guide/basic-usage.md
user_guide/training.md
user_guide/measurement.md
user_guide/simulation-modes.md
user_guide/distributed-execution.md
user_guide/noisy-simulation.md
user_guide/compilation.md
user_guide/deployment.md
user_guide/algorithms.md
user_guide/interoperability.md
user_guide/extensions.md
user_guide/examples.md
user_guide/run-tests.md
```

```{toctree}
:caption: 📖 Reference
:maxdepth: 2
:hidden:

reference/api.md
reference/operator-capabilities.md
reference/capabilities.md
```
