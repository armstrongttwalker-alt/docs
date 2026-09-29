# 环境要求

安装 FlagGems-sglang 之前，请确认环境满足以下要求。

## 软件要求

- **Python** 3.8 及以上
- **PyTorch** 2.6.0 及以上，且支持所使用的加速卡
- **Triton** 与所用 GPU 架构兼容
- **PyYAML** 与 **SQLAlchemy**，算子注册表在运行时依赖这两个包
- **pip** 用于安装软件包

## 构建依赖

从源码构建 FlagGems-sglang 需要以下软件包：

- `setuptools` >= 64.0
- `scikit-build-core` >= 0.11
- `pybind11`

`ninja` 与 `cmake` 仅在编译厂商扩展时需要，因此安装指南会一并预先装好。

## 测试依赖

`test` extra 会安装测试与基准套件所需的软件包：

- `pytest` >= 7.1.0
- `numpy` >= 1.26
- `scipy` >= 1.14
- `cupy-cuda12x`

`cupy-cuda12x` 面向 CUDA 设备；其他加速卡请安装与该平台匹配的 CuPy 轮子。

## 硬件要求

运行大多数算子需要受支持的加速卡。测试套件可对支持的算子使用 `--ref cpu` 与 CPU 参考实现做对比。
