# 环境要求

FlagQuantum 支持 Python 3.10 至 3.12，并要求 PyTorch 2.5 或更高版本。正式发布的
包只依赖 PyTorch，其余能力都是可选扩展。

## 软件要求

| 项目 | 要求 |
| --- | --- |
| Python | 3.10、3.11 或 3.12（`>=3.10,<3.13`） |
| PyTorch | `>=2.5,<2.14` |
| 操作系统 | Linux、macOS 或 Windows，可在 CPU 或单张加速卡上运行 |

可选扩展在 `pyproject.toml` 中声明，用 `pip install "flagquantum[<extra>]"` 安装：

| 扩展 | 新增内容 |
| --- | --- |
| `dev` | pytest、覆盖率、xdist、ruff、black、mypy、pre-commit |
| `jax` | 运行在 PyTorch 接口之后的 JAX 内核 |
| `cotengra` | 张量网络收缩路径搜索 |
| `cuda` | 受支持的本地门路径所用 Triton 内核 |
| `viz` | 线路绘制所需的 Matplotlib |
| `qiskit` | Qiskit 与 Aer 的转换与执行桥接 |
| `pennylane` | PennyLane 的转换与 Lightning 执行桥接 |
| `cirq` | Cirq 的转换与模拟器执行桥接 |
| `cudaq` | CUDA-Q 内核导出（仅 Linux） |
| `braket`、`azure`、`quafu` | 其他厂商适配器 |
| `examples` | 较大示例所用的数据集与 transformer 辅助依赖 |
| `all` | 开发、绘图、JAX、Triton 与示例依赖 |

## 硬件平台

| 平台 | 状态 |
| --- | --- |
| CPU | 默认本地路径；精确态向量模拟与训练 |
| 单张 CUDA GPU | 在 `ExecutionOptions` 中显式选择的单设备执行 |
| 多 rank | 基于 Gloo 或 NCCL 的跨卡态向量执行与按 rank 拥有的 MPS 执行 |
| FlagOS 加速器 | 通过 FlagOS 统一多芯片层及其逻辑设备 `flagos:0` 接入 |

FlagQuantum 不做厂商探测，也不含厂商分支。物理设备探测、厂商运行时以及
`flagos:0` 到物理卡的映射，都属于 FlagOS 厂商集成；FlagQuantum 只记录它拿到
的运行时标识与路由证据。因此，仅存在一条集成路径并不等于某款国产加速器已获得认证。

## 多机环境预期

分布式支持依赖具体环境。在已复核的配置中，双机 A800、每机一张卡的部署可以基于
NCCL 与 TCP 运行前向、梯度与训练／恢复负载；多机的发布认证是另一个需要证据支撑的
独立步骤。
