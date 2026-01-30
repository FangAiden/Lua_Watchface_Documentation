---
title: "LVGL 概览"
description: "LVGL 模块树结构与可用控件/枚举/子模块/全局函数"
tags: ["module:lvgl", "type:overview"]
---

# LVGL 概览

`luavgl` 是对 LVGL 核心函数和组件的 Lua 封装。

:::caution 注意
- 在实机上测试未知特性时，请在按钮回调中触发测试代码，避免程序启动时直接运行导致 Panic 循环重启。
:::

## 可用控件 ✅

| 控件 | 说明 |
|------|------|
| **Object** | 基类对象（47 个方法） |
| **Label** | 文本标签 |
| **Image** | 图片（支持 `.bin` 格式） |
| **Checkbox** | 复选框 |
| **Dropdown** | 下拉选择 |
| **Roller** | 滚轮选择 |
| **Textarea** | 文本输入 |
| **Led** | LED 指示灯 |
| **Calendar** | 日历 |
| **List** | 列表 |
| **Keyboard** | 键盘 |

## 不可用控件 ❌

Arc, Bar, Slider, Switch, Spinner, Meter, Chart, Line, Btnmatrix, Table, Pointer, AnalogTime, Analogclock, Tabview — 均未注册，调用返回 `nil`。
