---
title: "group"
description: "焦点组：创建/默认组、对象加入/移除、焦点导航与编辑模式"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 概述

`lvgl.group` 封装了 LVGL 的 `lv_group_t`，用于管理**可聚焦对象**的集合（如按键或编码器导航场景）。  
支持创建/删除分组、加入/移除对象、在对象间前后切换焦点、冻结焦点、编辑模式、环绕（wrap）等。

---

## 定义

```lua
-- 模块函数（lvgl.group）
lvgl.group.create() -> group
lvgl.group.get_default() -> group
lvgl.group.remove_obj(obj: obj) -> nil                -- 从其所在组移除该对象
lvgl.group.remove_objs(group: group) -> nil           -- 移除组内所有对象
lvgl.group.focus_obj(obj: obj) -> nil                 -- 让该对象获得焦点

-- 实例方法（group:*）
group:delete() -> nil                                  -- 删除本组（从注册表移除，并调用 lv_group_del）
group:set_default() -> nil                             -- 设置为默认组
group:add_obj(obj: obj) -> nil
group:remove_obj(obj: obj) -> nil
group:focus_next() -> nil
group:focus_prev() -> nil
group:focus_freeze(enabled: boolean|integer) -> nil    -- 冻结/解冻焦点移动
group:send_data(code: integer) -> nil                  -- 发送键码/数据到组
group:set_editing(enabled: boolean|integer) -> nil     -- 设置编辑模式
group:set_wrap(enabled: boolean|integer) -> nil        -- 设置环绕（末尾继续到开头）
group:get_wrap() -> boolean
group:get_obj_count() -> integer
group:get_focused() -> obj|nil

-- 预留（当前未实现）
group:set_focus_cb(fn) -> nil
group:set_edge_cb(fn) -> nil
group:get_focus_cb() -> nil
group:get_edge_cb() -> nil
```

> 说明：布尔参数在实现中以整数读取，`0/1` 或 `false/true` 均可。

---

## 模块函数

`group = lvgl.group.create()`

创建一个新的分组并返回 group 句柄。

`group = lvgl.group.get_default()`

获取默认分组（若尚无 Lua 包装，会自动创建并返回）。

`lvgl.group.remove_obj(obj)`

将对象从其所在组中移除。

`lvgl.group.remove_objs(group)`

移除指定 group 中的所有对象。

`lvgl.group.focus_obj(obj)`

让对象 obj 获得焦点。

---

## 实例方法

`group:delete()`

删除分组（调用 `lv_group_del`），并从 Lua 注册表移除映射。之后再使用该句柄会触发错误。

`group:set_default()`

将该分组设置为默认分组。

`group:add_obj(obj) / group:remove_obj(obj)`

向分组添加/从分组移除对象。

`group:focus_next() / group:focus_prev()`

在分组内按顺序移动焦点到下一个/上一个对象。

`group:focus_freeze(enabled)`

冻结（`true/1`）或取消冻结（`false/0`）焦点移动。

`group:send_data(code)`

向组发送数据/键码（整数），常用于模拟输入事件。

`group:set_editing(enabled)`

设置编辑模式（在部分控件中影响按键行为）。

`group:set_wrap(enabled) / group:get_wrap()`

开启/关闭环绕切换；`get_wrap()` 返回是否开启。

`group:get_obj_count()`

返回组内对象数量（整数）。

`group:get_focused()`

返回当前获焦对象 `obj`，若无则 `nil`。

> 回调相关接口 `set_focus_cb/get_focus_cb/set_edge_cb/get_edge_cb` 在当前实现中为**占位**（不生效）。

---

## 示例

```lua
-- 创建组并设为默认
local g = lvgl.group.create()
g:set_default()

-- 创建两个可聚焦对象
local scr = lvgl.disp.get_scr_act()
local btn1 = lvgl.btn_create(scr)
local btn2 = lvgl.btn_create(scr)

-- 将对象加入组
g:add_obj(btn1)
g:add_obj(btn2)

-- 焦点在两个按钮之间切换
g:focus_next()         -- -> btn1 / btn2
g:focus_prev()

-- 环绕与编辑模式
g:set_wrap(true)
g:set_editing(false)

-- 冻结焦点移动（例如弹出菜单时）
g:focus_freeze(true)

-- 发送键码（示例数值，具体取决于你的输入驱动）
g:send_data(13)        -- Enter
g:send_data(37)        -- Left

-- 查询
print("count:", g:get_obj_count())
print("focused:", g:get_focused())

-- 清理
g:delete()
```

---

## 行为与注意事项

- **删除/GC**：`group:delete()` 会调用 `lv_group_del` 并标记为已删除；随后在 `__gc` 中也会调用 `lv_group_del`（双重保险）。<br />对已删除的分组再调用任何方法会抛出 `attempt to use a deleted group`。
- **默认组**：`get_default()` 若首次被 Lua 访问，会自动创建 Lua 包装并返回。
- **占位回调**：`set_focus_cb/get_focus_cb/set_edge_cb/get_edge_cb` 当前为空实现，仅为接口预留。
- **remove_objs 的位置**：既有**模块函数** `lvgl.group.remove_objs(group)`，也可自行封装为实例方法；源码中未直接暴露为实例方法。