# Lua 应用开发文档（Docusaurus + Tauri）

本仓库是一个基于 **Docusaurus** 的文档站点，用于沉淀 Lua 应用开发过程中整理的模块接口与示例（如 `lvgl` / `dataman` / `animengine` 等）。  
同时集成 **Tauri**，可将文档站点打包为离线桌面应用（Windows NSIS）。

## 环境要求

- Node.js `>= 20`（见 `package.json`）
- （可选，桌面版）Rust 工具链 + Tauri 依赖

## 本地预览

```bash
npm ci
npm run start
```

默认会启动开发服务器（通常为 `http://localhost:3000`）。

## 构建静态站点

```bash
npm run build
```

产物输出到 `build/`。

## 打包离线桌面版（可选）

> 需要本机已配置 Rust/Tauri 构建环境。

```bash
npx tauri dev
```

```bash
npx tauri build
```

## 目录结构（常用）

- `docs/`：文档内容（Markdown/MDX）
- `sidebars.ts`：文档侧边栏结构
- `docusaurus.config.ts`：站点配置（标题、主题、路由等）
- `src-tauri/`：Tauri 应用配置与 Rust 端

## 贡献文档

- 新增/修改文档：在 `docs/` 下编辑，并在 `sidebars.ts` 中挂载导航
- 建议优先阅读：`docs/intro/conventions.md`
