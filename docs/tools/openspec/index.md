# openspec

OpenSpec 是一个为AI编码助手设计的规范驱动开发工具，它通过轻量级的工作流程，确保人类开发者和AI助手在编写任何代码之前就能对需求达成明确共识。

## 准备工作

- Node.js >= 20.19.0
- 支持的AI编码助手（见支持的AI工具）

## 快速开始

1. 安装 openspec CLI

```bash
npm install -g @fission-ai/openspec@latest
```

验证安装

```bash
openspec --version
```

1. 初始化项目

```bash
cd your-project-directory
openspec init
```

初始化过程会：

- 询问您使用的AI工具（Claude Code、Cursor等）
- 自动配置相应的斜杠命令
- 创建 `openspec/` 目录结构
- 生成 `AGENTS.md` 文件

1. 验证设置

```bash
openspec list
```

如果您的AI助手没有立即显示新的斜杠命令，请重启它。

## 配置工作流

OpenSpec 提供两种工作流模式：
默认模式（Core Profile）：

```text
# 快速路径，包含 4 个命令
/opsx:propose   # 创建变更和规划文档
/opsx:explore   # 探索想法
/opsx:apply     # 实现任务
/opsx:archive   # 归档完成的变更
```

扩展模式（Expanded Profile）：

```text
# 配置扩展工作流
openspec config profile  # 选择 workflows
openspec update          # 应用配置

# 扩展命令
/opsx:new         # 创建变更脚手架
/opsx:continue    # 逐个创建文档
/opsx:ff          # 快速创建所有规划文档
/opsx:verify      # 验证实现
/opsx:sync        # 同步增量规范
/opsx:bulk-archive # 批量归档
/opsx:onboard     # 引导教程
```

## 项目配置

1. 创建配置
配置在 openspec init 时自动创建，或手动创建：

```text
# openspec/config.yaml
schema: spec-driven  # 默认规范

# 项目上下文，注入到所有文档
context: |
  技术栈：TypeScript, React, Node.js
  API 约定：RESTful, JSON 响应
  测试：Vitest 单元测试，Playwright e2e
  代码风格：ESLint + Prettier, 严格 TypeScript

# 每个文档的规则
rules:
  proposal:
    - 包含回滚计划
    - 识别受影响的团队
  specs:
    - 使用 Given/When/Then 格式编写场景
  design:
    - 复杂流程包含时序图

```
