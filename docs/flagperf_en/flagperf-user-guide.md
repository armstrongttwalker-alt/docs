# FlagPerf User Guide

## Overview

**FlagPerf** is an integrated AI hardware benchmarking engine co-built by BAAI (Beijing Academy of Artificial Intelligence) and AI hardware vendors. It aims to establish an industry practice-oriented metric system for evaluating AI hardware capabilities under software stack combinations (model + framework + compiler).

FlagPerf provides a comprehensive evaluation framework that covers multiple dimensions of AI hardware performance, including computing power, memory bandwidth, interconnect capabilities, and energy consumption.

### Key Features

1. **Multi-dimensional Evaluation Metrics**: Beyond just measuring "time consumption", FlagPerf includes:
   - Performance metrics
   - Resource usage metrics
   - Ecosystem adaptation capability metrics

2. **Diverse Scenarios and Tasks**: Covers 30+ classic models across:
   - Computer Vision (ResNet, ViT, Swin Transformer, etc.)
   - Natural Language Processing (BERT, GPT, LLaMA, etc.)
   - Speech (Tacotron2, WaveGlow, Wav2Vec2)
   - Multimodal (LLaVA, Stable Diffusion)
   - 80+ training examples

3. **Multiple Training Frameworks and Inference Engines**:
   - Training: PyTorch, TensorFlow, PaddlePaddle, MindSpore
   - Inference: TensorRT, XTCL, IxRT, TorchInductor

4. **Multiple Test Environments**:
   - Single card
   - Single machine (typically 8 cards)
   - Multi-machine

5. **Fair and Transparent Evaluation**: All test code is open source, and the testing process and data are reproducible.

---

## Supported Evaluation Modules

| Module | Description | Location |
|--------|-------------|----------|
| **Base Specifications** | Computing power, memory, interconnect, energy consumption | `base/` |
| **Training** | Model training benchmarks | `training/` |
| **Inference** | Offline batch inference evaluation | `inference/` |
| **Operations** | Operator benchmarks | `operation/` |
| **Generate** | Generative inference (LLM) evaluation | `generate/` |

### Base Specifications List

The base specifications evaluation covers 13 items across 4 categories:

| No. | Specification | Type | NVIDIA | Metax | Ascend |
|-----|---------------|------|--------|-------|--------|
| 1 | FP64 Computing | Compute | Supported | N/A | N/A |
| 2 | FP32 Computing | Compute | Supported | Supported | Supported |
| 3 | TF32 Computing | Compute | Supported | Supported | N/A |
| 4 | FP16 Computing | Compute | Supported | Supported | Supported |
| 5 | BF16 Computing | Compute | Supported | Supported | Supported |
| 6 | INT8 Computing | Compute | Supported | Supported | Supported |
| 7 | Main Memory Bandwidth | Memory | Supported | Supported | N/A |
| 8 | Main Memory Capacity | Memory | Supported | Supported | N/A |
| 9 | CPU-Chip Interconnect | Interconnect | Supported | N/A | Supported |
| 10 | Intra-server P2P | Interconnect | Supported | N/A | Supported |
| 11 | Intra-server MPI | Interconnect | Supported | N/A | N/A |
| 12 | Inter-server P2P | Interconnect | Supported | N/A | N/A |
| 13 | Inter-server MPI | Interconnect | Supported | N/A | N/A |

---

## Getting Started

### Quick Start (Training Example)

```bash
# 1. Clone FlagPerf
git clone https://github.com/FlagOpen/FlagPerf.git
cd FlagPerf/training/

# 2. Install dependencies
pip3 install -r requirements.txt

# 3. Configure cluster
vim run_benchmarks/config/cluster_conf.py
# Set HOSTS and SSH_PORT

# 4. Configure test cases
vim run_benchmarks/config/test_conf.py
# Set VENDOR, FLAGPERF_PATH, and CASES

# 5. Run benchmark
python3 ./run_benchmarks/run.py
```

---

## Installation

### System Requirements

```
OS: Ubuntu 20.04
Kernel: 5.4.0-52-generic
Docker: 20.10.9
Python: 3.8
```

### Hardware Environment

For physical machine deployment (default):

1. Install Docker and Python
2. Ensure hardware drivers, network, and hardware virtualization are properly configured
3. Configure SSH trust relationship and sudo passwordless between servers
4. Install monitoring tools:
   - CPU: sysstat
   - Memory: free
   - Power: ipmitool
   - System info: accelerator status commands

For container deployment:

```bash
export EXEC_IN_CONTAINER=True
```

Ensure the container has:
- Hardware drivers and network configured
- Container image and software packages installed correctly
- Hardware accessible within the container
- SSH trust relationship configured
- Monitoring tools installed

### Base Specifications Evaluation Setup

```bash
# Clone and deploy
git clone https://github.com/FlagOpen/FlagPerf.git
cd FlagPerf/base/

# Configure hosts
vim configs/host.yaml

# Run evaluation
sudo python3 run.py
```

### Training Evaluation Setup

```bash
# Clone and deploy
git clone https://github.com/FlagOpen/FlagPerf.git
cd FlagPerf/training/
pip3 install -r requirements.txt

# Configure cluster
vim run_benchmarks/config/cluster_conf.py
```

Example cluster configuration:
```python
'''Cluster configs'''
HOSTS = ["10.1.2.3", "10.1.2.4", "10.1.2.5", "10.1.2.6"]
SSH_PORT = "22"
```

Configure test cases:
```python
VENDOR = "nvidia"
FLAGPERF_PATH = "/home/FlagPerf/training"
CASES = {
    "bert:pytorch:A100:1:8:1": "/path/to/bert/dataset/",
    "glm:pytorch:A100:1:8:1": "/path/to/glm/dataset/"
}
```

Run training:
```bash
python3 ./run_benchmarks/run.py
```

### Inference Evaluation Setup

```bash
cd FlagPerf/inference/

# Configure host
vim configs/host.yaml
```

Example host configuration:
```yaml
FLAGPERF_PATH: "/home/FlagPerf/inference"
FLAGPERF_LOG_PATH: "result"
VENDOR: "nvidia"
HOSTS: ["10.1.2.155"]
SSH_PORT: "22"
CASES:
    "resnet50:pytorch_1.13": "/path/to/dataset/"
```

Run inference:
```bash
sudo python3 run.py
```

---

## Configuration Reference

### Test Configuration Format

```
"model:framework:hardwareID:nnodes:nproc:repeat": "dataset_path"
```

| Field | Description | Example |
|-------|-------------|---------|
| model | Model name | bert, glm, resnet50 |
| framework | Framework version | pytorch, pytorch_1.8 |
| hardwareID | Hardware model | A100 |
| nnodes | Number of nodes | 1, 2 |
| nproc | Processes per node | 8 |
| repeat | Test repetitions | 1, 3 |

### Environment Variables

| Variable | Description |
|----------|-------------|
| `EXEC_IN_CONTAINER` | Set to `True` for container deployment |
| `FLAGPERF_PATH` | Path to FlagPerf installation |
| `ACCE_CONTAINER_OPT` | Accelerator container options (e.g., `--gpus all`) |
| `ACCE_VISIBLE_DEVICE_ENV_NAME` | Device visibility env var (e.g., `CUDA_VISIBLE_DEVICES`) |

---

## Module Details

### Base Specifications

The base specifications evaluation module provides comprehensive testing of AI hardware capabilities:

**Computing Power**: FP64, FP32, TF32, FP16, BF16, INT8
**Memory**: Main memory bandwidth and capacity
**Interconnect**: CPU-chip, intra-server P2P/MPI, inter-server P2P/MPI
**Energy**: Power consumption monitoring

Two evaluation methods:
1. **PyTorch Operators/Primitives**: Standard PyTorch-based tests
2. **Vendor-Specific Tools**: Vendor-provided benchmarking tools

### Training Module

Supports 44+ models including:

| Model | Type | Frameworks |
|-------|------|------------|
| LLaMA3-70B | LLM | Megatron |
| LLaMA2-7B/70B | LLM | DeepSpeed, Megatron |
| GPT3 | LLM | Paddle |
| Aquila2 | LLM | FlagScale |
| ResNet50 | CV | PyTorch, TensorFlow |
| BERT | NLP | PyTorch, Paddle |
| ViT | CV | PyTorch |

Standard case implementation path: `training/benchmarks/<model>/<framework>/`

### Inference Module

Supports 11 models:
- ResNet50
- BERT-Large
- Vision Transformer
- YOLOv5
- Stable Diffusion v1.4
- Swin Transformer
- LLaMA2-7B MMLU
- Aquila-7B MMLU
- Segment Anything
- DeepSeek-7B MMLU
- LLaMA3-8B MMLU

### Generate Module

For large language model generative inference evaluation:
- Throughput measurement
- TTFT (Time To First Token) measurement
- ROUGE score evaluation

---

## Viewing Results

Training logs are located in:
```
result/run<timestamp>/<model>/round<X>/<ip>_noderank<X>/
```

Key log files:
- `rank0.out.log`: Training output and results
- `cpu_monitor.log`: CPU usage
- `gpu_monitor.log`: GPU metrics (temperature, power, memory)
- `mem_monitor.log`: Memory usage
- `pwr_monitor.log`: Power consumption

Example finished info in logs:
```json
{
  "e2e_time": 1661.61,
  "training_sequences_per_second": 579.09,
  "converged": true,
  "final_loss": 3.07,
  "raw_train_time": 1501.71
}
```

---

## Contributing

FlagPerf adopts an open-source collaborative approach:

1. Fork the [FlagPerf repository](https://github.com/FlagOpen/FlagPerf)
2. Make modifications and verify
3. Submit a PR to the FlagPerf project

### Standard Case Development

Standard cases are model-framework combinations that serve as reference implementations. They:
- Run on NVIDIA GPUs as reference
- Are hardware-agnostic (no vendor-specific code)
- Follow the standard code structure

Key files:
- `run_pretraining.py`: Training entry point
- `config/_base.py`: Base configuration
- `config/mutable_params.py`: Overridable parameters
- `readme.md`: Case documentation

### Vendor Adaptation

Vendors can adapt FlagPerf for their hardware by:
1. Implementing vendor-specific configurations
2. Providing hardware-specific optimizations
3. Extending standard case interfaces

See the [case adaptation specification](https://github.com/FlagOpen/FlagPerf/blob/main/docs/training/specifications/case-adatpion-spec.md) for details.

---

## Partners

FlagPerf is co-built with AI hardware vendors including:
- NVIDIA
- Metax
- Kunlunxin (Baidu)
- Iluvatar
- Mthreads
- Ascend (Huawei)
- Hygon (DCU)

---

## License

FlagPerf is released under the Apache 2.0 license.

## Contact

For questions and support:
- GitHub Issues: [FlagOpen/FlagPerf](https://github.com/FlagOpen/FlagPerf)
- Project Homepage: [https://github.com/FlagOpen/FlagPerf](https://github.com/FlagOpen/FlagPerf)
