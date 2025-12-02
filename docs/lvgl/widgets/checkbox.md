---
title: "Checkbox"
description: "LVGL Widget: Checkbox"
tags: ["module:lvgl", "type:api", "kind:widget"]
---
# Checkbox

继承自：Object

---

## 概述
`lvgl.Checkbox` 是一个复选框控件，用于在界面上显示“选中 / 未选中”状态的切换组件。  
常用于设置项、表单输入、或多选操作。  
该控件可通过 `set{}` 设置文本内容与样式，通过 `get_text()` 获取当前显示的文本。

---

## 创建

```lua
-- 基本创建
local cb = lvgl.Checkbox({
  x = 30, y = 40,
  text = "启用 Wi-Fi"
})

-- 或指定父对象
local cb2 = lvgl.Checkbox(parent, {
  text = "自动同步时间"
})
```

> Checkbox 默认继承自 Object，具备全部基础属性与事件接口（如 `align`, `set_style`, `onClicked` 等）。

---

## 特有 Methods

| 方法           | 说明                             |
| ------------ | ------------------------------ |
| `set(tbl)`   | 设置 Checkbox 的属性（如文本内容、颜色、布局等）。 |
| `get_text()` | 获取当前 Checkbox 的显示文本。           |

---

## 可设置属性（通过 set{}）

| 属性     | 类型       | 说明            |
| ------ | -------- | ------------- |
| `text` | `string` | 设置复选框显示的文字内容。 |

示例:

```lua
-- 设置复选框文本
cb:set({
  text = "启用蓝牙"
})
```

---

## 示例

```lua
local cb = lvgl.Checkbox({
  x = 50, y = 60,
  text = "我已阅读并同意协议"
})

-- 获取当前文本
print(cb:get_text())

-- 设置样式
cb:set_style({
  bg_color = lvgl.Color(0x222222),
  border_width = 2,
  border_color = lvgl.Color(0x00FF00),
  radius = 4,
})

-- 点击事件
cb:onClicked(function()
  print("Checkbox clicked: " .. cb:get_text())
end)
```

---

## 注意事项

- `Checkbox` 通过 `text` 属性设置显示内容；
- 提供 `get_text()` 方法读取文本；
- 其他外观与交互接口（如 `align`, `set_style`, `onPressed`）均与 Object 通用。