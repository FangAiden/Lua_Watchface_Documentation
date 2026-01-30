---
title: "Keyboard"
description: "LVGL 屏幕键盘（本绑定仅提供基础创建与通用 Object 能力）"
tags: ["module:lvgl", "type:ref", "kind:widget"]
---
# Keyboard

继承自 [Object](./object.md)

## 创建

```lua
local kb = parent:Keyboard {
  w = lvgl.HOR_RES(),
  h = 120,
  bg_color = lvgl.color_hex(0x202020),
}
```

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| 继承 Object 通用属性 | — | `w`, `h`, `align`, `bg_color` 等 |

## 方法

| 方法 | 说明 |
|------|------|
| 无特有方法 | 仅支持 Object 通用方法 |

## 示例

```lua
local kb = lvgl.Keyboard(nil, {
  y = lvgl.VER_RES() - 120,
  w = lvgl.HOR_RES(),
  h = 120,
  bg_color = lvgl.color_hex(0x1a1a1a),
  border_width = 1,
})
```
