# 安装 FlagQuantum

在继续之前，请先阅读[系统要求](requirements.md)。

## 步骤

1. 安装 FlagQuantum

   - 从源码安装

      ```{code-block} shell
      git clone https://github.com/flagos-ai/FlagQuantum.git
      cd FlagQuantum
      pip install -e .
      ```

   - 使用 pip 安装（可用时）

      ```{code-block} shell
      pip install flagquantum
      ```

2. 验证 FlagQuantum 安装

   ```{code-block} python
   import flagquantum as fq
   print(fq.__version__)
   ```
