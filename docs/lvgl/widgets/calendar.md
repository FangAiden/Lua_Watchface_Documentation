---
title: "Calendar"
description: "LVGL Widget: Calendar"
tags: ["module:lvgl", "type:api", "kind:widget"]
---
# Calendar

继承自 [Object](./object.md)

## 创建

```lua
local cal = parent:Calendar {
  w = 220, h = 220,
  today  = { year = 2025, month = 11, day = 11 },
  showed = { year = 2025, month = 11 },
}
```

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `today` | `{ year, month, day }` | 今天日期（用于高亮） |
| `showed` | `{ year, month }` | 当前显示的年月 |

## 方法

| 方法 | 说明 |
|------|------|
| `set(tbl)` | 批量设置属性（`today`, `showed`） |
| `get_today()` | 返回 `{ year, month, day }` |
| `get_showed()` | 返回 `{ year, month }` |
| `get_pressed()` | 返回最近按下的日期 `{ year, month, day }` |
| `get_btnm()` | 返回内部 ButtonMatrix 子控件 |
| `Arrow(parent?, tbl?)` | 创建箭头导航头部 |
| `Dropdown(parent?, tbl?)` | 创建下拉选择头部 |

## 示例

```lua
local cal = lvgl.Calendar(nil, {
  w = 220, h = 220,
  today  = { year = 2025, month = 12, day = 1 },
  showed = { year = 2025, month = 12 },
})

cal:onClicked(function(e)
  local d = cal:get_pressed()
  if d then
    print(("%04d-%02d-%02d"):format(d.year, d.month, d.day))
  end
end)

local header = cal:Arrow(nil, { align = lvgl.ALIGN.OUT_TOP_MID })
```
