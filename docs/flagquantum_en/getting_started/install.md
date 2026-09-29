# Install FlagQuantum

Read [Requirements](requirements.md) before proceeding.

## 1. Install FlagQuantum

The released version from PyPI:

```{code-block} shell
python -m pip install flagquantum
```

The development version from source, with development tooling:

```{code-block} shell
git clone https://github.com/flagos-ai/FlagQuantum.git
cd FlagQuantum
python -m pip install -e ".[dev]"
```

Add the optional groups you need in the same command, for example
`python -m pip install -e ".[dev,viz]"` or, on a released install,
`python -m pip install "flagquantum[qiskit,pennylane]"`.

## 2. Verify the installation

```{code-block} python
import flagquantum as fq

print(fq.__version__)
```

## 3. Run a first execution

```{code-block} shell
python -m examples.cpu_statevector
```

The example runs one complete local journey: build a circuit, create an
inspectable plan, execute that plan on the CPU statevector engine, and compare
the result with an analytical reference. The three smallest maintained programs
are:

```{code-block} shell
python -m examples.local.simulate
python -m examples.local.measure
python -m examples.local.train
```

## 4. Optional development containers

The repository ships development container definitions for a CPU image, a
CUDA image, and variants without JAX that carry QSteed and the compiler plugin
in one environment. They are the recommended way to reproduce the tutorial and
interoperability dependency sets. See the container guide in the repository for
the image list and launch commands.

## Migrating from the pre-release v0.1 API

The v0.1 `DistributedQuantumDevice`, `GeneralEncoder`, `InvertibleUnitary`,
DTensor interchange helpers, device-oriented gates, and the device-oriented
measurement path are not part of the v0.2 product and have no compatibility
layer. Port those programs to `fq.Circuit`, `fq.Module`, `fq.plan`, and
`fq.run`; see [Basic Usage](../user_guide/basic-usage.md) and
[Training](../user_guide/training.md).
