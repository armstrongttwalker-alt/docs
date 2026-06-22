---
sd_hide_title: true
---

# Documentation

:::{div} flagos-header
:align: center

# FlagOS

A unified, open-source system software stack designed for a variety of AI chips

[FlagOS Overview](overview.md){ .flagos-outline-btn }
:::

---

## FlagOS Core Libraries

````{grid} 1 1 1 1
:gutter: 3
:class: flagos-grid-sd

```{grid-item-card} Operator Libraries
:class: flagos-card-sd

High-performance operator libraries optimized for diverse hardware backends, supporting general-purpose, fused, and domain-specific computation scenarios.

+++
::::{tab-set}

:::{tab-item} General-Purpose Operator Library
:sync: general

**FlagGems**

Triton-based general-purpose operator library.

[View Documentation →](https://docs.flagos.io/projects/FlagGems/en/latest/)
:::

:::{tab-item} Fused Operator Libraries
:sync: fused

**FlagGems-vllm**

Optimized vLLM operators for multiple backends.

[View Documentation →](https://docs.flagos.io/projects/FlagGems-vllm/en/latest/)
:::

:::{tab-item} Multi-Domain Operator Libraries
:sync: multidomain

**FlagDNN** - Deep learning operators. [View Documentation →](https://docs.flagos.io/projects/FlagDNN/en/latest/)

**FlagBLAS** - BLAS numerical library. [View Documentation →](https://docs.flagos.io/projects/FlagBLAS/en/latest/)

**FlagFFT** - GPU FFT library. [View Documentation →](https://docs.flagos.io/projects/FlagFFT/en/latest/)

**FlagSparse** - Sparse computation. [View Documentation →](https://docs.flagos.io/projects/FlagSparse/en/latest/)

**FlagTensor** - Tensor primitives. [View Documentation →](https://docs.flagos.io/projects/FlagTensor/en/latest/)

**FlagAudio** - Audio processing. [View Documentation →](https://docs.flagos.io/projects/FlagAudio/en/latest/)
:::
::::
```
````

````{grid} 1 1 3 3
:gutter: 3
:class: flagos-grid-sd

```{grid-item-card} Compiler
:class: flagos-card-sd

+++
**FlagTree**

An open-source, unified compiler for multiple AI chips, advancing and expanding the Triton ecosystem across diverse hardware platforms.

[View Documentation →](https://docs.flagos.io/projects/FlagTree/en/latest/){ .card-link-sd }
```

```{grid-item-card} Training & Inference Framework
:class: flagos-card-sd

+++
**FlagScale**

A comprehensive toolkit designed to support the entire lifecycle of large models, from training to inference and deployment.

[View Documentation →](https://docs.flagos.io/projects/FlagScale/en/latest/){ .card-link-sd }
```

```{grid-item-card} Communication Library
:class: flagos-card-sd

+++
**FlagCX**

A scalable and adaptive unified communication library for cross-chip environments, delivering high-performance collective communication capabilities.

[View Documentation →](https://docs.flagos.io/projects/FlagCX/en/latest/){ .card-link-sd }
```
````

---

## FlagOS Plugins for Diverse Chips

````{grid} 1 1 3 3
:gutter: 3
:class: flagos-grid-sd

```{grid-item-card} vllm-plugin-FL
:class: flagos-card-sd
:link: https://docs.flagos.io/projects/vllm-plugin-FL/en/latest/

A plugin for the vLLM inference/serving framework, built on FlagOS's unified multi-chip backend — including the unified operator library FlagGems and the unified communication library FlagCX.

+++
[View Documentation →](https://docs.flagos.io/projects/vllm-plugin-FL/en/latest/){ .card-link-sd }
```

```{grid-item-card} Megatron-LM-FL
:class: flagos-card-sd
:link: https://docs.flagos.io/projects/Megatron-LM-FL/en/latest/

A fork of Megatron-LM that introduces a plugin-based architecture for supporting diverse AI chips, built on top of FlagOS.

+++
[View Documentation →](https://docs.flagos.io/projects/Megatron-LM-FL/en/latest/){ .card-link-sd }
```

```{grid-item-card} TransformerEngine-FL
:class: flagos-card-sd
:link: https://docs.flagos.io/projects/TransformerEngine-FL/en/latest/

A fork of TransformerEngine that introduces a plugin-based architecture for supporting diverse AI chips, built on top of FlagOS.

+++
[View Documentation →](https://docs.flagos.io/projects/TransformerEngine-FL/en/latest/){ .card-link-sd }
```

```{grid-item-card} verl-FL
:class: flagos-card-sd
:link: https://docs.flagos.io/projects/verl-FL/en/latest/

A fork of veRL (Volcano Engine Reinforcement Learning for LLMs) that extends the upstream library with multi-chip/multi-hardware support via the FlagOS ecosystem.

+++
[View Documentation →](https://docs.flagos.io/projects/verl-FL/en/latest/){ .card-link-sd }
```

```{grid-item-card} PyTorch-Plugin-FL
:class: flagos-card-sd
:link: https://docs.flagos.io/projects/PyTorch-Plugin-FL/en/latest/

A custom PyTorch device plugin based on the PrivateUse1 extension mechanism, registering FlagGems high-performance Triton operators as the flagos device backend.

+++
[View Documentation →](https://docs.flagos.io/projects/PyTorch-Plugin-FL/en/latest/){ .card-link-sd }
```

```{grid-item-card} sglang-plugin-FL
:class: flagos-card-sd
:link: https://docs.flagos.io/projects/sglang-plugin-FL/en/latest/

An out-of-tree (OOT) plugin for SGLang, built on FlagOS's unified multi-chip backend, extending SGLang's inference capabilities across diverse hardware platforms.

+++
[View Documentation →](https://docs.flagos.io/projects/sglang-plugin-FL/en/latest/){ .card-link-sd }
```
````

---

## FlagOS Domain-Specific Projects

````{grid} 1 1 3 3
:gutter: 3
:class: flagos-grid-sd

```{grid-item-card} FlagOS-Robo
:class: flagos-card-sd
:link: https://docs.flagos.io/projects/FlagOS-Robo/en/latest/

An integrated training and inference framework for AI models used in robots, so-called Embodied Intelligence.

+++
[View Documentation →](https://docs.flagos.io/projects/FlagOS-Robo/en/latest/){ .card-link-sd }
```

```{grid-item-card} FlagQuantum
:class: flagos-card-sd
:link: https://docs.flagos.io/projects/FlagQuantum/en/latest/

A high-performance distributed quantum statevector simulator built on PyTorch, enabling quantum circuit simulation across multiple GPUs.

+++
[View Documentation →](https://docs.flagos.io/projects/FlagQuantum/en/latest/){ .card-link-sd }
```
````

---

## FlagOS Developer Tools

````{grid} 1 1 3 3
:gutter: 3
:class: flagos-grid-sd

```{grid-item-card} KernelGen
:class: flagos-card-sd
:link: https://docs.flagos.io/projects/kernelgen/en/latest/

An operator auto-generation tool.

+++
[View Documentation →](https://docs.flagos.io/projects/kernelgen/en/latest/){ .card-link-sd }
```

```{grid-item-card} KernelGenBench
:class: flagos-card-sd
:link: https://docs.flagos.io/projects/kernelgenbench/en/latest/

A benchmark framework for evaluating LLM and agent-based Triton kernel generation across multiple hardware platforms.

+++
[View Documentation →](https://docs.flagos.io/projects/kernelgenbench/en/latest/){ .card-link-sd }
```

```{grid-item-card} FlagOS Skills
:class: flagos-card-sd
:link: https://github.com/flagos-ai/skills

Compatible with Claude Code, Cursor, Codex, and any agent supporting the Agent Skills standard.

+++
[View Documentation →](https://github.com/flagos-ai/skills){ .card-link-sd }
```

```{grid-item-card} Online Laboratory
:class: flagos-card-sd
:link: https://docs.flagos.io/projects/onlinelaboratory/en/latest/

An online laboratory providing cloud-based development environments.

+++
[View Documentation →](https://docs.flagos.io/projects/onlinelaboratory/en/latest/){ .card-link-sd }
```
````

---

## FlagOS Platform Services

````{grid} 1 1 3 3
:gutter: 3
:class: flagos-grid-sd

```{grid-item-card} FlagRelease
:class: flagos-card-sd
:link: https://docs.flagos.io/projects/FlagRelease/en/latest/

An automated platform for the cross-chip migration and release of open-source large models.

+++
[View Documentation →](https://docs.flagos.io/projects/FlagRelease/en/latest/){ .card-link-sd }
```

```{grid-item-card} FlagPerf
:class: flagos-card-sd
:link: https://docs.flagos.io/projects/FlagPerf/en/latest/

An integrated AI hardware evaluation engine.

+++
[View Documentation →](https://docs.flagos.io/projects/FlagPerf/en/latest/){ .card-link-sd }
```

```{grid-item-card} FlagCICD
:class: flagos-card-sd
:link: https://docs.flagos.io/projects/FlagCICD/zh-cn/latest/

A CI/CD toolchain that streamlines large-model development across diverse AI chips.

+++
[View Documentation →](https://docs.flagos.io/projects/FlagCICD/zh-cn/latest/){ .card-link-sd }
```
````

---

:::{div} call-to-action
:align: center

## Start to Use FlagOS

Join us to co-build an open AI chip development ecosystem

[FlagOS Homepage](https://flagos.io/){ .btn .btn-primary .btn-lg }
:::