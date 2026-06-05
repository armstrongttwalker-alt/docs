# 常见问题

## Q1: 访问令牌需要什么权限？

访问令牌需要 Admin 的写权限，用于 runner 的创建。

## Q2: Runner 的 Max 和 Min Runners 应该如何设置？

由于资源有限，Max Runners 当前建议设为 1，Min Runners 设置为 0。

## Q3: DinD 和 DooD 有什么区别？

| 模式 | 说明 |
|------|------|
| {term}`DinD`（Docker in Docker） | 隔离性好，可使用 docker build 和 docker push，但 docker run 不可访问加速卡资源 |
| {term}`DooD`（Docker outside of Docker） | 性能更高但风险更高，可查看和使用宿主机，实例之间存在环境争抢及安全问题，仅对特权用户开放 |

## Q4: GitLink 相比 GitHub 有什么限制？

- 工作流运行列表只显示名称
- 仓库质量和流水线效率暂不支持
- workflow 高级语法不支持（outputs、matrix、concurrency）
- 注册 runner 需要官方申请组织下的 token

## Q5: 如何上传 Coverage 报告？

需用户手动在 workflow 中用 pytest 产出 json 格式的报告，然后调用 FlagOps 提供的 `post-pytest-report` action 上传。

```yaml
- name: Upload Coverage Report to FlagCICD
  uses: flagos-ai/FlagOps/actions/post-pytest-report@v2
  with:
    backend_url: '<BACKEND_URL>'  # 请联系平台管理员获取
    user_id: '<USER_ID>'  # 你的用户ID
    report_path: 'coverage.json'
```

## Q6: 如何上传 Benchmark 报告？

生产表格数据（JSON 格式），然后调用 FlagOps 提供的 `post-benchmark-report` action 上传。

```yaml
- name: Upload benchmark data to backend
  uses: flagos-ai/FlagOps/actions/post-benchmark-report@main
  with:
    backend_url: '<BACKEND_URL>'  # 请联系平台管理员获取
    report_path: 'benchmark_metrics.json'
```

## Q7: 用户注册后为什么没有权限？

平台注册用户默认无角色，需管理员手动分配角色后才能使用平台功能。

## Q8: 如何添加仓库成员？

仓库管理员可在仓库详情 → 设置 → 成员管理中添加成员，可搜索到的范围为正常且非未设置角色的用户。

## Q9: 模型删除后文件会删除吗？

暂时只删除数据库，文件实际底层当前因实现限制不支持删除，后续会迭代支持。

## Q10: 如何在 workflow 中使用共享存储数据？

如果需要共享存储中的数据，必须在启动 container 时挂载到 container 中：

```yaml
container_volumes:
  - /home/flagscale_cicd/flask/static:/workspace/report
```
