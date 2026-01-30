---
title: "Led"
description: "LVGL 发光指示灯控件，用于显示状态灯或亮度可控指示灯"
tags: ["module:lvgl", "type:ref", "kind:widget"]
---
# Led

继承自 [Object](./object.md)

## 创建

```lua
local led = parent:Led {
  w = 30, h = 30,
  color = lvgl.color_hex(0x00FF00),
  brightness = 150,
}
```

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `color` | color | LED 颜色 |
| `brightness` | integer | 亮度，0–255 |

## 方法

| 方法 | 说明 |
|------|------|
| `on()` | 点亮 LED |
| `off()` | 关闭 LED |
| `toggle()` | 切换状态 |
| `get_brightness()` | 获取当前亮度，返回 integer |
| `set(tbl)` | 批量设置属性 |

## 示例

```lua
local led = lvgl.Led(nil, {
  color = lvgl.color_hex(0x00FF00),
  brightness = 128,
})

led:on()
led:set({ brightness = 220, color = lvgl.color_hex(0xFF8000) })
print("亮度:", led:get_brightness())
led:off()
```
