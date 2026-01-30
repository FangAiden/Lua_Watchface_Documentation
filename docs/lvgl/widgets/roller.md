---
title: "Roller"
description: "滚轮选择器（lvgl.Roller）——支持循环、动画、选项管理"
tags: ["module:lvgl", "type:ref", "kind:widget"]
---
# Roller

继承自 [Object](./object.md)

## 创建

```lua
local roller = parent:Roller {
  w = 120, h = 80,
  options = {
    options = "Mon\nTue\nWed\nThu\nFri",
    mode = lvgl.ROLLER_MODE.INFINITE,
  },
  selected = { selected = 2, anim = 1 },
}
```

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `options` | string 或 `{ options, mode }` | 选项文本，`\n` 分隔；`mode` 为 `NORMAL` 或 `INFINITE` |
| `selected` | integer 或 `{ selected, anim }` | 选中项索引（从 0 开始），`anim = 1` 启用动画 |

## 方法

| 方法 | 说明 |
|------|------|
| `get_options()` | 返回选项字符串 |
| `get_options_cnt()` | 返回选项总数 |
| `get_selected()` | 返回选中项索引 |
| `get_selected_str()` | 返回选中项文本 |
| `set(tbl)` | 批量设置属性 |

## 示例

```lua
local roller = lvgl.Roller(nil, {
  w = 120, h = 80,
  options = "Apple\nBanana\nCherry",
  selected = { selected = 1, anim = 1 },
})

print("选中:", roller:get_selected_str())
print("总数:", roller:get_options_cnt())
roller:set({ selected = 0 })
```
