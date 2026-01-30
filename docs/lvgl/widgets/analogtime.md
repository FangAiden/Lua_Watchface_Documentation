---
title: "AnalogTime"
description: "LVGL Widget: AnalogTime"
tags: ["module:lvgl", "type:api", "kind:widget"]
---
# AnalogTime

继承自 [Object](./object.md)

> ⚠️ 该控件在模拟器的 `debug.getregistry()["widgets"]` 中**未注册**，但在设备表盘源码（corona.lua）中有实际使用。可能仅在应用上下文中可用。

## 创建

```lua
local analogTime = root:AnalogTime {
  hands = {
    second = "S:/watchface/lua/corona/image/sec.bin",
  },
  period = 33,
  w = 466, h = 466,
  align = lvgl.ALIGN.CENTER,
}
```

## 属性

| 属性 | 类型 | 说明 | 验证状态 |
|------|------|------|---------|
| `hands` | table | 指针图像：`{ hour, minute, second }` | ✅ 设备验证 |
| `pivot` | table | 指针旋转轴心：`{ second = {x, y} }` | ✅ 设备验证 |
| `fake_time` | table | 模拟时间：`{ second = n }` | ✅ 设备验证 |
| `period` | number | 刷新周期（毫秒） | ✅ 设备验证 |

## 方法

| 方法 | 说明 | 验证状态 |
|------|------|---------|
| `pause()` | 暂停时钟走时 | ✅ 设备验证 |
| `resume()` | 恢复时钟走时 | ✅ 设备验证 |
| `set(tbl)` | 批量设置属性 | — |

## 示例

```lua
local root = lvgl.Object(nil, {
  w = 466, h = 466, bg_opa = 0, border_width = 0,
})

local analogTime = root:AnalogTime {
  hands = { second = "S:/watchface/lua/corona/image/sec.bin" },
  period = 33,
  w = 466, h = 466,
  align = lvgl.ALIGN.CENTER,
}

analogTime:set { pivot = { second = { 16, 232 } } }

function pageOnPause()
  analogTime:pause()
end

function pageOnResume()
  analogTime:resume()
end
```
