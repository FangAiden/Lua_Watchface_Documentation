---
title: "debug（调试库）"
description: "栈信息、traceback 与调试钩子（常被裁剪）"
tags: ["module:official", "stdlib"]
---

## 概览

`debug` 主要用于**调试与诊断**：获取调用栈信息、生成 traceback、检查局部变量/上值等。  
在很多设备固件或生产环境中，`debug` 经常被裁剪或受限（出于性能/安全考虑）。

## 模块结构（速查）

| 成员 | 类型 | 说明 | 可用性 |
|---|---|---|---|
| `debug.traceback([thread,] [message,] [level])` | `function` | 生成栈回溯字符串 | `可能不可用（常被裁剪）` |
| `debug.getinfo([thread,] f[, what])` | `function` | 获取函数/栈帧信息 | `可能不可用（常被裁剪）` |
| `debug.getlocal([thread,] level, local)` | `function` | 读取局部变量 | `可能不可用（常被裁剪）` |
| `debug.setlocal([thread,] level, local, value)` | `function` | 修改局部变量 | `可能不可用（常被裁剪）` |
| `debug.getupvalue(f, up)` / `debug.setupvalue(f, up, value)` | `function` | 读取/修改上值 | `可能不可用（常被裁剪）` |
| `debug.upvalueid(f, n)` / `debug.upvaluejoin(f1, n1, f2, n2)` | `function` | 上值标识/合并（版本相关） | `可能不可用（版本差异/裁剪）` |
| `debug.getuservalue(u)` / `debug.setuservalue(u, v)` | `function` | 读取/设置 userdata 的 uservalue（版本相关） | `可能不可用（版本差异/裁剪）` |
| `debug.getregistry()` | `function` | 获取注册表（高级用法） | `可能不可用（常被裁剪）` |
| `debug.getmetatable(v)` / `debug.setmetatable(v, mt)` | `function` | 获取/设置任意值的元表 | `可能不可用（常被裁剪）` |
| `debug.sethook([thread,] hook, mask[, count])` | `function` | 设置调试钩子 | `可能不可用（常被裁剪）` |
| `debug.gethook([thread])` | `function` | 获取当前钩子 | `可能不可用（常被裁剪）` |
| `debug.debug()` | `function` | 交互式调试（通常无） | `可能不可用（常被裁剪）` |

## 最常用：traceback

```lua
local function a() error("boom") end
local function b() a() end

local ok, err = xpcall(b, function(e)
  if debug and type(debug.traceback) == "function" then
    return debug.traceback(e, 2)
  end
  return tostring(e)
end)

print("ok?", ok)
print(err)
```

## 使用建议

- 设备侧尽量只依赖 `debug.traceback`（若存在）做日志定位。
- 调试钩子（`sethook`）对性能影响较大，不建议在高频场景启用。
