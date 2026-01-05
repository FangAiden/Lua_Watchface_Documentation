---
title: "coroutine（协程）"
description: "协程创建、切换与产消模型示例"
tags: ["module:official", "stdlib"]
---

## 概览

`coroutine` 用于实现**协作式并发**：同一线程内通过 `resume/yield` 主动让出执行权。  
它适合把“分段执行”的逻辑写得更直观（例如：分步动画、状态机、脚本流程）。

## 模块结构（速查）

| 成员 | 类型 | 说明 | 可用性 |
|---|---|---|---|
| `coroutine.create(f)` | `function` | 创建协程（返回 coroutine 对象） | `常见可用` |
| `coroutine.resume(co, ...)` | `function` | 启动/继续协程 | `常见可用` |
| `coroutine.yield(...)` | `function` | 暂停当前协程并返回给调用方 | `常见可用` |
| `coroutine.status(co)` | `function` | 查询协程状态 | `常见可用` |
| `coroutine.running()` | `function` | 返回当前协程（及是否为主线程，版本相关） | `常见可用` |
| `coroutine.wrap(f)` | `function` | 把协程包装成可直接调用的函数 | `常见可用` |
| `coroutine.isyieldable()` | `function` | 当前上下文是否允许 `yield` | `可能不可用（版本差异/实现相关）` |
| `coroutine.close(co)` | `function` | 关闭协程（Lua 5.4+） | `可能不可用（版本差异/裁剪）` |

## `status()` 可能的返回值

| 值 | 含义 |
|---|---|
| `"running"` | 正在运行（当前协程） |
| `"suspended"` | 已挂起（可 `resume`） |
| `"normal"` | 运行中但不在栈顶（被其他协程 resume） |
| `"dead"` | 已结束 |

## 常用模式

### 1) 最小示例：resume/yield 往返

```lua
local co = coroutine.create(function()
  print("step1")
  coroutine.yield("paused")
  print("step2")
  return "done"
end)

print(coroutine.resume(co)) -- true
print(coroutine.resume(co)) -- true, "paused"
print(coroutine.resume(co)) -- true, "done"
print(coroutine.status(co)) -- "dead"
```

### 2) wrap：把协程当迭代器用

```lua
local gen = coroutine.wrap(function()
  for i = 1, 3 do
    coroutine.yield(i)
  end
end)

print(gen(), gen(), gen(), gen()) -- 1 2 3 nil
```

## 注意事项（设备侧常见坑）

- 并不是所有运行时都允许在任意回调里 `yield`；如果出现异常，先用 `coroutine.isyieldable()`（若存在）判断。
- 协程不是线程：不会并行运行；如果在协程里做阻塞操作，同样会阻塞整个 Lua 执行。
