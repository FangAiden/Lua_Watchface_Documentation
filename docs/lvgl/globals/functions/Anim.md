---
title: "Anim"
description: "动画：创建、配置、启动/停止与回调（可重复启动）"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 概述

`Anim` 用于在 Lua 中配置并启动 LVGL 动画。  
与原生 LVGL 不同的是：**Lua 侧的 anim 在完成后可以再次 `start()` 重启**。

可通过两种方式创建：

```lua
-- 方式一：对象方法（语法糖）
local a = obj:Anim{ ... }

-- 方式二：模块函数
local a = lvgl.Anim(obj, { ... })
```

## 定义

```lua
-- 构造
Anim(var: any, opts: table) -> anim_userdata
obj:Anim(opts: table)       -> anim_userdata  -- 语法糖：等价于 lvgl.Anim(obj, opts)

-- 方法
a:set(opts: table) -> anim_userdata  -- 更新参数；若在运行会先 stop
a:start()          -> anim_userdata  -- 启动（若已在运行会先 stop 再启）
a:stop()           -> nil            -- 停止当前动画
a:delete()         -> nil            -- 标记删除并释放回调/引用（等待 GC）
```

> `tostring(a)` 会显示运行状态与区间值（由 `__tostring` 提供）。

---

## 配置项（opts）

> 这些键会被 `a:set()` / 构造时读取并写入 `lv_anim_t cfg`。
> `time` 与 `duration` 等价，最终都调用 `lv_anim_set_time`。

| 键名                  | 类型              | 说明                                                                                              |
| ------------------- | --------------- | ----------------------------------------------------------------------------------------------- |
| `start_value`       | integer         | 起始值。                                                                                            |
| `end_value`         | integer         | 结束值。                                                                                            |
| `time` / `duration` | integer         | 动画时长（ms）。                                                                                       |
| `delay`             | integer         | 启动延迟（ms）。                                                                                       |
| `repeat_count`      | integer         | 重复次数（LVGL 语义；无限次可用 `-1`）。                                                                       |
| `repeat_delay`      | integer         | 每次重复前的延迟（ms）。                                                                                   |
| `early_apply`       | integer/boolean | 及早应用首帧（调用 `lv_anim_set_early_apply`）。                                                           |
| `playback_time`     | integer         | 回放时长（往返动画）。                                                                                     |
| `playback_delay`    | integer         | 回放前延迟。                                                                                          |
| `path`              | string          | 缓动曲线：`"linear"`（默认）/`"ease_in"`/`"ease_out"`/`"ease_in_out"`/`"overshoot"`/`"bounce"`/`"step"`。 |
| `exec_cb`           | function        | **执行回调**：形如 `function(obj, value)`。每一帧被调用，用来把 `value` 应用到 `obj`。                                |
| `done_cb`           | function        | **完成回调**：形如 `function(anim, obj)`。当动画结束（或被删除）时调用。                                               |
| `run`               | boolean         | 若为 `true`，在 `set()` 后**立即启动**（内部等价于 `a:start()`）。                                               |

> **注意**：`exec_cb`、`done_cb` 会被保存为注册表引用，多次设置会自动 `unref` 旧回调后替换。

---

## 回调签名

**执行回调** `exec_cb(obj, value)`

- 在每个动画 tick 调用；
- 你需要在此回调里把 `value` 应用到 `obj`（例如设置位置、尺寸、透明度等）。

**完成回调** `done_cb(anim, obj)`

- 当动画被 LVGL 标记完成/删除时调用；
- 可在此做收尾逻辑或链式启动下一段动画。

---

### 示例

1. 移动对象的 X 坐标（0 → 120，1 秒内）

```lua
local a = obj:Anim{
  start_value = 0,
  end_value   = 120,
  duration    = 1000,
  path        = "ease_out",
  exec_cb     = function(o, v)
    lvgl.obj_set_x(o, v)
  end,
  done_cb     = function(anim, o)
    print("move done")
  end,
  run         = true,   -- 设为 true 立即启动
}
```

2. 往返（带回放）且无限循环

```lua
local a = lvgl.Anim(obj, {
  start_value    = 0,
  end_value      = 255,
  duration       = 600,
  playback_time  = 600,
  repeat_count   = -1,        -- 无限循环
  path           = "ease_in_out",
  exec_cb = function(o, v)
    -- 假设用 v 做透明度
    lvgl.obj_set_style_bg_opa(o, v, 0)
  end,
})
a:start()
```

3. 动态更新参数并重启

```lua
-- 变速且改变区间；set() 若检测到正在运行，会先 stop()
a:set{
  start_value = 120,
  end_value   = 240,
  duration    = 300,
  run         = true,   -- set 后马上再启动
}
```

---

## 行为与内存管理

- **可重启**：若动画正在运行，`start()` 会先 `stop()` 再重新 `lv_anim_start`；`set()` 亦会在更新前 `stop()`。
- **删除**：`delete()` 会停止动画并释放 `exec_cb`/`done_cb`/对象引用与自引用；标记 `deleted = true`，等待 GC。
- **完成回调**：LVGL 完成/删除动画时调用 `done_cb(anim, obj)`，并清理自引用，允许 GC。
- **容错**：若缺少 `exec_cb` 或 `obj`，执行阶段会报错（源实现中进行检查）。

---

## 常见问题

- **为什么 `run = true` 没动？**
  
  确保已正确设置 `duration`/`time` 与 `exec_cb`，且在 `exec_cb` 中对 `obj` 应用了 `value`。

- **如何暂停/停止？**
  
  使用 `a:stop()`。之后可再次 `a:start()` 重启。

- **如何做链式动画？**
  
  在 `done_cb(anim, obj)` 里调用下一段动画的 `start()` 或 `set{ run = true }`。