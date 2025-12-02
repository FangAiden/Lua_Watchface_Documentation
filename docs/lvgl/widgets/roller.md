---
title: "Roller"
description: "滚轮选择器（lvgl.Roller）——支持循环、动画、选项管理"
tags: ["module:lvgl", "type:ref", "kind:widget"]
---

# Roller

继承自：[`Object`](./object.md)

---

## 概述

`Roller` 是一个单列的可滚动选择控件，用于从多项选项中进行选择。  
它支持**平滑动画切换**、**循环滚动**（INFINITE 模式）和**字符串选项表**配置。

Lua 中的创建方式：

```lua
local roller = lvgl.Roller(nil, {
  x = 24, y = 24, w = 120, h = 80,
  options  = "Apple\nBanana\nCherry\nGrape",
  selected = { selected = 2, anim = 1 },  -- 滚动到第 3 项（带动画）
})
```

---

## 特有 Methods

| 方法                   | 说明                        |
| -------------------- | ------------------------- |
| `get_options()`      | 返回当前选项字符串（多行字符串）          |
| `get_options_cnt()`  | 获取当前选项总数                  |
| `get_selected()`     | 获取当前选中项的索引（从 0 开始）        |
| `get_selected_str()` | 获取当前选中项的文本                |
| `set(tbl)`           | 设置 Roller 的属性（选项、选中项、样式等） |

---

## 可设置属性

| 属性名        | 类型                               | 描述                                                          |
| ---------- | -------------------------------- | ----------------------------------------------------------- |
| `options`  | `string` 或 `{ options, mode }`   | 设置选项文本与模式（`mode` 可为 `lvgl.ROLLER_MODE.NORMAL` 或 `INFINITE`） |
| `selected` | `integer` 或 `{ selected, anim }` | 设置选中项索引与动画开关（`anim = 1` 为启用动画）                              |

示例：

```lua
roller:set({
  options = {
    options = "Red\nGreen\nBlue\nYellow",
    mode = lvgl.ROLLER_MODE.INFINITE
  },
  selected = { selected = 1, anim = 1 }
})
```

---

## 方法详解

`get_options()`

返回当前滚轮的所有选项字符串。

每个选项以 `\n` 分隔。

```lua
local options = roller:get_options()
print(options)
-- 输出：
-- Apple
-- Banana
-- Cherry
```

---

`get_options_cnt()`

返回选项总数量。

```lua
local count = roller:get_options_cnt()
print("共有选项数量:", count)
```

---

`get_selected()`

返回当前选中项索引（从 0 开始）。

```lua
local idx = roller:get_selected()
print("当前选中项索引:", idx)
```

---

`get_selected_str()`

返回当前选中项的文本内容。

```lua
local str = roller:get_selected_str()
print("当前选中项:", str)
```

---

`set(tbl)`

修改 Roller 的属性（包括 `options`、`selected`、以及 Object 通用属性）。

```lua
roller:set({
  options = "One\nTwo\nThree",
  selected = { selected = 0, anim = 1 },
})
```

---

## 结合枚举使用

| 枚举                          | 值   | 说明           |
| --------------------------- | --- | ------------ |
| `lvgl.ROLLER_MODE.NORMAL`   | `0` | 普通模式，滚动到末尾停止 |
| `lvgl.ROLLER_MODE.INFINITE` | `1` | 无限循环滚动       |

---

## 示例

```lua
-- 创建一个无限循环的星期选择器
local roller = lvgl.Roller(nil, {
  x = 30, y = 40, w = 120, h = 80,
  options = {
    options = "Mon\nTue\nWed\nThu\nFri\nSat\nSun",
    mode = lvgl.ROLLER_MODE.INFINITE
  },
  selected = { selected = 3, anim = 1 },
})

-- 打印选项信息
print("选中:", roller:get_selected_str())
print("总选项数:", roller:get_options_cnt())

-- 切换选中项
roller:set({ selected = 0 })
```