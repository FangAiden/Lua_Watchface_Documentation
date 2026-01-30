---
title: "Label"
description: "LVGL 文本标签控件，用于显示或编辑文字"
tags: ["module:lvgl", "type:ref", "kind:widget"]
---
# Label

继承自 [Object](./object.md)

## 创建

```lua
local label = parent:Label {
  text = "Hello LVGL!",
  align = lvgl.ALIGN.CENTER,
}
```

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `text` | string | 文本内容 |
| `text_color` | color | 文本颜色 |
| `long_mode` | enum | 长文本模式（`LONG_WRAP`, `LONG_DOT`, `LONG_SCROLL`, `LONG_SCROLL_CIRCULAR`, `LONG_CLIP`） |

## 方法

| 方法 | 说明 |
|------|------|
| `get_text()` | 获取当前文本内容 |
| `get_long_mode()` | 获取长文本模式 |
| `ins_text(pos, txt)` | 在指定位置插入文本 |
| `cut_text(pos, cnt)` | 删除指定位置的若干字符 |
| `set_text_static(txt)` | 设置静态文本（不复制字符串） |
| `set(tbl)` | 批量设置属性 |

## 示例

```lua
local label = lvgl.Label(nil, {
  text = "Hello LuaVGL!",
  align = lvgl.ALIGN.CENTER,
  text_color = lvgl.color_hex(0xffffff),
})

label:ins_text(5, " world")
label:cut_text(0, 6)
print(label:get_text())
```
