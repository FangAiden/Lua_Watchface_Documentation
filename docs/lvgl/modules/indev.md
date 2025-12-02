---
title: "indev"
description: "输入设备（Input Device）：获取当前/下一个输入设备、查询类型与输入状态、绑定光标/分组"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 概述

`lvgl.indev` 封装了 LVGL 的输入设备接口（指针、键盘、编码器等）：  
- 获取**当前活动**输入设备或**遍历**所有输入设备  
- 查询输入设备**类型**  
- 读取**指针坐标**、**手势方向**、**键值**、**滚动方向/对象**、**矢量**  
- 绑定**光标对象**与**焦点组**  
- 重置长按/状态、等待释放

> 文中 `indev` 指代 `lv_indev_t*` 的 Lua userdata 包装。

---

## 定义

```lua
-- 模块函数（lvgl.indev）
lvgl.indev.get_act() -> indev|nil         -- 获取当前活动输入设备
lvgl.indev.get_next(indev?: indev) -> indev|nil
-- 传入 nil 或不传表示从头开始；反复调用直到返回 nil 可遍历全部设备

-- 实例方法（indev:*）
indev:get_type() -> integer               -- lv_indev_type_t
indev:reset(obj?: obj) -> nil             -- 重置状态（可指定参考对象）
indev:reset_long_press() -> nil           -- 重置长按计时
indev:set_cursor(obj: obj) -> nil         -- 为指针类设备设置光标对象
indev:set_group(group: group) -> nil      -- 与焦点组绑定（配合编码器/键盘）
indev:get_point() -> x: integer, y: integer
indev:get_gesture_dir() -> integer        -- lv_dir_t
indev:get_key() -> integer                -- 上次键值（键盘/编码器）
indev:get_scroll_dir() -> integer         -- lv_dir_t
indev:get_scroll_obj() -> obj|nil         -- 正在滚动的对象
indev:get_vect() -> vx: integer, vy: integer
indev:wait_release() -> nil               -- 阻塞直到释放（按键/触摸抬起）
```

> 预留接口 `on_event` 在当前实现中被注释掉，文档不做暴露。

---

## 示例

1. **获取活动输入设备并判断类型**

```lua
local id = lvgl.indev.get_act()
if not id then return end

local t = id:get_type()
-- t 为 lv_indev_type_t，常见值：
-- LV_INDEV_TYPE_POINTER / LV_INDEV_TYPE_KEYPAD / LV_INDEV_TYPE_ENCODER / LV_INDEV_TYPE_BUTTON
```

2. **指针设备读取坐标 & 绑定光标**

```lua
local id = lvgl.indev.get_act()
if id and id:get_type() == LV_INDEV_TYPE_POINTER then
  local x, y = id:get_point()
  print("pointer at", x, y)

  -- 绑定一个对象作为光标（例如一个小图标）
  local scr = lvgl.disp.get_scr_act()
  local cursor = lvgl.img_create(scr)
  lvgl.img_set_src(cursor, "S:/cursor.bin")
  id:set_cursor(cursor)
end
```

3. **键盘/编码器与 group 焦点导航**

```lua
-- 创建并设置默认焦点组
local g = lvgl.group.create()
g:set_default()

-- 让当前活动输入设备（如编码器）绑定该组
local id = lvgl.indev.get_act()
if id then id:set_group(g) end

-- 加入可聚焦对象
local scr = lvgl.disp.get_scr_act()
local btn1 = lvgl.btn_create(scr)
local btn2 = lvgl.btn_create(scr)
g:add_obj(btn1)
g:add_obj(btn2)

-- 读取按键值
local key = id and id:get_key()
print("last key:", key or "nil")
```

4. **手势 / 滚动信息与矢量速度**

```lua
local id = lvgl.indev.get_act()
if not id then return end

local gdir = id:get_gesture_dir()  -- lv_dir_t
local sdir = id:get_scroll_dir()   -- lv_dir_t
local sobj = id:get_scroll_obj()   -- 可能为 nil

local vx, vy = id:get_vect()       -- 速度/矢量
print("gesture:", gdir, "scroll:", sdir, sobj, "vect:", vx, vy)
```

5. **重置状态 / 等待释放**

```lua
id:reset()                -- 或传入参考对象 id:reset(some_obj)
id:reset_long_press()     -- 清除长按计时
id:wait_release()         -- 阻塞直到释放（例如用在弹窗交互里）
```

6. **遍历所有输入设备**

```lua
local id = lvgl.indev.get_next()  -- 从头开始
while id do
  print("indev type:", id:get_type())
  id = lvgl.indev.get_next(id)    -- 继续下一个
end
```

---

## 返回值与行为说明

- `get_act()`：可能返回 `nil`（没有活动输入设备）。
- `get_next(indev?)`：若传入上一个 `indev`，返回其后的下一个；没有则返回 `nil`。
- `get_point()` / `get_vect()`：总是返回两个整数（若无意义的数据，驱动层可能返回 0）。
- `get_scroll_obj()`：无滚动对象时返回 `nil`；若返回的对象此前未被 Lua 包装，绑定层会自动包装并标记 `lua_created = false`。
- `set_cursor(obj)` 仅对**指针类**输入设备有意义。
- `set_group(group)` 典型用于**编码器**或**键盘**导航。

---

## 注意事项

- 传参错误会抛出 Lua 异常（例如传入 `nil` 或非期望类型）。
- `__gc` 中未进行额外资源释放（驱动层对象生命周期通常由底层管理）。
- 如需事件回调（feedback），源码里有预留的 `on_event` 相关实现，但当前被注释关闭；若要启用需在绑定层开启并实现驱动回调转发。