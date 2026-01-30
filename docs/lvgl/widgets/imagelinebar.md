---
title: "ImageLineBar"
description: "LVGL Widget: ImageLineBar"
tags: ["module:lvgl", "type:api", "kind:widget"]
---
# ImageLineBar

继承自 [Object](./object.md)

> ⚠️ 该控件在模拟器的 `debug.getregistry()["widgets"]` 中未注册，可能仅在特定硬件设备上可用。API 签名基于源码分析，**待设备验证**。

## 创建

```lua
local linebar = parent:ImageLineBar {
  w = 240, h = 20,
  src_bg = "S:/images/line_bg.bin",
  src_fg = "S:/images/line_fg.bin",
  value = 50,
}
```

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `src_bg` | string / imgsrc | 背景图片 |
| `src_fg` | string / imgsrc | 前景图片 |
| `value` | integer | 当前值（0~100） |
| `segments` | integer | 线段数量 |
| `spacing` | integer | 线段间距（像素） |
| `direction` | string | 方向：`"left"`, `"right"`, `"top"`, `"bottom"` |
| `range` | `{min, max}` | 值范围 |
| `color_active` | lvgl.Color | 已填充颜色 |
| `color_inactive` | lvgl.Color | 未填充颜色 |

## 方法

| 方法 | 说明 |
|------|------|
| `set(tbl)` | 批量设置属性 |

## 示例

```lua
local linebar = lvgl.ImageLineBar(nil, {
  w = 240, h = 20,
  src_bg = "S:/images/line_bg.bin",
  src_fg = "S:/images/line_fg.bin",
  value = 80,
  segments = 10,
  spacing = 2,
})

linebar:set({ value = 50 })
```
