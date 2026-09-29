# 安装 FlagQuantum

开始前请先阅读[环境要求](requirements.md)。

## 安装正式发布的包

```bash
python -m pip install flagquantum
```

## 安装开发版本

```bash
git clone https://github.com/flagos-ai/FlagQuantum.git
cd FlagQuantum
python -m pip install -e ".[dev]"
```

## 验证安装

```bash
python -c "import flagquantum as fq; print(fq.__version__)"
```

包通过 `import flagquantum as fq` 引入；导入它不会导入可选依赖、不会发现扩展，
也不会激活厂商适配器。

## 运行一个本地示例

受维护的本地路径不需要凭据、不需要远程资源，也不需要可选后端：

```bash
python -m examples.local.simulate
python -m examples.local.measure
python -m examples.local.train
```

开发版安装还可以直接运行仓库中的示例，例如：

```bash
python examples/quick_start.py --mode sv --steps 40
```

## 可选依赖组

只在需要时安装对应能力：

```bash
python -m pip install "flagquantum[jax]"
python -m pip install "flagquantum[viz]"
python -m pip install "flagquantum[qiskit]"
```

互操作桥接把外部框架留在边界的另一侧：导入 FlagQuantum 永远不会导入 Qiskit、
PennyLane、Cirq、CUDA-Q 或任何厂商 SDK。

## 下一步

继续阅读[快速开始](quick-start.md)，或直接查看[模拟模式](../user_guide/simulation-modes.md)
以选择表示形式，以及[远程执行](../user_guide/remote-execution.md)了解厂商目标。
