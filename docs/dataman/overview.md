---
tags: ["module:dataman", "type:overview"]
---

# dataman

> 数据订阅模块，绑定设备数据源到 LVGL 对象。

## `dataman.subscribe(key, obj, callback)`

```lua
local token = dataman.subscribe("timeHour", labelObj, function(obj, value)
    local hour = value // 256
    obj:set { text = tostring(hour) }
end)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `key` | `string` | 数据源键名 |
| `obj` | `userdata` | 绑定的 LVGL 对象，回调中作为第一参数传回 |
| `callback` | `function(obj, value)` | 数据更新回调 |

> `value` 经过 256 倍编码，使用前必须 `value // 256`。值为 `2147483647`（INT_MAX）表示数据无效。

## `dataman.pause(token)` / `dataman.resume(token)`

```lua
dataman.pause(token)
dataman.resume(token)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `token` | `any` | `subscribe` 的返回值 |

## 已知键名

| 键名 | 说明 | 值范围 |
|------|------|--------|
| `timeHour` | 小时 | 0–23 |
| `timeMinute` | 分钟 | 0–59 |
| `timeSecond` | 秒 | 0–59 |
| `healthPressureIndex` | 压力指数 | 0–100 |
| `systemSensorFusionAltitude` | 海拔（米） | 整数，INT_MAX 无效 |
| `weatherCurrentSunRiseHour` | 日出时 | 0–23，INT_MAX 无效 |
| `weatherCurrentSunRiseMinute` | 日出分 | 0–59，INT_MAX 无效 |
| `weatherCurrentSunSetHour` | 日落时 | 0–23，INT_MAX 无效 |
| `weatherCurrentSunSetMinute` | 日落分 | 0–59，INT_MAX 无效 |

> 键名规则为驼峰式：`healthXxx`、`weatherXxx`、`timeXxx`、`systemXxx`。
