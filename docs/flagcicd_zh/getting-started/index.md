# 快速入门

本指南帮助您快速开始使用 FlagCICD 平台。

## 登录平台

首次使用 FlagCICD 平台需要先登录。

1. 访问平台地址：<https://flagcicd.flagos.net>
1. 选择登录方式（手机号登录或邮箱登录）
1. 输入手机号/邮箱，获取并输入验证码
1. 勾选同意社区使用协议和隐私协议
1. 点击 **立即登录/注册**

![登录页面](../static/20-login.png)

```{note}
未注册手机号将自动创建账号。
```

```{warning}
注册完成后，账户需经管理员授权后方可正常使用平台功能。请发送邮件至管理员邮箱 <xmhu@baai.ac.cn> 申请授权，邮件内容需包含：
- 注册时使用的手机号或邮箱
- 所属单位/团队
- 使用目的说明

未经授权的账户仅能访问公开页面，无法使用仓库注册、Runner 创建等功能。
```

## 前置依赖

平台通过 Action Runner Controller 动态拉起 GitHub Action Runner，用户可在拉起的 runner 中使用 docker image 拉起环境，不支持直接在裸机上运行测试，因此需用户自备可 docker pull 的镜像。

## 步骤 1：注册仓库

1. 主页点击 **我的仓库** → **注册仓库**
1. 填入 GitHub 链接和访问令牌
1. 点击 **测试连接**，如果成功则可提交注册

```{note}
访问令牌需 Admin 的写权限，用于 runner 的创建。
```

## 步骤 2：创建 Runner Scale Sets

1. 点击进入一个仓库 → 点击 **设置** → **Runner** → **创建**
1. 填入 runner set 参数提交

| 字段 | 说明 |
|------|------|
| Name | {term}`Runner` 名称 |
| Docker 访问模式 | {term}`DinD` 或 {term}`DooD` |
| 镜像 | Runner 镜像选择 |
| 挂载模型 | 是否挂载模型（可选） |
| 资源规格 | 计算资源规格 |
| Min Runners | 最小 Runner 数量（默认 0） |
| Max Runners | 最大 Runner 数量（默认 1，范围 1-3） |

```{warning}
由于资源有限，Max Runners 当前建议设为 1，Min Runners 设置为 0。
```

完成后可在 GitHub 的 Action Runner 处看到创建好的 runner set。

## 步骤 3：配置 GitHub Workflow Runner

修改 GitHub Action workflow 中 `runs-on` 标签配置，`runs-on` 中的标签为步骤 2 创建的 Runner Scale Sets 的 name。

## 步骤 4：上传测试报告

### Coverage 报告

```yaml
- name: Upload Coverage Report to FlagCICD
  uses: flagos-ai/FlagOps/actions/post-pytest-report@v2
  with:
    backend_url: '<BACKEND_URL>'  # 请联系平台管理员获取
    user_id: '<USER_ID>'  # 你的用户 ID
    report_path: 'coverage-${{ inputs.platform }}-${{ inputs.device }}-${{ matrix.test_group.name }}.json'
```

### Benchmark 报告

```yaml
- name: Upload benchmark data to backend
  uses: flagos-ai/FlagOps/actions/post-benchmark-report@main
  with:
    backend_url: '<BACKEND_URL>'  # 请联系平台管理员获取
    report_path: ${{ env.PROJECT_ROOT }}/tests/test_results/logs/benchmark_metrics.json
```

## 下一步

- 了解各模块详细操作，请参阅操作指南
- 了解平台架构和核心概念，请参阅功能说明
