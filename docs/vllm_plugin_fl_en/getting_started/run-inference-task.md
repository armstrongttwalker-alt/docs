# Run an offline batched inference

With vLLM and vllm-plugin-FL installed, you can start generating texts for list of input prompts (i.e. offline batch inferencing). See the example script: [offline_inference](https://github.com/flagos-ai/vllm-plugin-FL/blob/main/examples/offline_inference.py). Or use blow python script directly.

```python
from vllm import LLM, SamplingParams
import torch
from vllm.config.compilation import CompilationConfig


if __name__ == '__main__':
    prompts = [
        "Hello, my name is",
    ]
    # Create a sampling params object.
    sampling_params = SamplingParams(max_tokens=10, temperature=0.0)
    # Create an LLM.
    llm = LLM(model="Qwen/Qwen3-4B", max_num_batched_tokens=16384, max_num_seqs=2048)
    # Generate texts from the prompts.
    outputs = llm.generate(prompts, sampling_params)
    for output in outputs:
        prompt = output.prompt
        generated_text = output.outputs[0].text
        print(f"Prompt: {prompt!r}, Generated text: {generated_text!r}")
```

The following table lists the descriptions of the key parameters.

| Parameter | Description |
| :--- | :--- |
| `max_num_batched_tokens` | Caps the total number of tokens processed in a single forward pass. Helps prevent OOM on memory-constrained GPUs. |
| `max_num_seqs` | Limits how many concurrent prompts/sequences are batched together. |
| `temperature=0.0` | Makes generation deterministic (greedy decoding). |
| `max_tokens=10` | Hard limit on output length per prompt. |