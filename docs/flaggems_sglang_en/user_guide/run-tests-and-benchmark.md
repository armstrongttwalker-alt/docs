# Run tests and benchmark

This section covers how to run tests and benchmarks for FlagGems-sglang to validate correctness and measure operator performance.

The following commands are verified in the FlagGems-sglang repository and can be used for quick validation after installation.

## Run tests

```bash
cd FlagGems-sglang
pytest -q tests --collect-only
pytest -q tests/test_silu_and_mul.py --quick
```

To check an operator against the CPU reference instead of the device reference:

```bash
pytest -q tests/test_silu_and_mul.py --ref cpu --quick
```

## Run benchmark

```bash
cd FlagGems-sglang
pytest -q benchmark --collect-only
pytest -q benchmark/test_silu_and_mul.py --level core --iter 1 --warmup 1
```

The benchmark suite records accuracy alongside performance. Passing `--record log` writes a per-run log, and `--record json` writes `accuracy_result.json` instead.

```bash
pytest -q benchmark/test_silu_and_mul.py --level core --record log
```

```{note}
- Most tests/benchmarks require an accelerator runtime; the reference implementation can run on CPU with `--ref cpu`.
- `--collect-only` is recommended first to quickly check import and discovery.
- To point the run at a specific vendor backend, set `DNN_VENDOR` before invoking pytest.
- `--level core` runs the core shape set; the default level is more comprehensive and takes longer.
```
