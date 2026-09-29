# 安装 FlagGems-sglang

如需全新安装 FlagGems-sglang，请按照以下步骤操作。

1. 安装构建依赖项。

   ```{code-block} bash
   pip install -U 'scikit-build-core>=0.11' pybind11 ninja cmake
   ```

2. 克隆并安装 FlagGems-sglang。

   ```{code-block} bash
   git clone https://github.com/flagos-ai/FlagGems-sglang.git
   cd FlagGems-sglang
   pip install .
   ```

   开发场景请使用可编辑安装方式：

   ```{code-block} bash
   pip install --no-build-isolation -e .
   ```

   如需运行测试套件，请同时安装测试依赖：

   ```{code-block} bash
   pip install -e '.[test]'
   ```

3. 可选：显式指定后端。运行时会在导入时自动检测设备；如需强制指定后端，请设置 `DNN_VENDOR`：

   ```{code-block} bash
   export DNN_VENDOR=nvidia
   ```

## 验证安装

```{code-block} bash
python -c "import flaggems_sglang; print(flaggems_sglang.device, flaggems_sglang.vendor_name); print(len(flaggems_sglang.all_registered_ops()), 'operators')"
```
