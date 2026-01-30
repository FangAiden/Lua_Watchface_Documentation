---
title: "OPA"
description: "不透明度换算函数"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 定义

```lua
OPA(x: integer) -> integer
```

将 `0`~`255` 转换为 LVGL 不透明度值。`0` = 完全透明，`255` = 完全不透明。

## 示例

```lua
local opa = lvgl.OPA(100)
```
