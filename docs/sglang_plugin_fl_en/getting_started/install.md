# Install sglang-plugin-FL

## Docker Images (Recommended)

Pre-built Docker images for v0.1.0-rc2:

| Platform | Image | Contents |
|----------|-------|----------|
| NVIDIA GPU (dual-node) | `harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-nvidia-dual` | sglang 0.5.11, flag_gems 5.3.0rc2, torch 2.11.0, triton 3.6.0 |
| NVIDIA GPU (single-node) | `harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-nvidia-single` | sglang 0.5.11, flag_gems 5.3.0rc2, torch 2.11.0, triton 3.6.0 |
| Moore Threads MUSA | `harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-musa` | sglang 0.5.12, torch 2.9.0, flag_gems 5.0.2 |
| Moore Threads (SVT) | `harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-mthreads-svt` | sglang 0.5.11, flag_gems 5.3.0rc2, torch 2.9.0, triton 3.1.0 |
| Huawei Ascend | `harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-ascend` | sglang 0.5.12, flag_gems 5.0.2, CANN 8.5.0 |

```bash
# NVIDIA dual-node (cross-node inference)
docker pull harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-nvidia-dual
# NVIDIA single-node
docker pull harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-nvidia-single
# Moore Threads MUSA
docker pull harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-musa
# Moore Threads SVT (full-stack test)
docker pull harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-mthreads-svt
# Huawei Ascend
docker pull harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-ascend
```

Dual-node images support cross-node LLM inference. Single-node images support single-machine inference. SVT images are full-stack test images.
