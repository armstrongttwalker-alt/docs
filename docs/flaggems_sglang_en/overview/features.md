# Features

FlagGems-sglang provides the following key features:

- **Operators have undergone deep performance tuning** — Each operator is carefully optimized for throughput and latency across multiple hardware backends.
- **Triton kernel call optimization** — Kernel launch overhead is minimized through specialized Triton kernel patterns and autotuning.
- **Flexible multi-backend support mechanism** — Operator implementations are resolved at import time by a three-level registrar (generic, vendor, architecture), so the same call site selects the best available kernel for the device in use.
- **Support for common SGLang operators** — Includes optimized implementations of operators frequently used in SGLang inference, such as `silu_and_mul`, `apply_token_bitmask`, `fused_rmsnorm`, and the Mamba and Mixture-of-Experts families.

## Supported backends

Vendors ship their specializations under `src/flaggems_sglang/runtime/backend/_<vendor>/`. Each vendor folder declares the device it serves:

| Vendor folder | Device | Specialized operators |
|---------------|--------|-----------------------|
| `_kunlunxin` | `cuda` | 37 |
| `_ascend` | `npu` | 33 |
| `_enflame` | `gcu` | 32 |
| `_iluvatar` | `cuda` | 29 |
| `_metax` | `cuda` | 27 |
| `_hygon` | `cuda` | 22 |
| `_mthreads` | `musa` | 2 |
| `_nvidia` | `cuda` | 1, plus `hopper/` and `ampere/` architecture folders |
| `_thead` | `cuda` | descriptor only |
| `_amd` | `cuda` | descriptor only |

A vendor that does not specialize an operator still runs it: routing falls back to the generic Triton implementation in `flaggems_sglang.ops`.

The device is detected at import time from a per-vendor query command: `nvidia-smi`, `npu-smi info`, `mx-smi`, `ixsmi`, `hy-smi`, `efsmi -L`, `xpu-smi`, `rocm-smi`, `mthreads-gmi`, `ppu-smi`. Setting the `DNN_VENDOR` environment variable overrides detection and forces a specific backend, which is how the test suites are pointed at a particular vendor.

## Relationship with FlagGems and sglang-plugin-FL

- **FlagGems**: the general-purpose operator library. It replaces ATen operators globally in PyTorch through `flag_gems.enable()`.
- **FlagGems-sglang**: this repository. It provides SGLang-oriented operator implementations together with the tests and benchmarks that validate them, exposed through the `flaggems_sglang` Python package.
- **sglang-plugin-FL**: the SGLang plugin layer. It hooks SGLang's operator dispatch and routes framework calls to the selected backend implementation, using FlagGems for general ATen coverage and FlagGems-sglang operators for the SGLang-specific fused kernels.

Vendors bringing up a new backend should start from the bring-up guide kept in the upstream repository at `src/flaggems_sglang/runtime/backend/README.md`.
