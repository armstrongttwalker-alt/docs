# Requirements

This section includes requirements about using FlagTree, including supported platforms and dependencies. FlagTree can be successfully installed and run only when all requirements are met.

## Supported hardware platforms

The following list includes the supported hardware platforms:

- AIPU
- Cambricon
- Enflame
- Huawei Ascend
- Hygon
- Iluvatar
- MetaX
- Mthreads
- NVIDIA
- AMD
- klx
- Tsingmicro
- Sunrise

## System software requirements

You may need the following system softwares:

- Ubuntu
- Python 3.x

## Backends, Triton versions, and branches

Each backend is based on different versions of Triton, and therefore resides in different protected branches. All these protected branches have equal status. CI/CD runners are provisioned for every backend listed in the table.

|Branch|Vendor|Backend|Triton<br>version|
|:-----|:-----|:------|:----------------|
|[main](https://github.com/flagos-ai/flagtree/tree/main)|NVIDIA<br>AMD<br>x86_64 cpu<br>ILUVATAR（天数智芯）<br>Moore Threads（摩尔线程）<br>KLX<br>MetaX（沐曦股份）<br>HYGON（海光信息）|[nvidia](/third_party/nvidia/)<br>[amd](/third_party/amd/)<br>[triton-shared](https://github.com/microsoft/triton-shared)<br>[iluvatar](/third_party/iluvatar/)<br>[mthreads](/third_party/mthreads/)<br>[xpu](/third_party/xpu/)<br>[metax](/third_party/metax/)<br>[hcu](third_party/hcu/)|3.1<br>3.1<br>3.1<br>3.1<br>3.1<br>3.0<br>3.0<br>3.1|
|[triton_v3.2.x](https://github.com/flagos-ai/flagtree/tree/triton_v3.2.x)|NVIDIA<br>AMD<br>Huawei Ascend（华为昇腾）<br>Moore Threads（摩尔线程）<br>Cambricon（寒武纪）|[nvidia](https://github.com/flagos-ai/FlagTree/tree/triton_v3.2.x/third_party/nvidia/)<br>[amd](https://github.com/flagos-ai/FlagTree/tree/triton_v3.2.x/third_party/amd/)<br>[ascend](https://github.com/flagos-ai/FlagTree/blob/triton_v3.2.x/third_party/ascend/)<br>[mthreads](https://github.com/flagos-ai/FlagTree/tree/triton_v3.2.x/third_party/mthreads/)<br>[cambricon](https://github.com/flagos-ai/FlagTree/tree/triton_v3.2.x/third_party/cambricon/)|3.2|
|[triton_v3.3.x](https://github.com/flagos-ai/flagtree/tree/triton_v3.3.x)|NVIDIA<br>AMD<br>x86_64 cpu<br>ARM China（安谋科技）<br>Tsingmicro（清微智能）<br>Enflame（燧原）|[nvidia](https://github.com/flagos-ai/FlagTree/tree/triton_v3.3.x/third_party/nvidia/)<br>[amd](https://github.com/flagos-ai/FlagTree/tree/triton_v3.3.x/third_party/amd/)<br>[triton-shared](https://github.com/microsoft/triton-shared)<br>[aipu](https://github.com/flagos-ai/FlagTree/tree/triton_v3.3.x/third_party/aipu/)<br>[tsingmicro](https://github.com/flagos-ai/FlagTree/tree/triton_v3.3.x/third_party/tsingmicro/)<br>[enflame](https://github.com/flagos-ai/FlagTree/tree/triton_v3.3.x/third_party/enflame/)|3.3|
|[triton_v3.4.x](https://github.com/flagos-ai/flagtree/tree/triton_v3.4.x)|NVIDIA<br>AMD<br>Sunrise（曦望芯科）|[nvidia](https://github.com/flagos-ai/FlagTree/tree/triton_v3.4.x/third_party/nvidia/)<br>[amd](https://github.com/flagos-ai/FlagTree/tree/triton_v3.4.x/third_party/amd/)<br>[sunrise](https://github.com/flagos-ai/FlagTree/tree/triton_v3.4.x/third_party/sunrise/)|3.4|
|[triton_v3.5.x](https://github.com/flagos-ai/flagtree/tree/triton_v3.5.x)|NVIDIA<br>AMD<br>Enflame（燧原）|[nvidia](https://github.com/flagos-ai/FlagTree/tree/triton_v3.5.x/third_party/nvidia/)<br>[amd](https://github.com/flagos-ai/FlagTree/tree/triton_v3.5.x/third_party/amd/)<br>[enflame](https://github.com/flagos-ai/FlagTree/tree/triton_v3.5.x/third_party/enflame/)|3.5|
|[triton_v3.6.x](https://github.com/flagos-ai/flagtree/tree/triton_v3.6.x)|NVIDIA<br>AMD<br>Enflame（燧原）<br>HYGON（海光信息）<br>Moore Threads（摩尔线程）|[nvidia](https://github.com/flagos-ai/FlagTree/tree/triton_v3.6.x/third_party/nvidia/)<br>[amd](https://github.com/flagos-ai/FlagTree/tree/triton_v3.6.x/third_party/amd/)<br>[enflame](https://github.com/flagos-ai/FlagTree/tree/triton_v3.6.x/third_party/enflame/)<br>[hcu](https://github.com/flagos-ai/FlagTree/tree/triton_v3.6.x/third_party/hcu/)<br>[mthreads](https://github.com/flagos-ai/FlagTree/tree/triton_v3.6.x/third_party/mthreads/)|3.6|

## Dependencies

- **System dependencies**  
  FlagTree is primarily tested on Ubuntu. We recommend using a Linux virtual machine or Docker container for installation.
  The following table lists the dependencies for Ubuntu.

    | Dependency     | Description |
    |----------------|-------------|
    | `zlib1g`       | The compression library runtime files. This is a widely used software library for data compression, commonly used by other packages (such as `libxml2`) to handle compressed data streams. |
    | `zlib1g-dev`   | The compression library development files. Contains the header files and static libraries required to compile and link programs that use the zlib compression library. |
    | `libxml2`      | The GNOME XML library runtime. Provides software libraries for parsing, manipulating, and generating XML data, and is used by many applications and dependencies. |
    | `libxml2-dev`  | The GNOME XML library development files. Includes header files and symbolic links necessary for developing software that uses `libxml2` (for example, compiling XML-parsing programs). |
    | `nlohmann-json3-dev` | Header-only C++ JSON library. Provides a modern JSON parsing and serialization library for C++ projects, used by FlagTree's C++ components. |

- **Python dependencies**  
  The following table lists the Python dependencies. These dependencies are included in the `requirements.txt` file and will be automatically installed when using the `pip install` command.

    | Dependency   | Description |
    |--------------|-------------|
    | `ninja`      | A small build system with a focus on speed. It is often used as a backend for CMake to compile C/C++ code much faster than traditional Make. |
    | `cmake`      | A cross-platform tool for building, testing, and packaging software. It is used to control the software compilation process via configuration files. |
    | `wheel`      | A Python library that provides the `bdist_wheel` command for setuptools. It allows Python packages to be distributed in a built-package format (`.whl`), which is faster to install than source distributions. |
    | `GitPython`  | A Python library used to interact with Git repositories. It allows Python code to perform Git operations (like `log`, `commit`, `diff`) programmatically. |
    | `pytest`     | A mature full-featured Python testing framework. It is used for writing and running simple unit tests as well as complex functional tests. |
    | `scipy`      | A fundamental library for scientific computing and technical computing in Python. It builds on NumPy and provides modules for optimization, integration, interpolation, eigenvalue problems, algebra, and other tasks. |
    | `filelock`   | A platform-independent file-based lock for Python. It is used to synchronize access to a shared resource (like a file) between multiple Python processes or threads. |
    | `nanobind`   | A lightweight C++ library that exposes C++ types and functions to Python. It is used to create Python bindings for C++ code with minimal overhead (similar to pybind11, but faster). |

  - **Backend specific dependencies**  
    For more information, see [Install FlagTree for different backends](/getting_started/install.md#install-flagtree-for-different-backends).
  
## Features on different branches

FlagTree's extension components are currently available on some backends:

|Branch|Backend|Triton version|Extension components|
|:-----|:------|:-------------|:-------------------|
|[triton_v3.6.x](https://github.com/flagos-ai/flagtree/tree/triton_v3.6.x)|[nvidia](https://github.com/flagos-ai/FlagTree/tree/triton_v3.6.x/third_party/nvidia/)<br>[enflame](https://github.com/flagos-ai/FlagTree/tree/triton_v3.6.x/third_party/enflame/)|3.6|TLE-Lite <br> TLE-Struct GPU<br>TLE-Raw<br>HINTS|
|[triton_v3.2.x](https://github.com/flagos-ai/flagtree/tree/triton_v3.2.x)|[ascend](https://github.com/flagos-ai/FlagTree/blob/triton_v3.2.x/third_party/ascend/)|3.2| TLE-Struct DSA <br> FLIR <br>HINTS|
|[triton_v3.3.x](https://github.com/flagos-ai/flagtree/tree/triton_v3.3.x)|[tsingmicro](https://github.com/flagos-ai/FlagTree/blob/triton_v3.3.x/third_party/tsingmicro/)|3.3|TLE-Lite<br>TLE-Struct DSA<br>FLIR|
|[triton_v3.3.x](https://github.com/flagos-ai/flagtree/tree/triton_v3.3.x)|[aipu](https://github.com/flagos-ai/FlagTree/blob/triton_v3.3.x/third_party/aipu/)|3.3|FLIR|

## Backend integrations

The following backends have been integrated into FlagTree. For new vendors, you can refer to the following code links for your integrations:

- [iluvatar](https://github.com/flagos-ai/FlagTree/tree/main/third_party/iluvatar/)
- [mthreads](https://github.com/flagos-ai/FlagTree/tree/main/third_party/mthreads/)
- [xpu](https://github.com/flagos-ai/FlagTree/tree/main/third_party/xpu/)
- [aipu](https://github.com/flagos-ai/FlagTree/tree/triton_v3.3.x/third_party/aipu/)
- [metax](https://github.com/flagos-ai/FlagTree/tree/main/third_party/metax/)
- [ascend](https://github.com/flagos-ai/FlagTree/tree/triton_v3.2.x/third_party/ascend/)
- [tsingmicro](https://github.com/flagos-ai/FlagTree/tree/triton_v3.3.x/third_party/tsingmicro/)
- [hcu](https://github.com/flagos-ai/FlagTree/tree/main/third_party/hcu/)
- [enflame](https://github.com/flagos-ai/FlagTree/tree/triton_v3.3.x/third_party/enflame/) ([3.3](https://github.com/flagos-ai/FlagTree/tree/triton_v3.3.x/third_party/enflame/) / [3.5](https://github.com/flagos-ai/FlagTree/tree/triton_v3.5.x/third_party/enflame/) / [3.6](https://github.com/flagos-ai/FlagTree/tree/triton_v3.6.x/third_party/enflame/))
- [sunrise](https://github.com/flagos-ai/FlagTree/tree/triton_v3.4.x/third_party/sunrise/)
- [cambricon](https://github.com/flagos-ai/FlagTree/tree/triton_v3.2.x/third_party/cambricon/)
- [nvidia](https://github.com/flagos-ai/FlagTree/tree/main/third_party/nvidia)
- [amd](https://github.com/flagos-ai/FlagTree/tree/main/third_party/amd)
