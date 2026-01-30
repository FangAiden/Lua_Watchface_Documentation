---
tags: ["module:vibrator", "type:overview"]
---

# vibrator

> 触觉反馈接口。

## `vibrator.start(kind)`

```lua
vibrator.start(vibrator.type.SUCCESS)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `kind` | `number` | `vibrator.type.*` 枚举值 |

## `vibrator.cancel()`

```lua
vibrator.cancel()
```

## vibrator.type

| 枚举 | 值 | 说明 |
|------|----|------|
| `NONE` | 0 | 不震动 |
| `CROWN` | 1 | 表冠反馈 |
| `KEY_BOARD` | 2 | 按键点击 |
| `WATCH_FACE` | 3 | 表盘轻触 |
| `SUCCESS` | 4 | 成功 |
| `FAILED` | 5 | 失败 |
| `SYSTEM_OPRATION` | 6 | 系统操作 |
| `HEALTH_ALERT` | 7 | 健康告警 |
| `SYSTEM_EVENT` | 8 | 系统事件 |
| `NOTIFICATION` | 9 | 通知 |
| `TARGET_DONE` | 10 | 目标达成 |
| `BREATHING_TRAINING` | 11 | 呼吸训练 |
| `INCOMING_CALL` | 12 | 来电 |
| `CLOCK_ALARM` | 13 | 闹钟 |
| `SLEEP_ALARM` | 14 | 睡眠唤醒 |

> `SYSTEM_OPRATION` 为设备实际拼写。
