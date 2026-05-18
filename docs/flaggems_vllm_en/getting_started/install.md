# Install FlagGems-vLLM

For a fresh installation of FlagGems-vLLM, follow the steps below.

1. Install dependencies.

   ```{code-block} bash
   pip install -U scikit-build-core>=0.11 pybind11 ninja cmake
   ```

2. Clone and install FlagGems-vLLM.

   ```{code-block} bash
   git clone https://github.com/flagos-ai/FlagGems-vllm.git
   cd FlagGems-vllm
   pip install .
   ```