---
title: "OPA"
description: "将数值转换为 LVGL 可识别的不透明度值（透明度）"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 概述

`OPA()` 是用于 **设置不透明度（Opacity）** 的全局函数。  
它将 `0~255` 的整数值转换为 LVGL 可识别的不透明度常量，用于控制对象或样式的透明程度。

- `0` 表示完全透明（不可见）  
- `255` 表示完全不透明  
- 中间值表示不同程度的半透明效果

---

## 定义

```lua
OPA(x: integer) -> integer
```

## 示例

```lua
local bg_opa = lvgl.OPA(100)
print("100 对应的不透明度:", bg_opa)
```