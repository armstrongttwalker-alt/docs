# FlagSparse Release Notes

## v0.1.0

Initial release of FlagSparse.

- **Added Features**

  - GPU sparse operations package with SpMV, SpMM, SpGEMM, SDDMM, gather, and scatter operators.
  - CSR and COO sparse format support.
  - SpSV and SpSM triangular solve operators.
  - FlagGems-style operator interface registry (`conf/operators.yaml`).
  - pytest accuracy suite with CPU-FP64 golden reference comparison.
  - Performance benchmark framework with two-level speedup reporting.
  - Native CLI `--help` and README command snippets in CI smoke tests.

- **Improved Features**

  - CPU-only CI pipeline with compile, format checks, lint, and smoke tests.
  - Release artifacts with SHA256SUMS manifest and checksum verification.
  - Nightly CPU check workflow for package, lint, and shared-runtime smoke tests.
  - Manual GPU accuracy smoke workflow for self-hosted runners.
  - Manual GPU benchmark workflow via GitHub Actions.
