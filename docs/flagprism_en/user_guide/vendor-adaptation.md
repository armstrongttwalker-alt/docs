# Chip Vendor Adaptation

This page summarizes the requirements for adapting FlagPrism Profiler and Debugger to a new chip vendor, based on `docs/CHIP_VENDOR_ADAPTATION_REQUIREMENTS.md`.

## Goal

After adaptation, a vendor platform must support:

- **Profiler**: start/stop chip performance collection and obtain kernel execution information and hardware metrics.
- **Debugger**: allocate device debug memory, pass debug pointers to the kernel, and retrieve debug data after kernel execution.
- **Zero overhead when disabled**: when Profiler or Debugger is not enabled, kernel compilation and execution behavior must not change.

Chip hardware performance depends on vendor-provided profiling capabilities (an API or command-line tool with parseable output). FlagPrism calls the vendor profiler, correlates results with Triton operators, and converts them to a unified format.

## Information categories

| Category | Information available | Depends on vendor profiler |
| --- | --- | --- |
| Basic instrumentation | kernel/op names, source location, op ID, dtype, shape, layout, access type | No |
| Numerical summary | element count, NaN/Inf/zero counts, finite mean/min/max, L2 norm | No |
| Chip performance | device execution time, compute utilization, bandwidth, cache, instruction stats, hardware counters | Yes |

Basic instrumentation and numerical summary are produced by FlagPrism itself as long as the chip supports Debugger hidden arguments and debug-record writes. Metrics not provided by the vendor are marked unsupported/unavailable without affecting the other categories.

## Profiler adaptation interface

Adaptation has three steps, with the full call order:
`makePlan -> doSetMode -> doStart -> startOp/stopOp -> doStop -> import`.

### 1. Declare capabilities and build a collection plan

`VendorAdapter` declares supported metrics and converts a user request into an actual plan:

- `getName()` / `getDeviceType()`
- `getSupportedVendorMetrics()`
- `makePlan(options)` -> `VendorProfilePlan` (enabled metrics, disabled metrics, reasons, vendor config)
- `getRuntimeProfiler()` -> the collection object
- `createImporter()` -> the result parser

A plan is a collection configuration, not a kernel execution plan. If a user requests unsupported metrics, the plan records them as disabled with a reason.

### 2. Start collection and mark operators

The `Profiler` interface implements `doStart()`, `doFlush()`, `doStop()`, and `doSetMode(options)`. `OpInterface` implements `startOp(scope)` and `stopOp(scope)` to correlate Triton ops with chip-side performance events.

### 3. Parse vendor performance data

`VendorMetricsImporter.import(metadata, plan)` converts the vendor's raw output into a unified `VendorProfileArtifact`. Structs such as `SessionProfileMetadata`, `VendorProfilePlan`, and `VendorProfileArtifact` are defined by FlagPrism.

## Debugger adaptation

The Debugger path requires the vendor backend to support hidden kernel arguments (for debug pointers) and device-side debug-record writes. The runtime must allocate debug memory, pass the pointers into the kernel, and retrieve records after execution. The dynamic collection and hidden-argument launch path is currently validated on Ascend/CANN9, Tianshu/CoreX 4.4, MUSA/mthreads 4.3.5, and NVIDIA CUDA; see the backend support matrix in `Debugger/README.md` for the latest status.
