---
title: "全局环境（_G）"
description: "全局变量表与常用全局函数速查"
tags: ["module:official", "stdlib"]
---

## 概览

Lua 的“全局变量”存放在全局环境表 `_G` 中。你在代码里直接写的 `print()`、`type()`、`pairs()` 等，通常都来自 `_G`。

> 运行时可能会裁剪部分全局函数；建议用 `type(name) == "function"` 做兼容判断。

## 常用全局变量

| 名称 | 类型 | 说明 | 可用性 |
|---|---|---|---|
| `_G` | `table` | 全局环境表本身 | `常见可用` |
| `_VERSION` | `string` | Lua 版本字符串（例如 `"Lua 5.4"`） | `常见可用` |

## 全局函数（速查）

| 函数 | 说明 | 可用性 |
|---|---|---|
| `assert(v[, message])` | `v` 为假值时抛错；否则返回 `v`（以及额外返回值） | `常见可用` |
| `error(message[, level])` | 主动抛出错误 | `常见可用` |
| `pcall(f, ...)` | 保护调用：返回 `ok, result...` | `常见可用` |
| `xpcall(f, msgh, ...)` | 保护调用（可自定义错误处理函数 `msgh`） | `常见可用` |
| `print(...)` | 输出日志 | `常见可用` |
| `type(x)` | 返回类型字符串（`"nil"`, `"number"`, `"table"` …） | `常见可用` |
| `tostring(x)` | 转为字符串（适合日志输出） | `常见可用` |
| `tonumber(x[, base])` | 转为数字；`base` 用于进制转换（实现相关） | `常见可用` |
| `pairs(t)` | 遍历表的键值对（通常无序） | `常见可用` |
| `ipairs(t)` | 遍历数组部分（从 1 起连续整数键） | `常见可用` |
| `next(t[, k])` | `pairs` 的底层迭代器接口 | `常见可用` |
| `select(i, ...)` | 处理可变参数 | `常见可用` |
| `getmetatable(v)` / `setmetatable(t, mt)` | 读取/设置元表 | `常见可用` |
| `rawget(t, k)` / `rawset(t, k, v)` | 绕过元方法直接读写 | `常见可用` |
| `rawequal(a, b)` | 绕过 `__eq` 元方法做相等比较 | `常见可用` |
| `rawlen(v)` | 绕过 `__len` 获取长度（字符串/表） | `可能不可用（版本差异/裁剪）` |
| `collectgarbage([opt[, arg]])` | 控制 GC（接口与选项受版本/实现影响） | `可能不可用（裁剪/实现相关）` |
| `require(name)` | 加载模块（与 `package` 协作） | `可能不可用（实现相关）` |
| `load(chunk[, chunkname[, mode[, env]]])` | 从字符串/函数加载 chunk | `可能不可用（裁剪/限制动态加载）` |
| `loadfile(filename[, mode[, env]])` | 从文件加载 chunk | `可能不可用（无文件系统/裁剪）` |
| `dofile([filename])` | 加载并立刻执行文件（无保护） | `可能不可用（无文件系统/裁剪）` |
| `warn(...)` | 输出警告（Lua 5.4+，实现相关） | `可能不可用（版本差异/裁剪）` |

## 示例：用 `pcall` 防止缺失 API 中断

```lua
local ok, err = pcall(function()
  return io and io.open and io.open("test.txt", "r")
end)
print("ok?", ok, err)
```

## 兼容性建议

- 不要假设所有全局函数都存在：先判断 `type(fn) == "function"`。
- 对“可能被裁剪”的能力（文件加载、动态加载、GC 控制等）尤其要保守使用。
