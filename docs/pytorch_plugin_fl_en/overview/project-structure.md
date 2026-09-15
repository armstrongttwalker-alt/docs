# Project Structure

```
PyTorch-Plugin-FL/
├── include/                  # Public headers
│   ├── flagos.h              #   Unified runtime API (memory, stream, device)
│   └── macros.h              #   Common macros
├── accelerator/              # Hardware abstraction layer
│   ├── csrc/cuda/            #   CUDA runtime implementation
│   ├── csrc/maca/            #   MACA cudart shim (symbol version compatibility)
│   └── csrc/ascend/          #   Ascend runtime (ACL-based memory, stream, device)
├── csrc/
│   ├── aten/                 # ATen operator layer
│   │   ├── common.{h,cc}     #   Backend config loading, FlagosDevice enum
│   │   ├── dispatch_stub.h   #   Lightweight dispatch stub (replaces PyTorch DispatchStub)
│   │   ├── device_boxing.h   #   Zero-copy flagos↔CUDA tensor metadata conversion
│   │   ├── register.cc       #   PrivateUse1 dispatch key registration
│   │   ├── {op}.{h,cc}       #   Per-operator stub definitions (add, mm, silu, etc.)
│   │   ├── factory_ops/      #   Basic operators (empty, copy, contiguous, set, fallback)
│   │   ├── functional_ops/   #   Compute operators (mm, bmm, cat, embedding, softmax, etc.)
│   │   └── backends/         #   Backend-specific kernel implementations
│   │       ├── cuda/         #     CUDA kernels (cuBLAS, modified PyTorch kernels)
│   │       ├── flagos/       #     FlagGems C++ native API wrappers
│   │       └── ascend/       #     Ascend kernels (ACL NN API)
│   └── runtime/              # Device runtime
│       ├── device_allocator  #   Device memory allocator
│       ├── host_allocator    #   Pinned memory allocator
│       ├── guard             #   DeviceGuard implementation
│       ├── generator         #   RNG generator
│       ├── hooks             #   Runtime hooks
│       └── accelerator/      #   Hardware abstraction layer
│           ├── cuda/         #     CUDA runtime implementation
│           ├── maca/         #     MACA cudart shim (symbol version compatibility)
│           └── ascend/       #     Ascend runtime (ACL-based memory, stream, device)
├── torch_fl/
│   ├── __init__.py           # Plugin entry point: register device, load FlagGems operators
│   ├── flagos/               # Python device module (stream, event, RNG, AMP)
│   ├── accelerator/          # Python accelerator module (MACA shim loader)
│   ├── backends.conf         # Default backend routing config (CUDA/FlagGems)
│   ├── backends_ascend.conf  # Ascend backend routing config (all ops → ascend)
│   ├── distributed.py        # Distributed training support (DDP patch)
│   ├── integration.py        # FlagGems operator registration logic
│   ├── csrc/                 # C extension (module.cc, stub.c)
│   └── lib/                  # Compiled shared libraries (libtorch_fl.so, libflagos.so)
├── tests/
│   ├── integration/          # Automated integration tests
│   │   ├── ops/              #   Per-operator dispatch tests
│   │   ├── test_qwen3_*.py   #   End-to-end model tests
│   │   └── conftest.py       #   Pytest configuration
│   ├── manual/               # Manual test scripts
│   └── common/               # Test utilities
├── debug/                    # Development notes and debug scripts
├── cmake/                    # CMake modules
├── setup.py                  # CMake build entry point
└── pyproject.toml
```
