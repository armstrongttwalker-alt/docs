# FlagTensor 用户指南

## 使用 FlagTensor

FlagTensor 直接与 PyTorch 集成。导入包并对 CUDA 张量调用算子：

```python
import torch
import flagtensor

# 逐元素（一元）操作
x = torch.randn(1024, device="cuda", dtype=torch.float32)
y = flagtensor.abs(x)
z = flagtensor.relu(x)
w = flagtensor.sigmoid(x)

# 二元操作
a = torch.randn(1024, device="cuda")
b = torch.randn(1024, device="cuda")
c = flagtensor.add(a, b)
d = flagtensor.mul(a, b)

# 张量收缩
m = torch.randn(64, 32, device="cuda")
n = torch.randn(32, 48, device="cuda")
r = flagtensor.contraction(m, n)

# 三元收缩
p = torch.randn(64, 32, device="cuda")
q = torch.randn(32, 48, device="cuda")
s = torch.randn(64, 48, device="cuda")
t = flagtensor.contraction_trinary(p, q, s)

# 逐元素三元操作
u = flagtensor.elementwise_trinary(a, b, c)
```

## 算子列表

完整的算子注册表维护在 [FlagTensor conf/operators.yaml](https://github.com/flagos-ai/FlagTensor/blob/main/conf/operators.yaml)。

| 类别 | 算子 | 状态 |
|---|---|---|
| **一元** | abs、acos、acosh、asin、asinh、atan、atanh、ceil、conj、cos、cosh、exp、floor、identity、log、mish、neg、rcp、relu、sigmoid、sin、sinh、soft_plus、soft_sign、sqrt、swish、tan、tanh | stable |
| **二元** | add、max、min、mul | stable |
| **收缩** | contraction、elementwise_trinary | stable |
| **收缩** | contraction_trinary | active |
| **稀疏** | block_sparse_contraction | experimental |

## 运行测试

### 正确性测试

```bash
# 分类级正确性（主要验收接口）
pytest tests/unary/test_unary_correctness.py -v
pytest tests/binary/test_binary_correctness.py -v
pytest tests/contraction/test_contraction_correctness.py -v
pytest tests/sparse/test_sparse_correctness.py -v

# 单个算子正确性测试（每个算子文件）
pytest tests/unary/test_CUTENSOR_OP_ABS.py -v

# 记录测试结果为 JSON（使用 CPU-FP64 参考）
pytest tests/unary/test_CUTENSOR_OP_ABS.py --ref cpu --record json --output results.json

# 多 GPU 测试运行器（从 YAML 注册表）
python tools/run_tests.py --stages stable --gpus 0,1

# 提取算子标记
python tools/get_marks.py --stage stable --output ops.txt
```

### 性能测试

```bash
# 分类级基准测试（主要验收接口）
pytest benchmark/test_unary_perf.py -m CUTENSOR_OP_ABS --mode kernel --level core --record log
pytest benchmark/test_binary_perf.py -m CUTENSOR_OP_ADD --mode kernel --level core --record log
pytest benchmark/test_contraction_perf.py -m Contraction --mode kernel --level core --record log
pytest benchmark/test_sparse_perf.py -m BlockSparseContraction --mode kernel --level core --record log

# 每个算子基准测试（旧版/调试）
pytest benchmark/test_CUTENSOR_OP_ABS_perf.py --mode kernel --level core --record log

# 解析基准测试摘要
python tools/summary_for_plot.py result-*.log
```

### CI 运行器

```bash
# 冒烟正确性
python tools/run_flagtensor_ci.py --smoke --run-correctness --results-dir ci_results_correctness --dump-json-summary

# 冒烟性能
python tools/run_flagtensor_ci.py --smoke --run-perf --results-dir ci_results_perf --dump-json-summary

# 验收正确性（完整覆盖率）
python tools/run_flagtensor_ci.py --run-correctness --results-dir acceptance_results_correctness --dump-json-summary

# 验收性能（完整覆盖率）
python tools/run_flagtensor_ci.py --run-perf --results-dir acceptance_results_perf --dump-json-summary

# 每周回归
python tools/run_flagtensor_weekly.py --project-root . --results-dir weekly_results --gpus 0 --mode kernel
```
