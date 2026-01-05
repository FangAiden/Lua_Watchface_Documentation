---
tags: ["module:topic", "type:overview"]
---

# Topic 模块

---

## 概述
`topic` 模块提供了一个轻量级的**订阅（Sub）机制**，允许在 Lua 运行环境中进行模块间通信。  
通过 `topic.subscribe()`，脚本可以订阅某个主题（topic），当该主题被发布时执行回调函数。

此模块通常用于事件驱动的场景，例如组件间状态同步、消息分发、UI 更新等。

---

## 模块结构

| 成员 | 类型 | 说明 |
|------|------|------|
| **subscribe(topic, callback)** | `function` | 订阅指定主题，当该主题被触发时执行回调。 |

---

## 函数说明

### `topic.subscribe(name, callback)`

订阅一个主题，当该主题发布时会调用回调函数。

#### 参数：
| 参数名 | 类型 | 说明 |
|--------|------|------|
| `name` | `string` | 主题名称。 |
| `callback` | `function` | 当该主题被触发时执行的函数。 |

#### 返回值：
无。

#### 示例：
```lua
-- 订阅一个主题
topic.subscribe("network_update", function(data)
  print("网络状态变化:", data.status)
end)

-- 订阅另一个主题
topic.subscribe("sensor_value", function(value)
  print("当前传感器读数:", value)
end)
```
