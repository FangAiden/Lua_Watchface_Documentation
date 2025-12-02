---
title: "VER_RES"
description: "获取当前显示设备的垂直分辨率（像素高度）"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 概述

`VER_RES` 是用于获取 **当前显示设备垂直分辨率** 的全局常量。  
在 LuaVGL 中，该值通常以像素为单位返回屏幕的高度，用于计算对象的纵向布局、滚动区域范围以及适配不同分辨率设备。

---

## 定义

```lua
VER_RES : integer
```

## 示例

```lua
local ver_res = lvgl.VER_RES
print("当前垂直分辨率:", ver_res)
```
