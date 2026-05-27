# Testing

This section covers how to run integration tests for PyTorch-Plugin-FL to validate operator correctness and dispatch routing.

## Basic Operator Tests

```{code-block} bash
export TORCH_DEVICE_BACKEND_AUTOLOAD=0

# Factory ops: create tensors on cuda and flagos devices
pytest tests/integration/test_factory_ops.py -v --device cuda
pytest tests/integration/test_factory_ops.py -v --device flagos
```

## Dispatch Routing Tests

```{code-block} bash
pytest tests/integration/ops/ -v
```

## CPU Fallback Tracing Tests

```{code-block} bash
pytest tests/integration/test_fallback_trace.py -v
```

## Qwen3 Inference Tests

```{code-block} bash
pytest tests/integration/test_qwen3_infer.py -v -s --device cuda
pytest tests/integration/test_qwen3_infer.py -v -s --device flagos
```

## Qwen3 Training Tests

```{code-block} bash
pytest tests/integration/test_qwen3_train.py -v -s --device cuda --steps 10
pytest tests/integration/test_qwen3_train.py -v -s --device flagos --steps 10
```

## Ascend Operator Tests

```{code-block} bash
FLAGOS_DISABLE_FLAGGEMS_PY=1 FLAGOS_BACKEND_CONFIG=torch_fl/backends_ascend.conf \
  pytest tests/integration/test_factory_ops.py -v --device flagos
```

```{note}
Most tests require a CUDA-capable GPU or appropriate hardware SDK (MACA cu-bridge, CANN toolkit) depending on the target platform.
```
