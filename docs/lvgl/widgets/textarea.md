---
title: "Textarea"
description: "LVGL 文本输入控件，用于编辑和显示多行文本"
tags: ["module:lvgl", "type:ref", "kind:widget"]
---
# Textarea

继承自 [Object](./object.md)

## 创建

```lua
local ta = parent:Textarea {
  w = 200, h = 100,
  text = "Input your name...",
}
```

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `text` | string | 文本内容 |
| `text_color` | color | 文本颜色 |

## 方法

| 方法 | 说明 |
|------|------|
| `get_text()` | 获取当前文本内容 |
| `set(tbl)` | 批量设置属性 |

## 示例

```lua
local ta = lvgl.Textarea(nil, {
  w = 200, h = 100,
  text = "Hello",
  align = lvgl.ALIGN.CENTER,
})

print(ta:get_text())
ta:set({ text = "Updated", text_color = lvgl.color_hex(0x00FF80) })
```
