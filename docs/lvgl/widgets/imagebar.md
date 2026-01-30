---
title: "ImageBar"
description: "LVGL Widget: ImageBar"
tags: ["module:lvgl", "type:api", "kind:widget"]
---
# ImageBar

继承自 [Object](./object.md)

> ⚠️ 该控件在模拟器的 `debug.getregistry()["widgets"]` 中未注册，可能仅在特定硬件设备上可用。API 签名基于源码分析，**待设备验证**。

## 创建

```lua
local imgbar = parent:ImageBar {
  w = 200, h = 40,
  src_bg = "S:/images/bar_bg.bin",
  src_fg = "S:/images/bar_fg.bin",
  value = 60,
}
```

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `src_bg` | string / imgsrc | 背景图片 |
| `src_fg` | string / imgsrc | 前景图片（进度部分） |
| `value` | integer | 当前进度值（0~100） |
| `range` | `{min, max}` | 进度范围 |
| `direction` | string | 方向：`"left"`, `"right"`, `"top"`, `"bottom"` |

## 方法

| 方法 | 说明 |
|------|------|
| `set(tbl)` | 批量设置属性 |

## 示例

```lua
local imgbar = lvgl.ImageBar(nil, {
  w = 200, h = 40,
  src_bg = "S:/images/bar_bg.bin",
  src_fg = "S:/images/bar_fg.bin",
  value = 75,
  direction = "right",
})

imgbar:set({ value = 90 })
```
