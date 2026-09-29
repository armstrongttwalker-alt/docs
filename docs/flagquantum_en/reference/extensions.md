# Extension SDK

The extension SDK lets a separately installed package contribute an execution backend, a circuit compiler, a compiler pass, a kernel, an operator, a device, a provider, a measurement collector, or a planner, without becoming a runtime dependency of FlagQuantum.

## Where it lives

The approved, pre-freeze SDK contract lives under `flagquantum.ecosystem.extensions` and adds no root exports. Extensions declare a versioned manifest, negotiate capabilities before activation, and are installed into a task-local immutable registry. The namespace moved to its current location without a compatibility layer, and import paths for the submodule remain equivalent.

## How an extension is written

A package registers one zero-argument factory in its entry-point group and returns a manifest with a matching identity:

```{code-block} python
from flagquantum.ecosystem.extensions import ExtensionManifest

ExtensionManifest(
    name="qsteed",
    version="0.1.0",
    kind="compiler",
    capabilities=frozenset({"circuit_ir"}),
)
```

A circuit compiler implements negotiation, start, compile, and close. `compile` accepts a FlagQuantum `CircuitIR`, an optional target mapping, and returns a FlagQuantum `CircuitIR`; third-party compiler objects stay inside the plugin. A compiler pass is the smaller transformation hook and exchanges the same IR boundary.

## Discovery and activation

Installed packages are discovered only through an explicit, kind-specific discovery call. Discovery validates the entry-point identity against the manifest and adds the result to the existing immutable registry rather than introducing a second plugin registry. Importing FlagQuantum never discovers, imports, or activates an extension.

A user-facing integration names a compiler or provider explicitly and never relies on implicit selection:

```{code-block} python
import flagquantum as fq

result = fq.run(circuit, compiler="qsteed", target="quafu:Baihua", shots=1024)
```

## Compatibility lifecycle

- SDK API mismatches fail during registration with upgrade guidance.
- Individual extensions are experimental by default; stabilisation requires conformance, security review, documentation, and a declared compatibility window.
- Deprecations declare a removal version in the manifest and must retain the previous contract for that window.
- Capability negotiation is fail-closed: a missing dtype, device, gradient, or semantic capability produces blockers before activation.

## Isolation and security

- Registration returns a new immutable registry, and scopes are task-local. An extension never mutates root exports, core operator tables, or another task's registry.
- Lifecycle wrappers translate extension exceptions and attempt cleanup after a failed start; cleanup also runs at normal scope exit.
- Raw tokens, passwords, API keys, secrets, and credentials are rejected from extension configuration. Providers must obtain credentials through a host-owned resolver and must not place them in manifests, errors, measurements, or serialized payloads.
- Extensions execute with the authority of the Python process. Discovery is not a sandbox: install only trusted packages.

## Conformance

The SDK supplies reusable backend, provider, and circuit-compiler checks that cover manifest and payload serialization, capability honesty, PyTorch gradients, dtype and device preservation, IR ownership, determinism, isolated errors, and cleanup. Passing them is a prerequisite for stabilising an extension, not a substitute for independent qualification of the extension itself.
