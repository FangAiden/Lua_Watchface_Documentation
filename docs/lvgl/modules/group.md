---
title: "group"
description: "焦点组 API"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 模块函数

```lua
lvgl.group.create() -> lv_group
lvgl.group.get_default() -> lv_group | nil
lvgl.group.focus_obj(obj: lv_obj) -> nil
lvgl.group.remove_obj(obj: lv_obj) -> nil
lvgl.group.remove_objs(group: lv_group) -> nil
```

## 实例方法

```lua
group:add_obj(obj: lv_obj) -> nil
group:remove_obj(obj: lv_obj) -> nil
group:get_obj_count() -> integer

group:focus_next() -> nil
group:focus_prev() -> nil
group:get_focused() -> lv_obj | nil
group:focus_freeze(enabled: boolean) -> nil

group:set_default() -> nil
group:delete() -> nil

group:set_wrap(enabled: boolean) -> nil
group:get_wrap() -> boolean

group:set_editing(enabled: boolean) -> nil
group:set_focus_cb(fn: function) -> nil
group:get_focus_cb() -> function | nil
group:set_edge_cb(fn: function) -> nil
group:get_edge_cb() -> function | nil

group:send_data(code: integer) -> nil
```

## 示例

```lua
local g = lvgl.group.create()
g:set_default()

local scr = lvgl.disp.get_scr_act()
local btn1 = lvgl.btn_create(scr)
local btn2 = lvgl.btn_create(scr)
g:add_obj(btn1)
g:add_obj(btn2)

g:focus_next()
print("focused:", g:get_focused())
print("count:", g:get_obj_count())
```
