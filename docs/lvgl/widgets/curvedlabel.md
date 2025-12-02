---
title: "CurvedLabel"
description: "LVGL Widget: CurvedLabel"
tags: ["module:lvgl", "type:api", "kind:widget"]
---
# CurvedLabel

继承自：Object

---

## 概述
`lvgl.CurvedLabel` 是一种**沿弧线显示文字的控件**。  
与普通 `Label` 不同，它可以让文本沿着圆弧路径排列，常用于仪表盘、圆形菜单、表盘等界面。

---

## 创建

```lua
-- 创建一个弧形文字标签
local curved = lvgl.CurvedLabel({
  x = 40, y = 40,
  w = 200, h = 100,
  text = "LuaVGL Curved Label",
  radius = 80,          -- 弧线半径
  angle_start = 180,    -- 起始角度
  angle_range = 180,    -- 文字分布角度范围
  align = lvgl.ALIGN.CENTER
})
```

> `CurvedLabel` 继承自 `Object`，支持所有基础样式和事件接口（如 `set_style`、`onClicked`、`align_to` 等）。

---

## 特有 Methods

| 方法         | 说明                                    |
| ---------- | ------------------------------------- |
| `set(tbl)` | 设置 CurvedLabel 的属性，如文本内容、字体、半径、角度范围等。 |

---

## 可设置属性（通过 `set{}`）

| 属性            | 类型           | 说明                           |
| ------------- | ------------ | ---------------------------- |
| `text`        | `string`     | 要显示的文本内容。                    |
| `radius`      | `number`     | 弧形半径，决定文字的弯曲程度。              |
| `angle_start` | `number`     | 文本起始角度（以度为单位）。               |
| `angle_range` | `number`     | 文字沿弧形分布的角度范围。                |
| `font`        | `lvgl.Font`  | 设置使用的字体。                     |
| `align`       | `lvgl.ALIGN` | 对齐方式（如 `lvgl.ALIGN.CENTER`）。 |
| `bg_opa`      | `number`     | 背景不透明度（0~255）。               |
| `text_color`  | `lvgl.Color` | 文本颜色。                        |

---

## 示例

```lua
-- 设置样式与文字属性
curved:set({
  text = "HELLO WORLD",
  radius = 120,
  angle_start = 150,
  angle_range = 200,
  font = lvgl.Font.MONTSERRAT_22,
  text_color = lvgl.Color(0x00FFAA)
})

-- 点击事件
curved:onClicked(function()
  print("CurvedLabel clicked!")
end)
```

---

## 注意事项

- `CurvedLabel` 是基于 `Label` 的扩展控件，用于绘制圆弧文字；
- 可通过 `radius`、`angle_start`、`angle_range` 控制弧度布局；
- 继承所有 Object 的通用属性与事件方法。