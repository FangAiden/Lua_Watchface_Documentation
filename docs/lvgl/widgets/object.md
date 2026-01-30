---
title: "Object"
description: "LVGL 对象系统（LuaVGL 基类）"
tags: ["module:lvgl", "widget", "object", "base"]
---
# Object

所有控件的基类。

## 创建

```lua
local obj = lvgl.Object(parent, {
  w = 100, h = 60,
  align = { type = lvgl.ALIGN.CENTER }
})
```

## 属性（`obj:set{}` / 创建时传入）

| 属性 | 类型 | 说明 |
|------|------|------|
| `x`, `y` | integer | 坐标 |
| `w`, `h` | integer | 尺寸。`lvgl.SIZE_CONTENT` 自适应 |
| `align` | enum / table | `lvgl.ALIGN.*` 或 `{ type, x_ofs, y_ofs }` |
| `bg_color` | integer | 背景色 `0xRRGGBB` |
| `bg_opa` | integer | 背景不透明度 0–255 |
| `bg_img_src` | string | 背景图路径 |
| `radius` | integer | 圆角。`lvgl.RADIUS_CIRCLE` 满圆角 |
| `border_width` | integer | 边框宽度 |
| `border_color` | integer | 边框颜色 |
| `outline_width` | integer | 轮廓宽度 |
| `outline_color` | integer | 轮廓颜色 |
| `outline_pad` | integer | 轮廓间距 |
| `shadow_width` | integer | 阴影宽度 |
| `shadow_color` | integer | 阴影颜色 |
| `shadow_opa` | integer | 阴影不透明度 |
| `shadow_ofs_x`, `shadow_ofs_y` | integer | 阴影偏移 |
| `opa` | integer | 整体不透明度 0–255 |
| `pad_all` | integer | 四方向内边距 |
| `pad_top`, `pad_bottom`, `pad_left`, `pad_right` | integer | 单方向内边距 |
| `pad_row`, `pad_column` | integer | 行/列间距（Flex/Grid） |
| `text_color` | integer | 文字颜色 |
| `transform_angle` | integer | 旋转角度（单位 0.1°，450 = 45°） |
| `transform_zoom` | integer | 缩放（256 = 1x，512 = 2x） |
| `clip_corner` | boolean | 裁剪圆角溢出 |
| `blend_mode` | integer | 混合模式 |
| `hidden` | boolean | 隐藏 |
| `scrollable` | boolean | 可滚动 |
| `flag_scrollable` | boolean | 滚动标志开关 |

## 方法

| 方法 | 说明 |
|------|------|
| `Anim` / `anim` | 创建动画 |
| `add_flag` | 添加标志位 |
| `add_state` | 添加状态 |
| `add_style` | 添加样式 |
| `align_to` | 相对于其他对象对齐 |
| `center` | 将对象居中 |
| `clean` | 删除所有子对象 |
| `clear_flag` | 清除标志 |
| `clear_state` | 清除状态 |
| `delete` | 删除对象及其子对象 |
| `get_child` | 获取指定索引的子对象 |
| `get_child_cnt` | 获取子对象数量 |
| `get_coords` | 获取绘制区域坐标 |
| `get_parent` | 获取父对象 |
| `get_pos` | 获取实际位置 |
| `get_screen` | 返回所属屏幕对象 |
| `get_state` | 获取当前状态值 |
| `indev_search` | 根据坐标查找命中对象 |
| `invalidate` | 标记对象重绘 |
| `is_editable` | 判断是否可编辑 |
| `is_group_def` | 判断是否为焦点组默认对象 |
| `is_layout_positioned` | 判断是否参与布局定位 |
| `is_scrolling` | 判断是否正在滚动 |
| `is_visible` | 判断是否可见 |
| `mark_layout_as_dirty` | 标记布局需重新计算 |
| `onPressed` | 绑定按下事件回调 |
| `onClicked` | 绑定点击事件回调 |
| `onevent` | 注册指定事件回调 |
| `parent` | 获取/设置父对象 |
| `readjust_scroll` | 重新调整滚动位置 |
| `remove_all_anim` | 移除所有动画 |
| `remove_style` | 移除指定样式 |
| `remove_style_all` | 移除所有样式 |
| `scroll_by` | 按偏移滚动 |
| `scroll_by_bounded` | 有边界的滚动 |
| `scroll_by_raw` | 原始滚动（无动画） |
| `scroll_to` | 滚动到指定坐标 |
| `scroll_to_view` | 滚动到当前可见区域 |
| `scroll_to_view_recursive` | 递归滚动到可见区域 |
| `scrollbar_invalidate` | 刷新滚动条显示 |
| `set` | 批量设置属性 |
| `set_flex_align` | 设置 Flex 对齐方式 |
| `set_flex_flow` | 设置 Flex 布局方向 |
| `set_flex_grow` | 设置 Flex 伸展比例 |
| `set_parent` | 设置父对象 |
| `set_style` | 批量设置样式属性 |

## 示例

```lua
local obj = lvgl.Object(nil, {
  w = 200, h = 120,
  align = { type = lvgl.ALIGN.CENTER },
  bg_color = 0x00AAFF,
  radius = 8,
})

obj:onClicked(function()
  print("Clicked!")
end)

obj:Anim {
  run = true,
  start_value = 0,
  end_value = 200,
  duration = 1000,
  exec_cb = function(obj, v)
    obj:set({ x = v })
  end
}
```
