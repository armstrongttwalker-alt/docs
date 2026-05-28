# Test operators, model inference, and hardware compatibility

This section covers how to test operators, model inference, and hardware compatibility.

## Basic operator tests

```{code-block} bash
export TORCH_DEVICE_BACKEND_AUTOLOAD=0

# Factory ops: create tensors on cuda and flagos devices
pytest tests/integration/test_factory_ops.py -v --device cuda
pytest tests/integration/test_factory_ops.py -v --device flagos
```

## Dispatch routing tests

```{code-block} bash
pytest tests/integration/ops/ -v
```

## CPU fallback tracing tests

```{code-block} bash
pytest tests/integration/test_fallback_trace.py -v
```

## Qwen3 inference tests

```{code-block} bash
pytest tests/integration/test_qwen3_infer.py -v -s --device cuda
pytest tests/integration/test_qwen3_infer.py -v -s --device flagos
```

## Qwen3 training tests

```{code-block} bash
pytest tests/integration/test_qwen3_train.py -v -s --device cuda --steps 10
pytest tests/integration/test_qwen3_train.py -v -s --device flagos --steps 10
```

## Ascend operator tests

```{code-block} bash
FLAGOS_DISABLE_FLAGGEMS_PY=1 FLAGOS_BACKEND_CONFIG=torch_fl/backends_ascend.conf \
  pytest tests/integration/test_factory_ops.py -v --device flagos
```

```{note}
Most tests require a CUDA-capable GPU or appropriate hardware SDK (MACA cu-bridge, CANN toolkit) depending on the target platform.
```
