---
title: "Dropdown"
description: "LVGL 下拉菜单控件，用于显示和选择可选项"
tags: ["module:lvgl", "type:ref", "kind:widget"]
---

## 概述

`Dropdown` 是 LVGL 的下拉菜单控件，用于显示可展开的选项列表。  
支持添加选项、获取选项内容、打开 / 关闭菜单等操作。  
在 LuaVGL 中，可以直接通过 `lvgl.Dropdown()` 创建。

继承自：[`Object`](./object.md)

---

## 特有 Methods

| 方法 | 描述 |
| ---- | ---- |
| `add_option(str, pos)` | 向下拉列表中添加一个新的选项 |
| `clear_option()` | 清除所有选项 |
| `close()` | 关闭下拉菜单 |
| `get()` | 获取下拉框的属性（继承自 Object） |
| `is_open()` | 判断下拉菜单是否处于打开状态 |
| `open()` | 打开下拉菜单 |
| `set(tbl)` | 设置下拉框属性（继承自 Object） |
| **属性：** `selected_str` | 当前选中选项的文本内容（只读） |

---

## 创建

```lua
local dd = lvgl.Dropdown(nil, {
    x = 50,
    y = 40,
    w = 120,
    h = 40,
})
```

| 参数       | 类型             | 描述                                             |
| -------- | -------------- | ---------------------------------------------- |
| `parent` | Object 或 `nil` | 父对象（若为 `nil`，则添加到当前活动屏幕）                       |
| `{}`     | table          | 属性表，如 `x`, `y`, `w`, `h`, `align`, `options` 等 |

---

### 方法说明

`add_option(str, pos)`

添加一个新的选项。

```lua
dd:add_option("Option A")
dd:add_option("Option B", 1)
```

| 参数    | 类型         | 描述            |
| ----- | ---------- | ------------- |
| `str` | string     | 要添加的文本        |
| `pos` | number（可选） | 插入位置（默认追加到末尾） |

---

`clear_option()`

清空所有选项。

```lua
dd:clear_option()
```

---

`open()`

打开下拉菜单。

```lua
dd:open()
```

---

`close()`

关闭下拉菜单。

```lua
dd:close()
```

---

`is_open()`

判断下拉菜单当前是否展开。

```lua
if dd:is_open() then
    print("Dropdown is open")
else
    print("Dropdown is closed")
end
```

返回值：`boolean`

---

`get()`

获取当前下拉框的属性（继承自 `Object.get` ）。
可用于读取如 `selected_str`、`w`、`h` 等属性。

```lua
print(dd:get("selected_str"))
```

---

`set(tbl)`

设置属性，继承自 `Object.set`。
例如：

```lua
dd:set({
    options = "Red\nGreen\nBlue",
    align = lvgl.ALIGN.CENTER,
    bg_color = lvgl.color_hex(0x202020),
})
```

---

`selected_str` **（属性）**

只读属性，返回当前选中选项的文字。

```lua
print("当前选中:", dd.selected_str)
```

---

## 示例

```lua
-- 创建 Dropdown
local dd = lvgl.Dropdown(nil, {
    x = 40,
    y = 40,
    w = 160,
    h = 40,
})

-- 添加选项
dd:add_option("Option 1")
dd:add_option("Option 2")
dd:add_option("Option 3")

-- 打开
dd:open()

-- 输出当前选项
print("当前选项:", dd.selected_str)

-- 判断是否打开
print("Is open:", dd:is_open())

-- 关闭
dd:close()

-- 清空所有选项
dd:clear_option()
```
