# Install FlagQuantum

Read [Requirements](requirements.md) before proceeding.

## Install the released package

```bash
python -m pip install flagquantum
```

## Install the development version

```bash
git clone https://github.com/flagos-ai/FlagQuantum.git
cd FlagQuantum
python -m pip install -e ".[dev]"
```

## Verify the installation

```bash
python -c "import flagquantum as fq; print(fq.__version__)"
```

The package is imported with `import flagquantum as fq`, and importing it does
not import optional dependencies, discover extensions, or activate a provider.

## Run a local example

The maintained local path needs no credentials, no remote resources, and no
optional backend:

```bash
python -m examples.local.simulate
python -m examples.local.measure
python -m examples.local.train
```

A development installation also runs the shipped examples directly, for example:

```bash
python examples/quick_start.py --mode sv --steps 40
```

## Optional dependency groups

Install an optional capability only when you need it:

```bash
python -m pip install "flagquantum[jax]"
python -m pip install "flagquantum[viz]"
python -m pip install "flagquantum[qiskit]"
```

Interoperability bridges keep their external framework on their own side of the
boundary: importing FlagQuantum never imports Qiskit, PennyLane, Cirq, CUDA-Q,
or a provider SDK.

## Next steps

Continue with the [quick start](quick-start.md), or go straight to
[Simulation modes](../user_guide/simulation-modes.md) to choose a representation
and [Remote execution](../user_guide/remote-execution.md) for provider targets.
