# npm

npm是一个命令行工具，允许开发人员在他们的项目中轻松地管理依赖项、安装软件包、更新软件包版本以及执行其他与软件包相关的任务。

## 初始化项目

首先，初始化一个新的 Node.js 项目

```bash
npm init
//初始化生成package.json文件

npm init -y
//初始化，默认确定，省去敲回车的步骤
```

## 安装软件包

使用`npm install`命令安装软件包

```bash
npm install
 //安装所有node_moudles依赖包

npm install axios
//安装axios依赖包
//这会将axios包安装到你的项目中，并在package.json文件的dependencies部分添加一个条目。
```

`npm install` ：安装指定的包到当前项目中。如果该包在package.json文件中被声明为依赖，则它将被添加到项目的node_modules文件夹中。

补充：
`npm config get registry`
用于查看当前 npm 使用的镜像源。
`npm config set registry https://registry.npm.taobao.org`
用于设置 npm 使用的镜像源为淘宝镜像。

## 卸载软件包

使用`npm uninstall`命令卸载软件包

```bash
npm uninstall axios
//卸载axios依赖包
```

## 更新软件包

使用`npm update`命令更新软件包

```bash
npm update
//更新所有依赖包到它们的最新版本

npm update express
//只想更新express到最新版本
```

## 查看软件包

使用`npm list`命令查看软件包

```bash
npm list
//查看所有依赖包

npm list --depth=0
//查看顶级依赖包
```

- pm list：表示列出模块及其依赖关系的命令，列出的是当前项目中安装的所有包及其依赖关系。你可以使用`npm list --depth=0`来仅显示顶级包，其中的 --depth=0 参数是用来指定展示依赖关系的深度的。
- `--depth=0`：是一个参数，用于指定展示依赖关系的深度。在这里，0 表示只显示直接安装的模块，而不显示其依赖的模块。

## 搜索插件

使用`npm search`命令搜索插件

```bash
1、//找一个用于日期处理的包，你可以使用npm search来搜索
npm search date-handling

2、//搜索结果
NAME                      | DESCRIPTION          | AUTHOR          | DATE       | VERSION  | KEYWORDS  
date-fns                  | Modern JavaScript... | date-fns-org    | 2023-04-01 | 2.29.3   | date, date-fns, date-handling, ...  
moment-business-days      | A moment.js plugin...| mbadolato       | 2023-03-15 | 1.0.0    | moment, moment.js, date, date-handling, ...  
date-handling-utilities   | A set of utilities...| some-author     | 2023-02-01 | 1.0.1    | date, date-handling, utilities, ...  
...

3、//安装和使用，找到满足你需求的包，你可以使用 npm install 命令来安装它，然后按照包的文档来使用
npm install date-fns

```
