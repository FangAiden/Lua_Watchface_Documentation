---
title: "Thumbnail"
description: "LVGL Widget: Thumbnail"
tags: ["module:lvgl", "type:api", "kind:widget"]
---
# Thumbnail

继承自：[`Object`](./object.md)

---

## 概述

`lvgl.Thumbnail` 是一个缩略图控件，用于在界面上显示小尺寸的图片预览。
常用于图像浏览器、相册、视频预览、文件列表等场景。

该控件继承自 `Object`，拥有所有基础属性与事件接口（如 `set_style`、`onClicked` 等），并通过 `set{}` 接口设置图像源及相关参数。

---

## 创建

```lua
-- 创建一个缩略图
local thumb = lvgl.Thumbnail({
  x = 20, y = 20,
  w = 80, h = 80,
  src = "S:/images/sample.bin"    -- 直接设置缩略图图片
})
```

或指定父对象：

```lua
-- 创建一个缩略图并指定父对象
local thumb2 = lvgl.Thumbnail(parent, {
  w = 64, h = 64,
  src = "A:/photos/pic1.bin"
})
```

---

## 特有 Methods

| 方法         | 说明                   |
| ---------- | -------------------- |
| `set(tbl)` | 设置控件属性，例如图片源、边框、对齐等。 |

---

## 可设置属性（通过 set{}）

| 属性             | 类型                  | 说明                                        |
| -------------- | ------------------- | ----------------------------------------- |
| `src`          | `string` 或 `imgsrc` | 设置缩略图图片路径或图像源（支持 `.bin`、`.png`、`.jpg` 等）。 |
| `radius`       | `integer`           | 设置圆角大小，常用于圆形或圆角缩略图。                       |
| `bg_color`     | `lvgl.Color`        | 背景颜色（默认为透明）。                              |
| `border_width` | `integer`           | 边框宽度（默认 0）。                               |
| `border_color` | `lvgl.Color`        | 边框颜色。                                     |
| `align`        | `lvgl.ALIGN`        | 控件对齐方式，例如 `lvgl.ALIGN.CENTER`。            |
| `pad_all`      | `integer`           | 控件内边距，用于留出边界空间。                           |

---

## 示例

```lua
-- 设置缩略图样式
thumb:set({
  src = "S:/images/preview1.bin",
  radius = lvgl.RADIUS_CIRCLE,
  border_width = 2,
  border_color = lvgl.Color(0xFFFFFF),
  bg_color = lvgl.Color(0x202020),
  pad_all = 4
})

-- 点击事件：打开大图
thumb:onClicked(function()
  print("Thumbnail clicked! Showing full image.")
end)
```

---

## 注意事项

- `Thumbnail` 是一个轻量图片展示控件。
- 图像源通过 `src` 属性设置。
= 样式属性与交互接口继承自 `Object`，可自由组合布局与事件。