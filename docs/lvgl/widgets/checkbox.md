---
title: "Checkbox"
description: "LVGL Widget: Checkbox"
tags: ["module:lvgl", "type:api", "kind:widget"]
---
# Checkbox

继承自 [Object](./object.md)

## 创建

```lua
local cb = parent:Checkbox {
  text = "启用 Wi-Fi",
}
```

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `text` | string | 复选框显示文本 |

## 方法

| 方法 | 说明 |
|------|------|
| `get_text()` | 获取当前显示文本 |
| `set(tbl)` | 批量设置属性 |

## 示例

```lua
local cb = lvgl.Checkbox(nil, {
  x = 50, y = 60,
  text = "我已阅读并同意协议",
})

print(cb:get_text())
cb:set({ text = "启用蓝牙" })

cb:onClicked(function()
  print("Checkbox clicked: " .. cb:get_text())
end)
```
