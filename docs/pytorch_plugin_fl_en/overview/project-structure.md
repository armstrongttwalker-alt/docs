# Project Structure

```
PyTorch-Plugin-FL/
├── accelerator/              # Hardware abstraction layer
│   ├── include/flagos.h      #   Unified runtime API (memory, stream, device)
│   ├── csrc/cuda/            #   CUDA runtime implementation
│   ├── csrc/maca/            #   MACA cudart shim (symbol version compatibility)
│   └── csrc/ascend/           #   Ascend runtime (ACL-based memory, stream, device)
├── csrc/
│   ├── aten/                 # ATen operator layer
│   │   ├── common.{h,cc}    #   Backend config loading, FlagosDevice enum
│   │   ├── dispatch_stub.h   #   Lightweight dispatch stub (replaces PyTorch DispatchStub)
│   │   ├── device_boxing.h   #   Zero-copy flagos↔CUDA tensor metadata conversion
│   │   ├── register.cc       #   PrivateUse1 dispatch key registration
│   │   ├── factory_ops/      #   Basic operators (empty, copy, contiguous, set, fallback)
│   │   ├── functional_ops/   #   Compute operators (mm, bmm, cat, embedding, softmax, etc.)
│   │   ├── backends/ascend/  # Ascend kernel implementations (ACL NN API)
│   │   └── native/cuda/      #   Modified CUDA kernels (Loops.cuh with relaxed device checks)
│   └── runtime/              # Device runtime
│       ├── device_allocator  #   Device memory allocator
│       ├── host_allocator    #   Pinned memory allocator
│       ├── guard             #   DeviceGuard implementation
│       └── generator         #   RNG generator
├── torch_fl/
│   ├── __init__.py           # Plugin entry point: register device, load FlagGems operators
│   ├── flagos/               # Python device module (stream, event, RNG, AMP)
│   ├── backends_ascend.conf   # Ascend backend routing config (all ops → ascend)
│   ├── distributed.py        # Distributed training support (DDP patch)
│   ├── integration.py        # FlagGems operator registration logic
│   └── csrc/                 # C extension (module.cc, stub.c)
├── tests/
│   ├── integration/          # Automated integration tests
│   └── manual/               # Manual test scripts
├── setup.py                  # CMake build entry point
└── pyproject.toml
```
