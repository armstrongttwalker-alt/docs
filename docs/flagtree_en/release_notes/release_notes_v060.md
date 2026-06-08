# FlagTree 0.6.0 Release

```{note}
This is a preview release. The version number shown is a pre-release identifier and may change upon final release. Content in this preview is for reference only and does not constitute a commitment or warranty for the final product.
```

- **Added Features**
  - Added Moore Threads as a new backend to the 3.6.x branch with support of the following TLE primitives:
    - TLE-Lite:
      - Added the following ops: `tle.load(is_async=True)`, `tl.load`/`tl.store` (for `local_ptr`), and `tl.atomic_add/and/cas/max/min/or/xchg/xor` (for `local_ptr`). Supported on Moore Threads.
    - TLE-Struct:
      - Added the following ops: `tle.gpu.alloc`, `tle.gpu.local_ptr`, `tle.gpu.copy`, and `tle.gpu.memory_space`. Supported on Moore Threads.
