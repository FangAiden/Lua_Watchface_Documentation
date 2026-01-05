---
title: "快速开始"
description: "从阅读到验证，再到贡献文档的最短路径"
tags: ["type:intro", "type:guide"]
---

本项目是一套 **Lua 应用开发文档**（Docusaurus 站点），内容主要来源于工程源码、镜像分析与运行时验证。

## 建议阅读顺序

1. [概览](./overview.md)：了解有哪些模块、文档覆盖范围
2. [文档约定](./conventions.md)：重要安全提示与可信度说明
3. `lvgl/overview`：UI 控件体系与全局函数（新手最常用）
4. `dataman/overview`：数据订阅与页面联动
5. `animengine/overview`：动画引擎（模板化配置、生命周期管理）
6. `activity/overview` / `navigator/overview` / `vibrator/overview`：页面状态、退出逻辑、触觉反馈

## 在设备/模拟器上验证 API（推荐流程）

> 强烈建议把探索代码放在 **按钮事件** 或 **定时器回调** 中触发，避免在脚本初始化阶段直接跑测试逻辑。

### 1) 快速查看模块是否存在

```lua
print("lvgl:", lvgl)
print("dataman:", dataman)
print("topic:", topic)
print("activity:", activity)
print("animengine:", animengine)
print("navigator:", navigator)
print("screen:", screen)
print("vibrator:", vibrator)
```

### 2) 枚举模块成员（表类型模块适用）

```lua
local function dumpTable(name, t)
  print("==", name, "==")
  if type(t) ~= "table" then
    print("not a table:", type(t))
    return
  end
  for k, v in pairs(t) do
    print(k, v)
  end
end

-- 建议在按钮回调/Timer 中调用
dumpTable("topic", topic)
dumpTable("vibrator", vibrator)
```

### 3) 用“最小可运行示例”验证行为

以 `dataman.subscribe` 为例：先验证能否订阅、回调是否触发，再逐步补充主题与 payload 结构。

```lua
local token = dataman.subscribe("sys.time", function(p)
  print("time payload:", p)
end)

-- 若页面进入编辑态/隐藏态，按需暂停
-- dataman.pause(token)
-- dataman.resume(token)
```

## 本地预览/构建文档站（开发者）

```bash
npm ci
npm run start
```

```bash
npm run build
```

> 站点启用了 `onBrokenLinks: "throw"`：相对链接写错会导致构建失败（这通常是好事）。

## 打包离线桌面版（可选）

仓库集成了 Tauri（配置见 `src-tauri/tauri.conf.json`），可将 `build/` 产物打包为离线应用：

```bash
npx tauri dev
```

```bash
npx tauri build
```

## 如何贡献文档

- 新增页面：在 `docs/` 下创建 `*.md`/`*.mdx`，建议补齐 `title/description` 的 frontmatter
- 挂载导航：在 `sidebars.ts` 中把新页面加入对应分类
- 自检：本地跑一次 `npm run build`，确保链接/引用无误
