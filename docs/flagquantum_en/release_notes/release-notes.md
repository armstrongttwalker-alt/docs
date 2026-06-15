# Release Notes

## v0.1.0

```{note}
This is a preview release. The version number shown is a pre-release identifier and may change upon final release. Content in this preview is for reference only and does not constitute a commitment or warranty for the final product.
```

- **Added features**

  - Initial release of FlagQuantum, a high-performance distributed quantum statevector simulator built on PyTorch.

  - Distributed statevector simulation using `DTensor` from `torch.distributed` for multi-GPU execution.

  - Automatic resharding to minimize communication overhead during gate operations.

  - Comprehensive gate set including Pauli, Clifford, rotation, and controlled gates with parameterized support.

  - Invertible backpropagation for memory-efficient gradient computation.

  - Custom gate registration system for extending the library.

  - Post-selection and noise models including depolarizing noise.

  - Flexible data encoding with angle, amplitude, and basis encoding schemes.
  
  - Professional quantum circuit visualization capabilities.

  - OpenQASM 2.0/3.0 exporter for real quantum hardware and cross-framework execution.
