# Release Notes

## v0.1.0


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
