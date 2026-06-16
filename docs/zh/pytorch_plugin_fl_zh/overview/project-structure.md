# 项目结构

```
PyTorch-Plugin-FL/
├── include/                  # 公共头文件
│   ├── flagos.h              #   统一运行时 API（内存、流、设备）
│   └── macros.h              #   通用宏
├── accelerator/              # 硬件抽象层
│   ├── csrc/cuda/            #   CUDA 运行时实现
│   ├── csrc/maca/            #   MACA cudart shim（符号版本兼容）
│   └── csrc/ascend/          #   昇腾运行时（基于 ACL 的内存、流、设备）
├── csrc/
│   ├── aten/                 # ATen 算子层
│   │   ├── common.{h,cc}     #   后端配置加载、FlagosDevice 枚举
│   │   ├── dispatch_stub.h   #   轻量级调度存根（替代 PyTorch DispatchStub）
│   │   ├── device_boxing.h   #   零拷贝 flagos↔CUDA 张量元数据转换
│   │   ├── register.cc       #   PrivateUse1 调度键注册
│   │   ├── {op}.{h,cc}       #   逐算子存根定义（add、mm、silu 等）
│   │   ├── factory_ops/      #   基本算子（empty、copy、contiguous、set、fallback）
│   │   ├── functional_ops/   #   计算算子（mm、bmm、cat、embedding、softmax 等）
│   │   └── backends/         #   后端特定的内核实现
│   │       ├── cuda/         #     CUDA 内核（cuBLAS、修改后的 PyTorch 内核）
│   │       ├── flagos/       #     FlagGems C++ 原生 API 封装
│   │       └── ascend/       #     昇腾内核（ACL NN API）
│   └── runtime/              # 设备运行时
│       ├── device_allocator  #   设备内存分配器
│       ├── host_allocator    #   固定内存分配器
│       ├── guard             #   DeviceGuard 实现
│       ├── generator         #   RNG 生成器
│       ├── hooks             #   运行时钩子
│       └── accelerator/      #   硬件抽象层
│           ├── cuda/         #     CUDA 运行时实现
│           ├── maca/         #     MACA cudart shim（符号版本兼容）
│           └── ascend/       #     昇腾运行时（基于 ACL 的内存、流、设备）
├── torch_fl/
│   ├── __init__.py           # 插件入口点：注册设备、加载 FlagGems 算子
│   ├── flagos/               # Python 设备模块（流、事件、RNG、AMP）
│   ├── accelerator/          # Python 加速器模块（MACA shim 加载器）
│   ├── backends.conf         # 默认后端路由配置（CUDA/FlagGems）
│   ├── backends_ascend.conf  # 昇腾后端路由配置（所有算子 → ascend）
│   ├── distributed.py        # 分布式训练支持（DDP 补丁）
│   ├── integration.py        # FlagGems 算子注册逻辑
│   ├── csrc/                 # C 扩展（module.cc、stub.c）
│   └── lib/                  # 编译后的共享库（libtorch_fl.so、libflagos.so）
├── tests/
│   ├── integration/          # 自动化集成测试
│   │   ├── ops/              #   逐算子调度测试
│   │   ├── test_qwen3_*.py   #   端到端模型测试
│   │   └── conftest.py       #   Pytest 配置
│   ├── manual/               # 手动测试脚本
│   └── common/               # 测试工具
├── debug/                    # 开发笔记和调试脚本
├── cmake/                    # CMake 模块
├── setup.py                  # CMake 构建入口点
└── pyproject.toml
```
