---
title: "内置字体"
description: "LVGL 内置字体"
tags: ["module:lvgl", "type:ref", "kind:globals"]
---

# 内置字体

## 预编译字体常量

| 值 | 说明 |
|----|------|
| **DEFAULT** | 默认字体（通常等价于 MONTSERRAT_14） |
| **MONTSERRAT_12** | 12px |
| **MONTSERRAT_12_SUBPX** | 12px 次像素渲染 |
| **MONTSERRAT_14** | 14px（默认） |
| **MONTSERRAT_16** | 16px |
| **MONTSERRAT_18** | 18px |
| **MONTSERRAT_22** | 22px |
| **MONTSERRAT_24** | 24px |
| **MONTSERRAT_32** | 32px |

## `lvgl.Font()` 验证结果 ✅

已验证可用组合（`lvgl.Font(name, size, weight)`）：

| 字体 | 可用尺寸 |
|------|----------|
| `montserrat` | 14, 16, 18, 24, 32 |

> `weight` 仅 `"normal"` 有效，可省略。

## 设备 TTF 字体

设备 `/font/` 目录下的 TTF 文件（⚠️ 未验证是否可通过 `lvgl.Font` 加载）：

| 文件 | 说明 |
|------|------|
| `MiSans-Regular.ttf` | 小米兰亭 Regular |
| `MiSans-Medium.ttf` | 小米兰亭 Medium |
| `MiSans-Semibold.ttf` | 小米兰亭 Semibold |
| `MiSans-Demibold.ttf` | 小米兰亭 Demibold |
| `MiSansF-Medium.ttf` | 小米兰亭 F Medium |
| `MiSansF-Semibold.ttf` | 小米兰亭 F Semibold |
| `MiSansF-Demibold.ttf` | 小米兰亭 F Demibold |
