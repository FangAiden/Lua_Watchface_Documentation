---
title: "Label"
description: "LVGL 文本标签控件，用于显示或编辑文字"
tags: ["module:lvgl", "type:ref", "kind:widget"]
---

## 概述

`Label` 是 LVGL 中的文本控件，用于显示静态或动态文字。  
在 LuaVGL 中，通过 `lvgl.Label(parent, { text = "Hello" })` 创建。  
支持插入、删除、静态文本绑定和自动换行等特性。

继承自：[`Object`](./object.md)

---

## 特有 Methods

| 方法 | 描述 |
| ---- | ---- |
| `cut_text(pos, cnt)` | 删除指定位置的若干字符 |
| `get_long_mode()` | 获取标签的长文本模式（如换行、滚动等） |
| `get_text()` | 获取当前文本内容 |
| `ins_text(pos, txt)` | 在指定位置插入文本 |
| `set(tbl)` | 设置标签属性（继承自 Object，可设置文本、颜色、位置等） |
| `set_text_static(txt)` | 设置静态文本，不复制字符串，适合只读文字 |

---

## 创建

```lua
local label = lvgl.Label(nil, {
    text = "Hello LVGL!",
    align = lvgl.ALIGN.CENTER,
})
```

---

### 参数说明

`lvgl.Label(parent?, { ... })`

| 参数       | 类型             | 描述                                              |
| -------- | -------------- | ----------------------------------------------- |
| `parent` | Object 或 `nil` | 父对象。若为 `nil`，则添加到当前活动屏幕                         |
| `{}`     | table          | 属性表，可设置 `text`, `x`, `y`, `align`, `w`, `h` 等属性 |

---

### 方法说明

`cut_text(pos, cnt)`

从文本中删除一定数量的字符。

```lua
label:cut_text(5, 3)
```

| 参数    | 类型     | 描述           |
| ----- | ------ | ------------ |
| `pos` | number | 起始位置（从 0 开始） |
| `cnt` | number | 要删除的字符数      |

---

`get_text()`

获取当前标签文本。

```lua
local t = label:get_text()
print(t)
```

返回值：`string` —— 当前文本内容。

---

`get_long_mode()`

获取标签的长文本模式（如换行、滚动等）。

```lua
local mode = label:get_long_mode()
print("Long mode:", mode)
```

返回值：整数，对应 [`LABEL`](../enums/label.md) 枚举，例如：

- `LONG_WRAP`
- `LONG_DOT`
- `LONG_SCROLL`
- `LONG_SCROLL_CIRCULAR`
- `LONG_CLIP`

---

`ins_text(pos, txt)`

在指定位置插入文本。

```lua
label:ins_text(5, " world")
```

| 参数    | 类型     | 描述           |
| ----- | ------ | ------------ |
| `pos` | number | 插入位置（从 0 开始） |
| `txt` | string | 要插入的文本内容     |

---

`set(tbl)`

继承自 `Object.set()`，用于设置属性。

示例:

```lua
label:set({
    text = "Updated Text",
    text_color = 0x00ff00,
})
```

---

`set_text_static(txt)`

设置静态文本（不会复制字符串）。
适合显示固定内容，可节省内存。

```lua
label:set_text_static("This is static text")
```

> 注意：传入的字符串必须在整个程序生命周期内有效，否则可能导致访问非法内存。

---

## 调试输出

`print(label)` 将打印对象指针和当前文本：

```lua
lv_label:0x600001a00a00, text: Hello
```

---

## 示例

```lua
local label = lvgl.Label(nil, {
    text = "Hello LuaVGL!",
    align = lvgl.ALIGN.CENTER,
    bg_color = lvgl.color_hex(0x2b90d9),
    text_color = lvgl.color_hex(0xffffff),
})

label:ins_text(5, " world")
label:cut_text(0, 6)
label:set_text_static("Static Label")
```

---

## 继承自 Object 的通用方法

可同时使用：

- `add_flag()`, `clear_flag()`
- `align_to()`, `center()`
- `delete()`, `scroll_to_view()`
- `set_style()`, `add_style()`, 等等。

----

## 相关

- [`Object`](./object.md)
- [`Style`](../globals/functions/Style.md)
- [`Font`](../globals/functions/Font.md)