# Custom Operations

## Custom matrix operations in a circuit

A custom operation applies a caller-supplied unitary matrix to one or more wires:

```{code-block} python
import torch
import flagquantum as fq

matrix = torch.tensor([[0, 1], [1, 0]], dtype=torch.complex64)
circuit = fq.Circuit(2).h(0).matrix(matrix, wires=(1,)).cx(0, 1)
result = fq.run(circuit)
```

The matrix shape determines the wire arity, and shape, finite-value, and unitarity checks fail closed before the instruction enters the IR. Custom matrices are stored in the versioned IR, so a circuit that uses one serializes, plans, and compiles like any other circuit.

## Discover the registered operators

Every gate and lowering available to the runtime comes from one typed operator registry, and the generated capability table reports which execution paths have an executable lowering:

```{code-block} python
from flagquantum import operators

print(operators.gate_info("ry"))
```

Gate matrices and their inverses are exposed through the same registry, which is what makes the compiler's canonical rewrites and the capability table consistent with what the runtime can actually execute.

## Extend FlagQuantum with an extension

Backends, kernels, operators, compilers, compiler passes, devices, providers, measurement collectors, and planners are extension kinds. An extension is an independently installed Python package that declares a versioned manifest and negotiates capabilities before activation:

```{code-block} python
from flagquantum.ecosystem.extensions import (
    ExtensionManifest, discover_extensions,
)

manifest = ExtensionManifest(
    name="my-kernel",
    version="0.1.0",
    kind="kernel",
    capabilities=frozenset({"complex64"}),
)
```

Installed extensions are discovered only through an explicit, kind-specific `discover_extensions(...)` call; importing FlagQuantum never discovers, imports, or activates one. Registration returns a new immutable registry, lifecycle cleanup runs on normal exit and after a failed start, and credential material is rejected from extension configuration. Individual extensions stay experimental until separately qualified, and discovery is not a sandbox: install only trusted packages.

## Compiler plugins

Circuit compilers are a specific extension kind that accepts and returns FlagQuantum `CircuitIR`. See [Compile and Target](compile-and-target.md) for the plugin lifecycle and a working QSteed journey.
