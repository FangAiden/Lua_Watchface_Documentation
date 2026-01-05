---
title: "string（字符串库）"
description: "拼接、查找、替换与模式匹配速查"
tags: ["module:official", "stdlib"]
---

## 概览

`string` 提供字符串处理能力：截取、查找、替换、格式化，以及 Lua 的“模式匹配”（不是正则）。

## 函数速查

| 函数 | 说明 | 可用性 |
|---|---|---|
| `string.len(s)` | 长度（也可用 `#s`） | `常见可用` |
| `string.sub(s, i[, j])` | 子串截取 | `常见可用` |
| `string.find(s, pattern[, init[, plain]])` | 查找（可纯文本或模式） | `常见可用` |
| `string.match(s, pattern[, init])` | 匹配并返回捕获 | `常见可用` |
| `string.gmatch(s, pattern)` | 迭代匹配 | `常见可用` |
| `string.gsub(s, pattern, repl[, n])` | 替换（支持函数/表替换） | `常见可用` |
| `string.format(fmt, ...)` | 格式化 | `常见可用` |
| `string.lower(s)` / `string.upper(s)` | 大小写转换 | `常见可用` |
| `string.rep(s, n[, sep])` | 重复拼接 | `常见可用` |
| `string.byte(s[, i[, j]])` / `string.char(...)` | 字节与字符转换 | `常见可用` |
| `string.reverse(s)` | 反转字符串 | `常见可用` |
| `string.dump(function[, strip])` | 导出函数字节码 | `可能不可用（常被禁用）` |
| `string.pack(fmt, ...)` | 按格式打包为二进制字符串 | `可能不可用（裁剪/版本差异）` |
| `string.unpack(fmt, s[, pos])` | 按格式解包 | `可能不可用（裁剪/版本差异）` |
| `string.packsize(fmt)` | 返回 pack 后长度 | `可能不可用（裁剪/版本差异）` |

> `string.*` 函数通常也支持方法调用：例如 `("abc"):sub(1, 2)`。

## 模式匹配小抄（非正则）

| 模式 | 含义 |
|---|---|
| `.` | 任意字符 |
| `%d` / `%a` / `%s` | 数字 / 字母 / 空白 |
| `+` / `*` / `-` / `?` | 重复（贪婪/非贪婪等） |
| `()` | 捕获 |
| `[]` | 字符集 |

## 示例

### 1) 纯文本查找（避免模式误伤）

```lua
local s = "a.b.c"
print(string.find(s, ".", 1, true)) -- 第 4 个参数 plain=true
```

### 2) 提取键值对

```lua
local line = "temp=26 humidity=0.6"
local temp = string.match(line, "temp=(%d+)")
local hum  = string.match(line, "humidity=(%d+%.?%d*)")
print(temp, hum)
```

### 3) gsub 批量替换

```lua
local s = "hello 123 world 456"
local out = string.gsub(s, "%d+", "#")
print(out) -- hello # world #
```
