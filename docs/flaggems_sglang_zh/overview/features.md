# 特性

FlagGems-sglang 提供以下关键特性：

- **算子经过深度性能调优** — 每个算子都针对多种硬件后端的吞吐量与延迟做了精心优化。
- **Triton 内核调用优化** — 通过专门的 Triton 内核模式与自动调优，最大限度降低内核启动开销。
- **灵活的多后端支持机制** — 算子实现在导入时由三级注册器（通用、厂商、架构）解析，因此同一处调用会为当前设备选择最合适的可用内核。
- **支持常用 SGLang 算子** — 包含 SGLang 推理中高频算子的优化实现，例如 `silu_and_mul`、`apply_token_bitmask`、`fused_rmsnorm`，以及 Mamba 与混合专家家族的算子。

## 支持的后端

各厂商的特化实现位于 `src/flaggems_sglang/runtime/backend/_<vendor>/`。每个厂商目录都声明了自己服务的设备：

| 厂商目录 | 设备 | 特化算子数 |
|---------------|--------|-----------------------|
| `_kunlunxin` | `cuda` | 37 |
| `_ascend` | `npu` | 33 |
| `_enflame` | `gcu` | 32 |
| `_iluvatar` | `cuda` | 29 |
| `_metax` | `cuda` | 27 |
| `_hygon` | `cuda` | 22 |
| `_mthreads` | `musa` | 2 |
| `_nvidia` | `cuda` | 1，另有 `hopper/` 与 `ampere/` 架构目录 |
| `_thead` | `cuda` | 仅描述信息 |
| `_amd` | `cuda` | 仅描述信息 |

厂商未特化的算子仍可运行：路由会回退到 `flaggems_sglang.ops` 中的通用 Triton 实现。

设备在导入时通过各厂商的查询命令自动检测：`nvidia-smi`、`npu-smi info`、`mx-smi`、`ixsmi`、`hy-smi`、`efsmi -L`、`xpu-smi`、`rocm-smi`、`mthreads-gmi`、`ppu-smi`。设置 `DNN_VENDOR` 环境变量可覆盖自动检测，强制指定后端，测试套件正是通过这种方式指向特定厂商。

## 与 FlagGems、sglang-plugin-FL 的关系

- **FlagGems**：通用算子库。它通过 `flag_gems.enable()` 在 PyTorch 中全局替换 ATen 算子。
- **FlagGems-sglang**：即本仓库。它提供面向 SGLang 的算子实现以及用于验证的测试与基准，通过 `flaggems_sglang` Python 包对外暴露。
- **sglang-plugin-FL**：SGLang 插件层。它挂钩 SGLang 的算子调度，将框架调用路由到选定的后端实现：通用 ATen 覆盖使用 FlagGems，SGLang 专用融合内核使用 FlagGems-sglang 的算子。

厂商接入新后端时，可从上游仓库的 `src/flaggems_sglang/runtime/backend/README.md` 开始，其中说明了目录结构与 `VendorDescriptor` 字段。
