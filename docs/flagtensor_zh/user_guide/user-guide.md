# FlagTensor 用户指南

## 使用 FlagTensor

FlagTensor 直接与 PyTorch 集成。导入包并对 CUDA 张量调用算子：

```python
import torch
import flagtensor

# 逐元素操作
x = torch.randn(1024, device="cuda", dtype=torch.float32)
y = flagtensor.abs(x)
z = flagtensor.relu(x)
w = flagtensor.sigmoid(x)

# 二元操作
a = torch.randn(1024, device="cuda")
b = torch.randn(1024, device="cuda")
c = flagtensor.add(a, b)

# 张量收缩
m = torch.randn(64, 32, device="cuda")
n = torch.randn(32, 48, device="cuda")
r = flagtensor.contraction(m, n)
```

## 算子列表

完整的算子注册表维护在 [FlagTensor conf/operators.yaml](https://github.com/flagos-ai/FlagTensor/blob/main/conf/operators.yaml)。

| 类别 | 算子 | 状态 |
|---|---|---|
| **一元** | abs、acos、acosh、asin、asinh、atan、atanh、ceil、conj、cos、cosh、exp、floor、identity、log、mish、neg、rcp、relu、sigmoid、sin、sinh、soft_plus、soft_sign、sqrt、swish、tan、tanh | stable |
| **二元** | add、max、min、mul | stable |
| **收缩** | contraction、contraction_trinary、elementwise_trinary | stable（contraction_trinary：active） |
| **稀疏** | block_sparse_contraction | experimental |

## 运行测试

```bash
# 单个算子正确性测试
pytest tests/unary/test_CUTENSOR_OP_ABS.py -v

# 记录测试结果为 JSON（使用 CPU-FP64 参考）
pytest tests/unary/test_CUTENSOR_OP_ABS.py --ref cpu --record json --output results.json

# 多 GPU 测试运行器（从 YAML 注册表）
python tools/run_tests.py --stages stable --gpus 0,1

# 提取算子标记
python tools/get_marks.py --stage stable --output ops.txt

# 带记录的基准测试
pytest benchmark/test_unary_perf.py -m CUTENSOR_OP_ABS \
  --mode kernel --level core --record log

# 解析基准测试摘要
python tools/summary_for_plot.py result-*.log
```
