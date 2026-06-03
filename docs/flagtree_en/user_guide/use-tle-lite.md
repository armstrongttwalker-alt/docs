# Use TLE-Lite

This section introduces how to use TLE-Lite. TLE-Lite is available on trition_3.6.x branch.

## Memory management

You can use the following operations to manage the memory.

### tle.load

`tle.load` loads a tensor asynchronously from GMEM. It supports asynchronously hint.

```{code-block} python
x = tle.load(..., is_async=True)
```

## Tensor slicing

Splits the input tensor into a grid of sub-tiles based on the specified sub-tile shape, and extracts the sub-tile at the given coordinates.
GPU: Supports extraction into registers and shared memory.

### tle.extract_tile

Splits the input tensor into a grid of sub-tiles based on the specified sub-tile shape, and extracts the sub-tile at the given coordinates.

Supports extraction into registers and shared memory.

```{code-block} python
# x is [4, 4]
# z is [2, 2]
# Split x into a sub-tile grid with shape=[2, 2], and extract the sub-tile at [0, 0]
z = x.extract_tile(index=[0, 0], shape=[2, 2])
```

### tle.insert_tile

Splits the input tensor into a grid of sub-tiles based on the sub-tile shape, and updates the sub-tile at the specified coordinates with a new tile.

Supports updates from registers and shared memory.

```{code-block} python
# x is [4, 4], y is [2, 2], z is [4, 4]
# Split x into sub-tiles of shape=[2, 2], update the [0, 0] sub-tile with y, and return the full [4, 4] tensor
z = x.insert_tile(y, index=[0, 0])
```

## Scan and sort Ops
Scan and sort Ops provide partial tensor primitives such as prefix, rank, and selection, suitable for histogram-based top-k, stream compaction, and block-level sorting and bucketing scenarios.

TLE-Lite keeps these operations as high-level semantics rather than binding them to a specific hardware implementation: users describe the scan and sort intent, and the backend selects register or shared memory lowering strategies based on the hardware.

### tle.cumsum

`tle.cumsum(input, axis=0, reverse=False, dtype=None)` computes exclusive cumulative sum and total sum along the `axis` dimension in one operation.

- **Signature**: `tle.cumsum(input, axis=0, reverse=False, dtype=None)`
- **Purpose**: Uses a single semantic scan op to compute both the exclusive prefix/suffix sum and total sum of a block tensor.
- **Returns**: `(exclusive_sum, total_sum)`.
- **Typical scenarios**: top-k, histogram prefix, stream compaction, and block-level partition logic requiring partial rank/offset.
- `exclusive` has the same shape as `input`; `total` is the scalar sum of the scanned block.
- `reverse=True` indicates a reversed exclusive sum, suitable for suffix count in descending radix/top-k selection.
- `dtype` can explicitly control the accumulation/result type. By default, narrow integers are promoted to 32-bit integers, and bfloat16 is promoted to float32.
- For inclusive cumulative sum, use `exclusive_sum + input`.
- Use explicit mask loads for invalid lanes and set inactive lanes to 0, ensuring `total_sum` only counts valid elements.
- Supported scope is static rank-1 block tensors with `axis=0`; this covers the histogram and radix-selection workloads already used by TLE top-k kernels.

Simple example:

```{code-block} python
exclusive, total = tle.cumsum(x, axis=0)
inclusive = exclusive + x
```

## Pipeline

### Pipe and stage

`tle.pipe` describes an explicit dataflow edge between a producer and one or more consumers. It simultaneously records the shared-memory stage holding the logical chunk and the synchronization required to make that chunk visible to consumers, enabling CTA-level load/compute overlap and warp-specialized producer/consumer code to use a typed descriptor instead of manually writing multiple barriers.

- **Signature**: `tle.pipe(*, capacity, scope="cta", name=None, readers=None, one_shot=False, **fields)`
- **Purpose**: Creates a typed pipe for explicitly describing CTA-level producer/consumer dataflow, ring-buffer stage reuse, and synchronization edges.
- **Parameters**:
  - `capacity`: Compile-time positive integer indicating the number of pipe stages; each payload field's first dimension must equal `capacity`.
  - `scope`: Supported value is `"cta"`.
  - `name`: Optional pipe name for IR/diagnostics; must be a string if provided.
  - `readers`: Optional list of reader names; omitted means default SPSC reader; passed as `("left", "right")` for SPMC.
  - `one_shot`: Whether this is a single ready/full edge; suitable for startup data broadcast. `one_shot=True` does not support `close`.
  - `**fields`: One or more payload buffers, which must be shared-memory buffered tensors returned by `tle.gpu.alloc(..., scope=tle.gpu.smem)`, with rank >= 2.
- **Naming rules**:
  - Pipe field names and reader names must be valid Python identifiers.
  - Names must not start with `_`.
  - `fields` and `readers` are reserved names.
- `tle.pipe(...)` returns a pipe descriptor. It owns staged payload fields and creates producer/consumer endpoints via `writer()` and `reader(...)`.
- `capacity` stages form a ring buffer. `iter` maps to `stage = iter % capacity`, using a phase bit to distinguish reuse rounds.

### Producer

The producer holds `pipe.writer()`. It acquires a writable stage, fills all necessary fields for the logical chunk, and then commits the chunk, making the data observable to consumers.

- `pipe_value.writer()` → `pipe_writer`: Creates the single writer endpoint for the current pipe.
- The writer always sees all payload fields.
- `writer.acquire(iter)` → `pipe_slot`: Acquires a stage writable by the producer, returning a slot with the leading `capacity` dimension removed.
- Users should produce field data between `writer.acquire(iter)` and `writer.commit(iter)`.
- `writer.commit(iter)` → `None`: Marks the stage as ready, visible to subscribing consumers. All field writes for the same logical chunk must complete before commit.
- `writer.close(iter)` → `None`: Publishes a closed stage for close-aware consumer loops to exit or switch state. Pipes with `one_shot=True` do not support `close`.
- Commit is the producer-side visibility boundary.

### Consumer

The consumer holds `pipe.reader(...)`. It waits for published chunks, reads the returned slot, and releases the stage after all reads are complete.

- `pipe_value.reader(name=None, fields=None)` → `pipe_reader`: Creates a consumer endpoint.
- For SPSC pipes (`readers=None`), `name` must be omitted.
- For SPMC pipes (e.g., `readers=("mma", "epilogue")`), `name` must be passed and match a declared reader.
- `fields` can be a non-empty, compile-time tuple/list of unique payload field names; omitted means subscribing to all fields.
- Field-subset consumers only narrow the endpoint view and `wait().slot`; they do not create a new pipe.
- `reader.wait(iter)` → `pipe_wait_result`: Waits for a stage to be ready or closed, returning the slot and closed flag.
- Standard consumption paths read `wait_result.slot`; check `wait_result.is_closed` only when handling closure.
- `reader.release(iter)` → `None`: Releases the stage after consumption, allowing the producer to reuse it. Should be called after all `wait(iter).slot` reads are complete.
- Wait is the consumer-side visibility boundary; release is the consumer-side release signal.

### Payload fields

- `**fields` defines the data carried by each stage. Each field is exposed on the `pipe_slot` by name, e.g., `slot.q` or `slot.scale`.
- `pipe_slot` also exposes `fields: dict[str, tle.gpu.buffered_tensor]`.
- `pipe_wait_result` contains `slot: pipe_slot` and `is_closed: tl.tensor`.
- A pipe can carry one or multiple fields. When splitting pipes, split by logical lifecycle and reader protocol, not by underlying transport.
- Different fields in the same slot can be produced by different mechanisms, such as TMA copy, cp.async-style copy, or `tle.gpu.local_ptr` + `tl.store`. Users still call `writer.commit(iter)` once after producing all fields for that logical chunk.
- Each field's transport is inferred by the compiler from the producer-side IR; it is not a pipe attribute the user fills in, nor should it be encoded into pipe names, field names, or extra user attributes.
- When a reader only consumes a subset of fields, use `pipe.reader(name, fields=(...))` to narrow the reader view; this does not create a new token.
- Keep pipe-field provenance visible. Opaque shared-memory pointer escapes, untracked shared stores, or overlapping writes that cannot be proven safe will error directly, without silent fallback.
- NVIDIA lowering maps CTA-scoped SMEM pipes to NVWS/mbarrier synchronization. Multi-field payloads require proof of payload window, field ownership, participant count, and source-order safety at the pipe-field root granularity.

### Lifecycle

- SPSC pipe represents one producer publishing to one default consumer.
- SPMC pipe represents one producer publishing the same logical chunk to multiple named consumers, e.g., `("mma", "epilogue")`.
- `iter` is the logical chunk ID. Within the same chunk, the producer and all participating consumers should use the same `iter`.
- The standard loop lifecycle is `writer.acquire(iter)` → produce fields → `writer.commit(iter)` → `reader.wait(iter)` → consume fields → `reader.release(iter)`.
- `one_shot=True` indicates a single ready/full edge, typically used with `capacity=1`; do not rely on ring reuse or `close` in this mode.

### Simple example

Automatic software pipelining can still be triggered by `tl.range(..., num_stages=...)`. Explicit pipes are suited for scenarios where producer/consumer splitting needs to be visible in the program.

```{code-block} python
stage_buf = tle.gpu.alloc([2, BLOCK], dtype=tl.float32, scope=tle.gpu.smem)
pipe = tle.pipe(capacity=2, scope="cta", name="x_pipe", x=stage_buf)
writer = pipe.writer()
reader = pipe.reader()
offs = tl.arange(0, BLOCK)

slot = writer.acquire(k)
tl.store(tle.gpu.local_ptr(slot.x), tl.load(x_ptr + k * BLOCK + offs))
writer.commit(k)

ready = reader.wait(k)
x = tl.load(tle.gpu.local_ptr(ready.slot.x))
reader.release(k)
```

## Distribution

The Triton distributed API consists of four core parts: device mesh definition, sharding specification description, synchronization, and remote access (point-to-point communication).

### device mesh

#### tle.device_mesh

`tle.device_mesh` defines the topological structure of physical devices. It is the fundamental context for all distributed operations.

```{code-block} python
class device_mesh:
    def __init__(self, topology: dict):
        """
        Initialize a DeviceMesh.

        Args:
            topology (dict): A dictionary describing the hardware hierarchy.
                             Keys are level names; values are either an integer (for 1D)
                             or a list of tuples (for multi-dimensional levels).
        """
        self._physical_ids = ...  # Internal storage: flattened list of physical IDs (0..N-1)
        self._shape = ...         # Shape of the current logical view, e.g., (2, 2, 4, 2, 2, 4)
        self._dim_names = ...     # Names of the current dimensions
        # Initialization and parsing logic...

    @property
    def shape(self):
        """Return the logical shape of the current mesh."""
        return self._shape

    @property
    def ndim(self):
        """Return the number of dimensions."""
        return len(self._shape)

    def flatten(self):
        """
        Flatten the mesh into 1D. Commonly used for ring-based communication patterns.
        """
        return self.reshape(prod(self._shape))

    def __getitem__(self, key):
        """
        Support slicing operations and return a sub-mesh.
        Supports standard slices (slice objects) and integer indexing.
        """
        # Compute new shape and selected physical IDs after slicing
        # ...
        return sub_mesh

    def __repr__(self):
        return f"DeviceMesh(shape={self._shape}, names={self._dim_names})"


# Define a complex hardware hierarchy
topology = {
    # Inter-node level (2x2 = 4 nodes)
    "node": [("node_x", 2), ("node_y", 2)],
    # Intra-node GPUs (4 devices)
    "device": 4,
    # Intra-GPU clusters (2x2)
    "block_cluster": [("cluster_x", 2), ("cluster_y", 2)],
    # Blocks within each cluster (4 blocks)
    "block": 4
}

# mesh.shape -> (2, 2, 4, 2, 2, 4)
# Total size = 256
mesh = tle.device_mesh(topology=topology)
```

### Sharding specification

`tle.sharding` is used to declare the current distribution state of a tensor across a Device Mesh. The splits list describes how each dimension of the tensor is partitioned over the mesh, while the partials list indicates whether the tensor is in a partial-sum state. Any mesh axes not explicitly mentioned are treated as broadcast (replicated).

- tle.S(axis): Split — indicates that the tensor dimension is partitioned along the specified mesh axis.
- tle.B: Broadcast/Replicate — indicates that the tensor dimension is fully replicated (i.e., not split) along any mesh axes not explicitly referenced.
- tle.P(axis): Partial — indicates that the tensor holds only a partial value (e.g., a partial sum) and must be reduced along the specified mesh axis to obtain the complete result.

```{code-block} python
def sharding(tensor, splits, partials):
    """
    Annotation: Used only to annotate the tensor's layout state.
    It does not generate any runtime code but guides the compiler for subsequent optimizations or correctness checks.
    """
    return tensor


# Define a sharding spec where:
# - axis 0 is split across the "cluster" dimension (specifically over ["cluster_x", "cluster_y"]),
# - axis 1 is split across the "device" dimension,
# - and the tensor is in a partial state along the "block" dimension (requiring a reduce to resolve).
x_shard = tle.sharding(
    mesh,
    split=[["cluster_x", "cluster_y"], "device"],
    partial=["block"]
)

# Create a sharded tensor using the above sharding specification
x = tle.make_sharded_tensor(x_ptr, sharding=x_shard, shape=[4, 4])
```

### Synchronization

In complex distributed operators—such as Ring-AllReduce or pipelined execution with independent row/column communication—we often need to synchronize only thread blocks within the same "row" or "column," rather than across the entire cluster. A global synchronization would introduce unnecessary waiting overhead.
This API supports sub-mesh synchronization, meaning that within a large physical cluster, we can define multiple logical "communication groups" and perform synchronization independently within each group.

```{code-block} python
def distributed_barrier(mesh):
    """
    If a sub-mesh is passed, only devices within that sub-mesh are synchronized.
    Devices outside the sub-mesh should treat this instruction as a no-op 
    (or the compiler should ensure their control flow never reaches this point).
    """
    pass
```

#### tle.distributed_barrier

`tle.distributed_barrier` synchronize only the set of devices corresponding to the given mesh or sub-mesh.

Read from neighboring shards (ring-style exchange).

```{code-block} python
node_rank = tle.shard_id(mesh, "node")
device_rank = tle.shard_id(mesh, "device")
next_device = (device_rank + 1) % mesh.shape[1]
remote_x = tle.remote(x, shard_id=(node_rank, next_device), scope=mesh)
tle.distributed_barrier(mesh)
neighbor_vals = tl.load(remote_x)
```

### Remote access

`tle.remote` is used to obtain a handle to a tensor located on another device. This corresponds to point-to-point communication or direct memory access (e.g., RDMA/NVLink Load). It enables kernels to explicitly access data from a specific shard.

```{code-block} python
def remote(tensor, shard_id, scope):
    """
    Obtains a handle to a Remote Tensor residing on a specific device shard.

    :param tensor: A logically distributed tensor (already annotated with tle.sharding).
    :param shard_id: tuple. The coordinates of the target device within the Device Mesh.
                     For example, if mesh=(2,4) and shard_id=(0, 3), this refers to GPU #3 on node #0.
    :return: RemoteTensor. Supports operations such as load, store, etc.
    """
```

`tle.remote`: Explicitly read from or write to remote shards.

```{code-block} python
node_rank = tle.shard_id(mesh, "node")
device_rank = tle.shard_id(mesh, "device")
next_device = (device_rank + 1) % mesh.shape[1]
remote_x = tle.remote(x, shard_id=(node_rank, next_device), scope=mesh)
tle.distributed_barrier(mesh)
neighbor_vals = tl.load(remote_x)
```

## Primitives interactive with local_ptr

The following APIs are used together with `tle.gpu.local_ptr`. For more information, see [Use TLE-Struct](use-tle-struct.md).

- `tl.load`（for local_ptr）
- `tl.store`（for local_ptr）
- `tl.atomic_add`/`and`/`cas`/`max`/`min`/`or`/`xchg`/`xor`（for local_ptr）