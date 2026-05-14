# Architecture

FlagQuantum is organized into the following modules:

```
flagquantum/
├── devices/          # Quantum device implementations
├── ops/              # Quantum operations (gates, matrices, operators)
├── encoding/         # Data encoding methods
├── measure/          # Measurement utilities
└── utils/            # Helper functions (DTensor, interchange)
```

## Core Components

### Devices

The `devices` module provides quantum device implementations, including the `DistributedQuantumDevice` class that manages quantum states across multiple GPUs using PyTorch's distributed tensor (`DTensor`).

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
