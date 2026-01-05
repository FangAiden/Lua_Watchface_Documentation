---
title: "os（系统库）"
description: "时间/日期与系统交互（设备侧常见受限）"
tags: ["module:official", "stdlib"]
---

## 概览

`os` 提供与系统相关的一些函数，最常用的是**时间/日期**能力。  
在设备/沙箱环境中，涉及执行外部命令、文件操作等能力通常会被禁用或不存在。

## 函数速查

| 函数 | 说明 | 可用性 |
|---|---|---|
| `os.time([table])` | 获取/构造时间戳（秒） | `常见可用` |
| `os.date([format[, time]])` | 格式化日期时间（或返回表） | `常见可用` |
| `os.difftime(t2, t1)` | 时间差（秒） | `常见可用` |
| `os.clock()` | CPU 时间（实现相关） | `常见可用` |
| `os.getenv(name)` | 读取环境变量 | `可能不可用（设备侧常被禁用）` |
| `os.execute([command])` | 执行外部命令 | `可能不可用（设备侧常被禁用）` |
| `os.exit([code[, close]])` | 退出进程 | `可能不可用（设备侧常被禁用）` |
| `os.remove(filename)` | 删除文件 | `可能不可用（无文件系统/设备侧禁用）` |
| `os.rename(old, new)` | 重命名文件 | `可能不可用（无文件系统/设备侧禁用）` |
| `os.tmpname()` | 生成临时文件名 | `可能不可用（无文件系统/设备侧禁用）` |
| `os.setlocale(locale[, category])` | 设置本地化 | `可能不可用（设备侧常被禁用）` |

## 示例：格式化当前时间（带保护）

```lua
if os and type(os.date) == "function" then
  print(os.date("%Y-%m-%d %H:%M:%S"))
else
  print("os.date not available")
end
```

## 设备侧建议

- 如果项目已经有统一的数据订阅（例如 `dataman.subscribe("sys.time", ...)`），优先用它来驱动 UI，而不是直接依赖 `os.*`。
- 对 `execute/remove/rename/tmpname` 等接口不要做强依赖：它们最容易被禁用或裁剪。
