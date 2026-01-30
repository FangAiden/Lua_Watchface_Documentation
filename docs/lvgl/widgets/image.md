---
title: "Image"
description: "LVGL 图像控件，用于显示图片文件或内存图像"
tags: ["module:lvgl", "type:ref", "kind:widget"]
---
# Image

继承自 [Object](./object.md)

## 创建

```lua
local img = parent:Image {
  w = 100, h = 100,
  src = "/flash/logo.bin",
}
```

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `src` | string / userdata | 图片资源路径或内存引用 |
| `pivot` | table `{x, y}` | 旋转中心点 |

## 方法

| 方法 | 说明 |
|------|------|
| `set_src(src)` | 设置图片资源路径或内存源 |
| `set_offset({x, y})` | 设置图像偏移量 |
| `set_pivot({x, y})` | 设置旋转中心点 |
| `get_img_size([src])` | 获取图片尺寸，返回 `w, h` |

## 示例

```lua
local img = lvgl.Image(nil, { w = 100, h = 100 })

img:set_src("/flash/pic.bin")
local w, h = img:get_img_size()
print("尺寸:", w, h)
img:set_pivot({x = 50, y = 50})
img:set_offset({x = 20, y = 10})
```
