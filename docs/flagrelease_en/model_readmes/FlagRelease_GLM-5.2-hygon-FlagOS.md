---
license: apache-2.0
language:
- zh
- en
---

# Introduction
Zhipu officially released its next-generation open-source flagship model **GLM-5.2**, the latest flagship targeting **Long Horizon Tasks**. Compared to its predecessor GLM-5.1, it achieves a significant leap in long-horizon task capabilities and is open-sourced under the **MIT License**. The **FlagOS Zhongzhi Community** completed multi-chip adaptation and inference deployment at the first opportunity, currently covering four chips:
**Moore Threads S5000, T-Head 810E, Metax C550 and Hygon DCU BW1000**.

Developers can rapidly deploy via the FlagOS unified, open-source software stack; model files and deployment guides are simultaneously available on **ModelScope** and **HuggingFace**. GLM-5.2 is a model featuring a stable and usable **1M context window**, purpose-built for Long Horizon Tasks. Its core capabilities include:

- **Solid 1M context**: Stably supports a 1,000,000-token context window for long-horizon workloads
- **Flexible advanced coding**: Enhanced coding capabilities with support for multiple inference effort levels to balance performance and latency
- **Improved architecture**: Introduces **IndexShare**, which reuses the same indexer across every four sparse attention layers, reducing per-token FLOPs by 2.9× at 1M context length; improves the MTP layer to support speculative decoding, increasing acceptance length by up to **20%**
- **Fully open-source**: MIT license, with no geographic restrictions

### Integrated Deployment
- Out-of-the-box inference scripts with pre-configured hardware and software parameters	
- Released **FlagOS-Hygon** container image supporting deployment within minutes
### Consistency Validation
- Rigorously evaluated through benchmark testing: Performance and results from the FlagOS software stack are compared against native stacks on multiple public.	


# Evaluation Results
## Benchmark Result
| Metrics      | GLM-5.2-Nvidia-Origin | GLM-5.2-Hygon-FlagOS |
|--------------|-----------------------|----------------------|
| GPQA_Diamond | 85.85                 | Evaluating               |
| musr_generative        | 69.2                  | Evaluating                     |

# User Guide
Environment Setup

| Item             | Version              |
|------------------|----------------------|
| Docker Version   | Docker version 28.2.2, build 28.2.2-0ubuntu1~22.04.1 |
| Operating System | Ubuntu 22.04.4 LTS (Jammy Jellyfish) |

## Operation Steps

### Download FlagOS Image
```bash
docker pull harbor.baai.ac.cn/flagrelease-public/flagrelease-glm-5.2-hygon-tree_none-gems_5.0.2-vllm_0.20.0_das.dtk2604-plugin_0.2.0rc2.post1-cx_none-python_3.10.12-torch_2.10.0_das.opt1.dtk2604.20260325.g6b060a-pcp_dtk-25.04.4-dri:202606171534
```

### Download Open-source Model Weights
```bash
pip install modelscope
modelscope download --model FlagRelease/GLM-5.2-hygon-FlagOS --local_dir /data/GLM-5.2
```

### Start the Container
```bash
docker run \
    --name flagos \
    --network=host \
    --ipc=host \
    --device=/dev/kfd \
    --device=/dev/mkfd \
    --device=/dev/dri \
    -v /opt/hyhal:/opt/hyhal \
    -v /data:/data \
    --group-add video \
    --cap-add=SYS_PTRACE \
    --security-opt seccomp=unconfined \
    -itd harbor.baai.ac.cn/flagrelease-public/flagrelease-glm-5.2-hygon-tree_none-gems_5.0.2-vllm_0.20.0_das.dtk2604-plugin_0.2.0rc2.post1-cx_none-python_3.10.12-torch_2.10.0_das.opt1.dtk2604.20260325.g6b060a-pcp_dtk-25.04.4-dri:202606171534 \
    /bin/bash
docker exec -it flagos /bin/bash
```
### Start the Server
```bash
# In node 0
export VLLM_PLUGINS=fl
VLLM_FL_FLAGOS_BLACKLIST='attention_backend,rotary_embedding,rms_norm,silu_and_mul,gelu_and_mul,grouped_topk,topk_softmax,invoke_fused_moe_triton_kernel,moe_align_block_size,moe_sum' \
vllm serve /data/GLM-5.2 \
    --served-model-name "flagOS" \
    --host 0.0.0.0 \
    --port 8000 \
    --tensor-parallel-size 8 \
    --max-model-len 32768 \
    --trust-remote-code \
    --enforce-eager \
    --pipeline-parallel-size 4 \
    --nnodes 4 \
    --node-rank 0 \
    --master-addr <node0_ip>

# In node 1
export VLLM_PLUGINS=fl
VLLM_FL_FLAGOS_BLACKLIST='attention_backend,rotary_embedding,rms_norm,silu_and_mul,gelu_and_mul,grouped_topk,topk_softmax,invoke_fused_moe_triton_kernel,moe_align_block_size,moe_sum' vllm serve /data/GLM-5.2 \
        --served-model-name "flagOS" \
        --host 0.0.0.0 \
        --port 8000 \
        --tensor-parallel-size 8 \
        --max-model-len 32768 \
        --trust-remote-code \
        --enforce-eager \
        --pipeline-parallel-size 4 \
        --nnodes 4 --node-rank 1 \
        --master-addr <node0_ip> \
        --headless
 
# In node 2       
export VLLM_PLUGINS=fl
VLLM_FL_FLAGOS_BLACKLIST='attention_backend,rotary_embedding,rms_norm,silu_and_mul,gelu_and_mul,grouped_topk,topk_softmax,invoke_fused_moe_triton_kernel,moe_align_block_size,moe_sum' vllm serve /data/GLM-5.2 \
        --served-model-name "flagOS" \
        --host 0.0.0.0 \
        --port 8000 \
        --tensor-parallel-size 8 \
        --max-model-len 32768 \
        --trust-remote-code \
        --enforce-eager \
        --pipeline-parallel-size 4 \
        --nnodes 4 --node-rank 2 \
        --master-addr <node0_ip> \
        --headless
# In node 3       
export VLLM_PLUGINS=fl
VLLM_FL_FLAGOS_BLACKLIST='attention_backend,rotary_embedding,rms_norm,silu_and_mul,gelu_and_mul,grouped_topk,topk_softmax,invoke_fused_moe_triton_kernel,moe_align_block_size,moe_sum' vllm serve /data/GLM-5.2 \
        --served-model-name "flagOS" \
        --host 0.0.0.0 \
        --port 8000 \
        --tensor-parallel-size 8 \
        --max-model-len 32768 \
        --trust-remote-code \
        --enforce-eager \
        --pipeline-parallel-size 4 \
        --nnodes 4 --node-rank 3 \
        --master-addr <node0_ip> \
        --headless
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
The model weights are derived from ZhipuAI/GLM-5.2 and are open‑sourced under the Apache License 2.0: https://www.apache.org/licenses/LICENSE-2.0.txt
