---
title: "List"
description: "LVGL 列表控件，用于创建带滚动项的文本和按钮列表"
tags: ["module:lvgl", "type:ref", "kind:widget"]
---
# List

继承自 [Object](./object.md)

## 创建

```lua
local list = parent:List {
  w = 200, h = 180,
  align = lvgl.ALIGN.CENTER,
}
```

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| 继承 Object 通用属性 | — | `w`, `h`, `align`, `bg_color`, `pad_all` 等 |

## 方法

| 方法 | 说明 |
|------|------|
| `add_text(str)` | 添加文本项，返回 Label 对象 |
| `add_btn(icon, str)` | 添加按钮项（可带图标），返回 Button 对象 |
| `get_btn_text(btn)` | 获取指定按钮项的文字内容 |
| `set(tbl)` | 批量设置属性 |

## 示例

```lua
local list = lvgl.List(nil, {
  w = 180, h = 200,
  align = lvgl.ALIGN.CENTER,
})

list:add_text("Options")
local btn1 = list:add_btn(nil, "Settings")
local btn2 = list:add_btn(lvgl.SYMBOL.OK, "Confirm")
print(list:get_btn_text(btn2))
```
