# 构建与安装

## 获取源代码

```shell
git clone https://github.com/flagos-ai/FlagCX.git
cd FlagCX
git submodule update --init --recursive
```

## 安装

**方式 A — Python 安装（pip install）：**

```shell
pip install . -v --no-build-isolation
```

**方式 B — C++ 库（make）：**

```shell
make <backend>=1 -j$(nproc)
```
其中 `<backend>` 为以下选项之一：
- `USE_NVIDIA`: NVIDIA GPU 支持
- `USE_ILUVATAR_COREX`: Iluvatar Corex 支持
- `USE_CAMBRICON`: 寒武纪支持
- `USE_METAX`: MetaX 支持
- `USE_MUSA`: 摩尔线程支持
- `USE_KUNLUNXIN`: 昆仑芯支持
- `USE_DU`: 海光支持
- `USE_ASCEND`: 华为昇腾支持
- `USE_AMD`: AMD 支持
- `USE_TSM`: 清微智能支持
- `USE_ENFLAME`: 燧原支持
- `USE_SUNRISE`: Sunrise AI 支持
- `USE_GLOO`: GLOO 支持
- `USE_MPI`: MPI 支持

注意，方式 A 也支持 `<backend>=1`，允许用户显式指定后端。否则将自动选择。

默认安装路径设置为 `build/`，您可以手动设置 `BUILDDIR` 环境变量来自定义构建路径。
您也可以指定 `DEVICE_HOME` 和/或 `CCL_HOME` 来指示设备运行时的安装路径和通信库的安装路径。