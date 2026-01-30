---
tags: ["type:intro", "type:overview"]
---

# 概览

## 设备环境

| 项目 | 值 |
|------|------|
| 操作系统 | NuttX 12.3.0 (Xiaomi Vela) |
| Lua 版本 | 5.4.0 |
| 分辨率 | 466 × 466（圆形） |
| 验证平台 | Vela 手表模拟器 |

## Lua 模块

| 模块 | 说明 | 状态 |
|------|------|------|
| **lvgl** | UI 控件系统（11 个控件 + disp/fs/group/indev 子模块） | ✅ |
| **dataman** | 数据订阅（subscribe/pause/resume） | ✅ |
| **topic** | 消息订阅（subscribe → unsubscribe/frequency） | ✅ |
| **activity** | 页面状态管理（isShown） | ✅ |
| **animengine** | 属性动画引擎（x/y/rotate/opacity/scale） | ✅ |
| **navigator** | 页面导航（finish） | ✅ |
| **vibrator** | 触觉反馈（start/cancel + 15 种模式） | ✅ |
| **screen** | 屏幕控制 | ❌ 空表 |

## Lua 标准库

| 模块 | 状态 | 备注 |
|------|------|------|
| `io` | ✅ | `io.open` 读写可用，`io.popen` 不可用 |
| `os` | ✅ | `os.execute` 可用，`os.time`/`os.date`/`os.clock` 可用 |
| `debug` | ✅ | `getregistry`/`getinfo`/`traceback` 等完整可用 |
| `math` | ✅ | 完整 |
| `string` | ✅ | 完整 |
| `table` | ✅ | 完整 |
| `coroutine` | ✅ | 完整 |
| `utf8` | ✅ | 完整 |
| `package` | ✅ | `require`/`loadfile`/`dofile` 均可用 |

## 系统命令

通过 `os.execute()` 可调用 shell 命令。详见 [NuttX Shell 参考](../shell/overview)。

> `io.popen` 不可用。需要捕获命令输出时，用 `os.execute("cmd > /tmp/out.txt")` 后 `io.open("/tmp/out.txt")` 读取。
