---
title: "disp"
description: "显示设备 API"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 模块函数

```lua
lvgl.disp.get_default() -> lv_disp
lvgl.disp.get_next(disp: lv_disp) -> lv_disp|nil
lvgl.disp.get_scr_act(disp: lv_disp) -> lv_obj|nil  -- ✅ 需传入 disp
lvgl.disp.get_scr_prev(disp: lv_disp) -> lv_obj|nil
lvgl.disp.load_scr(obj: lv_obj, opts?: table) -> nil
```

## 实例方法

```lua
disp:get_res() -> integer              -- ✅ 返回单个值（如 466）
disp:set_rotation(deg: 0|90|180|270) -> nil
disp:get_layer_top() -> lv_obj
disp:get_layer_sys() -> lv_obj
disp:get_next() -> lv_disp|nil
disp:set_bg_opa(opa: integer) -> nil
disp:set_bg_color(color: integer) -> nil
disp:set_bg_image(src: string) -> nil
disp:get_chroma_key_color() -> lv_disp  -- ⚠️ 返回 disp 自身
```

## load_scr 参数

```lua
lvgl.disp.load_scr(obj, {
  anim     = "over_left",  -- 动画类型，默认 "none"
  time     = 1000,         -- 动画时长(ms)
  delay    = 100,          -- 动画延迟(ms)
  auto_del = 0,            -- 是否自动删除旧屏（0/1）
})
```

### anim 值

| 值 | 说明 |
| --- | --- |
| `"none"` / 省略 | 无动画 |
| `"over_left"` / `"over_right"` / `"over_top"` / `"over_bottom"` | 新屏覆盖旧屏 |
| `"move_left"` / `"move_right"` / `"move_top"` / `"move_bottom"` | 移动方式切换 |
| `"fade_on"` | 渐显 |
| `"fade_in"` / `"fade_out"` | 渐入/渐出 |
| `"out_left"` / `"out_right"` / `"out_top"` / `"out_bottom"` | 旧屏移出 |

## 示例

```lua
-- 获取分辨率
local disp = lvgl.disp.get_default()
local w, h = disp:get_res()
print("resolution:", w, "x", h)
```

```lua
-- 切换屏幕
local new_scr = lvgl.obj_create(nil)
lvgl.disp.load_scr(new_scr, {
  anim  = "over_left",
  time  = 500,
  delay = 0,
  auto_del = 1,
})
```
