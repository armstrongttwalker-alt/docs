# Extensions

The approved, pre-freeze SDK contract lives under
`flagquantum.ecosystem.extensions` and adds no root exports. Extensions declare
a versioned manifest, negotiate capabilities before activation, and are
installed into a task-local immutable registry. Individual extensions remain
experimental by default and require independent qualification.

## Extension kinds

Execution backends, circuit compilers, compiler passes, kernels, operators,
devices, providers, measurement collectors, and planners. A circuit compiler
accepts and returns FlagQuantum `CircuitIR`; compiler passes are the smaller
transformation hook.

```{code-block} python
from flagquantum.ecosystem.extensions import (
    ExtensionManifest, discover_extensions, extension_scope,
)

manifest = ExtensionManifest(
    name="my-backend",
    version="0.1.0",
    kind="backend",
    capabilities=frozenset({"circuit_ir"}),
)
```

## Discovery and lifecycle

Installed packages are discovered only through an explicit, kind-specific
`discover_extensions(...)` call; they register zero-argument factories in the
`flagquantum.extensions` entry-point group. Discovery validates the entry-point
identity against the manifest and adds the result to the existing immutable
registry instead of introducing a second plugin registry. Importing FlagQuantum
does not discover, import, or activate extensions.

- SDK API mismatches fail during registration with upgrade guidance.
- Deprecations declare a removal version in the manifest and must retain the
  previous contract for that window.
- Capability negotiation is fail-closed: missing dtype, device, gradient, or
  semantic capabilities produce blockers before activation.
- Compatibility failures are `flagquantum.errors.CapabilityError`; lifecycle
  failures are `flagquantum.errors.ExecutionError`, so applications handle
  extensions with the same stable error categories as core execution.

## Isolation and credentials

Registration returns a new immutable registry and `extension_scope` uses
task-local context, so an extension never mutates root exports, core operator
tables, or another task's registry. Lifecycle wrappers translate extension
exceptions and run cleanup after failed startup and at normal scope exit. Raw
tokens, passwords, API keys, secrets, and credentials are rejected from
`ExtensionConfig`; providers obtain credentials through a host-owned resolver
and must not place them in manifests, errors, measurements, or serialized
payloads.

Extensions execute with the Python process's authority: discovery is not a
sandbox, and only trusted packages should be installed. Conformance helpers
cover manifest and payload serialization, capability honesty, PyTorch
gradients, dtype and device preservation, `CircuitIR` ownership, determinism,
isolated errors, and cleanup.
