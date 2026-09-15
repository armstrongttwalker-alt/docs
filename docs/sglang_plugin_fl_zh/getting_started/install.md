# 安装 sglang-plugin-FL

## Docker 镜像（推荐）

v0.1.0-rc2 预构建 Docker 镜像：

| 平台 | 镜像 | 内容 |
|----------|-------|----------|
| NVIDIA GPU（双节点） | `harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-nvidia-dual` | sglang 0.5.11, flag_gems 5.3.0rc2, torch 2.11.0, triton 3.6.0 |
| NVIDIA GPU（单节点） | `harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-nvidia-single` | sglang 0.5.11, flag_gems 5.3.0rc2, torch 2.11.0, triton 3.6.0 |
| 摩尔线程 MUSA | `harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-musa` | sglang 0.5.12, torch 2.9.0, flag_gems 5.0.2 |
| 摩尔线程（SVT） | `harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-mthreads-svt` | sglang 0.5.11, flag_gems 5.3.0rc2, torch 2.9.0, triton 3.1.0 |
| 华为昇腾 | `harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-ascend` | sglang 0.5.12, flag_gems 5.0.2, CANN 8.5.0 |

```bash
# NVIDIA 双节点（跨节点推理）
docker pull harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-nvidia-dual
# NVIDIA 单节点
docker pull harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-nvidia-single
# 摩尔线程 MUSA
docker pull harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-musa
# 摩尔线程 SVT（全栈测试）
docker pull harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-mthreads-svt
# 华为昇腾
docker pull harbor.baai.ac.cn/flagos21-release/sglang-plugin-fl:v0.1.0-rc2-ascend
```

双节点镜像支持跨节点大模型推理，单节点镜像支持单机推理。SVT 为全栈测试镜像。
