# Getting Started

This section covers the requirements for running FlagQuantum and walks through
installation, verification, and a first execution.

```{toctree}
:maxdepth: 2

requirements.md
install.md
```

The fastest path from a source checkout is the local execution example, which
needs no accelerator or provider account:

```bash
python -m examples.cpu_statevector
```

It builds a Bell-state circuit, creates an inspectable plan, runs that exact plan
on the CPU statevector engine, and checks the double-precision result against
its analytical state.
