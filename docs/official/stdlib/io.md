---
title: "io（输入输出）"
description: "文件句柄读写与 lines/read/write（设备侧常见受限）"
tags: ["module:official", "stdlib"]
---

## 概览

`io` 提供文件与标准输入输出的读写能力。  
在许多设备固件/沙箱环境中，`io` 可能**完全不可用**或只支持极少数接口。

## 模块结构（速查）

| 成员 | 类型 | 说明 | 可用性 |
|---|---|---|---|
| `io.open(name[, mode])` | `function` | 打开文件并返回 file 句柄 | `可能不可用（设备侧常被禁用）` |
| `io.close([file])` | `function` | 关闭文件（或默认输出文件） | `可能不可用（设备侧常被禁用）` |
| `io.flush()` | `function` | 刷新默认输出 | `可能不可用（设备侧常被禁用）` |
| `io.lines([filename[, ...]])` | `function` | 按行迭代（或基于当前输入） | `可能不可用（设备侧常被禁用）` |
| `io.read(...)` / `io.write(...)` | `function` | 基于默认输入/输出的读写 | `可能不可用（设备侧常被禁用）` |
| `io.input([file])` / `io.output([file])` | `function` | 设置/获取默认输入/输出 | `可能不可用（设备侧常被禁用）` |
| `io.type(obj)` | `function` | 判断是否为 file 句柄 | `可能不可用（设备侧常被禁用）` |
| `io.tmpfile()` | `function` | 创建临时文件 | `可能不可用（设备侧常被禁用）` |
| `io.popen(prog[, mode])` | `function` | 管道打开外部进程 | `可能不可用（通常被禁用）` |
| `io.stdin` / `io.stdout` / `io.stderr` | `file` | 标准输入/输出/错误 | `可能不可用（实现相关）` |

## file 句柄常用方法（若实现支持）

| 方法 | 说明 | 可用性 |
|---|---|---|
| `f:read(...)` / `f:write(...)` | 读取/写入 | `可能不可用（依赖 io 支持）` |
| `f:lines(...)` | 逐行迭代 | `可能不可用（依赖 io 支持）` |
| `f:seek([whence[, offset]])` | 定位 | `可能不可用（依赖 io 支持）` |
| `f:setvbuf(mode[, size])` | 设置缓冲 | `可能不可用（依赖 io 支持）` |
| `f:flush()` / `f:close()` | 刷新/关闭 | `可能不可用（依赖 io 支持）` |

## 最小示例（带保护判断）

```lua
if not (io and type(io.open) == "function") then
  print("io.open not available")
  return
end

local f = assert(io.open("test.txt", "w"))
f:write("hello\n")
f:close()
```

## 兼容性建议

- 在设备侧优先使用平台提供的数据接口（例如你项目里的 `dataman`），而不是假设有可写文件系统。
- 所有 `io` 调用都建议 `pcall/assert` 包裹，避免权限/路径问题导致崩溃式中断。
