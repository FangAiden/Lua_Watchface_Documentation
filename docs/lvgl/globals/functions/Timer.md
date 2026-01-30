---
title: "Timer"
description: "定时器 API"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 构造

```lua
Timer(opts?: table) -> timer
```

## opts 参数

| 键 | 类型 | 说明 |
| --- | --- | --- |
| `period` | integer | 周期（ms），省略或 `0` 则自动暂停 |
| `paused` | integer/boolean | 是否暂停 |
| `repeat_count` | integer | 重复次数，`-1` 为无限 |
| `cb` | function | 回调，签名 `function(timer)` |

## 实例方法

| 方法 | 说明 |
| --- | --- |
| `t:set(opts)` | 更新参数 |
| `t:pause()` | 暂停 |
| `t:resume()` | 恢复 |
| `t:ready()` | 立即触发一次回调 |
| `t:delete()` | 删除定时器 |

## 示例

```lua
local t = Timer({
  period = 500,
  repeat_count = -1,
  cb = function(timer)
    print("tick", lvgl.tick_get())
  end
})
t:resume()
```
