---
title: "Led"
description: "LVGL 发光指示灯控件，用于显示状态灯或亮度可控指示灯"
tags: ["module:lvgl", "type:ref", "kind:widget"]
---

# Led

继承自：[`Object`](./object.md)

---

## 概述

`Led` 控件用于显示发光指示灯，可控制开关、颜色和亮度。  
在 LuaVGL 中，它是 `lvgl.Led()` 的实例对象，常用于状态显示或动画效果。

---

## 特有 Methods

| 方法 | 描述 |
| ---- | ---- |
| `set(tbl)` | 设置 LED 属性，如颜色与亮度 |
| `on()` | 打开 LED（点亮） |
| `off()` | 关闭 LED |
| `toggle()` | 切换 LED 状态（亮 ↔ 灭） |
| `get_brightness()` | 获取当前亮度（整数值） |

---

## 可设置属性

| 属性名 | 类型 | 描述 |
| ------ | ---- | ---- |
| `color` | color | 设置 LED 颜色，例如 `0x00FF00` |
| `brightness` | integer | 设置亮度（0–255） |

---

## 创建

```lua
local led = lvgl.Led(nil, {
    x = 60,
    y = 60,
    w = 30,
    h = 30,
    color = lvgl.color_hex(0x00FF00),
    brightness = 150,
})
```

| 参数       | 类型           | 描述                         |
| -------- | ------------ | -------------------------- |
| `parent` | Object | nil | 父对象；`nil` 表示添加到活动屏幕        |
| `{}`     | table        | 属性表，支持 Object 属性及 LED 专属属性 |

---

### 方法说明

`set(tbl)`

设置 LED 的属性，如颜色与亮度。

```lua
led:set({
    color = lvgl.color_hex(0xFF0000),
    brightness = 200,
})
```

| 参数   | 类型    | 描述                            |
| ---- | ----- | ----------------------------- |
| `{}` | table | 属性表，支持 `color` 与 `brightness` |

---

`on()`

点亮 LED。

```lua
led:on()
```

---

`off()`

关闭 LED。

```lua
led:off()
```

---

`toggle()`

切换 LED 的状态。

```lua
led:toggle()
```

---

`get_brightness()`

获取当前 LED 的亮度。

```lua
local b = led:get_brightness()
print("当前亮度:", b)
```

返回值：

`integer` — 当前亮度值（0–255）

---

## 示例

```lua
-- 创建绿色 LED
local led = lvgl.Led(nil, {
    x = 50,
    y = 50,
    color = lvgl.color_hex(0x00FF00),
    brightness = 128,
})

-- 点亮
led:on()

-- 调整亮度与颜色
led:set({
    brightness = 220,
    color = lvgl.color_hex(0xFF8000),
})

-- 获取亮度
print("亮度:", led:get_brightness())

-- 关闭
led:off()
```