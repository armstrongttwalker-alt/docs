# Features

FlagQuantum provides a comprehensive set of features for quantum circuit simulation:

- **Distributed Statevector Simulation**: Leverage multiple GPUs to simulate large quantum circuits using `DTensor` from `torch.distributed`

- **Automatic Resharding**: Intelligently redistributes statevectors to minimize communication overhead during gate operations

- **Comprehensive Gate Set**: Includes Pauli, Clifford, rotation, and controlled gates with parameterized support

- **Invertible Backpropagation**: Memory-efficient gradient computation for trainable quantum circuits

- **Custom Gate Registration**: Extend the library with your own gates without modifying the core

- **Post-Selection & Noise Models**: Built-in support for measurement post-selection and depolarizing noise

- **Flexible Encoding**: Multiple encoding schemes (angle, amplitude, basis) for classical data embedding
