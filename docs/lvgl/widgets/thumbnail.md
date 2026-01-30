---
title: "Thumbnail"
description: "LVGL Widget: Thumbnail"
tags: ["module:lvgl", "type:api", "kind:widget"]
---
# Thumbnail

继承自 [Object](./object.md)

> ⚠️ 该控件在模拟器的 `debug.getregistry()["widgets"]` 中未注册，可能仅在特定硬件设备上可用。API 签名基于源码分析，**待设备验证**。

## 创建

```lua
local thumb = parent:Thumbnail {
  w = 80, h = 80,
  src = "S:/images/sample.bin",
}
```

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `src` | string / imgsrc | 缩略图图片路径或图像源 |

## 方法

| 方法 | 说明 |
|------|------|
| `set(tbl)` | 批量设置属性 |

## 示例

```lua
local thumb = lvgl.Thumbnail(nil, {
  w = 80, h = 80,
  src = "S:/images/preview1.bin",
  radius = lvgl.RADIUS_CIRCLE,
  border_width = 2,
})

thumb:onClicked(function()
  print("Thumbnail clicked!")
end)
```
