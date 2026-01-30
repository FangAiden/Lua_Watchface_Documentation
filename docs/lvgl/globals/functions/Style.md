---
title: "Style"
description: "样式 API"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 构造

```lua
Style(props?: table) -> style
```

## 实例方法

```lua
style:set(props: table) -> nil
style:remove_prop(name: string) -> nil
style:delete() -> nil
```

## 对象级样式方法

```lua
obj:set_style(props: table, selector?: integer) -> obj
obj:add_style(style: userdata, selector?: integer) -> obj
obj:remove_style(style: userdata, selector?: integer) -> obj
obj:remove_style_all() -> obj
```

> `selector` 默认为 `0`。值位置使用 `"inherit"` 可标记继承。

---

## 属性表

### 尺寸/布局/变换

| 键 | 类型 | 说明 |
| --- | --- | --- |
| `width` / `height` | integer | 宽/高（可用 `PCT(x)`） |
| `min_width` / `min_height` | integer | 最小宽/高 |
| `max_width` / `max_height` | integer | 最大宽/高 |
| `x` / `y` | integer | 相对父项偏移 |
| `align` | integer | 对齐 |
| `translate_x` / `translate_y` | integer | 平移 |
| `transform_width` / `transform_height` | integer | 变换大小偏移 |
| `transform_scale_x` / `transform_scale_y` | integer | 缩放 |
| `transform_rotation` | integer | 旋转（单位 0.1 度） |
| `transform_pivot_x` / `transform_pivot_y` | integer | 枢轴 |

### 内边距/间距

| 键 | 类型 | 说明 |
| --- | --- | --- |
| `pad_top` / `pad_bottom` / `pad_left` / `pad_right` | integer | 四向内边距 |
| `pad_row` / `pad_column` | integer | 行/列间距 |
| `pad_gap` | integer | 等效 `pad_row` + `pad_column` |

### 背景

| 键 | 类型 | 说明 |
| --- | --- | --- |
| `bg_color` | color | 背景色 |
| `bg_opa` | integer | 背景不透明度（0~255） |
| `bg_grad_color` | color | 渐变色 |
| `bg_grad_dir` | integer | 渐变方向 |
| `bg_main_stop` / `bg_grad_stop` | integer | 渐变起止 |
| `bg_image_src` | string/light-userdata | 背景图片 |
| `bg_image_opa` | integer | 背景图不透明度 |
| `bg_image_recolor` | color | 重新着色 |
| `bg_image_recolor_opa` | integer | 重新着色不透明度 |
| `bg_image_tiled` | integer | 平铺（0/1） |

### 边框/外轮廓/阴影

| 键 | 类型 | 说明 |
| --- | --- | --- |
| `border_color` / `border_opa` / `border_width` | color/int | 边框 |
| `border_side` | integer | 边框方位掩码 |
| `border_post` | integer | 后绘制（0/1） |
| `outline_width` / `outline_color` / `outline_opa` | int/color/int | 外轮廓 |
| `outline_pad` | integer | 轮廓间距 |
| `shadow_width` / `shadow_offset_x` / `shadow_offset_y` / `shadow_spread` | integer | 阴影 |
| `shadow_color` / `shadow_opa` | color/int | 阴影颜色/不透明度 |

### 线段/弧形/图片

| 键 | 类型 | 说明 |
| --- | --- | --- |
| `line_width` / `line_dash_width` / `line_dash_gap` / `line_rounded` | integer | 线段样式 |
| `line_color` / `line_opa` | color/int | 线段颜色/不透明度 |
| `arc_width` / `arc_rounded` | integer | 弧形线宽/圆角 |
| `arc_color` / `arc_opa` | color/int | 弧形颜色/不透明度 |
| `arc_image_src` | string/light-userdata | 弧形贴图 |
| `image_opa` / `image_recolor` / `image_recolor_opa` | int/color/int | 图片样式 |

### 文本

| 键 | 类型 | 说明 |
| --- | --- | --- |
| `text_color` / `text_opa` | color/int | 文本颜色/不透明度 |
| `text_font` | light-userdata | 字体（`Font()` 返回值） |
| `text_letter_space` / `text_line_space` | integer | 字符/行间距 |
| `text_decor` | integer | 文本装饰 |
| `text_align` | integer | 文本对齐 |

### 其他

| 键 | 类型 | 说明 |
| --- | --- | --- |
| `radius` / `clip_corner` | integer | 圆角/裁剪角 |
| `opa` | integer | 整体不透明度 |
| `color_filter_opa` | integer | 颜色滤镜不透明度 |
| `anim_time` | integer | 样式动画时长（ms） |
| `blend_mode` | integer | 混合模式 |
| `layout` | integer | 布局类型 |
| `base_dir` | integer | 文字方向（LTR/RTL） |

### 组合快捷属性

| 键 | 等效展开 |
| --- | --- |
| `size` | `width` + `height` |
| `pad_all` | `pad_top` + `pad_bottom` + `pad_left` + `pad_right` |
| `pad_ver` | `pad_top` + `pad_bottom` |
| `pad_hor` | `pad_left` + `pad_right` |
| `pad_gap` | `pad_row` + `pad_column` |

---

## 示例

```lua
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
```
