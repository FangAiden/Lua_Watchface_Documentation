---
title: "Anim"
description: "动画 API"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 构造

```lua
Anim(var: any, opts: table) -> anim
obj:Anim(opts: table) -> anim       -- 语法糖
```

## opts 参数

| 键 | 类型 | 说明 |
| --- | --- | --- |
| `start_value` | integer | 起始值 |
| `end_value` | integer | 结束值 |
| `time` / `duration` | integer | 动画时长（ms） |
| `delay` | integer | 启动延迟（ms） |
| `repeat_count` | integer | 重复次数，`-1` 为无限 |
| `repeat_delay` | integer | 重复间延迟（ms） |
| `early_apply` | integer/boolean | 立即应用首帧 |
| `playback_time` | integer | 回放时长（往返动画） |
| `playback_delay` | integer | 回放前延迟 |
| `path` | string | 缓动：`"linear"` / `"ease_in"` / `"ease_out"` / `"ease_in_out"` / `"overshoot"` / `"bounce"` / `"step"` |
| `exec_cb` | function | 执行回调 `function(obj, value)` |
| `done_cb` | function | 完成回调 `function(anim, obj)` |
| `run` | boolean | `true` 则立即启动 |

## 实例方法

| 方法 | 返回值 | 说明 |
| --- | --- | --- |
| `a:set(opts)` | anim | 更新参数 |
| `a:start()` | anim | 启动动画 |
| `a:stop()` | nil | 停止动画 |
| `a:delete()` | nil | 删除动画 |

## 示例

```lua
local a = obj:Anim{
  start_value = 0,
  end_value   = 120,
  duration    = 1000,
  path        = "ease_out",
  exec_cb     = function(o, v)
    o:set({ x = v })
  end,
  run = true,
}
```
