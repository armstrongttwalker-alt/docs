# Operator Capabilities

An executable registered lowering for an operator on a given backend is not a
release or scalability claim. `yes` means the operator can be lowered on that
backend today; the support level of the execution path itself is published in
[Capabilities](capabilities.md).

| Operator | jax | mps | provider | pytorch | qasm | qcis | tensor_network |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `amplitude_damping` | no | no | no | yes | no | no | no |
| `bit_flip` | no | no | no | yes | no | no | no |
| `ccx` | yes | yes | yes | yes | yes | yes | yes |
| `cphase` | yes | yes | yes | yes | yes | no | yes |
| `crx` | yes | yes | yes | yes | yes | no | yes |
| `cry` | yes | yes | yes | yes | yes | no | yes |
| `crz` | yes | yes | yes | yes | yes | no | yes |
| `cswap` | yes | yes | yes | yes | yes | no | yes |
| `cx` | yes | yes | yes | yes | yes | yes | yes |
| `cy` | yes | yes | yes | yes | yes | yes | yes |
| `cz` | yes | yes | yes | yes | yes | yes | yes |
| `depolarizing` | no | no | no | yes | no | no | no |
| `h` | yes | yes | yes | yes | yes | yes | yes |
| `i` | yes | yes | yes | yes | yes | yes | yes |
| `phase` | yes | yes | yes | yes | yes | yes | yes |
| `phase_flip` | no | no | no | yes | no | no | no |
| `rx` | yes | yes | yes | yes | yes | yes | yes |
| `rxx` | yes | yes | yes | yes | yes | yes | yes |
| `ry` | yes | yes | yes | yes | yes | yes | yes |
| `ryy` | yes | yes | yes | yes | yes | yes | yes |
| `rz` | yes | yes | yes | yes | yes | yes | yes |
| `rzz` | yes | yes | yes | yes | yes | yes | yes |
| `s` | yes | yes | yes | yes | yes | yes | yes |
| `sdg` | yes | yes | yes | yes | yes | yes | yes |
| `swap` | yes | yes | yes | yes | yes | yes | yes |
| `sx` | yes | yes | yes | yes | yes | yes | yes |
| `sxdg` | yes | yes | yes | yes | yes | yes | yes |
| `t` | yes | yes | yes | yes | yes | yes | yes |
| `tdg` | yes | yes | yes | yes | yes | yes | yes |
| `u1` | yes | yes | yes | yes | yes | yes | yes |
| `u2` | yes | yes | yes | yes | yes | yes | yes |
| `u3` | yes | yes | yes | yes | yes | yes | yes |
| `x` | yes | yes | yes | yes | yes | yes | yes |
| `y` | yes | yes | yes | yes | yes | yes | yes |
| `z` | yes | yes | yes | yes | yes | yes | yes |

Noise channels (`bit_flip`, `phase_flip`, `depolarizing`, `amplitude_damping`)
are registered on the PyTorch path only. They are consumed by the noise model
rather than executed as circuit instructions.

## Reading the columns

| Column | Backend |
| --- | --- |
| `pytorch` | Local PyTorch execution, the reference path |
| `jax` | Optional JAX kernels behind the PyTorch interface |
| `mps` | Matrix product state execution |
| `tensor_network` | Tensor-network execution |
| `qasm` | OpenQASM export |
| `qcis` | QCIS export |
| `provider` | Sealed provider and hardware deployment packages |

The table is generated from the repository's `operator_manifest.json`; treat the
manifest as authoritative and this page as its rendering.
