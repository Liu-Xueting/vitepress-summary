# pnpm

pnpm虽然是 npm 的替代品，但它们的功能和用途有所不同。pnpm 则更侧重于提高存储效率和性能，可以根据自己的需求选择使用哪个工具。

## 主要特性

- 速度快：pnpm 通过使用硬链接和高效的存储策略来加快安装速度。
- 高效利用磁盘空间：由于使用了硬链接，pnpm 可以确保同一个包的不同版本之间共享代码，从而极大地节省了磁盘空间。
- 支持 monorepo：随着前端工程的日益复杂，越来越多的项目开始使用 monorepo。pnpm 提供了对 monorepo 的原生支持。

## 常用命令

安装：

```bash
pnpm install：安装项目的所有依赖项。

pnpm add <pkg>：安装指定的软件包及其依赖项。
```

更新：

```bash
pnpm update：更新项目的所有依赖项。
pnpm update <pkg>：更新指定的软件包。
```

删除：

```bash
pnpm remove <pkg>：从项目中删除指定的软件包。
```

查看：

```bash
pnpm list：查看项目的所有依赖项。
```

查看版本信息：

```bash
pnpm -v : pnpm 的版本信息。
```

设置源：

```bash
pnpm config set registry https://registry.npm.taobao.org：设置 pnpm 使用的镜像源为淘宝镜像。
```
