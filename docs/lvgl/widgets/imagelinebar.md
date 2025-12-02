---
title: "ImageLineBar"
description: "LVGL Widget: ImageLineBar"
tags: ["module:lvgl", "type:api", "kind:widget"]
---
# ImageLineBar

继承自：Object

---

## 概述
`lvgl.ImageLineBar` 是一种基于图片的线性条形控件。  
它通常用于表示进度、信号强度、或多段状态，通过组合图片素材来表现出“线状”变化效果。  
相比普通 `ImageBar`，`ImageLineBar` 更注重条形线段的动态表现，适合音量条、速度条、加载进度等可视化组件。

---

## 创建

```lua
-- 创建一个图片线性条
local linebar = lvgl.ImageLineBar({
  x = 40, y = 60,
  w = 240, h = 20,
  src_bg = "S:/images/line_bg.bin",
  src_fg = "S:/images/line_fg.bin",
  value = 50,
})
```

> `ImageLineBar` 继承自 `Object`，因此可使用所有标准属性与事件（如 `set_style`、`align`、`onClicked` 等）。

---

## 特有 Methods

| 方法         | 说明                      |
| ---------- | ----------------------- |
| `set(tbl)` | 设置控件的属性，如图片源、数值、布局、样式等。 |

---

## 可设置属性（通过 `set{}`）

| 属性               | 类型                  | 说明                                                 |
| ---------------- | ------------------- | -------------------------------------------------- |
| `src_bg`         | `string` / `imgsrc` | 背景图片路径或图像源。                                        |
| `src_fg`         | `string` / `imgsrc` | 前景图片，用于显示“已填充”部分。                                  |
| `value`          | `integer`           | 当前值（进度或比例，通常 0~100）。                               |
| `segments`       | `integer`           | 显示的线段数量，用于分段式视觉效果。                                 |
| `direction`      | `string`            | 进度方向（可选：`"left"`, `"right"`, `"top"`, `"bottom"`）。 |
| `spacing`        | `integer`           | 线段间距，单位为像素。                                        |
| `range`          | `{min, max}`        | 值的范围定义。                                            |
| `color_active`   | `lvgl.Color`        | 已填充线段颜色（用于无图片模式）。                                  |
| `color_inactive` | `lvgl.Color`        | 未填充部分颜色。                                           |

---

## 示例

```lua
-- 设置线性图片条属性
linebar:set({
  src_bg = "S:/images/line_bg.bin",
  src_fg = "S:/images/line_fg.bin",
  value = 80,
  segments = 10,
  spacing = 2,
  direction = "right",
  color_active = lvgl.Color(0x00FF00),
  color_inactive = lvgl.Color(0x222222),
})

-- 模拟动态更新
lvgl.Timer(function()
  local v = math.random(0, 100)
  linebar:set({ value = v })
end, 1000, lvgl.TIMER.PERIODIC)
```

---

## 注意事项

- `ImageLineBar` 是一种带分段线条样式的图片进度控件；
- 可通过 `segments` 和 `spacing` 控制分段视觉；
- 支持图像与颜色两种显示模式；
- 继承 Object 的全部属性与事件，可灵活组合样式。