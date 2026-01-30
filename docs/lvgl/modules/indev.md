---
title: "indev"
description: "输入设备 API"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 模块函数

```lua
lvgl.indev.get_act() -> lv_indev | nil
lvgl.indev.get_next(indev: lv_indev | nil) -> lv_indev | nil
lvgl.indev.get_obj_act() -> lv_obj | nil
```

## 实例方法

```lua
indev:get_type() -> integer           -- 1 = pointer 类型
indev:get_point() -> integer          -- 无交互时返回 0
indev:get_vect() -> integer
indev:get_key() -> integer
indev:get_scroll_dir() -> integer
indev:get_gesture_dir() -> integer
indev:get_scroll_obj() -> lv_obj | nil

indev:reset() -> nil
indev:reset_long_press() -> nil
indev:wait_release() -> nil

indev:set_group(group: lv_group) -> nil
indev:set_cursor(obj: lv_obj) -> nil

indev:on_event(event: integer, cb: function) -> nil
```

## 示例

```lua
-- 遍历所有输入设备
local id = lvgl.indev.get_next()
while id do
  print("type:", id:get_type())
  print("point:", id:get_point())
  id = lvgl.indev.get_next(id)
end

-- 获取当前活跃输入设备正在操作的对象
local obj = lvgl.indev.get_obj_act()
if obj then
  print("active object found")
end
```
