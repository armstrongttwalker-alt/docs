# Run tests and benchmark

This section covers how to run tests and benchmarks for FlagGems-sglang to validate correctness and measure operator performance.

The following commands are verified in the FlagGems-sglang repository and can be used for quick validation after installation.

## Run tests

```bash
cd /workspace/FlagGems-sglang
pytest -q tests --collect-only
pytest -q tests/test_outer.py --quick
```

## Run benchmark

```bash
cd /workspace/FlagGems-sglang
pytest -q benchmark --collect-only
pytest -q benchmark/test_outer.py::test_outer --level core --iter 1 --warmup 1
```

```{note}
- Most tests/benchmarks require a CUDA-capable GPU runtime.
- `--collect-only` is recommended first to quickly check import and discovery.
```
