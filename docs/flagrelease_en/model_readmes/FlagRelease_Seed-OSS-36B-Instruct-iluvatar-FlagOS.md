# Introduction
Seed-OSS 是由字节跳动种子团队开发的一系列开源大型语言模型，旨在提供强大的长上下文、推理、代理和通用能力，以及多样的开发者友好特性。尽管仅使用了 12T tokens 进行训练>，Seed-OSS 在多个流行的开源基准测试中表现出色。
我们将这一系列模型以 Apache-2.0 许可证的形式发布给开源社区。
NOTE
Seed-OSS 主要针对国际（i18n）用例进行了优化。
关键特性
    灵活控制思考预算：允许用户根据需要灵活调整推理长度。这种动态控制推理长度的能力在实际应用场景中提高了推理效率。
    增强的推理能力：专门针对推理任务进行了优化，同时保持了平衡且出色的通用能力。
    代理智能：在工具使用和问题解决等代理任务中表现卓越。
    研究友好：考虑到预训练中包含合成指令数据可能会影响后续的研究，我们发布了带有和不带指令数据的预训练模型，为研究界提供了更多样化的选择。
    原生长上下文：使用长达 512K 的长上下文进行训练。

### Integrated Deployment
- Out-of-the-box inference scripts with pre-configured hardware and software parameters	
- Released **FlagOS-Iluvatar** container image supporting deployment within minutes
### Consistency Validation
- Rigorously evaluated through benchmark testing: Performance and results from the FlagOS software stack are compared against native stacks on multiple public.	


# Evaluation Results
## Benchmark Result
| Metrics             | Seed-OSS-36B-Instruct-Nvidia-Origin | Seed-OSS-36B-Instruct-Nvidia-FlagOS |
|---------------------|-------------------------------------|-------------------------------------|
| gpqa_generative_cot |  0.6099                             |  0.6133                             |
| aime                |  0.6667                             |  0.7333                             |
| musr_generative     |  0.4153                             |  0.4127                             |
| livebench_new       |  0.5103                             |  0.517                              |
| mmlu_pro            |  0.4875                             |  0.4878                             |
# User Guide
Environment Setup

| Item             | Version              |
|------------------|----------------------|
| Docker Version   | Docker version 20.10.25, build 20.10.25-0ubuntu1~20.04.1 |
| Operating System | Ubuntu 20.04.6 LTS |

## Operation Steps

### Download FlagOS Image
```bash
docker pull harbor.baai.ac.cn/external-cooperation/seed-oss-36b-instruct-iluvatar-tree_0.5.1-gems_0.5.2-vllm_0.13.0-plugin_0.1.1-python_3.12.3-torch_2.7.1-pcp_corex-4.4.0-gpu_biv150-driver_4.4.0:2606231643
```

### Download Open-source Model Weights
```bash
pip install modelscope
modelscope download --model FlagRelease/Seed-OSS-36B-Instruct --local_dir /data/Seed-OSS-36B-Instruct
```

### Start the Container
```bash
docker run --name flagos -itd \
  --shm-size="32g" \
  -v /usr/src:/usr/src \
  -v /xxxxxx/Seed-OSS-36B-Instruct:/data/models/Seed-OSS-36B-Instruct \
  -v /dev:/dev \
  --privileged \
  --cap-add=ALL \
  --pid=host \
  --net=host \
  -w /workspace \
  harbor.baai.ac.cn/external-cooperation/seed-oss-36b-instruct-iluvatar-tree_0.5.1-gems_0.5.2-vllm_0.13.0-plugin_0.1.1-python_3.12.3-torch_2.7.1-pcp_corex-4.4.0-gpu_biv150-driver_4.4.0:2606231643 sleep infinity
docker exec -it flagos /bin/bash
```
### Start the Server
```bash
export VLLM_PLUGINS=fl
export TRITON_ALL_BLOCKS_PARALLEL=1
export VLLM_FL_FLAGOS_BLACKLIST="sort,masked_fill_,mm,mul,addmm"
export USE_FLAGGEMS=0
nohup vllm serve --model /mnt/data/vllm-plugin-fl/Seed-OSS-36B-Instruct/ --served-model-name seed-oos --port 80000 --tensor-parallel-size 2 --trust-remote-code --max-
model-len 30000  >vllm.log 2>&1 &
```

## Service Invocation
### Invocation Script
```bash
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "flagOS",
    "messages": [{"role": "user", "content": "你好"}]
  }'
```


### AnythingLLM Integration Guide

#### 1. Download & Install

- Visit the official site: https://anythingllm.com/
- Choose the appropriate version for your OS (Windows/macOS/Linux)
- Follow the installation wizard to complete the setup

#### 2. Configuration

- Launch AnythingLLM
- Open settings (bottom left, fourth tab)
- Configure core LLM parameters
- Click "Save Settings" to apply changes

#### 3. Model Interaction

- After model loading is complete:
- Click **"New Conversation"**
- Enter your question (e.g., “Explain the basics of quantum computing”)
- Click the send button to get a response
# Technical Overview
**FlagOS** is a fully open-source system software stack designed to unify the "model–system–chip" layers and foster an open, collaborative ecosystem. It enables a “develop once, run anywhere” workflow across diverse AI accelerators, unlocking hardware performance, eliminating fragmentation among vendor-specific software stacks, and substantially lowering the cost of porting and maintaining AI workloads. With core technologies such as the **FlagScale**, together with vllm-plugin-fl, distributed training/inference framework, **FlagGems** universal operator library, **FlagCX** communication library, and **FlagTree** unified compiler, the **FlagRelease** platform leverages the **FlagOS** stack to automatically produce and release various combinations of \<chip + open-source model\>. This enables efficient and automated model migration across diverse chips, opening a new chapter for large model deployment and application.
## FlagGems
FlagGems is a high-performance, generic operator libraryimplemented in [Triton](https://github.com/openai/triton) language. It is built on a collection of backend-neutralkernels that aims to accelerate LLM (Large-Language Models) training and inference across diverse hardware platforms.
## FlagTree
FlagTree is an open source, unified compiler for multipleAI chips project dedicated to developing a diverse ecosystem of AI chip compilers and related tooling platforms, thereby fostering and strengthening the upstream and downstream Triton ecosystem. Currently in its initial phase, the project aims to maintain compatibility with existing adaptation solutions while unifying the codebase to rapidly implement single-repository multi-backend support. Forupstream model users, it provides unified compilation capabilities across multiple backends; for downstream chip manufacturers, it offers examples of Triton ecosystem integration.
## FlagScale and vllm-plugin-fl
Flagscale is a comprehensive toolkit designed to supportthe entire lifecycle of large models. It builds on the strengths of several prominent open-source projects, including [Megatron-LM](https://github.com/NVIDIA/Megatron-LM) and [vLLM](https://github.com/vllm-project/vllm), to provide a robust, end-to-end solution for managing and scaling large models.
vllm-plugin-fl is a vLLM plugin built on the FlagOS unified multi-chip backend, to help flagscale support multi-chip on vllm framework.
## **FlagCX**
FlagCX is a scalable and adaptive cross-chip communication library. It serves as a platform where developers, researchers, and AI engineers can collaborate on various projects, contribute to the development of cutting-edge AI solutions, and share their work with the global community.

## **FlagEval Evaluation Framework**
 FlagEval is a comprehensive evaluation system and open platform for large models launched in 2023. It aims to establish scientific, fair, and open benchmarks, methodologies, and tools to help researchers assess model and training algorithm performance. It features:
 - **Multi-dimensional Evaluation**: Supports 800+ modelevaluations across NLP, CV, Audio, and Multimodal fields,covering 20+ downstream tasks including language understanding and image-text generation.
 - **Industry-Grade Use Cases**: Has completed horizonta1 evaluations of mainstream large models, providing authoritative benchmarks for chip-model performance validation.

# Contributing

We warmly welcome global developers to join us:

1. Submit Issues to report problems
2. Create Pull Requests to contribute code
3. Improve technical documentation
4. Expand hardware adaptation support
# License
The model weights are derived from ByteDance-Seed/Seed-OSS-36B-Instruct and are open‑sourced under the Apache License 2.0: https://www.apache.org/licenses/LICENSE-2.0.txt
