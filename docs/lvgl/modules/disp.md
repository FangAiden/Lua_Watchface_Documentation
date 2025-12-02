---
title: "disp"
description: "显示（Display）：获取显示器、活动屏幕与切屏动画、分辨率与旋转"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 概述

`lvgl.disp` 提供 **显示设备（Display）** 相关的 Lua API：
- 获取默认显示器 / 下一个显示器
- 获取显示器上的 **活动屏幕** / **上一屏**
- 获取显示器的 **顶层层（top layer）** 与 **系统层（sys layer）**
- **切换屏幕**，支持多种动画、时长、延迟、自动删除旧屏
- 获取 **分辨率**、设置 **旋转**

所有 API 都基于 LVGL 的 `lv_disp_*` 与 `lv_screen_load_anim` 等函数实现，并封装为 Lua 友好的调用方式。

---

## 定义

```lua
-- 模块函数（lvgl.disp）
lvgl.disp.get_default() -> disp               -- 返回默认显示器
lvgl.disp.get_next(disp?: disp) -> disp|nil   -- 从给定显示器开始，返回下一个；nil 表示无
lvgl.disp.get_scr_act(disp?: disp) -> obj|nil -- 获取活动屏幕（可选传入显示器）
lvgl.disp.get_scr_prev(disp: disp) -> obj|nil -- 获取上一屏
lvgl.disp.load_scr(obj: obj, opts?: table) -> nil  -- 切换到目标屏（可带动画）

-- 实例方法（disp:*）
disp:get_res() -> hor_res: integer, ver_res: integer
disp:set_rotation(deg: 0|90|180|270) -> nil
disp:get_layer_top() -> obj|nil
disp:get_layer_sys() -> obj|nil
disp:get_next() -> disp|nil
disp:get_scr_act() -> obj|nil
disp:get_scr_prev() -> obj|nil
```

> 说明：`get_scr_act` 既可作为 **模块函数** 使用（可选传入 `disp`），也可作为 **实例方法** 使用（隐含 `self`）。

---

## 屏幕切换（带动画）

```lua
lvgl.disp.load_scr(obj, {
  anim     = "over_left",  -- 见下表，默认 "none"
  time     = 1000,         -- 动画时长(ms)
  delay    = 100,          -- 动画延迟(ms)
  auto_del = 0,            -- 切换后是否自动删除旧屏（0/1）
})
```

### 支持的 `anim` 值

| 动画名                                                             | 说明                 |
| --------------------------------------------------------------- | ------------------ |
| `"none"` / 省略                                                   | 无动画                |
| `"over_left"` / `"over_right"` / `"over_top"` / `"over_bottom"` | 新屏覆盖旧屏（方向进入）       |
| `"move_left"` / `"move_right"` / `"move_top"` / `"move_bottom"` | 以移动方式切换（方向移动）      |
| `"fade_on"`                                                     | 渐显（老版本名）           |
| `"fade_in"` / `"fade_out"`                                      | 渐入 / 渐出（LVGL 8.3+） |
| `"out_left"` / `"out_right"` / `"out_top"` / `"out_bottom"`     | 旧屏按方向移出（LVGL 8.3+） |

> 源码中对 `"over_bottom"`/`"move_bottom"` 的字符串拼写有轻微差异（`"over_botto"`、`"move_botto"`），如果表中字符串无效，请尝试源码的字符串。

---

## 示例

1. **获取默认显示器与分辨率**

```lua
local disp = lvgl.disp.get_default()
local w, h = disp:get_res()
print("resolution:", w, "x", h)
```

2. **获取活动屏幕并添加一个子对象**

```lua
local scr = lvgl.disp.get_scr_act()      -- 省略参数：默认显示器
local label = lvgl.label_create(scr)
lvgl.label_set_text(label, "Hello")
```

3. **切换屏幕并使用动画**
   
```lua
local new_scr = lvgl.obj_create(nil)     -- 创建一个新屏（根对象）
lvgl.disp.load_scr(new_scr, {
  anim  = "over_left",
  time  = 500,
  delay = 0,
  auto_del = 1,                          -- 切换后自动删除旧屏
})
```

4. **访问顶层层 / 系统层**

```lua
local top = disp:get_layer_top()
local sys = disp:get_layer_sys()
-- 顶层层常用于全局浮动控件（如弹窗、Toast）
```


5. **设置旋转**

```lua
disp:set_rotation(90)  -- 允许：0 / 90 / 180 / 270
```

6. **迭代多个显示器**

```lua
local d = lvgl.disp.get_default()
while d do
  local w, h = d:get_res()
  print("disp:", w, "x", h)
  d = d:get_next()
end
```

----

## 返回值与行为

- `get_default()`：必定返回一个 `disp`。
- `get_next([disp])`：返回从 `disp` 开始的下一个；若传 `nil`，等价于“从头开始”；无则返回 `nil`。
- `get_scr_act([disp])` / `get_scr_prev(disp)`：返回 `obj`（Lua 封装的 `lv_obj_t*`），若不存在则 `nil`。
- `load_scr(obj, opts?)`：`obj` 必须是屏幕根对象（或可成为屏幕根的对象）。
- `get_res()`：按顺序返回 **水平分辨率**、**垂直分辨率**（整数）。
- `set_rotation(deg)`：仅接受 `0|90|180|270`，否则抛参数错误。

---

## 备注

- `get_layer_top()` / `get_layer_sys()` 返回的对象若尚未被 Lua 包装，绑定层会自动创建 **轻量包装**（`lua_created=false`）。
- `load_scr` 的 `auto_del` 为布尔语义（源码中用整数处理）：`0` 关闭，`1` 开启。
- 若你的设备基于较老/定制的 LVGL，请以源码中的动画名字符串为准（见上文动画名说明）。