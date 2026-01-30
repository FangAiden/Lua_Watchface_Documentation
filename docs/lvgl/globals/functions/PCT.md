---
title: "PCT"
description: "百分比换算函数"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 定义

```lua
PCT(x: number) -> integer
```

将数值转换为相对父对象尺寸的百分比值。

## 示例

```lua
local w = lvgl.PCT(80)  -- 父对象宽度的 80%
```
