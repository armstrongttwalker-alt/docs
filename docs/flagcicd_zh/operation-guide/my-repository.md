# 我的仓库

我的仓库展示当前用户注册的所有仓库，支持注册新仓库。

## 访问路径

左侧导航栏 → **我的仓库**

![我的仓库列表](../static/01-my-repository.png)

## 注册仓库

点击 **注册仓库** 按钮，选择代码托管平台类型。

### GitLink 仓库

![注册 GitLink 仓库](../static/02-register-repository-gitlink.png)

### GitHub 仓库

![注册 GitHub 仓库](../static/03-register-repository-github.png)

## 注册表单字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| 代码托管平台 | 单选 | 是 | GitHub 或 GitLink |
| GitHub链接 | 文本框 | 是 | 仓库地址（owner/repo 格式） |
| 访问令牌 | 文本框 | 是 | 具有 Admin 写权限的访问令牌 |
| 测试连接 | 按钮 | - | 验证令牌和仓库连接 |

```{note}
访问令牌需要 Admin 的写权限，用于 runner 的创建。
```
