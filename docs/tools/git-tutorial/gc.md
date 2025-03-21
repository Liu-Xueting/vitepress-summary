# Git 垃圾回收

[[TOC]]

Git 会自动清理垃圾，但是有时候我们需要手动清理：

```bash
git gc
```

这将会清理长时间未使用的垃圾，但是不会清理最近的垃圾。

选项 `--aggressive` 会执行更加彻底的清理，而 `--prune` 选项用于指定日期（默认为 2 周）之前的垃圾。例如我们以最严格的方式清理：

```bash
git gc --aggressive --prune=now
```
