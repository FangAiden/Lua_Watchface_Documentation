---
title: "Pointer"
description: "LVGL Widget: Pointer"
tags: ["module:lvgl", "type:api", "kind:widget"]
---
# Pointer

继承自 [Object](./object.md)

> ⚠️ 该控件在模拟器的 `debug.getregistry()["widgets"]` 中未注册，可能仅在特定硬件设备上可用。API 签名基于源码分析，**待设备验证**。

## 创建

```lua
local ptr = parent:Pointer {
  w = 160, h = 160,
  range = {
    valueStart = 0,
    valueRange = 100,
    angleStart = -120,
    angleRange = 240,
  },
  value = 30,
}
```

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `range` | `{ valueStart, valueRange, angleStart, angleRange }` | 数值到角度的线性映射 |
| `value` | number | 当前指向的数值 |

## 方法

| 方法 | 说明 |
|------|------|
| `set(tbl)` | 批量设置属性（`range`, `value`） |

## 示例

```lua
local ptr = lvgl.Pointer(nil, {
  w = 160, h = 160,
  range = { valueStart = 0, valueRange = 100, angleStart = -120, angleRange = 240 },
  value = 30,
})

ptr:set({ value = 75 })
```
