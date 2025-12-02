---
title: "ImageLabel"
description: "LVGL Widget: ImageLabel"
tags: ["module:lvgl", "type:api", "kind:widget"]
---
# ImageLabel

继承自：Object

---

## 概述
`lvgl.ImageLabel` 是一种**图文结合的控件**，可同时显示图像与文本。  
它适用于按钮、菜单项、图标说明等场景，能够轻松组合图标与说明文字，实现简洁的 UI 元素。

---

## 创建

```lua
-- 创建一个图文标签
local imglbl = lvgl.ImageLabel({
  x = 40, y = 50,
  src = "S:/images/icon_wifi.bin",
  text = "Wi-Fi",
  align = lvgl.ALIGN.CENTER,
  spacing = 6
})
```

> `ImageLabel` 继承自 Object，因此可使用所有基础方法与事件（如 `set_style`、`onClicked`、`center()` 等）。

---

## 特有 Methods

| 方法         | 说明                          |
| ---------- | --------------------------- |
| `set(tbl)` | 设置图文标签的属性，如图片路径、文字内容、布局方式等。 |

---

## 可设置属性（通过 `set{}`）

| 属性           | 类型                  | 说明                                                |
| ------------ | ------------------- | ------------------------------------------------- |
| `src`        | `string` / `imgsrc` | 图标路径或 LVGL 图片源。                                   |
| `text`       | `string`            | 显示的文本内容。                                          |
| `font`       | `lvgl.Font`         | 使用的字体。                                            |
| `spacing`    | `integer`           | 图标与文字之间的间距。                                       |
| `layout`     | `string`            | 布局方式，支持 `"left"`, `"right"`, `"top"`, `"bottom"`。 |
| `align`      | `lvgl.ALIGN`        | 对齐方式（例如 `lvgl.ALIGN.CENTER`）。                     |
| `text_color` | `lvgl.Color`        | 文本颜色。                                             |
| `bg_opa`     | `integer`           | 背景不透明度（0~255）。                                    |
| `pad_all`    | `integer`           | 控件内边距。                                            |

---

## 示例

```lua
-- 设置图文标签属性
imglbl:set({
  src = "S:/images/icon_music.bin",
  text = "Music",
  layout = "right",
  spacing = 8,
  font = lvgl.Font.MONTSERRAT_20,
  text_color = lvgl.Color(0xFFFFFF)
})

-- 点击响应
imglbl:onClicked(function()
  print("ImageLabel clicked!")
end)
```

---

## 注意事项

- `ImageLabel` 用于显示图标 + 文本的组合控件；
- 支持四种布局方向与间距调节；
- 继承自 `Object`，可使用所有通用属性与事件；
- 常用于图标按钮、设置项、状态指示条等复合组件。