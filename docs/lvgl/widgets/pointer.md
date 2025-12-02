---
title: "Pointer"
description: "LVGL Widget: Pointer"
tags: ["module:lvgl", "type:api", "kind:widget"]
---
# Pointer

继承自：[`Object`](./object.md)

---

## 概述

`lvgl.Pointer` 是一个指针表盘控件（如仪表/旋钮的指针）。通过配置“值域→角度”映射关系来控制指针指向；提供设置数值与映射范围的属性。其布局、样式与事件与 Object 相同（`w`/`h`、`align`、`set_style`、`onClicked` 等）。

---

## 创建

```lua
-- 根节点上创建
local ptr = lvgl.Pointer({
  x = 20, y = 20, w = 160, h = 160,
  range = {               -- 可选：创建时直接设置映射关系
    valueStart = 0,       -- 数值起点
    valueRange = 100,     -- 数值跨度（如 0~100）
    angleStart = -120,    -- 起始角度（度）
    angleRange = 240,     -- 角度跨度（度）
  },
  value = 30,             -- 初始指向的数值
})

-- 或指定父对象
local ptr2 = lvgl.Pointer(parent, { w = 120, h = 120 })
```

---

## 可设置属性（通过 set{}）

> 注意：Pointer 的特有属性为**写入属性**；读取会得到 `nil`（组件未实现 getter）。

| 属性      | 类型                                                   | 说明                                                                                                                                           |
| ------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `range` | `{ valueStart, valueRange, angleStart, angleRange }` | 设置“数值→角度”的线性映射。<br/>- `valueStart`：数值起点（如 0）<br/>- `valueRange`：数值跨度（如 100 表示 0~100）<br/>- `angleStart`：指针起始角度（度）<br/>- `angleRange`：角度跨度（度） |
| `value` | `number`                                             | 设置当前指向的数值（将按 `range` 的映射转换为角度）。                                                                                                              |

示例：

```lua
-- 修改映射与数值
ptr:set({
  range = { valueStart = -50, valueRange = 150, angleStart = -135, angleRange = 270 },
  value = 20,
})

-- 仅更新数值
ptr:set({ value = 75 })
```

---

## 样式与事件（与 Object 一致）

```lua
ptr:set_style({
  bg_color = lvgl.Color(0x101010),
  radius   = lvgl.RADIUS_CIRCLE,
  pad_all  = 4,
})

ptr:onevent(lvgl.EVENT.VALUE_CHANGED, function(e)
  -- 结合外部状态管理使用
end)
```

---

## 注意事项

- 通过 `range` 设定线性映射，通过 `value` 控制定向。
- Pointer 无特有方法（仅属性），其它能力复用 Object。