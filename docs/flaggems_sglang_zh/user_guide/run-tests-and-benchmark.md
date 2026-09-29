# 运行测试与基准

本节介绍如何运行 FlagGems-sglang 的测试与基准，以验证正确性并衡量算子性能。

以下命令已在 FlagGems-sglang 仓库中验证，可用于安装后的快速检查。

## 运行测试

```bash
cd FlagGems-sglang
pytest -q tests --collect-only
pytest -q tests/test_silu_and_mul.py --quick
```

如需与 CPU 参考实现对比，而不是与设备上的参考实现对比：

```bash
pytest -q tests/test_silu_and_mul.py --ref cpu --quick
```

## 运行基准

```bash
cd FlagGems-sglang
pytest -q benchmark --collect-only
pytest -q benchmark/test_silu_and_mul.py --level core --iter 1 --warmup 1
```

基准套件在记录性能的同时也会记录精度。传入 `--record log` 会写出每次运行的日志，传入 `--record json` 则写出 `accuracy_result.json`。

```bash
pytest -q benchmark/test_silu_and_mul.py --level core --record log
```

```{note}
- 大多数测试/基准需要加速卡运行时；参考实现可通过 `--ref cpu` 在 CPU 上运行。
- 建议先执行 `--collect-only`，快速确认导入与用例发现是否正常。
- 如需将运行指向特定厂商后端，请在调用 pytest 前设置 `DNN_VENDOR`。
- `--level core` 运行核心形状集；默认级别更全面，耗时也更长。
```
