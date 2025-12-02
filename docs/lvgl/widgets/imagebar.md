---
title: "ImageBar"
description: "LVGL Widget: ImageBar"
tags: ["module:lvgl", "type:api", "kind:widget"]
---
# ImageBar

继承自：Object

---

## 概述
`lvgl.ImageBar` 是一个基于图片的进度条控件，用于通过图像素材来显示进度或状态变化。  
与传统 `Bar` 控件不同，`ImageBar` 支持使用多张图片组成不同阶段的视觉效果，常用于电量显示、音量条、信号强度指示等。

---

## 创建

```lua
-- 创建一个图片进度条
local imgbar = lvgl.ImageBar({
  x = 40, y = 40,
  w = 200, h = 40,
  src_bg = "S:/images/bar_bg.bin",
  src_fg = "S:/images/bar_fg.bin",
  value = 60,
})
```

> `ImageBar` 继承自 `Object`，因此可使用通用属性与事件接口（如 `align`, `set_style`, `onClicked` 等）。

---

## 特有 Methods

| 方法         | 说明                      |
| ---------- | ----------------------- |
| `set(tbl)` | 设置控件的属性，如图片源、数值、方向、样式等。 |

---

## 可设置属性（通过 `set{}`）

| 属性             | 类型                  | 说明                                             |
| -------------- | ------------------- | ---------------------------------------------- |
| `src_bg`       | `string` 或 `imgsrc` | 背景图片路径或资源。                                     |
| `src_fg`       | `string` 或 `imgsrc` | 前景图片路径或资源，用于显示进度部分。                            |
| `value`        | `integer`           | 当前进度值（通常为 0~100）。                              |
| `range`        | `{min, max}`        | 设置进度范围。示例：`{0, 100}`。                          |
| `direction`    | `string`            | 进度方向：`"left"`, `"right"`, `"top"`, `"bottom"`。 |
| `align`        | `lvgl.ALIGN`        | 控件对齐方式，例如 `lvgl.ALIGN.CENTER`。                 |
| `bg_color`     | `lvgl.Color`        | 背景填充颜色（在无图片时生效）。                               |
| `border_width` | `integer`           | 边框宽度。                                          |
| `border_color` | `lvgl.Color`        | 边框颜色。                                          |

---

## 示例

```lua
-- 设置图片进度条属性
imgbar:set({
  src_bg = "S:/images/bar_bg.bin",
  src_fg = "S:/images/bar_fg.bin",
  value = 75,
  direction = "right",
  border_width = 2,
  border_color = lvgl.Color(0x00FF00)
})

-- 动态更新进度
lvgl.Timer(function()
  local val = math.random(0, 100)
  imgbar:set({ value = val })
end, 1000, lvgl.TIMER.PERIODIC)
```

---

## 注意事项

- `ImageBar` 是图片增强版进度条控件；
- 支持背景与前景图片叠加；
- 可通过 `value` 动态更新进度；
- 样式与交互行为与普通 `Object` 一致。