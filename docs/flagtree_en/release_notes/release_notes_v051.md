# FlagTree 0.5.1 Release

```{note}
This is a preview release. The version number shown is a pre-release identifier and may change upon final release. Content in this preview is for reference only and does not constitute a commitment or warranty for the final product.
```


- **Added Features**
  - 3.6.x branch:
    - TLE-Lite:
      - Added the `tle.cumsum` scan and sort op. Supported on NVIDIA.
      - Added the following pipeline ops: `tle.pipe`, `tle.pipe.reader`, `tle.pipe.reader.wait`, `tle.pipe.reader.release`, `tle.pipe.writer.acquire`, `tle.pipe.writer.commit`, and `tle.pipe.writer.close`. Supported on NVIDIA.
    - TLE-Struct:
      - Added the `tle.gpu.warp_specialize` execution orchestration op. Supported on NVIDIA.
    - TLE-Raw:
      - Added a new method of integrating CUDA kernel into LLVM inline path for maximum fine-grained control. Supported on NVIDIA.
    - Upgraded the following backends to Triton 3.6: enflame, hcu, and mthreads.
    - Added  DAMO Academy thrive as a new backend.
  - 3.3.x branch:
    - Added ARM64 CPU as a new backend that supports TLE-ARM64.

- **Enhanced Features**
  - Enhanced FLIR.
