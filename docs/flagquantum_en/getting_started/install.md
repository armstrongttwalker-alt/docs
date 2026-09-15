# Install FlagQuantum

Read [Requirements](requirements.md) before proceeding.

## Steps

1. Install FlagQuantum 

   - Install from source

      ```{code-block} shell
      git clone https://github.com/flagos-ai/FlagQuantum.git
      cd FlagQuantum
      pip install -e .
      ```

   - Install with pip (when available)

      ```{code-block} shell
      pip install flagquantum
      ```

2. Verify FlagQuantum installation

   ```{code-block} python
   import flagquantum as fq
   print(fq.__version__)
   ```
