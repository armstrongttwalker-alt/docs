# Architecture

FlagQuantum is organized into the following modules:

```
flagquantum/
├── devices/          # Quantum device implementations
├── drawer/           # Quantum circuit visualization
├── ops/              # Quantum operations (gates, matrices, operators)
├── encoding/         # Data encoding methods
├── measure/          # Measurement utilities
└── utils/            # Helper functions (DTensor, interchange)
```

## Core Components

### Devices

The `devices` module provides quantum device implementations, including the `DistributedQuantumDevice` class that manages quantum states across multiple GPUs using PyTorch's distributed tensor (`DTensor`).

### Drawer

The drawer module enables circuit visualization with two modes:

- Text Mode:  Unicode-based diagrams supporting multi-qubit gate symbols (╭╰├│), auto line-wrapping (max_length), and configurable parameter precision.
- MPL Mode: Publication-quality Matplotlib figures with layer-based layout (same-column gates share x-coordinate), initial states (|0⟩), measurement symbols, and a professional color scheme:
  - Fixed gates (H, X, Y, Z): soft blue #7B9EC2
  - Rotation gates (RX, RY, RZ): red #E15759
  - Phase gates (P): plum purple #DDA0DD
  - CPhase / SWAP: teal #76B7B2
  - CRX/CRY/CRZ: orange #F28E2B
  - RXX/RYY/RZZ: light pink #FFB6C1 (box layout, no control points)
  - Supports Toffoli (CCX), Fredkin (CSWAP), multi-qubit gates

### Operations

The `ops` module contains all quantum gate implementations:

- **Pauli gates**: X, Y, Z
- **Clifford gates**: H, S, SDG, CX, CZ, SWAP
- **Rotation gates**: RX, RY, RZ with parameterized support
- **Controlled gates**: Controlled versions of any single-qubit gate
- **Custom gates**: User-registered gates via the gate registry

### Encoding

The `encoding` module provides methods for embedding classical data into quantum states:

- **Angle encoding**: Maps classical features to rotation angles
- **Amplitude encoding**: Encodes data directly into statevector amplitudes
- **Basis encoding**: Maps binary data to computational basis states
- **General encoder**: Custom encoding circuits defined by the user

### Measurement

The `measure` module provides measurement utilities including:

- **Z-basis measurement**: Standard computational basis measurement
- **Expectation values**: Compute expectation values of observables
- **Post-selection**: Filter measurement outcomes based on conditions

### Utilities

The `utils` module contains helper functions for:

- DTensor operations and sharding
- State interchange between devices
- Device management and configuration
- OpenQASM 2.0/3.0 exporter
