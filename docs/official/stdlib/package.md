---
title: "package（模块加载）"
description: "require、模块缓存与搜索路径（实现差异较大）"
tags: ["module:official", "stdlib"]
---

## 概览

`package` 与全局函数 `require` 一起构成 Lua 的模块系统。  
在嵌入式/定制运行时中，模块搜索路径与加载器可能被替换或裁剪，因此这是一个“实现差异很大”的库。

## 核心概念

- `require("name")`：加载模块（只会加载一次），并返回模块返回值
- `package.loaded[name]`：已加载模块缓存表
- `package.preload[name]`：预加载表（可把 loader 函数放在这里）

## 字段/函数速查

| 成员 | 类型 | 说明 | 可用性 |
|---|---|---|---|
| `require(name)` | `function` | 加载模块（全局函数） | `可能不可用（实现相关）` |
| `package.loaded` | `table` | 模块缓存 | `常见可用` |
| `package.preload` | `table` | 预加载 loader | `常见可用` |
| `package.path` | `string` | Lua 模块搜索路径 | `可能不可用（实现相关）` |
| `package.cpath` | `string` | C 模块搜索路径 | `可能不可用（通常被禁用）` |
| `package.searchers` | `table` | 搜索器列表（加载链路） | `可能不可用（实现相关）` |
| `package.searchpath(name, path[, sep[, rep]])` | `function` | 在路径模板里查找模块文件 | `可能不可用（无文件系统/裁剪）` |
| `package.loadlib(libname, funcname)` | `function` | 动态加载 C 库 | `可能不可用（通常被禁用）` |
| `package.config` | `string` | 平台相关配置字符串 | `可能不可用（实现相关）` |

> 某些旧实现可能使用 `package.loaders`（而非 `package.searchers`）；请以运行时为准。

## 示例：使用 preload 注入模块（离线/无文件系统时常用）

```lua
if package and type(package.preload) == "table" then
  package.preload["mymod"] = function()
    local M = {}
    function M.hello() print("hi") end
    return M
  end
end

local m = require("mymod")
m.hello()
```

## 兼容性建议

- 不要假设存在可用的 `package.path` 文件搜索；很多设备侧模块来自“内置注册”或“打包资源”。
- 若发现 `require` 行为异常，先检查 `package.loaded`，以及 `package.searchers`（若存在）来定位加载链路。
