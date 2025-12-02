---
title: "Image"
description: "LVGL 图像控件，用于显示图片文件或内存图像"
tags: ["module:lvgl", "type:ref", "kind:widget"]
---

# Image

继承自：[`Object`](./object.md)

---

## 概述

`Image` 是用于显示图片的 LVGL 控件，可加载文件、符号或内存图像数据。  
支持设置图片源（`src`）、偏移量、旋转中心（`pivot`）等。

在 LuaVGL 中，通过 `lvgl.Image()` 创建。

---

## 特有 Methods

| 方法 | 描述 |
| ---- | ---- |
| `set_src(src)` | 设置图片资源路径或内存源 |
| `set_offset({x, y})` | 设置图像偏移量（移动显示区域） |
| `set_pivot({x, y})` | 设置旋转中心点 |
| `get_img_size([src])` | 获取当前图片（或指定源）的尺寸（宽、高） |
| **属性：** `pivot` | 获取或设置旋转中心点（`{x, y}` 表） |

---

## 创建

```lua
local img = lvgl.Image(nil, {
    x = 40,
    y = 40,
    w = 100,
    h = 100,
})
```

| 参数       | 类型           | 描述                                                          |
| -------- | ------------ | ----------------------------------------------------------- |
| `parent` | Object | nil | 父对象，为 `nil` 时添加到当前屏幕                                        |
| `{}`     | table        | 属性表，可设置布局与样式属性（如 `x`, `y`, `w`, `h`, `align`, `bg_color` 等） |

---

### 方法说明

`set_src(src)`

设置图片资源。

支持文件路径、符号字体、或内存中的图片数据。

```lua
img:set_src("/flash/logo.bin")
-- 或者使用符号字体：
img:set_src(lvgl.SYMBOL.OK)
```

| 参数    | 类型                | 描述         |
| ----- | ----------------- | ---------- |
| `src` | string | userdata | 图片源路径或内存引用 |

---

`set_offset({x, y})`

设置图片的偏移显示位置。

```lua
img:set_offset({x = 20, y = 10})
```

| 参数       | 类型    | 描述                         |
| -------- | ----- | -------------------------- |
| `{x, y}` | table | 偏移坐标，默认值为 `{x = 0, y = 0}` |

---

`set_pivot({x, y})`

设置图像旋转中心（枢轴点）。

该点影响旋转与缩放的参考位置。

```lua
img:set_pivot({x = 32, y = 32})
```

| 参数       | 类型    | 描述    |
| -------- | ----- | ----- |
| `{x, y}` | table | 枢轴点坐标 |

---

`get_img_size([src])`

返回图像的尺寸（宽、高）。

如果不传 `src` 参数，将返回当前图像对象的尺寸。

```lua
local w, h = img:get_img_size()
print("宽度:", w, "高度:", h)

-- 也可获取其他图片源的尺寸
local w2, h2 = img:get_img_size("/flash/icon.bin")
```

| 参数    | 类型             | 描述    |
| ----- | -------------- | ----- |
| `src` | string（可选）     | 图片源路径 |
| 返回    | number, number | 宽度，高度 |

---

#### 属性：`pivot`

直接访问或修改旋转中心。

```lua
-- 读取 pivot
local p = img.pivot
print(p.x, p.y)

-- 修改 pivot
img.pivot = {x = 10, y = 10}
```

---

## 示例

```lua
-- 创建图像对象
local img = lvgl.Image(nil, {
    x = 60,
    y = 40,
    w = 100,
    h = 100,
})

-- 设置图片源
img:set_src("/flash/pic.bin")

-- 获取图像尺寸
local w, h = img:get_img_size()
print("图片尺寸:", w, h)

-- 设置偏移
img:set_offset({x = 20, y = 10})

-- 设置旋转中心
img:set_pivot({x = 50, y = 50})

-- 直接访问 pivot 属性
print("Pivot:", img.pivot.x, img.pivot.y)
```

