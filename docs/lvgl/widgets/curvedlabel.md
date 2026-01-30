---
title: "CurvedLabel"
description: "LVGL Widget: CurvedLabel"
tags: ["module:lvgl", "type:api", "kind:widget"]
---
# CurvedLabel

继承自 [Object](./object.md)

> ⚠️ 该控件在模拟器的 `debug.getregistry()["widgets"]` 中未注册，可能仅在特定硬件设备上可用。API 签名基于源码分析，**待设备验证**。

## 创建

```lua
local curved = parent:CurvedLabel {
  w = 200, h = 100,
  text = "LuaVGL Curved Label",
  radius = 80,
  angle_start = 180,
  angle_range = 180,
}
```

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `text` | string | 显示文本 |
| `radius` | number | 弧形半径 |
| `angle_start` | number | 起始角度（度） |
| `angle_range` | number | 文字分布角度范围 |
| `font` | lvgl.Font | 字体 |
| `text_color` | lvgl.Color | 文本颜色 |

## 方法

| 方法 | 说明 |
|------|------|
| `set(tbl)` | 批量设置属性 |

## 示例

```lua
local curved = lvgl.CurvedLabel(nil, {
  w = 200, h = 100,
  text = "HELLO WORLD",
  radius = 120,
  angle_start = 150,
  angle_range = 200,
  text_color = lvgl.Color(0x00FFAA),
})
```
