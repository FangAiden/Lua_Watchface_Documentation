---
title: "Timer"
description: "定时器：创建、配置、暂停/恢复与立即触发"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 概述

`Timer({...})` 用于创建 LVGL 定时器并在 Lua 中绑定回调。  
支持通过表一次性设置 **周期、暂停状态、重复次数与回调函数**；创建后还可用 `t:set({...})` 动态修改。

> 若未设置 `period`（或为 `0`），定时器会**默认暂停**，直到手动 `resume()` 或设置非 0 周期。

---

## 定义

```lua
-- 构造
Timer(opts?: table) -> timer_userdata

-- 实例方法
t:set(opts: table) -> nil
t:pause() -> nil
t:resume() -> nil
t:ready() -> nil       -- 立刻触发一次回调（使其“就绪”）
t:delete() -> nil      -- 解除 Lua 侧引用（真正释放在 GC 阶段）
```

---

## 创建参数（opts）

| 键名             | 类型              | 说明                                             |
| -------------- | --------------- | ---------------------------------------------- |
| `period`       | integer         | **周期（ms）**。省略或为 `0` 会自动 `pause()`。             |
| `paused`       | integer/boolean | 设为真值暂停、假值恢复（内部调用 `lv_timer_pause/resume`）。     |
| `repeat_count` | integer         | 重复次数。通常 `-1` 表示无限次（遵循 LVGL 语义）。                |
| `cb`           | function        | **回调函数**。签名：`function(timer)`；`timer` 为此定时器对象。 |

> 多次设置 `cb` 会自动释放旧的 Lua 引用并替换为新的回调。

---

### 回调签名

```lua
local t = Timer({
  period = 500,
  cb = function(self)
    -- self 为 timer（与外部 t 相同对象）
    print("tick")
  end
})

```

> 内部实现会把 C 层 `lv_timer_t*` 映射回 Lua 的 timer userdata 后作为参数传入回调。

---

### 示例

1. 基本周期定时器（500ms 打印一次）

```lua
local t = Timer({
  period = 500,
  cb = function(timer)
    print("tick", lvgl.tick_get())
  end
})
t:resume()   -- 若期望立即开始；当 period>0 时通常已处于可运行态
```

2. 一次性定时器（one-shot）

```lua
local t = Timer({
  period = 1000,
  repeat_count = 1,
  cb = function(timer)
    print("only once")
  end
})
t:resume()
```

3. 动态修改参数

```lua
t:set({
  period = 200,       -- 调高频率
  cb = function(timer)
    -- 替换回调
  end
})
```

4. 立即触发一次

```lua
t:ready()   -- 立刻使定时器“就绪”，立即调用一次 cb
```

5. 暂停/恢复与删除
   
```lua
t:pause()
-- ... 某些条件达成
t:resume()

-- 不再需要时
t:delete()   -- 解除注册；真正释放在 GC 阶段完成
```

---

## 行为与内存管理

- 构造时会创建一个 `lv_timer_t`，并把 Lua 回调以 **注册表引用** 存储；后续 `cb` 变更会先 `unref` 旧引用再设置新引用。
- `delete()` 会：
  - 释放 Lua 对回调的引用；
  - 从注册表移除 userdata 映射；
  - 暂停定时器；**最终释放在 GC** (`__gc`) **阶段**完成（`lv_timer_del` + 释放用户数据）。
- 若未设置 `period` 或 `period == 0`，构造函数会自动 `pause()`。

---

## 常见问题

- **为什么创建后不执行？**
  
  未设置 `period` 或 `period == 0` 时会被自动暂停；请设置非 0 周期或调用 `resume()`。

- **如何让它马上执行一次？**
  
  调用 `t:ready()` 即可。

- **如何停止并释放？**
  
  先 `t:delete()`（解除 Lua 侧引用与暂停），最终在 GC 时释放 C 资源。