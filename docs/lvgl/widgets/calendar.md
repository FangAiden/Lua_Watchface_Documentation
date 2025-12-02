---
title: "Calendar"
description: "LVGL Widget: Calendar"
tags: ["module:lvgl", "type:api", "kind:widget"]
---
# Calendar

继承自：[`Object`](./object.md)

---

## 概述

`lvgl.Calendar` 是日历控件。
支持设置“今天日期”、当前显示的年月；可读取“今天/显示/按下”的日期；并能创建标题栏（箭头或下拉）作为子部件。

---

## 创建

```lua
-- 基本创建
local cal = lvgl.Calendar(nil, {
  x = 16, y = 16, w = 220, h = 220,
  today  = { year = 2025, month = 11, day = 11 },
  showed = { year = 2025, month = 11 },  -- 只需要年、月
})
```

---

## 可设置属性（通过 set{}）

| 属性       | 类型                     | 说明                 |
| -------- | ---------------------- | ------------------ |
| `today`  | `{ year, month, day }` | 设置“今天日期”（用于高亮今日）   |
| `showed` | `{ year, month }`      | 设置当前显示的年月（翻页到某年某月） |

示例：

```lua
cal:set({
  today  = { year = 2025, month = 12, day = 1 },
  showed = { year = 2025, month = 12 },
})
```

> 说明：`set{}` 内的其它外观/布局项请使用 Object 通用属性与样式（如 `w`, `h`, `align`, `bg_color`, `pad_all` 等）。

---

## 特有 Methods

| 方法                        | 说明                                       |
| ------------------------- | ---------------------------------------- |
| `set(tbl)`                | 批量设置属性；支持 `today`, `showed`              |
| `get_today()`             | 返回 `{ year, month, day }`，为控件当前配置的“今天日期” |
| `get_showed()`            | 返回 `{ year, month }`，为当前显示的年月            |
| `get_pressed()`           | 返回最近一次按下（点击）的日期 `{ year, month, day }`   |
| `get_btnm()`              | 返回内部 **ButtonMatrix** 子控件（可用于风格/交互定制）    |
| `Arrow(parent?, tbl?)`    | 创建“箭头”头部（上一月/下一月导航），返回对象                 |
| `Dropdown(parent?, tbl?)` | 创建“下拉”头部（选择年/月），返回对象                     |

---

## 返回值与数据结构

所有以 `get_*()` 返回的日期都为 Lua 表：

```lua
{ year = 2025, month = 11, day = 11 }
-- 对于 get_showed()：只含 year 与 month
```

`get_btnm()` 返回一个可直接操作的 lvgl 对象（ButtonMatrix），可继续 `set_style`、`onClicked` 等。

---

## 代码示例

1. 读取今天和当前显示的年月

```lua
local t = cal:get_today()
local s = cal:get_showed()
print(("Today: %04d-%02d-%02d"):format(t.year, t.month, t.day))
print(("Showed: %04d-%02d"):format(s.year, s.month))
```

2. 监听点击日期

```lua
cal:onClicked(function(e)
  local d = cal:get_pressed()
  if d then
    print(("Pressed: %04d-%02d-%02d"):format(d.year, d.month, d.day))
  end
end)
```

3. 添加头部：箭头 + 下拉

```lua
local header_arrow = cal:Arrow(nil, { align = lvgl.ALIGN.OUT_TOP_MID })
local header_drop  = cal:Dropdown(nil, { align = lvgl.ALIGN.OUT_TOP_RIGHT })

-- 可对头部继续设置样式/布局
header_arrow:set_style({ bg_opa = lvgl.OPA(20) })
header_drop:set_style({ bg_opa = lvgl.OPA(20) })
```

