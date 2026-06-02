# FlagTree 0.5.1 Release

- **Added Features**
  - 3.6 branch:
    - TLE-Lite:
      - Added the `tle.cumsum` scan and sort op. Supported on NVIDIA and Enflame.
      - Added the following pipeline ops: `tle.pipe`, `tle.pipe.reader`, `tle.pipe.reader.wait`, `tle.pipe.reader.release`, `tle.pipe.writer.acquire`, `tle.pipe.writer.commit`, and `tle.pipe.writer.close`. Supported on NVIDIA.
    - TLE-Struct:
      - Added the `tle.gpu.warp_specialize` execution orchestration op. Supported on NVIDIA and Enflame.
  - 3.3.x branch:
    - Added CPU ARM as a new backend

- **Enhanced Features**
  - Enhanced FLIR.
