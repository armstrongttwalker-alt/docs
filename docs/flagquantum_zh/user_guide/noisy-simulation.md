# 含噪模拟

FlagQuantum 用同一个后端中立的 `NoiseModel` 支撑精确密度矩阵演化、批量态向量轨迹与 MPS 量子轨迹。精确路径是小规模系统的正确性基准；轨迹路径报告采样统计量，MPS 路径还额外报告截断数据。

## 定义噪声模型

```{code-block} python
import flagquantum as fq
import flagquantum.runtime as fqr
import flagquantum.noise as fqn

circuit = fq.Circuit(2).h(0).cx(0, 1)
noise = (
    fqn.NoiseModel()
    .add("h", fqn.thermal_relaxation_channel(t1=50_000, t2=70_000, duration=35))
    .add("cx", fqn.depolarizing_channel(0.01))
    .add_readout(0, fqn.ReadoutError(((0.98, 0.02), (0.07, 0.93))))
)

exact = fq.run(
    circuit,
    noise_model=noise,
    options=fq.ExecutionOptions(mode="density_matrix"),
    outputs=fq.expectation(fq.Z(0) + fq.Z(1)),
)
print(exact.expectation())
```

## 内置信道

| 信道 | 用途 |
| --- | --- |
| `depolarizing_channel` | 均匀去极化噪声 |
| `bit_flip_channel`、`phase_flip_channel` | 离散泡利错误 |
| `amplitude_damping_channel` | 能量弛豫 |
| `thermal_relaxation_channel` | 带门时长的 T1/T2 弛豫 |
| `ReadoutError` | 被测量子比特上的经典读出混淆 |

器件画像还可以提供门时长与空闲时间噪声，运行时会把它们下沉到真正发生的门与空闲窗口上。面向硬件目标的标定推导噪声模型同样受支持。

## 轨迹模拟

```{code-block} python
sampled = fqr.run_noisy_mps(
    circuit,
    noise,
    trajectories=4096,
    min_trajectories=128,
    target_standard_error=1e-3,
    seed=42,
    retain_trajectories=False,
)
print(sampled.expectation_z_mean)
print(sampled.statistics.standard_error)
print(sampled.converged, sampled.stopped_early)
```

自适应停止在单个 rank 上可用；当精确密度矩阵会超出显式内存预算时，稳定的 `fq.run` 入口可以选择含噪 MPS 轨迹，但必须由调用方主动选择近似——否则规划会失败，而不会静默改变程序语义。

| 负载 | 路径 |
| --- | --- |
| 小规模系统，要求精确值 | 通过 `fq.run` 使用密度矩阵模式 |
| 较大系统，接受采样统计 | 批量态向量轨迹 |
| 大规模低纠缠系统 | 带截断报告的 MPS 量子轨迹 |
| 超出稠密内存上限的 CPU 计数 | 通过稳定入口选择含噪 MPS 轨迹 |

## 可复现性

`NoiseModel` 携带版本化身份，该身份是计划的一部分。计划往返会重新校验模型负载及其摘要，因此含噪结果可以从保存的计划复现，而不必重新敲一遍噪声定义。轨迹路径接受随机种子，其结果携带判断估计是否收敛所需的采样统计量——报告包含标准误、轨迹或采样数量，以及是否使用了自适应停止。

## 连续时间演化

时间无关的马尔可夫系统可以用稠密哈密顿量与 Lindblad 塌缩算子在固定时间网格上演化：

```{code-block} shell
python examples/lindblad_evolution.py
```

该路径在 complex64 与 complex128 下均为仅 CPU，网格决定定步长四阶 Runge-Kutta 积分器的精度。

## 边界

脉冲重叠、串扰、泄漏、厂商标定适配器、分布式自适应停止、批量态向量轨迹与含噪梯度都不在支持范围内。多量子比特的 MPS 信道使用显式的稠密正确性回退，而不是静默近似；每条含噪路径的确切支持范围记录在能力目录中。
