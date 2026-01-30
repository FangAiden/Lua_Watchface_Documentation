---
tags: ["module:topic", "type:overview"]
---

# topic

> 主题消息订阅模块。

## `topic.subscribe(name, callback)`

```lua
local sub = topic.subscribe("some_topic", function(data)
    print(data)
end)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `name` | `string` | 主题名称 |
| `callback` | `function` | 消息回调 |

**返回值**：`miwear.topic` userdata，支持以下方法：

| 方法 | 说明 |
|------|------|
| `sub:unsubscribe()` | 取消订阅 |
| `sub:frequency()` | 设置/查询频率（参数格式待验证） |

> 在非应用上下文中调用会报 `null uv loop` 错误。

## 可用主题

系统共注册 47 个 uORB 主题，均可作为 `topic.subscribe(name)` 的参数。

### 传感器

| 主题名 | 说明 | 已知字段 |
|--------|------|----------|
| `sensor_accel` | 加速度计 | |
| `sensor_accel_uncal` | 加速度计（未校准） | |
| `sensor_gyro` | 陀螺仪 | |
| `sensor_gyro_uncal` | 陀螺仪（未校准） | |
| `sensor_mag` | 磁力计 | |
| `sensor_mag_uncal` | 磁力计（未校准） | |
| `sensor_orientation` | 方向 | |
| `sensor_baro` | 气压计 | |
| `sensor_temp` | 温度 | `timestamp`, `temperature` |
| `sensor_humi` | 湿度 | |
| `sensor_light` | 环境光 | `timestamp`, `light`, `ir` |
| `sensor_prox` | 接近传感器 | |
| `sensor_hrate` | 心率 | |
| `sensor_hinge_angle` | 铰链角度（3 个实例） | |
| `sensor_wrist_tilt` | 抬腕检测 | |
| `sensor_ots` | 光学追踪 | |

### GNSS

| 主题名 | 说明 |
|--------|------|
| `sensor_gnss` | GNSS 定位数据 |
| `sensor_gnss_clock` | GNSS 时钟 |
| `sensor_gnss_measurement` | GNSS 测量值 |
| `sensor_gnss_satellite` | GNSS 卫星信息 |
| `sensor_gnss_geofence_event` | GNSS 地理围栏事件 |

### 算法

| 主题名 | 说明 |
|--------|------|
| `algo_manager` | 算法管理器 |
| `algo_sleep` | 睡眠检测 |
| `algo_off_body` | 离腕检测 |
| `algo_wrist_tilt` | 抬腕算法 |

### 事件

| 主题名 | 说明 |
|--------|------|
| `event_basic_timer` | 基础定时器事件 |
| `event_time` | 时间事件 |
| `event_new_day` | 新一天事件 |
| `event_data_sync` | 数据同步事件 |

### 系统状态

| 主题名 | 说明 |
|--------|------|
| `screen_status` | 屏幕状态（2 个实例） |
| `battery_state` | 电池状态 |
| `bt_stack_state` | 蓝牙协议栈状态 |
| `activity_manager` | Activity 管理器 |
| `miwear_event` | MiWear 系统事件 |
| `system_event` | 系统事件 |
| `cpevent` | CP 事件 |

### 数据

| 主题名 | 说明 |
|--------|------|
| `topic_data_vigor` | 活力数据 |
| `topic_data_hr` | 心率数据 |
| `phone_sport_data_v2a` | 手机运动数据 (v2a) |
| `phone_sport_data_v2d` | 手机运动数据 (v2d) |
| `data_triple_loop` | 三环数据 |
| `app_data_update` | 应用数据更新 |

### 其他

| 主题名 | 说明 |
|--------|------|
| `sport_notify` | 运动通知 |
| `daily_remind` | 日常提醒 |
| `deco_report` | 装饰报告 |
