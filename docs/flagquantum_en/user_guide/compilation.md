# Compilation

Compilation transforms a program without executing it. FlagQuantum separates
target-independent optimization from target-aware lowering.

## Optimize

```{code-block} python
import flagquantum as fq
import flagquantum.compiler as compiler

circuit = fq.Circuit(2).h(0).h(0).cx(0, 1)
optimized_ir = compiler.optimize(circuit)
result = fq.run(optimized_ir)
```

`optimize` returns a new `CircuitIR`, leaves the input unchanged, and applies
canonical rewrites to a fixed point, removing redundant gates while preserving
the numerical result.

## Compile for a target topology

```{code-block} python
coupling = compiler.CouplingMap.line(circuit.n_qubits)
compiled_ir = compiler.compile(
    circuit,
    coupling_map=coupling,
    routing_strategy="auto",
)
print(compiled_ir.metadata["routing"])
```

The compiler emits only topology-valid two-qubit operations, records its routing
decision, and does not select or invoke an execution backend. Use it when a
concrete coupling map or target-aware lowering is required.

## Select a compiler for a provider journey

```{code-block} python
import flagquantum as fq

compiled = fq.compile(fq.Circuit(2).h(0).cx(0, 1), compiler="qsteed", target="quafu:Baihua")
result = fq.run(
    fq.Circuit(2).h(0).cx(0, 1),
    compiler="qsteed",
    target="quafu:Baihua",
    shots=1024,
)
```

`fq.compile` is the direct compiler-selection journey. Logical wire numbers are
preserved and an ordered physical `target_qubits` mapping travels through
packaging and submission; omitting `compiler` means provider-side compilation.
The selected compiler, provider, and any fallback are always explicit.

## Compiler plugins

A compiler plugin is an independently installed package that owns its compiler
dependency and translation code, for example
`flagquantum-compiler-qsteed`:

```{code-block} toml
[project.entry-points."flagquantum.extensions"]
"compiler.qsteed" = "flagquantum_compiler_qsteed:create_extension"
```

The plugin receives a `CircuitIR`, the target snapshot, and an optional mapping,
and returns a `CircuitIR`; compiler-native objects stay inside the plugin.
Installing a plugin never imports or activates it during `import flagquantum`,
and independently installed plugins are discovered only through an explicit
discovery call with entry-point identity, capability negotiation, determinism,
lifecycle cleanup, and fail-closed errors covered by conformance tests. See
[Extensions](extensions.md).
