---
sd_hide_title: true
---

# Documentation

<div class="flagos-header">
  <h1>FlagOS</h1>
  <p>A unified, open-source system software stack designed for a variety of AI chips</p>
  <a href="overview.html" class="flagos-outline-btn">
    <span>FlagOS Overview</span>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </a>
</div>

<!-- Section 1: Core Libraries -->
:::{dropdown} FlagOS Core Libraries
:open:

<div class="flagos-grid">
  <div class="flagos-card">
    <h3 class="card-title">FlagGems</h3>
    <div class="card-description">
      A high-performance general-purpose operator library implemented with the Triton programming language and its extended languages.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/FlagGems/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">FlagTree</h3>
    <div class="card-description">
      An open-source, unified compiler for multiple AI chips.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/FlagTree/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">FlagScale</h3>
    <div class="card-description">
      A comprehensive toolkit designed to support the entire lifecycle of large models.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/FlagScale/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">FlagCX</h3>
    <div class="card-description">
      A scalable and adaptive unified communication library for cross-chip environments.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/FlagCX/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
</div>

:::

<!-- Section 2: FlagOS Operators -->
:::{dropdown} FlagOS Operator Libraries

<div class="flagos-grid">
  <div class="flagos-card">
    <h3 class="card-title">FlagGems-vllm</h3>
    <div class="card-description">
      A high-performance operator library designed for multiple hardware backends. It provides optimized implementations of common vLLM operators and supports high-performance inference and deployment for a variety of widely used models.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/FlagGems-vllm/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">FlagDNN</h3>
    <div class="card-description">
      A deep neural network computing library oriented towards multiple chip backends. It provides high-performance implementations of common deep learning operators.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/FlagDNN/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">FlagBLAS</h3>
    <div class="card-description">
      A computing library that follows the BLAS standard interface and is oriented towards multiple chip backends. It defines core operations for numerical calculations.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/FlagBLAS/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">FlagFFT</h3>
    <div class="card-description">
      A JIT-compiled GPU FFT library. It generates CUDA kernels at runtime via Triton/TLE and libtriton_jit, targeting arbitrary-length transforms that cuFFT does not optimally support.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/FlagFFT/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">FlagSparse</h3>
    <div class="card-description">
      A domain-specific operator library that contains operators dedicated to sparse computation scenarios.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/FlagSparse/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">FlagTensor</h3>
    <div class="card-description">
      A high-performance tensor-primitive library implemented in Triton language. It provides optimized implementations of common tensor primitives (unary, binary, and tensor contraction operations) benchmarked against cuTensor baselines.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/FlagTensor/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">FlagAudio</h3>
    <div class="card-description">
      A multi-backend computing library that adheres to Audio standard interfaces. It delivers a high-performance computing solution designed for audio signal processing and speech AI applications.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/FlagAudio/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
</div>

:::

<!-- Section 3: Plugin Systems -->
:::{dropdown} FlagOS Ecosystem Enablement Projects

<div class="flagos-grid">
  <div class="flagos-card">
    <h3 class="card-title">vllm-plugin-FL</h3>
    <div class="card-description">
      A plugin for the vLLM inference/serving framework, built on FlagOS's unified multi-chip backend — including the unified operator library FlagGems and the unified communication library FlagCX.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/vllm-plugin-FL/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">Megatron-LM-FL</h3>
    <div class="card-description">
      A fork of Megatron-LM that introduces a plugin-based architecture for supporting diverse AI chips, built on top of FlagOS, a unified open-source AI system software stack.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/Megatron-LM-FL/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">TransformerEngine-FL</h3>
    <div class="card-description">
      A fork of TransformerEngine that introduces a plugin-based architecture for supporting diverse AI chips, built on top of FlagOS, a unified open-source AI system software stack.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/TransformerEngine-FL/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">verl-FL</h3>
    <div class="card-description">
      A fork of verl (Volcano Engine Reinforcement Learning for LLMs) that extends the upstream library with multi-chip/multi-hardware support via the FlagOS ecosystem.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/verl-FL/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">PyTorch-Plugin-FL</h3>
    <div class="card-description">
      A custom PyTorch device plugin based on the PrivateUse1 extension mechanism, registering FlagGems high-performance Triton operators as the flagos device backend for unified multi-chip support.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/PyTorch-Plugin-FL/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">sglang-plugin-FL</h3>
    <div class="card-description">
      An out-of-tree (OOT) plugin for SGLang, built on FlagOS's unified multi-chip backend — including the unified operator library FlagGems and the unified communication library FlagCX. It extends SGLang's inference capabilities across diverse hardware platforms.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/sglang-plugin-FL/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
</div>

:::

<!-- Section 4: FlagOS Domain-Specific Projects -->
:::{dropdown} FlagOS Domain-Specific Projects

<div class="flagos-grid">
  <div class="flagos-card">
    <h3 class="card-title">FlagOS-Robo</h3>
    <div class="card-description">
      An integrated training and inference framework for AI models used in robots, so-called Embodied Intelligence.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/FlagOS-Robo/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">FlagQuantum</h3>
    <div class="card-description">
      A high-performance distributed quantum statevector simulator built on PyTorch, enabling quantum circuit simulation across multiple GPUs with automatic sharding and resharding.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/FlagQuantum/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
</div>

:::

<!-- Section 5: Developer Tools -->
:::{dropdown} FlagOS Developer Tools

<div class="flagos-grid">
  <div class="flagos-card">
    <h3 class="card-title">KernelGen</h3>
    <div class="card-description">
      An operator auto-generation tool.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/kernelgen/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">KernelGenBench</h3>
    <div class="card-description">
      A benchmark framework for evaluating LLM and agent-based Triton kernel generation across multiple hardware platforms.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/kernelgenbench/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">FlagOS Skills</h3>
    <div class="card-description">
      Compatible with Claude Code, Cursor, Codex, and any agent supporting the Agent Skills standard.
    </div>
    <div class="card-footer">
      <a href="https://github.com/flagos-ai/skills" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">Online Laboratory</h3>
    <div class="card-description">
      An online laboratory providing cloud-based development environments.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/onlinelaboratory/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
</div>

:::

<!-- Section 6: FlagOS Platform Services -->
:::{dropdown} FlagOS Platform Services

<div class="flagos-grid">
  <div class="flagos-card">
    <h3 class="card-title">FlagRelease</h3>
    <div class="card-description">
      An automated platform for the cross-chip migration and release of open-source large models
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/FlagRelease/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">FlagPerf</h3>
    <div class="card-description">
      An integrated AI hardware evaluation engine.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/FlagPerf/en/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
  <div class="flagos-card">
    <h3 class="card-title">FlagCICD</h3>
    <div class="card-description">
      A CI/CD toolchain that streamlines large-model development across diverse AI chips, eliminating fragmentation and cutting adaptation costs.
    </div>
    <div class="card-footer">
      <a href="https://docs.flagos.io/projects/FlagCICD/zh-cn/latest/" class="card-link">View Documentation</a>
    </div>
  </div>
</div>

:::

<div class="call-to-action">
  <h2>Start to Use FlagOS</h2>
  <p>Join us to co-build an open AI chip development ecosystem</p>
  <a href="https://flagos.io/">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6V18M18 12L6 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    FlagOS Homepage
  </a>
</div>
