---
title: "ImageLabel"
description: "LVGL Widget: ImageLabel"
tags: ["module:lvgl", "type:api", "kind:widget"]
---
# ImageLabel

继承自 [Object](./object.md)

> ⚠️ 该控件在模拟器的 `debug.getregistry()["widgets"]` 中未注册，可能仅在特定硬件设备上可用。API 签名基于源码分析，**待设备验证**。

## 创建

```lua
local imglbl = parent:ImageLabel {
  src = "S:/images/icon_wifi.bin",
  text = "Wi-Fi",
  spacing = 6,
}
```

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `src` | string / imgsrc | 图标路径 |
| `text` | string | 显示文本 |
| `font` | lvgl.Font | 字体 |
| `spacing` | integer | 图标与文字间距 |
| `layout` | string | 布局：`"left"`, `"right"`, `"top"`, `"bottom"` |
| `text_color` | lvgl.Color | 文本颜色 |

## 方法

| 方法 | 说明 |
|------|------|
| `set(tbl)` | 批量设置属性 |

## 示例

```lua
local imglbl = lvgl.ImageLabel(nil, {
  src = "S:/images/icon_music.bin",
  text = "Music",
  layout = "right",
  spacing = 8,
  text_color = lvgl.Color(0xFFFFFF),
})

imglbl:onClicked(function()
  print("ImageLabel clicked!")
end)
```
