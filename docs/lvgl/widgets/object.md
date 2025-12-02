---
title: "Object"
description: "LVGL 对象系统（LuaVGL 基类）"
tags: ["module:lvgl", "widget", "object", "base"]
---

## 概述

`Object` 是 LuaVGL 中所有控件（Widget）的基类。  
它封装了 LVGL 原生对象系统 (`lv_obj_t`)，提供了统一的属性访问、事件绑定、动画与布局管理接口。  

> 所有控件（如 `Label`, `List`, `Dropdown` 等）都继承本类的全部 47 个通用方法。

---

## 创建对象

LuaVGL 使用面向对象风格的创建方式：

`lvgl.Object(parent?, { ... })`

| 参数                           | 描述                             |
| ---------------------------- | -------------------------------- |
| **parent**                  | 父对象（可选）。如果为 `nil`，则创建根对象。 |
| **\{ ... \}**                  | 属性表（键值对）。 |

```lua
-- 创建一个基础对象
local obj = lvgl.Object({
  w = 100,
  h = 60,
  align = { type = lvgl.ALIGN_CENTER }
})
```

---

### 属性表

| 属性                  | 描述                                                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **x**               | 位置（X），整数。等价于设置对象的 X 坐标（依赖 LVGL 暴露该属性的版本）。示例：`x = 20`。                                                                       |
| **y**               | 位置（Y），整数。等价于设置对象的 Y 坐标（依赖 LVGL 暴露该属性的版本）。示例：`y = 40`。                                                                       |
| **w**               | 宽度，整数。LuaVGL 显式支持。示例：`w = 200`。                                                                       |
| **h**               | 高度，整数。LuaVGL 显式支持。示例：`h = 120`。                                                                      |
| **bg_color**        | 背景色（样式属性）。可用 `"#000000"`/`0x000000` 等。                                         |
| **radius**          | 圆角半径（样式属性），整数。示例：`radius = 8`/`radius = lvgl.RADIUS_CIRCLE`(满圆角)。                                                                                              |
| **align**           | 对齐方式。可直接给枚举 `lvgl.ALIGN.*`，或表：`{ type = lvgl.ALIGN.CENTER, x_ofs = 0, y_ofs = 0 }`。LuaVGL 显式支持此键。                           |
| **flex** | 设置 Flex 布局。示例：<br/>flex = \{<br/>  &nbsp;&nbsp;&nbsp;&nbsp;flex_direction = "row",<br/>  &nbsp;&nbsp;&nbsp;&nbsp;flex_wrap = "wrap",<br/>  &nbsp;&nbsp;&nbsp;&nbsp;justify_content = "center",<br/>  &nbsp;&nbsp;&nbsp;&nbsp;align_items = "center",<br/>  &nbsp;&nbsp;&nbsp;&nbsp;align_content = "center"<br/>\}<br/>可同时设置主轴方向、换行模式、主轴与交叉轴对齐方式等属性。 |
| **bg_opa**          | 背景不透明度（样式属性），0–255 或 `lvgl.OPA()`。示例：`bg_opa = lvgl.OPA(100)._80`。                                                               |
| **border_width**    | 边框宽度（样式属性），整数。示例：`border_width = 2`。                                                                                        |
| **border_color**    | 边框颜色（样式属性）。可用 `"#000000"`/`0x000000` 等。。                                                                    |
| **pad_all**         | 内边距（样式属性），整数。一键同时设置四个方向的 padding。示例：`pad_all = 6`。                                                                          |
| **flag_scrollable** | 滚动标志开关 ，布尔。（**建议用方法**）：请用 `add_flag(lvgl.FLAG.SCROLLABLE)` / `clear_flag(lvgl.FLAG.SCROLLABLE)`。 |


---

### 通用方法总数：47

| 方法                           | 功能描述                             |
| ---------------------------- | -------------------------------- |
| **Anim / anim**              | 创建动画（同义方法）。                      |
| **add_flag**                 | 添加标志位（如 `lvgl.FLAG.SCROLLABLE`）。 |
| **add_state**                | 添加状态（如 `lvgl.STATE.CHECKED`）。    |
| **add_style**                | 添加样式。                            |
| **align_to**                 | 相对于其他对象对齐。                       |
| **center**                   | 将对象居中。                           |
| **clean**                    | 删除所有子对象。                         |
| **clear_flag**               | 清除标志。                            |
| **clear_state**              | 清除状态。                            |
| **delete**                   | 删除对象（及其子对象）。                     |
| **get_child**                | 获取指定索引的子对象。                      |
| **get_child_cnt**            | 获取子对象数量。                         |
| **get_coords**               | 获取绘制区域坐标。                        |
| **get_parent**               | 获取父对象。                           |
| **get_pos**                  | 获取实际位置。                          |
| **get_screen**               | 返回所属屏幕对象。                        |
| **get_state**                | 获取当前状态值。                         |
| **indev_search**             | 根据坐标查找命中对象。                      |
| **invalidate**               | 标记对象重绘。                          |
| **is_editable**              | 判断对象是否可编辑。                       |
| **is_group_def**             | 判断是否为焦点组默认对象。                    |
| **is_layout_positioned**     | 判断是否参与布局定位。                      |
| **is_scrolling**             | 判断是否正在滚动。                        |
| **is_visible**               | 判断对象是否可见。                        |
| **mark_layout_as_dirty**     | 标记布局为需重新计算。                      |
| **onPressed**                | 绑定按下事件回调。                        |
| **onClicked**                | 绑定点击事件回调。                        |
| **onevent**                  | 注册指定事件回调。                        |
| **readjust_scroll**          | 重新调整滚动位置。                        |
| **remove_all_anim**          | 移除所有动画。                          |
| **remove_style**             | 移除指定样式。                          |
| **remove_style_all**         | 移除所有样式。                          |
| **scroll_by**                | 按偏移滚动。                           |
| **scroll_by_bounded**        | 有边界的滚动。                          |
| **scroll_by_raw**            | 原始滚动（无动画）。                       |
| **scroll_to**                | 滚动到指定坐标。                         |
| **scroll_to_view**           | 滚动到当前可见区域。                       |
| **scroll_to_view_recursive** | 递归滚动到可见区域。                       |
| **scrollbar_invalidate**     | 刷新滚动条显示。                         |
| **set**                      | 批量设置属性。                          |
| **set_flex_align**           | 设置 Flex 对齐方式。                    |
| **set_flex_flow**            | 设置 Flex 布局方向。                    |
| **set_flex_grow**            | 设置 Flex 伸展比例。                    |
| **set_parent**               | 设置父对象。                           |
| **set_style**                | 批量设置样式属性。                        |

---

## 属性与批量设置

```lua
obj:set({
  w = 120,
  h = 80,
  align = { type = lvgl.ALIGN.TOP_MID, y_ofs = 10 },
  style_bg_color = lvgl.color_hex(0x00AAFF),
  style_radius = 8,
})
```

- `set()` 内可混合对象属性与样式属性。
- 等价于多次调用 LVGL 原生 setter。

---

## 父子对象管理

```lua
local btn = lvgl.Button(obj, { id = "ok" }) -- 仅示例，实机环境中并没有Button控件
local label = lvgl.Label(btn, { text = "OK" })

print(btn:get_parent())        -- obj
print(obj:get_child_cnt())     -- 子对象数量
print(obj:get_child(0))        -- 第一个子对象
```

---

## 对齐与布局

```lua
obj:align_to({
  base = parent,
  type = lvgl.ALIGN.BOTTOM_RIGHT,
  x_ofs = -10,
  y_ofs = -10
})

obj:set_flex_flow(lvgl.FLEX_FLOW.ROW)
obj:set_flex_align(
  lvgl.FLEX_ALIGN.CENTER,
  lvgl.FLEX_ALIGN.CENTER,
  lvgl.FLEX_ALIGN.SPACE_AROUND
)
```

> 使用 `Flex` 布局需先为父对象启用 `LAYOUT_FLEX`。

---

## 滚动接口

```lua
-- 平滑滚动到位置
obj:scroll_to({ x = 0, y = 100, anim = true })

-- 相对滚动
obj:scroll_by(0, 50, lvgl.ANIM_ON)

-- 判断滚动状态
if obj:is_scrolling() then
  print("Scrolling...")
end
```

---

## 状态与标志控制

```lua
obj:add_flag(lvgl.FLAG.SCROLLABLE)
obj:clear_flag(lvgl.FLAG.CLICKABLE)
obj:add_state(lvgl.STATE.CHECKED)
obj:clear_state(lvgl.STATE.DISABLED)
```

---

## 事件绑定

```lua
obj:onPressed(function(e)
  print("Pressed!")
end)

obj:onClicked(function(e)
  print("Clicked!")
end)

obj:onevent(lvgl.EVENT.LONG_PRESSED, function(e)
  print("Long pressed")
end)
```

---

## 动画与清理

```lua
-- 创建动画
obj:anim({
  time = 1000,
  start_value = 0,
  end_value = 200,
  exec_cb = function(a, v)
    obj:set({ x = v })
  end
})

-- 删除对象
obj:delete()

-- 清空所有子对象
obj:clean()
```

---

## 坐标与命中测试

```lua
local area = obj:get_coords()
print(area.x1, area.y1, area.x2, area.y2)

local pos = obj:get_pos()
print(pos.x1, pos.y1)

local target = obj:indev_search({100, 50})
if target then print("object hit:", target) end
```

---

## 元属性访问（快捷语法）`实机不支持`

`Object` 支持通过点语法访问部分属性：

```lua
obj.id = "main_panel"
print(obj.id)

obj.align = lvgl.ALIGN.CENTER
obj.w = 200
obj.h = 80
obj.user_data = { tag = "custom" }
```

> 这些属性均由 `__index` / `__newindex` 元方法自动映射。

---

## 生命周期与回收

- 每个对象对应一个 `lv_obj_t` 实例。
- `delete()` 会同步删除 Lua 注册表引用。
- 当对象触发 `LV_EVENT_DELETE` 时自动清理事件与子对象。
- 垃圾回收（`__gc`）阶段自动释放 Lua 侧未清理对象。
- `lua_created` 用于区分 Lua 创建的对象（可删除）与外部对象（只读）。

---

## 相关枚举

| 枚举           | 示例                                   |
| ------------ | ------------------------------------ |
| `ALIGN`      | `CENTER`, `TOP_LEFT`, `BOTTOM_RIGHT` |
| `STATE`      | `DEFAULT`, `CHECKED`, `DISABLED`     |
| `FLAG`       | `CLICKABLE`, `SCROLLABLE`, `HIDDEN`  |
| `FLEX_FLOW`  | `ROW`, `COLUMN_WRAP`                 |
| `FLEX_ALIGN` | `CENTER`, `SPACE_BETWEEN`            |

---

## 备注

- `Object` 是 LuaVGL 的核心基类。
- 所有控件共享其 47 个方法。
- 支持属性访问、样式、布局、动画、事件等完整功能。
- 推荐搭配 `Style`、`Timer`、`Anim`、`Group` 等模块使用。