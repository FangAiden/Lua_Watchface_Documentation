---
title: "List"
description: "LVGL 列表控件，用于创建带滚动项的文本和按钮列表"
tags: ["module:lvgl", "type:ref", "kind:widget"]
---

## 概述

`List` 是 LVGL 的滚动列表控件，可用于创建带文本项或按钮项的滚动内容区域。  
支持添加图标、文字按钮、文本项，并继承 `Object` 的所有通用方法。

继承自：[`Object`](./object.md)

---

## 特有 Methods

| 方法 | 描述 |
| ---- | ---- |
| `add_text(str)` | 在列表中添加一个文本项 |
| `add_btn(icon, str)` | 在列表中添加一个按钮项（可带图标） |
| `get_btn_text(btn)` | 获取指定按钮项的文字内容 |
| `set(tbl)` | 继承自 `Object.set()`，用于设置属性 |

---

## 创建

```lua
local list = lvgl.List(nil, {
    w = 200,
    h = 180,
    align = lvgl.ALIGN.CENTER,
})
```

| 参数       | 类型             | 描述                                  |
| -------- | -------------- | ----------------------------------- |
| `parent` | Object 或 `nil` | 父对象（若为 `nil`，则添加到当前活动屏幕）            |
| `{}`     | table          | 属性表，如 `x`, `y`, `w`, `h`, `align` 等 |

---

### 方法说明

`add_text(str)`

在列表中添加一个纯文本项。

返回创建的 `Label` 对象。

```lua
local text = list:add_text("Menu")
```

| 参数    | 类型     | 描述   |
| ----- | ------ | ---- |
| `str` | string | 文本内容 |

---

`add_btn(icon, str)`

在列表中添加一个按钮项。

可带图标或仅文字。返回创建的 `Button` 对象。

```lua
local btn1 = list:add_btn(nil, "Settings")
local btn2 = list:add_btn(lvgl.SYMBOL.OK, "Confirm")
```

---

`get_btn_text(btn)`

获取指定按钮项的文字内容。

```lua
local t = list:get_btn_text(btn1)
print("Button text:", t)
```

| 参数    | 类型     | 描述       |
| ----- | ------ | -------- |
| `btn` | Object | 列表中的按钮对象 |
| 返回    | string | 按钮文字内容   |

---

## 示例

```lua
-- 创建一个列表
local list = lvgl.List(nil, {
    w = 180,
    h = 200,
    align = lvgl.ALIGN.CENTER,
})

-- 添加文本项
list:add_text("Options")

-- 添加按钮项
local btn1 = list:add_btn(nil, "Settings")
local btn2 = list:add_btn(lvgl.SYMBOL.OK, "Confirm")
local btn3 = list:add_btn(lvgl.SYMBOL.CLOSE, "Cancel")

-- 读取按钮文本
print(list:get_btn_text(btn2))  -- 输出: Confirm

-- 设置列表样式
list:set({
    bg_color = lvgl.color_hex(0x202020),
    border_color = lvgl.color_hex(0x444444),
    pad_all = 4,
})
```

