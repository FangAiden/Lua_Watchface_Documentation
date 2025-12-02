---
title: "Textarea"
description: "LVGL 文本输入控件，用于编辑和显示多行文本"
tags: ["module:lvgl", "type:ref", "kind:widget"]
---

## 概述

`Textarea` 是 LVGL 的文本输入控件，用于接收用户输入或显示多行文本内容。  
支持光标移动、文本滚动、编辑等功能。  

继承自：[`Object`](./object.md)

---

## 特有 Methods

| 方法 | 描述 |
| ---- | ---- |
| `get_text()` | 获取当前文本内容 |
| `set(tbl)` | 设置文本内容及属性（继承自 Object） |

---

## 创建

```lua
local ta = lvgl.Textarea(nil, {
    x = 40,
    y = 60,
    w = 200,
    h = 100,
})
```

| 参数       | 类型             | 描述                                              |
| -------- | -------------- | ----------------------------------------------- |
| `parent` | Object 或 `nil` | 父对象（`nil` 时自动添加到活动屏幕）                           |
| `{}`     | table          | 属性表，可设置 `x`, `y`, `w`, `h`, `align`, `text` 等属性 |

---

### 方法说明

`get_text()`

返回当前文本内容。

```lua
local txt = ta:get_text()
print("当前内容:", txt)
```

返回值：
`string` — 文本内容。

---

`set(tbl)`

设置属性或文本内容。

常见用法包括设置默认文本、字体、颜色等。

```lua
ta:set({
    text = "Hello, LuaVGL!",
    bg_color = lvgl.color_hex(0x202020),
    text_color = lvgl.color_hex(0xFFFFFF),
    border_width = 2,
    border_color = lvgl.color_hex(0x404040),
})
```

| 字段             | 类型                        | 描述     |
| -------------- | ------------------------- | ------ |
| `text`         | string                    | 设置文本内容 |
| `bg_color`     | color                     | 背景颜色   |
| `text_color`   | color                     | 文本颜色   |
| `border_width` | integer                   | 边框宽度   |
| `border_color` | color                     | 边框颜色   |
| 其他属性           | 同 [`Object`](./object.md#属性表) | 通用控件属性 |

---

## 示例

```lua
local ta = lvgl.Textarea(nil, {
    x = 60,
    y = 80,
    w = 200,
    h = 100,
    text = "Input your name...",
})

-- 获取内容
print("内容:", ta:get_text())

-- 更新属性
ta:set({
    text = "Welcome!",
    align = lvgl.ALIGN.CENTER,
    bg_color = lvgl.color_hex(0x101010),
    text_color = lvgl.color_hex(0x00FF80),
})
```

