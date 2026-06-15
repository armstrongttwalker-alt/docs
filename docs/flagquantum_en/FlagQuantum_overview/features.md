# Features

FlagQuantum provides a comprehensive set of features for quantum circuit simulation:

## Distributed Simulation

- Multi-GPU Statevector Simulation: Leverage PyTorch's DTensor to distribute quantum states across multiple GPUs, scaling to larger qubit counts than single-GPU simulators.
- Automatic Resharding: Intelligently redistribute statevectors during gate operations to minimize communication overhead and maximize performance.

## Gate Set & Extensibility

- Comprehensive Gate Set: Includes Pauli (X, Y, Z), Clifford (H, S, SDG, CX, CZ, SWAP), rotation gates (RX, RY, RZ), and parameterized controlled gates.
- Custom Gate Registration: Extend the library with user-defined gates through the gate registry without modifying core code.

## Advanced Capabilities

- Invertible Backpropagation: Memory-efficient gradient computation for trainable quantum circuits, enabling quantum machine learning workflows.
- Post-Selection & Noise Models: Built-in support for measurement post-selection and depolarizing noise models for realistic simulation.
Data Encoding

## Data Encoding

- Flexible Encoding Schemes: Multiple methods for embedding classical data into quantum states — angle encoding, amplitude encoding, and basis encoding — plus a general user-defined encoder.
Visualization & Interoperability

## Visualization & Interoperability

- Circuit Visualization: Two-mode visualizer — Unicode text mode for terminal use and Matplotlib publication-quality mode with professional color schemes, layer-based layout, initial state display (|0⟩), and measurement symbols.
- OpenQASM 2.0/3.0 Export: Export circuits to run on real quantum hardware platforms including IBM Quantum, AWS Braket, Azure Quantum, IonQ, and Rigetti.
Ecosystem Integration
FlagQuantum is a core component of FlagOS, an open-source AI system software stack designed to foster an open technology ecosystem through seamless integration of diverse models, systems, and chips. Within FlagOS, FlagQuantum works alongside other components to enable end-to-end quantum-classical workflows.

## Ecosystem Integration

FlagQuantum is a core component of FlagOS, an open-source AI system software stack designed to foster an open technology ecosystem through seamless integration of diverse models, systems, and chips. Within FlagOS, FlagQuantum works alongside other components to enable end-to-end quantum-classical workflows.