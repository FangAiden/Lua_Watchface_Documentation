---
title: "HOR_RES"
description: "获取当前显示设备的水平分辨率（像素宽度）"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 概述

`HOR_RES` 是用于获取 **当前显示设备水平分辨率** 的全局常量。  
在 LuaVGL 中，该值通常以像素为单位返回屏幕的宽度，用于计算对象布局、定位和自适应界面。

---

## 定义

```lua
HOR_RES : integer
```

## 示例

```lua
local hor_res = lvgl.HOR_RES
print("当前水平分辨率:", hor_res)
```