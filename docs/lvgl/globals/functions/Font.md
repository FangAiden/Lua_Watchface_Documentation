---
title: "Font"
description: "字体函数"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 定义

```lua
Font(name: string, size?: integer, weight?: string|integer) -> light-userdata
```

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `name` | string | 字体名称。已验证可用：`montserrat` |
| `size` | integer | 像素大小。已验证可用尺寸：14, 16, 18, 24, 32 |
| `weight` | string | 粗细，可选参数。已验证仅 `"normal"` 有效 |

## 示例

```lua
local f = lvgl.Font("montserrat", 32, "normal")
```
