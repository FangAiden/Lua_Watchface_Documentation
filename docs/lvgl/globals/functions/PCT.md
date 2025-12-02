---
title: "PCT"
description: "将数值转换为相对父对象尺寸的百分比长度"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 概述

`PCT()` 是一个用于 **计算相对尺寸的全局函数**。  
它将输入的数值转换为相对于父对象尺寸的百分比值，常用于实现响应式布局或控件自适应。

---

## 定义

```lua
PCT(x: number) -> integer
```

## 示例

```lua
local height = lvgl.PCT(80)
print("80% 父对象高度:", height)
```