# Reference

Stable interfaces, capability maturity, runtime contracts, and current support boundaries.

## Stable API and interfaces

- [API reference](api.md) — the curated `import flagquantum as fq` surface, with runnable examples.
- [Capability catalog](capabilities.md) — what is released, production-supported, development evidence, or experimental.

## Contracts and policies

| Topic | Where it is defined |
| --- | --- |
| Stable names | A checked API manifest, rendered in the API reference |
| Operator and backend lowering | One typed operator registry, rendered as a generated capability table |
| Runtime evidence fields | Versioned runtime contracts; the vocabulary is a contract, not proof a run occurred |
| Measured benchmark evidence | Audited artifacts with provenance; plans and fixtures are excluded |
| Supported Python and dependencies | The package metadata: Python 3.10–3.12, PyTorch 2.5–2.13 |

## Claim boundaries

Local execution, registered lowering support, distributed development probes, and release-grade scalability are separate claims. A registered lowering proves that an operator can be executed on a path, not that the path is production-supported at scale. Distributed and accelerator claims additionally require runtime-generated evidence accepted by the repository's benchmark audit and release policy.

Planned capabilities belong in roadmap documents and are not listed as supported until executable manifests and tests exist.

## Upstream references

The FlagQuantum repository keeps the full reference set: the API reference, the runtime architecture and configuration references, the known-limitations catalog, the testing manual, and the roadmap. Values published here are taken from that source of truth; where a support boundary changes, the upstream reference and this docset are updated together.
