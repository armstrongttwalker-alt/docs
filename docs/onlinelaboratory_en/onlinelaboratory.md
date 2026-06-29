# Online Laboratory User Guide

## Getting Started

1. Open <https://flagos.net/Home> in your browser.

2. Click the **Online Laboratory** above. Select **Phone Login** or **Email Login**. Enter your phone number or email address, and click **Get Verification Code**. Enter the verification code, check the box to accept the community usage agreement and privacy policy, and click **Login/Register**.

3. View all unreleased environment containers, computing resource details, access endpoints, and other related information associated with your account.

4. The environment container is powered off when first associated. Click the power icon ![alt text](asset/on-and-off-icon.png) in the operation column to manually start it.
   ![alt text](asset/online-lab.jpg)
   After startup, the **Status** column changes to **Running**.

5. In the **Operation** column, check the image information:
   1. Navigate to **Operation**, and click Settings ![alt text](asset/settings.png).
   2. In the pop-up window, click **Image**.
      ![alt text](asset/check-image.jpg)

6. In the **DevEnvironment Access** column, use one of the following methods to access the cloud-based online development environment:
   - **Option 1: Direct Access to the Development Environment**
     To access the environment directly, follow these steps:
     1. Navigate next to **Secret Key**, and click the Copy icon ![alt text](asset/copy.png) to copy the key.
     2. Click **Enter IDE**. When the Welcome dialog opens, paste the key and click **Submit**.
     ![alt text](asset/welcome.jpg)
   - **Option 2: Access via Public Network**
     To access the development environment from a public network, follow these steps. You can map the service for the development environment to port 30000.
     1. Navigate to **Operation**, and click Settings ![alt text](asset/settings.png).
     2. In the pop-up window, click **Action**. In the **More Access** section, click the **Service URL** link to open the development environment.
     ![alt text](asset/public-access.jpg)

7. Query the computing power configuration through terminal commands according to the card type.
   - For Iluvatar cards, use the command:

      ```{code-block} bash
      ixsmi
      ```

     ![alt text](asset/iluvatar-gpu-info.jpg)
   - For Huawei Ascend cards, use the command:

      ```{code-block} python
      npu-smi info
      ```

     ![alt text](asset/ascend-gpu-info.jpg)

8. You can upload or download files such as code packages and models through the following methods:
    - Right-click your `Workspace` and select **Upload...**
     ![alt text](asset/upload.jpg)
    - Right-click your `Workspace` and select **Download...**
     ![alt text](asset/download.jpg)

```{warning}
The experimental environment is a containerized environment. All data will be permanently deleted and unrecoverable upon release. Please back up your data locally.
```

For detailed usage instructions of Visual Studio Code, please refer to:<https://code.visualstudio.com/docs>.

## Reset Environment

To reset development environment to its initial state, perform the following steps:

1. Navigate to the **Operation** column, and click the Settings ![alt text](asset/settings.png).
2. In the pop-up window, click **Action**. In the **Reset Environment** section, click **Reset Environment**. In the **Reset Environment** pop-up window, click **Confirm**.
  ![alt text](asset/public-access.jpg)

```{warning}
This action is irreversible. Please proceed with caution.
After the environment is reset, all data will be permanently deleted and cannot be recovered. Please make sure to back up your data locally in advance.
```
