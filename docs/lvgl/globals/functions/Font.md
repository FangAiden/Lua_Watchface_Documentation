---
title: "Font"
description: "字体模块，用于管理和使用 LVGL 中的字体资源"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 概述

`Font` 是 LuaVGL 提供的 **字体模块**，用于在界面中加载、引用和使用 LVGL 的字体资源。  
通过该模块可以访问 LVGL 内置字体或自定义字体，用于设置标签 (`label`) 等控件的文字样式。

---

## 定义

```lua
Font : table
```

## 参数说明
| 参数     | 类型  | 是否可选 | 说明 |
| -------- | ------ | ------ | ----- |
| `name`   | `string`             | 必填     | 字体名称或名称列表（以逗号分隔），按顺序尝试加载字体。支持内置字体（`montserrat`, `unscii`, `dejavu_persian_hebrew`, `simsun_16_cjk`）。示例：`"montserrat"`, `"montserrat, unscii"`, `"MiSansW medium, montserrat"`。                                                                                                                   |     |
| `size`   | `integer`            | 可选     | 字体像素大小，默认 `12`（即 `FONT_DEFAULT_SIZE`）。仅内置字体支持特定字号，如 `8, 10, 12, 14, ... 48`。                                                                                                                                                                                                                                  |     |
| `weight` | `integer  \| string` | 可选     | 字体粗细，默认 `"normal"`。可用数值或字符串形式（区分大小写不敏感）：<br />**数字形式**：`100`、`200`、`300`、`400`、`500`、`600`、`700`、`800`、`900`。<br />**命名形式**：`"thin"`, `"extra light"`, `"light"`, `"normal"`, `"medium"`, `"semi bold"`, `"bold"`, `"extra bold"`, `"ultra bold"`。<br />当前内置字体仅支持 `"normal"`。 |

> 若用户传入未支持的名称或字号，Lua 端会继续尝试备用字体（按输入字符串中逗号顺序），全部失败则报错。

## 示例

```lua
text_font = lvgl.Font("montserrat", 32, "normal")
```