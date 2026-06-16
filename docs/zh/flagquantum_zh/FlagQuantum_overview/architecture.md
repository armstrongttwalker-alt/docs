# 架构

FlagQuantum 由以下模块组成：

```
flagquantum/
├── devices/          # 量子设备实现
├── drawer/           # 量子电路可视化
├── ops/              # 量子操作（门、矩阵、算符）
├── encoding/         # 数据编码方法
├── measure/          # 测量工具
└── utils/            # 辅助函数（DTensor、交换）
```

## 核心组件

### 设备 (Devices)

`devices` 模块提供量子设备实现，包括 `DistributedQuantumDevice` 类，该类使用 PyTorch 的分布式张量 (`DTensor`) 跨多个 GPU 管理量子态。

### 绘图器 (Drawer)

绘图器模块支持两种模式的电路可视化：

- 文本模式：基于 Unicode 的图表，支持多量子比特门符号（╭╰├│）、自动换行（max_length）和可配置的参数精度。
- MPL 模式：出版级质量的 Matplotlib 图形，采用基于层的布局（同列门共享 x 坐标）、初始状态（|0⟩）、测量符号以及专业的配色方案：
  - 固定门（H、X、Y、Z）：柔蓝色 #7B9EC2
  - 旋转门（RX、RY、RZ）：红色 #E15759
  - 相位门（P）：梅紫色 #DDA0DD
  - CPhase / SWAP：青色 #76B7B2
  - CRX/CRY/CRZ：橙色 #F28E2B
  - RXX/RYY/RZZ：浅粉色 #FFB6C1（盒式布局，无控制点）
  - 支持 Toffoli（CCX）、Fredkin（CSWAP）、多量子比特门

### 操作 (Operations)

`ops` 模块包含所有量子门实现：

- **泡利门**：X、Y、Z
- **克利福德门**：H、S、SDG、CX、CZ、SWAP
- **旋转门**：RX、RY、RZ，支持参数化
- **受控门**：任意单量子比特门的受控版本
- **自定义门**：通过门注册系统注册的用户定义门

### 编码 (Encoding)

`encoding` 模块提供了将经典数据嵌入量子态的方法：

- **角度编码**：将经典特征映射到旋转角度
- **振幅编码**：将数据直接编码到状态向量振幅中
- **基态编码**：将二进制数据映射到计算基态
- **通用编码器**：用户定义的自定义编码电路

### 测量 (Measurement)

`measure` 模块提供测量工具，包括：

- **Z 基测量**：标准计算基测量
- **期望值**：计算可观测量的期望值
- **后选择**：根据条件筛选测量结果

### 工具 (Utilities)

`utils` 模块包含以下辅助函数：

- DTensor 操作和分片
- 设备间状态交换
- 设备管理和配置
- OpenQASM 2.0/3.0 导出器
