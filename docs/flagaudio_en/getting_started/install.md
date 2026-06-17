# Install FlagAudio

## Install Build Dependencies

```shell
pip install -U scikit-build-core>=0.11 pybind11 ninja cmake
```

## Clone and Install FlagAudio

```shell
git clone https://github.com/flagos-ai/FlagAudio.git
cd FlagAudio
pip install .
```

## Verify Installation

```python
import flag_audio
print(flag_audio.__version__)
```
