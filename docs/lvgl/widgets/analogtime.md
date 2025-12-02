---
title: "AnalogTime"
description: "LVGL Widget: AnalogTime"
tags: ["module:lvgl", "type:api", "kind:widget"]
---
# AnalogTime

继承自：[`Object`](./object.md)

---

## 概述

`lvgl.AnalogTime` 是一个模拟时钟控件。支持自定义时针/分针/秒针图像，并提供暂停与继续运行的方法。

---

## 创建

```lua
-- 方式一：以根为父
local clk = lvgl.AnalogTime({
  x = 20, y = 20, w = 220, h = 220,
  hands = {                    -- 可选：在创建时直接设置指针
    hour   = "S:/res/hour.bin",
    minute = "S:/res/minute.bin",
    second = "S:/res/second.bin", -- 可省略
  },
})

-- 方式二：指定父对象
local clk2 = lvgl.AnalogTime(parent, { w = 200, h = 200 })
```

> 说明：除本页列出的特有属性外，其余外观/布局能力与事件系统均与 Object 一致（如 `w`, `h`, `align`, `bg_color`, `pad_all`, `set_style`, `onClicked` 等）。

---

## 可设置属性（通过 set{}）

| 属性      | 类型                          | 说明                                                        |
| ------- | --------------------------- | --------------------------------------------------------- |
| `hands` | `{ hour, minute, second? }` | 设置指针图像（仅**可写**）。三个字段的值均为图像源，支持路径、符号或已注册的图像句柄；`second` 可选。 |

示例:

```lua
clk:set({
  hands = {
    hour   = "S:/res/hour.bin",
    minute = "S:/res/minute.bin",
    -- second 可不填：不显示秒针或使用默认
  }
})
```

> 内部实现：`hands` 对应 `lv_analog_time_set_hands(obj, hour, minute, second)`；为**写入属性**，不提供读取。

---

## 特有 Methods

| 方法         | 说明      |
| ---------- | ------- |
| `pause()`  | 暂停时钟走时。 |
| `resume()` | 恢复时钟走时。 |

---

## 使用示例

```lua
-- 基础样式
clk:set_style({
  bg_color = lvgl.Color(0x202020),
  radius   = lvgl.RADIUS_CIRCLE,
})

-- 暂停 / 继续
clk:pause()
lvgl.Timer(1000, function()
  clk:resume()
end)
```

---

## 注意事项

- `hands` 的三个值必须是 图像源（如 `"A:/img/hour.bin"`、`lvgl.SYMBOL.CLOCK`、或通过 `lvgl.ImageDescriptor` 注册的源）。
- 若不设置 `second`，等效于不绘制秒针或使用组件默认秒针（取决于固件集成）。
- Object 的布局/事件/样式接口均可直接用于 `AnalogTime`。