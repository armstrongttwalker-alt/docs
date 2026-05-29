# FlagTree 0.5.1 Release

- **Added Features**
  - Officially released **TLE-Raw** feature on NVIDIA and Enflame (Triton 3.6):
    - Breaks the abstract boundaries of DSL and supports inline native code from vendors.
    - Enables direct generation of target instructions through the vendor's private compilation pipeline, bypassing the intermediate conversion overhead of general-purpose compilers.
    - Grants expert-level users absolute control over instruction scheduling, register allocation, and underlying synchronization primitives.
  - Extended **TLE-Lite** and **TLE-Struct GPU** support to the **Enflame** backend (Triton 3.6), in addition to NVIDIA:
    - TLE-Lite: 31 core primitives including `tle.load(is_async=True)`, `tle.extract_tile`, `tle.insert_tile`, `tle.device_mesh`, `tle.sharding`, `tle.distributed_barrier`, `tle.remote`, and more.
    - TLE-Struct GPU: `tle.gpu.alloc`, `tle.gpu.copy`, `tle.gpu.local_ptr`, and `tle.gpu.local_ptr` (for remote).
  - Extended **warp specialization** and **explicit pipe** support (Triton 3.6):
    - `tle.gpu.warp_specialize` enables explicit creation of warp-specialized regions within the same CTA, placing different JIT functions into different warp partitions.
    - `tle.pipe` provides typed pipe descriptors for CTA-level producer/consumer dataflow, ring-buffer stage reuse, and synchronization edges, supporting both SPSC and SPMC patterns.
  - Added **Scan/Sort Ops** in TLE-Lite (Triton 3.6):
    - `tle.cumsum` computes exclusive cumulative sum and total sum along an axis in one operation, suitable for top-k, histogram prefix, stream compaction, and block-level partition logic.
  - **Enflame** backend upgraded to Triton 3.6 with full TLE suite (TLE-Lite, TLE-Struct GPU, TLE-Raw, HINTS) and CI/CD.
  - **Moore Threads (mthreads)** backend upgraded to Triton 3.6 with CI/CD.
  - **HYGON (hcu)** backend upgraded to Triton 3.6 with CI/CD.
  - **Moore Threads (mthreads)** backend upgraded to Triton 3.2 with CI/CD.
  - Added `nlohmann-json3-dev` as a required Ubuntu system dependency.
