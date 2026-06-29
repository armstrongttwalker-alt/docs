# 线上实验室用户指南

## 快速上手

1. 在浏览器中打开<https://flagos.net/Home>。

2. 点击上方的 **线上实验室**。选择**手机号登录**或者**邮箱登录**。输入手机号或者邮箱账号，并点击**获取验证码**。填入验证码后，勾选接受社区使用协议及隐私协议，点击**立即登录/注册**。

3. 查看与你账号关联的所有未释放的环境容器、算力资源详情、访问入口及其他相关信息。

4. 首次关联的环境容器为关机状态，点击操作列中开关图标 ![alt text](asset/on-and-off-icon.png)，进行手动开启。
   ![alt text](asset/online-lab.jpg)
  启动后**状态**列变为**运行中**。

5. 在 **操作** 列中，检查镜像信息：
   1. 导航至**操作**，并点击设置![alt text](asset/settings.png)。
   2. 在弹出的窗口中，点击**镜像**。
      ![alt text](asset/check-image.jpg)

6. 在 **环境访问** 列中，使用以下任一方式访问云端在线开发环境：
    - **方式一：直接访问开发环境**  
      如需直接访问开发环境，请按以下步骤操作：  
      1. 在 **密钥** 旁点击复制图标![alt text](asset/copy.png)，复制密钥。  
      2. 点击 **进入IDE**。在弹出的 Welcome 对话框中粘贴密钥，并点击 **Submit**。  
      ![alt text](asset/welcome.jpg)
    - **方式二：通过公网访问**  
      如需通过公网访问开发环境，请按以下步骤操作，可将开发环境的服务映射到端口 30000。
      1. 导航至**操作**，并点击设置![alt text](asset/settings.png)。  
      2. 在弹出的悬浮窗口中，点击 **操作**。在**更多访问**区域中点击**服务地址**链接以打开开发环境。
      ![alt text](asset/public-access.jpg)

7. 根据显卡类型，通过终端命令查询算力配置信息。
    - 对于天数加速卡，使用以下命令：

       ```{code-block} bash
       ixsmi
       ```

      ![alt text](asset/iluvatar-gpu-info.jpg)
    - 对于华为昇腾加速卡，使用以下命令：

       ```{code-block} python
       npu-smi info
       ```

      ![alt text](asset/ascend-gpu-info.jpg)

8. 您可以通过以下方式上传或下载代码包、模型等文件：
     - 在 `Workspace` 上点击右键，选择 **Upload...**  
      ![alt text](asset/upload.jpg)
     - 在 `Workspace` 上点击右键，选择 **Download...**  
      ![alt text](asset/download.jpg)

```{warning}
实验环境为容器化环境，在释放后所有数据将被永久删除且无法恢复，请务必提前在本地备份数据。
```

关于 Visual Studio Code 的详细使用说明，请参阅：<https://code.visualstudio.com/docs>。

## 重置环境

要将开发环境重置为初始状态，请执行以下步骤：

1. 导航至**操作列**，并点击设置![alt text](asset/settings.png)。
2. 在弹出的窗口中，点击**操作**。在**重置环境**部分，点击**重置环境**。在**重置环境**弹出窗口中，点击**确定**。
  ![alt text](asset/public-access.jpg)

```{warning}
此操作不可逆，请谨慎操作。
在环境重置后所有数据将永久删除且无法恢复，请务必提前在本地备份数据。
```
