# 安装要求

## 硬件

支持 CUDA 的 NVIDIA GPU（用于 Triton 执行和 cuTensor 基线比较）。

## 软件

| 依赖 | 说明 |
|---|---|
| Python 3.8+ | |
| PyTorch 2.6.0 | 支持 CUDA |
| FlagTree | FlagOS 维护的 Triton 分支 |
| cuTensor | 用于基线比较 |
| pytest | 测试运行器 |
| PyYAML | 算子注册表 |
| matplotlib | 可视化 |
| openpyxl | XLSX 报告生成 |
