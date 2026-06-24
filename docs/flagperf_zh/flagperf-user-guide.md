# FlagPerf 用户指南

## 概述

**FlagPerf** 是由 BAAI（北京智源人工智能研究院）与 AI 硬件厂商共建的集成化 AI 硬件评测引擎。旨在建立一套面向行业实践的指标体系，用于评估 AI 硬件在软件栈组合（模型+框架+编译器）下的能力。

FlagPerf 提供全面的评测框架，涵盖 AI 硬件性能的多个维度，包括算力、内存带宽、互联能力和能耗。

### 主要特性

1. **多维度评测指标**：除了测量"时间消耗"，FlagPerf 还包括：
   - 性能指标
   - 资源使用指标
   - 生态适配能力指标

2. **多样化场景和任务**：覆盖 30+ 经典模型：
   - 计算机视觉（ResNet、ViT、Swin Transformer 等）
   - 自然语言处理（BERT、GPT、LLaMA 等）
   - 语音（Tacotron2、WaveGlow、Wav2Vec2）
   - 多模态（LLaVA、Stable Diffusion）
   - 80+ 训练示例

3. **多种训练框架和推理引擎**：
   - 训练：PyTorch、TensorFlow、PaddlePaddle、MindSpore
   - 推理：TensorRT、XTCL、IxRT、TorchInductor

4. **多种测试环境**：
   - 单卡
   - 单机（通常 8 卡）
   - 多机

5. **公平透明的评测**：所有测试代码开源，测试过程和数据可复现。

---

## 支持的评测模块

| 模块 | 描述 | 位置 |
| --- | --- | --- |
| **基础规格** | 算力、内存、互联、能耗 | `base/` |
| **训练** | 模型训练基准测试 | `training/` |
| **推理** | 离线批量推理评测 | `inference/` |
| **算子** | 算子基准测试 | `operation/` |
| **生成** | 生成式推理（LLM）评测 | `generate/` |

### 基础规格列表

基础规格评测涵盖 4 类 13 项：

| 序号 | 规格 | 类型 | NVIDIA | Metax | 昇腾 |
| --- | --- | --- | --- | --- | --- |
| 1 | FP64 计算 | 计算 | 支持 | N/A | N/A |
| 2 | FP32 计算 | 计算 | 支持 | 支持 | 支持 |
| 3 | TF32 计算 | 计算 | 支持 | 支持 | N/A |
| 4 | FP16 计算 | 计算 | 支持 | 支持 | 支持 |
| 5 | BF16 计算 | 计算 | 支持 | 支持 | 支持 |
| 6 | INT8 计算 | 计算 | 支持 | 支持 | 支持 |
| 7 | 主存带宽 | 内存 | 支持 | 支持 | N/A |
| 8 | 主存容量 | 内存 | 支持 | 支持 | N/A |
| 9 | CPU-芯片互联 | 互联 | 支持 | N/A | 支持 |
| 10 | 机内 P2P | 互联 | 支持 | N/A | 支持 |
| 11 | 机内 MPI | 互联 | 支持 | N/A | N/A |
| 12 | 机间 P2P | 互联 | 支持 | N/A | N/A |
| 13 | 机间 MPI | 互联 | 支持 | N/A | N/A |

---

## 快速开始

### 快速入门（训练示例）

```bash
# 1. 克隆 FlagPerf
git clone https://github.com/FlagOpen/FlagPerf.git
cd FlagPerf/training/

# 2. 安装依赖
pip3 install -r requirements.txt

# 3. 配置集群
vim run_benchmarks/config/cluster_conf.py
# 设置 HOSTS 和 SSH_PORT

# 4. 配置测试用例
vim run_benchmarks/config/test_conf.py
# 设置 VENDOR、FLAGPERF_PATH 和 CASES

# 5. 运行基准测试
python3 ./run_benchmarks/run.py
```

---

## 安装

### 系统要求

```
操作系统: Ubuntu 20.04
内核: 5.4.0-52-generic
Docker: 20.10.9
Python: 3.8
```

### 硬件环境

物理机部署（默认）：

1. 安装 Docker 和 Python
2. 确保硬件驱动、网络和硬件虚拟化已正确配置
3. 配置服务器之间的 SSH 信任关系和 sudo 免密
4. 安装监控工具：
   - CPU：sysstat
   - 内存：free
   - 功耗：ipmitool
   - 系统信息：加速器状态命令

容器部署：

```bash
export EXEC_IN_CONTAINER=True
```

确保容器具有：
- 硬件驱动和网络已配置
- 容器镜像和软件包正确安装
- 容器内可访问硬件
- SSH 信任关系已配置
- 监控工具已安装

### 基础规格评测配置

```bash
# 克隆并部署
git clone https://github.com/FlagOpen/FlagPerf.git
cd FlagPerf/base/

# 配置主机
vim configs/host.yaml

# 运行评测
sudo python3 run.py
```

### 训练评测配置

```bash
# 克隆并部署
git clone https://github.com/FlagOpen/FlagPerf.git
cd FlagPerf/training/
pip3 install -r requirements.txt

# 配置集群
vim run_benchmarks/config/cluster_conf.py
```

集群配置示例：
```python
'''集群配置'''
HOSTS = ["10.1.2.3", "10.1.2.4", "10.1.2.5", "10.1.2.6"]
SSH_PORT = "22"
```

配置测试用例：
```python
VENDOR = "nvidia"
FLAGPERF_PATH = "/home/FlagPerf/training"
CASES = {
    "bert:pytorch:A100:1:8:1": "/path/to/bert/dataset/",
    "glm:pytorch:A100:1:8:1": "/path/to/glm/dataset/"
}
```

运行训练：
```bash
python3 ./run_benchmarks/run.py
```

### 推理评测配置

```bash
cd FlagPerf/inference/

# 配置主机
vim configs/host.yaml
```

主机配置示例：
```yaml
FLAGPERF_PATH: "/home/FlagPerf/inference"
FLAGPERF_LOG_PATH: "result"
VENDOR: "nvidia"
HOSTS: ["10.1.2.155"]
SSH_PORT: "22"
CASES:
    "resnet50:pytorch_1.13": "/path/to/dataset/"
```

运行推理：
```bash
sudo python3 run.py
```

---

## 配置参考

### 测试配置格式

```
"模型:框架:硬件ID:节点数:进程数:重复次数": "数据集路径"
```

| 字段 | 描述 | 示例 |
| --- | --- | --- |
| 模型 | 模型名称 | bert、glm、resnet50 |
| 框架 | 框架版本 | pytorch、pytorch_1.8 |
| 硬件ID | 硬件型号 | A100 |
| 节点数 | 节点数量 | 1、2 |
| 进程数 | 每节点进程数 | 8 |
| 重复次数 | 测试重复次数 | 1、3 |

### 环境变量

| 变量 | 描述 |
| --- | --- |
| `EXEC_IN_CONTAINER` | 容器部署时设置为 `True` |
| `FLAGPERF_PATH` | FlagPerf 安装路径 |
| `ACCE_CONTAINER_OPT` | 加速器容器选项（如 `--gpus all`） |
| `ACCE_VISIBLE_DEVICE_ENV_NAME` | 设备可见性环境变量（如 `CUDA_VISIBLE_DEVICES`） |

---

## 模块详情

### 基础规格

基础规格评测模块提供 AI 硬件能力的全面测试：

**算力**：FP64、FP32、TF32、FP16、BF16、INT8
**内存**：主存带宽和容量
**互联**：CPU-芯片、机内 P2P/MPI、机间 P2P/MPI
**能耗**：功耗监控

两种评测方法：
1. **PyTorch 算子/原语**：基于标准 PyTorch 的测试
2. **厂商特定工具**：厂商提供的基准测试工具

### 训练模块

支持 44+ 模型，包括：

| 模型 | 类型 | 框架 |
| --- | --- | --- |
| LLaMA3-70B | LLM | Megatron |
| LLaMA2-7B/70B | LLM | DeepSpeed、Megatron |
| GPT3 | LLM | Paddle |
| Aquila2 | LLM | FlagScale |
| ResNet50 | CV | PyTorch、TensorFlow |
| BERT | NLP | PyTorch、Paddle |
| ViT | CV | PyTorch |

标准用例实现路径：`training/benchmarks/<模型>/<框架>/`

### 推理模块

支持 11 个模型：
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

### 生成模块

用于大语言模型生成式推理评测：
- 吞吐量测量
- TTFT（首令牌时间）测量
- ROUGE 分数评测

---

## 查看结果

训练日志位于：
```
result/run<时间戳>/<模型>/round<X>/<ip>_noderank<X>/
```

主要日志文件：
- `rank0.out.log`：训练输出和结果
- `cpu_monitor.log`：CPU 使用情况
- `gpu_monitor.log`：GPU 指标（温度、功耗、内存）
- `mem_monitor.log`：内存使用情况
- `pwr_monitor.log`：功耗

日志中完成的示例信息：
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

## 贡献

FlagPerf 采用开源协作方式：

1. Fork [FlagPerf 仓库](https://github.com/FlagOpen/FlagPerf)
2. 进行修改并验证
3. 向 FlagPerf 项目提交 PR

### 标准用例开发

标准用例是作为参考实现的模型-框架组合，它们：
- 在 NVIDIA GPU 上作为参考运行
- 与硬件无关（无厂商特定代码）
- 遵循标准代码结构

关键文件：
- `run_pretraining.py`：训练入口
- `config/_base.py`：基础配置
- `config/mutable_params.py`：可覆盖参数
- `readme.md`：用例文档

### 厂商适配

厂商可通过以下方式为硬件适配 FlagPerf：
1. 实现厂商特定配置
2. 提供硬件特定优化
3. 扩展标准用例接口

详见[用例适配规范](https://github.com/FlagOpen/FlagPerf/blob/main/docs/training/specifications/case-adatpion-spec.md)。

---

## 合作伙伴

FlagPerf 与以下 AI 硬件厂商共建：
- NVIDIA
- Metax
- 昆仑芯（百度）
- 天数智芯
- 摩尔线程
- 昇腾（华为）
- 海光（DCU）

---

## 许可证

FlagPerf 基于 Apache 2.0 许可证发布。

## 联系方式

如有问题和支持需求：
- GitHub Issues：[FlagOpen/FlagPerf](https://github.com/FlagOpen/FlagPerf)
- 项目主页：[https://github.com/FlagOpen/FlagPerf](https://github.com/FlagOpen/FlagPerf)