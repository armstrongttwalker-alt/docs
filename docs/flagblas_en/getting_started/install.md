# Installing FlagBLAS

## Step 1: Install Build Dependencies

```shell
pip install -U scikit-build-core>=0.11 pybind11 ninja cmake
```

## Step 2: Clone and Install FlagBLAS

```shell
git clone https://github.com/flagos-ai/FlagBLAS.git
cd FlagBLAS
pip install .
```

## Verification

```python
import flag_blas
print(flag_blas.__version__)
```
