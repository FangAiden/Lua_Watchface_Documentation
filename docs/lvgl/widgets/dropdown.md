---
title: "Dropdown"
description: "LVGL 下拉菜单控件，用于显示和选择可选项"
tags: ["module:lvgl", "type:ref", "kind:widget"]
---
# Dropdown

继承自 [Object](./object.md)

## 创建

```lua
local dd = parent:Dropdown {
  w = 120, h = 40,
  options = "Red\nGreen\nBlue",
}
```

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `options` | string | 选项列表，`\n` 分隔 |
| `selected_str` | string | 当前选中选项文本（只读） |

## 方法

| 方法 | 说明 |
|------|------|
| `add_option(str, pos?)` | 添加选项，`pos` 可选（默认追加末尾） |
| `clear_option()` | 清除所有选项 |
| `open()` | 打开下拉菜单 |
| `close()` | 关闭下拉菜单 |
| `is_open()` | 判断是否打开，返回 boolean |
| `get()` | 获取属性 |
| `set(tbl)` | 批量设置属性 |

## 示例

```lua
local dd = lvgl.Dropdown(nil, {
  w = 160, h = 40,
  align = lvgl.ALIGN.CENTER,
})

dd:add_option("Option 1")
dd:add_option("Option 2")
dd:open()
print("当前选项:", dd.selected_str)
dd:close()
dd:clear_option()
```
