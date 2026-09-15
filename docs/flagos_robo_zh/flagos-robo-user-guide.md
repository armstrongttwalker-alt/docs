# FlagOS-Robo 用户指南

## 概览

FlagOS-Robo 是一个面向机器人（具身智能）AI 模型的集成训练与推理框架，构建在 [FlagOS](https://flagos.io)（面向多种 AI 芯片的统一开源 AI 系统软件栈）之上。

FlagOS-Robo 可部署于从边缘到云端的多种场景。它能够跨多种芯片型号移植，为视觉语言模型（VLM）和视觉语言动作（VLA）模型提供高效的训练、推理和部署。VLM 通常充当大脑进行任务规划，而 VLA 模型则充当小脑，输出机器人控制的动作。

### 核心特性

- **[FlagScale](https://github.com/flagos-ai/FlagScale)** 作为用户入口，支持机器人相关 AI 模型的训练和推理
- **全模型生命周期**：数据加载、监督微调（SFT）、推理部署和评测
- **多格式数据加载**：支持 webdataset、Megatron-Energon 和 lerobot 数据集格式
- **[RoboOS](https://github.com/FlagOpen/RoboOS) 集成**：跨具身协作，支持不同数据格式和边云协同
- **[RoboXStudio](https://ei2data.baai.ac.cn/home) 集成**：一站式服务，包括数据采集、标注、模型训练、仿真评测和部署

---

## 快速入门

### 支持的模型

| 模型 | 类型 | 模型权重 | 训练 | 推理 | 服务 | 评测 |
|------|------|----------|------|------|------|------|
| PI0 | VLA | [HuggingFace](https://huggingface.co/lerobot/pi0_base) | 是 | 是 | 是 | - |
| PI0.5 | VLA | [HuggingFace](https://huggingface.co/lerobot/pi05_libero_base) | 是 | 是 | 是 | - |
| RoboBrain-2.0 | VLM | [HuggingFace](https://huggingface.co/BAAI/RoboBrain2.0-7B) | 是 | 是 | 是 | 是 |
| RoboBrain-2.5 | VLM | [HuggingFace](https://huggingface.co/collections/BAAI/robobrain25) | 是 | 是 | 是 | 是 |
| RoboBrain-X0 | VLA | [HuggingFace](https://huggingface.co/BAAI/RoboBrain-X0-Preview) | 是 | - | 是 | - |
| Qwen-GR00T | VLA | [HuggingFace](https://huggingface.co/Qwen/Qwen3-VL-4B-Instruct) | 是 | 是 | 是 | 是 |
| GR00T-N1.5 | VLA | [HuggingFace](https://huggingface.co/nvidia/GR00T-N1.5-3B) | 是 | - | 是 | - |

每个模型的详细指南请参考 [FlagScale 示例](https://github.com/flagos-ai/FlagScale/tree/main/examples)。

---

## 评测

### FlagEval-Robo 平台

FlagOS-Robo 集成了 [FlagEval-Robo](https://embodiedverse.flageval.net/home) 平台，用于具身智能模型的测试和评测。

### 自动评测工具

Auto-Evaluation 是基于 [FlagEval](https://flageval.baai.ac.cn/#/home) 平台构建的多芯片自适应模型自动评测工具。它支持具身 VLM 模型，并绑定了十个经典数据集。目前仅支持在线评测。

**工具 API 端点**：`120.92.17.239:5050`

#### 可用 API

| API | 方法 | 描述 |
|-----|------|------|
| `/evaluation` | POST | 启动评测 |
| `/evaldiffs` | GET | 查询评测结果 |
| `/stop_evaluation` | POST | 停止评测 |
| `/resume_evaluation` | POST | 从断点恢复评测 |
| `/evaluation_progress` | POST | 查看评测进度 |
| `/evaluation_diffs` | POST | 比较多个模型的结果 |

#### 启动评测

```bash
curl -X POST http://120.92.17.239:5050/evaluation \
  -H "Content-Type: application/json" \
  -d '{
    "eval_infos": [{
      "eval_model": "my-model-eval",
      "model": "Qwen/Qwen3-8B",
      "eval_url": "http://<your-host>:9010/v1/chat/completions",
      "tokenizer": "Qwen/Qwen3-8B"
    }],
    "domain": "MM",
    "mode": "EmbodiedVerse"
  }'
```

关键参数：

- `eval_model`：评测任务的唯一名称
- `model`：部署的模型名称
- `eval_url`：模型的评测端点
- `tokenizer`：供应商和模型信息（例如 `Qwen/Qwen3-8B`）
- `chip`：用于评测的芯片（默认：`Nvidia-H100`）

---

## RoboXStudio 平台

[RoboXStudio](https://ei2data.baai.ac.cn/home) 平台为完整的具身智能流水线提供 SaaS 环境：

- **数据采集**：跨多种机器人形态的真实机器人数据采集
- **数据标注**：标注和数据增强工具
- **模型训练**：基于 FlagOS 构建的 SFT，支持多芯片适配
- **仿真评测**：集成测试和评测
- **模型部署**：端到端部署流水线

RoboXStudio 已完成基于 FlagOS + BAAI RoboBrain-X0 模型的完整训练和推理工作流，实现了从模型开发、真机验证到任务执行的端到端流水线。

**链接**：

- 官方网站：[https://ei2data.baai.ac.cn](https://ei2data.baai.ac.cn)
- 产品手册：[飞书 Wiki](https://jwolpxeehx.feishu.cn/wiki/GzbCwlYWwiqHvTk9b4icob3inug)
- 快速入门指南：[飞书 Wiki](https://jwolpxeehx.feishu.cn/wiki/SbGzwjgakiQbHMkc0aecJbUunhg)
