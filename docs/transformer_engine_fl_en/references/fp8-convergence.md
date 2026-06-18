# FP8 Convergence

FP8 has been tested extensively across different model architectures and configurations and we found **no significant difference** between FP8 and BF16 training loss curves. FP8 has also been validated for accuracy on downstream LLM tasks (e.g. LAMBADA and WikiText). Below are examples of models tested for convergence across different frameworks.

| Model | Framework | Source |
|-------|-----------|--------|
| T5-770M | JAX/T5x | https://github.com/NVIDIA/JAX-Toolbox/tree/main/rosetta/rosetta/projects/t5x#convergence-and-performance |
| MPT-1.3B | Mosaic Composer | https://www.mosaicml.com/blog/coreweave-nvidia-h100-part-1 |
| GPT-5B | JAX/Paxml | https://github.com/NVIDIA/JAX-Toolbox/tree/main/rosetta/rosetta/projects/pax#h100-results |
| GPT-5B | NeMo Framework | Available on request |
| LLama2-7B | Alibaba Pai | https://mp.weixin.qq.com/s/NQT0uKXLbXyh5031zBdeBQ |
| T5-11B | JAX/T5x | Available on request |
| MPT-13B | Mosaic Composer | https://www.databricks.com/blog/turbocharged-training-optimizing-databricks-mosaic-ai-stack-fp8 |
| GPT-22B | NeMo Framework | Available on request |
| LLama2-70B | Alibaba Pai | https://mp.weixin.qq.com/s/NQT0uKXLbXyh5031zBdeBQ |
| GPT-175B | JAX/Paxml | https://github.com/NVIDIA/JAX-Toolbox/tree/main/rosetta/rosetta/projects/pax#h100-results |
