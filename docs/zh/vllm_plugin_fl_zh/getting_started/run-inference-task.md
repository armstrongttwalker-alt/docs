# 运行离线批量推理

安装 vLLM 和 vllm-plugin-FL 后，您可以开始为输入提示列表生成文本（即离线批量推理）。请参阅示例脚本：[offline_inference](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/examples/offline_inference.py)。或直接使用以下 Python 脚本。

```python
from vllm import LLM, SamplingParams
import torch
from vllm.config.compilation import CompilationConfig


if __name__ == '__main__':
    prompts = [
        "Hello, my name is",
    ]
    # 创建采样参数对象。
    sampling_params = SamplingParams(max_tokens=10, temperature=0.0)
    # 创建 LLM。
    llm = LLM(model="Qwen/Qwen3-4B", max_num_batched_tokens=16384, max_num_seqs=2048)
    # 从提示生成文本。
    outputs = llm.generate(prompts, sampling_params)
    for output in outputs:
        prompt = output.prompt
        generated_text = output.outputs[0].text
        print(f"Prompt: {prompt!r}, Generated text: {generated_text!r}")
```

下表列出了关键参数的说明。

| 参数 | 说明 |
| :--- | :--- |
| `max_num_batched_tokens` | 限制单次前向传递中处理的 token 总数。有助于防止在内存受限的 GPU 上出现 OOM。 |
| `max_num_seqs` | 限制同时批处理的并发提示/序列数量。 |
| `temperature=0.0` | 使生成过程确定性（贪婪解码）。 |
| `max_tokens=10` | 每个提示输出长度的硬限制。 |
