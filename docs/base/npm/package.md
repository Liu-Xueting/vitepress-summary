# Package.json

## `package.json` 详细说明

---

### **1. 定义**

**`package.json`** 是 Node.js 项目的核心配置文件，用于描述项目元数据、依赖关系、脚本命令等。它位于项目根目录，是 **npm** 和 **Yarn** 等包管理工具的操作依据，也是模块化开发的关键文件。

---

### **2. 核心组成与功能**

#### **2.1 基础字段**

| 字段名           | 必填 | 说明                                                                 |
|-------------------|------|----------------------------------------------------------------------|
| **`name`**        | ✅   | 项目名称，需符合 [npm 命名规则](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#name)（小写、无空格、允许连字符）。 |
| **`version`**     | ✅   | 项目版本号，遵循 [语义化版本规范 (SemVer)](https://semver.org/)，格式为 `主版本号.次版本号.修订号`（如 `1.2.3`）。 |
| **`description`** | ❌   | 项目简介（用于 npm 搜索和展示）。                                     |
| **`keywords`**    | ❌   | 关键词数组，提升 npm 搜索命中率（如 `["react", "typescript"]`）。     |
| **`author`**      | ❌   | 作者信息，支持字符串或对象（如 `{ "name": "Alice", "email": "alice@example.com" }`）。 |
| **`license`**     | ❌   | 开源协议（如 `MIT`、`Apache-2.0`），或 `"UNLICENSED"`（私有项目）。  |

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A sample Node.js project",
  "keywords": ["demo", "nodejs"],
  "author": "Alice <alice@example.com>",
  "license": "MIT"
}
```

---

### **2.2 依赖管理**

| 字段名                   | 说明                                                                 |
|--------------------------|----------------------------------------------------------------------|
| **`dependencies`**       | **生产依赖**：项目运行时必需的包（如 `react`、`express`）。           |
| **`devDependencies`**    | **开发依赖**：仅开发/构建阶段需要的包（如 `eslint`、`webpack`）。     |
| **`peerDependencies`**   | **对等依赖**：要求宿主环境提供的包（常用于插件开发，如 `webpack` 插件）。 |
| **`optionalDependencies`** | **可选依赖**：非必需的包，安装失败不中断流程（如性能优化包）。        |
| **`bundledDependencies`** | **捆绑依赖**：需打包到项目发布文件中的包（需在 `bundleDependencies` 数组指定包名）。 |

```json
{
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "eslint": "^8.56.0"
  },
  "peerDependencies": {
    "react": ">=16.8.0"
  }
}
```

#### **版本号语法**

- `^1.2.3`：允许次版本号和修订号更新（即 `1.x.x`）。
- `~1.2.3`：仅允许修订号更新（即 `1.2.x`）。
- `1.2.3`：固定版本。
- `latest`：安装最新版本（不推荐，可能导致破坏性变更）。

---

### **2.3 脚本命令 (`scripts`)**

定义可通过 `npm run <script>` 或 `yarn <script>` 执行的命令，支持钩子脚本（如 `prestart`、`postbuild`）。

| 常用脚本            | 用途                                                                 |
|---------------------|----------------------------------------------------------------------|
| **`start`**         | 启动应用（默认可直接用 `npm start`）。                               |
| **`build`**         | 构建生产环境代码。                                                   |
| **`test`**          | 运行测试（默认可直接用 `npm test`）。                                |
| **`dev`**           | 启动开发服务器（如 `webpack-dev-server`）。                          |
| **`lint`**          | 运行代码检查工具（如 ESLint）。                                      |

```json
{
  "scripts": {
    "start": "node server.js",
    "build": "webpack --mode production",
    "dev": "webpack serve --mode development",
    "test": "jest",
    "lint": "eslint src/**/*.js"
  }
}
```

---

### **2.4 配置类字段**

| 字段名               | 说明                                                                 |
|----------------------|----------------------------------------------------------------------|
| **`main`**           | 项目入口文件（如 `"main": "dist/index.js"`，用于 `require()` 导入）。|
| **`module`**         | ES 模块入口文件（供支持 ESM 的打包工具使用）。                       |
| **`types`**          | TypeScript 类型声明文件路径（如 `"types": "dist/index.d.ts"`）。     |
| **`files`**          | 发布到 npm 的文件/目录白名单（如 `["dist", "README.md"]`）。         |
| **`engines`**        | 指定 Node.js 或 npm 版本（如 `{ "node": ">=18.0.0", "npm": "^9.0.0" }`）。 |
| **`browserslist`**   | 定义目标浏览器范围（影响 Babel、Autoprefixer 等工具）。             |
| **`config`**         | 自定义环境变量（可通过 `process.env.npm_package_config_*` 读取）。   |

```json
{
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "engines": {
    "node": ">=18.0.0"
  },
  "browserslist": ["last 2 Chrome versions", "Firefox ESR"],
  "config": {
    "port": 3000
  }
}
```

---

### **2.5 高级功能**

| 字段名                | 说明                                                                 |
|-----------------------|----------------------------------------------------------------------|
| **`workspaces`**      | 定义 Monorepo 子包目录（需 Yarn 或 npm ≥7.0）。                      |
| **`private`**         | 设为 `true` 可阻止项目被发布到 npm（用于私有项目）。                 |
| **`repository`**      | 代码仓库信息（如 `{ "type": "git", "url": "https://github.com/user/repo" }`）。 |
| **`publishConfig`**   | 覆盖发布到 npm 时的配置（如指定私有注册表 `registry`）。              |

```json
{
  "private": true,
  "workspaces": ["packages/*"],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/user/repo.git"
  },
  "publishConfig": {
    "registry": "https://registry.npmjs.org/"
  }
}
```

---

### **3. 生成与更新**

- **初始化**：通过 `npm init` 或 `yarn init` 交互式生成。
- **修改依赖**：
  - 安装包：`npm install <package>`（生产依赖）或 `npm install <package> --save-dev`（开发依赖）。
  - 更新包：`npm update <package>`。
  - 删除包：`npm uninstall <package>`。

---

### **4. 注意事项**

1. **版本锁定**：依赖版本范围可能导致不同环境安装不同版本，应配合 `package-lock.json` 或 `yarn.lock` 锁定版本。
2. **安全性**：定期检查依赖漏洞（使用 `npm audit` 或 `yarn audit`）。
3. **Git 忽略**：将 `node_modules` 和 `package-lock.json`（或 `yarn.lock`）添加到 `.gitignore`。
4. **环境变量**：脚本中可通过 `process.env.npm_package_*` 访问 `package.json` 的字段值。

---

### **5. 示例文件**

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "A full-stack application",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "webpack --mode production",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "eslint": "^8.56.0",
    "webpack": "^5.89.0"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "browserslist": ["last 2 versions"],
  "license": "MIT"
}
```

---

### **6. 总结**

`package.json` 是 Node.js 生态的基石，负责：

- **项目管理**：定义元数据、依赖关系和构建流程。
- **协作标准化**：确保团队成员使用一致的开发环境。
- **自动化**：通过脚本简化测试、构建和部署操作。

合理配置 `package.json` 可显著提升项目可维护性，是前端/Node.js 开发者的必备技能。
