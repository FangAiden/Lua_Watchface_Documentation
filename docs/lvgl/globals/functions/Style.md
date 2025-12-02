---
title: "Style"
description: "样式模块：创建/设置/移除样式以及对象局部样式接口"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 概述

`Style` 用于创建并设置 LVGL 对象的**样式属性**（颜色、尺寸、对齐、阴影、文本、背景图等）。  
支持一次性用表（table）批量设置；也可在对象级别直接设置“局部样式”（无需先创建 `Style()`）。

- `Style({...})` 创建样式实例（userdata），可复用到多个对象。
- `style:set({...})` 为样式设置/更新多个属性。
- `obj:add_style(style, selector)` 把样式应用到对象。
- `obj:set_style({...}, selector)` 直接在对象上设置**局部样式**（不创建 `Style`）。

> `selector` 即 LVGL 的选择器（部件/状态组合整数）。不传默认为 `0`（主部件 & 默认状态）。

---

## 定义

```lua
-- 构造函数：创建样式并按表设置属性
Style(props?: table) -> style_userdata

-- 实例方法
style:set(props: table) -> nil
style:remove_prop(name: string) -> nil
style:delete() -> nil   -- 手动解除注册，触发 GC 时会 reset & free

-- 对象级样式（无需 Style 实例）
obj:set_style(props: table, selector?: integer) -> obj
obj:add_style(style: userdata, selector?: integer) -> obj
obj:remove_style(style: userdata, selector?: integer) -> obj
obj:remove_style_all() -> obj
```

#### 特殊值
> 在 `props` 的值位置使用字符串 `"inherit"` 可标记该属性继承（仅 LVGL 8.3+ 生效）。

## 基本示例

```lua
-- 方式一：创建 Style 实例并应用
local style = Style({
  width = PCT(100),
  height = 48,
  radius = 8,
  bg_color = 0x334455,
  bg_opa = OPA(255),
  text_color = 0xFFFFFF,
})

local label = lvgl.label_create(lvgl.scr_act())
label:add_style(style, 0)

-- 方式二：直接在对象上设置“局部样式”（不建 Style）
label:set_style({
  x = 10, y = 10,
  pad_hor = 8, pad_ver = 4,
}, 0)
```

----

#### 可用属性（按类别）

> 下列键名即 `props` 表中的 key；值类型见右侧。未列出者同理参见 LVGL 样式属性。
颜色值支持十六进制整数（如 `0xRRGGBB`）；指针类（如 `text_font`）需传 light-userdata（例如 `Font()` 的返回值）。

### 尺寸/布局/变换

| 键                                        | 类型    | 说明                              |
| ----------------------------------------- | ------- | --------------------------------- |
| `width` / `height`                        | integer | 宽/高（可用 `PCT(x)` 百分比）。   |
| `min_width` / `min_height`                | integer | 最小宽/高。                       |
| `max_width` / `max_height`                | integer | 最大宽/高。                       |
| `x` / `y`                                 | integer | 相对父项偏移。                    |
| `align`                                   | integer | 对齐（参见 `lvgl/enums/align`）。 |
| `translate_x` / `translate_y`             | integer | 平移。                            |
| `transform_width` / `transform_height`    | integer | 变换后的大小偏移。                |
| `transform_scale_x` / `transform_scale_y` | integer | 缩放（LVGL 固定点数）。           |
| `transform_rotation`                      | integer | 旋转角度（单位 0.1°）。           |
| `transform_pivot_x` / `transform_pivot_y` | integer | 旋转/缩放的枢轴（LVGL 8.3+）。    |

### 内边距/间距

| 键                                            | 类型    | 说明                       |
| --------------------------------------------- | ------- | -------------------------- |
| `pad_top`/`pad_bottom`/`pad_left`/`pad_right` | integer | 四向内边距。               |
| `pad_row` / `pad_column`                      | integer | 行/列间距。                |
| `pad_gap`                                     | integer | （同上，快捷组合见下文）。 |

### 背景

| 键                              | 类型    | 说明                    |
| ------------------------------- | ------- | ----------------------- |
| `bg_color`                      | color   | 背景色。                |
| `bg_opa`                        | integer | 背景不透明度（0~255）。 |
| `bg_grad_color`                 | color   | 渐变色。                |
| `bg_grad_dir`                   | integer | 渐变方向。              |
| `bg_main_stop` / `bg_grad_stop` | integer | 渐变起止。              |
| `bg_image_src`                  | string  | light-userdata          | 背景图片（路径或图片指针）。 |
| `bg_image_opa`                  | integer | 背景图不透明度。        |
| `bg_image_recolor`              | color   | 重新着色。              |
| `bg_image_recolor_opa`          | integer | 重新着色不透明度。      |
| `bg_image_tiled`                | integer | 平铺标志（0/1）。       |

### 边框/外轮廓/阴影

| 键                                                                       | 类型          | 说明                |
| ------------------------------------------------------------------------ | ------------- | ------------------- |
| `border_color` / `border_opa` / `border_width`                           | color/int     | 边框。              |
| `border_side`                                                            | integer       | 边框方位掩码。      |
| `border_post`                                                            | integer       | 后绘制（0/1）。     |
| `outline_width` / `outline_color` / `outline_opa`                        | int/color/int | 外轮廓。            |
| `outline_pad`                                                            | integer       | 轮廓与对象的间距。  |
| `shadow_width` / `shadow_offset_x` / `shadow_offset_y` / `shadow_spread` | integer       | 阴影控制。          |
| `shadow_color` / `shadow_opa`                                            | color/int     | 阴影颜色/不透明度。 |

### 线段/弧形/图片

| 键                                                                  | 类型          | 说明                |
| ------------------------------------------------------------------- | ------------- | ------------------- |
| `line_width` / `line_dash_width` / `line_dash_gap` / `line_rounded` | integer       | 线段样式。          |
| `line_color` / `line_opa`                                           | color/int     | 线段颜色/不透明度。 |
| `arc_width` / `arc_rounded`                                         | integer       | 弧形线宽/圆角。     |
| `arc_color` / `arc_opa`                                             | color/int     | 弧形颜色/不透明度。 |
| `arc_image_src`                                                     | string        | light-userdata      | 弧形贴图。 |
| `image_opa` / `image_recolor` / `image_recolor_opa`                 | int/color/int | 普通图片样式。      |

### 文本

| 键                                      | 类型           | 说明                                                                |
| --------------------------------------- | -------------- | ------------------------------------------------------------------- |
| `text_color` / `text_opa`               | color/int      | 文本颜色/不透明度。                                                 |
| `text_font`                             | light-userdata | 文本字体：传 `Font("montserrat", 16)` 等返回的 **light-userdata**。 |
| `text_letter_space` / `text_line_space` | integer        | 字符/行间距。                                                       |
| `text_decor`                            | integer        | 文本装饰（下划线等）。                                              |
| `text_align`                            | integer        | 文本对齐。                                                          |

### 其他

| 键                       | 类型    | 说明                              |
| ------------------------ | ------- | --------------------------------- |
| `radius` / `clip_corner` | integer | 圆角/裁剪角。                     |
| `opa`                    | integer | 对象整体不透明度。                |
| `color_filter_opa`       | integer | 颜色滤镜不透明度。                |
| `anim_time`              | integer | 样式动画时长（ms）。              |
| `blend_mode`             | integer | 混合模式。                        |
| `layout`                 | integer | 布局类型（如 `LV_LAYOUT_FLEX`）。 |
| `base_dir`               | integer | 文字基线方向（LTR/RTL）。         |

---

### 组合/快捷属性

以下键会**展开为多个底层属性**：

| 键        | 等效展开                                            |
| --------- | --------------------------------------------------- |
| `size`    | `width` + `height`                                  |
| `pad_all` | `pad_top` + `pad_bottom` + `pad_left` + `pad_right` |
| `pad_ver` | `pad_top` + `pad_bottom`                            |
| `pad_hor` | `pad_left` + `pad_right`                            |
| `pad_gap` | `pad_row` + `pad_column`                            |

示例:

```lua
label:set_style({
  size = 40,        -- 宽高都设为 40
  pad_all = 8,      -- 四向内边距 8
})
```

---

### Flex 布局

有两种写法：

1. 一次性表写法（推荐）

```lua
obj:set_style({
  flex = {
    flex_direction = "row",        -- row | row-reverse | column | column-reverse
    flex_wrap = "wrap",            -- nowrap | wrap | wrap-reverse
    justify_content = "center",    -- flex-start | flex-end | center | space-between | space-around | space-evenly
    align_items = "center",        -- 同上
    align_content = "space-between"
  }
}, 0)
```

2. 直接设定各子属性（整数）

```lua
obj:set_style({
  layout = LV_LAYOUT_FLEX,
  flex_flow = LV_FLEX_FLOW_ROW,          -- 可与 REVERSE/WRAP 按位组合
  flex_main_place = LV_FLEX_ALIGN_START,
  flex_cross_place = LV_FLEX_ALIGN_CENTER,
  flex_track_place = LV_FLEX_ALIGN_START,
  flex_grow = 1,
}, 0)
```

---

### “继承”特殊值（LVGL 8.3+）

在值位置使用 `"inherit"`，可将该样式属性标记为继承：

```lua
style:set({
  text_color = "inherit",
  bg_opa = "inherit",
})
```

---

### 删除/移除

```lua
-- 从样式对象中移除某个属性（恢复默认/继承）
style:remove_prop("width")

-- 把样式从对象上移除
obj:remove_style(style, 0)

-- 移除对象所有样式
obj:remove_style_all()

-- 删除样式对象（解除注册；GC 时会 reset/free）
style:delete()
```

---

### 与字体/图片的配合

- `text_font` 需要 light-userdata：请用 `Font("montserrat", 16)`、`Font("unscii", 16)` 等构造后传入。
- `bg_image_src` / `arc_image_src` 可接收**路径字符串**或**light-userdata** 图片句柄。

示例:

```lua
local f = Font("montserrat", 20)
label:set_style({ text_font = f, text_color = 0x222222 }, 0)
```

### 备注

- 若键名不在映射表中，会被忽略或报错（取决于场景）。
- `Style()` 方便复用；`obj:set_style()` 适合一次性、对象局部的样式设置。
- 颜色值可用 `0xRRGGBB`；不透明度用 `OPA(x)`（0~255）。