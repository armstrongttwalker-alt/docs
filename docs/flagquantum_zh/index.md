# FlagQuantum 文档

```{button-ref} getting_started/getting-started
:ref-type: myst
:color: primary
:class: sd-btn-lg sd-px-4 sd-py-2 sd-fw-bold

快速入门
```

::::{grid} 1 2 2 3
:gutter: 1 1 1 2

::{grid-item-card} {octicon}`browser;1.5em;sd-mr-1` 概览
:link: overview/overview
:link-type: doc

FlagQuantum 是什么、如何组织，以及能力等级如何划分。

+++
[了解更多 »](overview/overview.md)
:::

::{grid-item-card} {octicon}`book;1.5em;sd-mr-1` 快速入门
:link: getting_started/getting-started
:link-type: doc

环境要求、安装步骤，以及第一个可训练的量子模型。

+++
[了解更多 »](getting_started/getting-started.md)
:::

::{grid-item-card} {octicon}`broadcast;1.5em;sd-mr-1` 用户指南
:link: user_guide/user-guide
:link-type: doc

线路、规划、训练、模拟表示、噪声、硬件目标、数字孪生与纠错。

+++
[了解更多 »](user_guide/user-guide.md)
:::

::{grid-item-card} {octicon}`bookmark;1.5em;sd-mr-1` 参考资料
:link: reference/reference
:link-type: doc

稳定 API 清单、能力目录、扩展 SDK 与当前支持边界。

+++
[了解更多 »](reference/reference.md)
:::

::::

---

```{toctree}
:caption: 📑 发布说明
:maxdepth: 2
:hidden:

release_notes/release-notes.md
```

```{toctree}
:caption: 📚 概览
:maxdepth: 2
:hidden:

overview/overview.md
overview/features.md
overview/architecture.md
```

```{toctree}
:caption: 📚 快速入门
:maxdepth: 2
:hidden:

getting_started/getting-started.md
getting_started/requirements.md
getting_started/install.md
getting_started/quick-start.md
```

```{toctree}
:caption: 📚 用户指南
:maxdepth: 2
:hidden:

user_guide/user-guide.md
user_guide/first-quantum-model.md
user_guide/build-and-run.md
user_guide/runtime-planning.md
user_guide/local-workflows.md
user_guide/choose-a-simulator.md
user_guide/training-with-pytorch.md
user_guide/custom-operations.md
user_guide/compile-and-target.md
user_guide/compiler-and-remote.md
user_guide/noisy-simulation.md
user_guide/digital-twin-and-qec.md
user_guide/qpu-digital-twin.md
user_guide/qec.md
user_guide/run-on-hardware.md
user_guide/distributed-execution.md
user_guide/dynamic-circuits.md
user_guide/algorithms.md
user_guide/examples-and-tutorials.md
user_guide/run-tests.md
```

```{toctree}
:caption: 📖 参考资料
:maxdepth: 2
:hidden:

reference/reference.md
reference/api.md
reference/capabilities.md
reference/extensions.md
```
