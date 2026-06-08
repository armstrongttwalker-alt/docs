# Installing FlagAudio

## Step 1: Install Build Dependencies

```shell
pip install -U scikit-build-core>=0.11 pybind11 ninja cmake
```

## Step 2: Clone and Install FlagAudio

```shell
git clone https://github.com/flagos-ai/FlagAudio.git
cd FlagAudio
pip install .
```

## Verification

```python
import flag_audio
print(flag_audio.__version__)
```
