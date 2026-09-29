# Compile and Target

## Target-independent optimisation

```{code-block} python
import flagquantum as fq
import flagquantum.compiler as compiler

circuit = fq.Circuit(2).h(0).h(0).cx(0, 1)
optimized_ir = compiler.optimize(circuit)
result = fq.run(optimized_ir, options=fq.ExecutionOptions(precision="complex128"))
```

`optimize` returns a new `CircuitIR`, leaves the input unchanged, and applies canonical rewrites to a fixed point. It never selects or invokes an execution backend. A runnable example is `python -m examples.compiler_optimize`.

## Target-aware compilation

```{code-block} python
coupling = compiler.CouplingMap.line(circuit.n_qubits)
compiled_ir = compiler.compile(circuit, coupling_map=coupling, routing_strategy="auto")
print(compiled_ir.metadata["routing"])
```

The compiler emits only topology-valid two-qubit operations and records its routing decision in the metadata. Logical wire numbers are preserved. A runnable example is `python -m examples.target_aware_compilation`.

## Select a compiler for a hardware target

```{code-block} python
result = fq.run(
    circuit,
    compiler="qsteed",
    target="quafu:Baihua",
    shots=1024,
)
counts = result.measurement("counts").value[0]
```

The named compiler receives the current chip snapshot, selects a physical subgraph, and returns logical IR with an ordered physical mapping that FlagQuantum carries through packaging and submission. When `target_qubits` is provided, its order maps logical wires to physical qubits and compilation fails unless the target snapshot proves the selection is valid and connected; an explicit mapping is never silently replaced.

## Export

FlagQuantum programs can leave the framework for other toolchains:

| Format | Use |
| --- | --- |
| OpenQASM | Circuit exchange with Qiskit, PennyLane, Cirq, CUDA-Q, Azure Quantum, and OpenQASM-based devices |
| QCIS | Submission to QCIS-based providers |

Conversion at these boundaries is versioned and fail-closed: an operation, parameter expression, or control-flow construct that cannot be represented losslessly is rejected with machine-readable diagnostics rather than approximated. CUDA-Q export is one-way by design; external framework objects never enter the compiler or runtime layers.

## Compiler plugins

A compiler plugin registers one zero-argument factory in the `flagquantum.extensions` entry-point group and returns a manifest with the matching identity:

```{code-block} toml
[project.entry-points."flagquantum.extensions"]
"compiler.qsteed" = "flagquantum_compiler_qsteed:create_extension"
```

The extension implements `negotiate`, `start`, `compile`, and `close`; `compile` accepts FlagQuantum `CircuitIR`, an optional target mapping, and returns FlagQuantum `CircuitIR`. Compiler-specific objects stay inside the plugin, so installing a plugin never makes its dependency a FlagQuantum requirement and `import flagquantum` never activates it.
