---
title: "Keyboard"
description: "LVGL 屏幕键盘（本绑定仅提供基础创建与通用 Object 能力）"
tags: ["module:lvgl", "type:ref", "kind:widget"]
---

# Keyboard

继承自：[`Object`](./object.md)

> 说明  
> 该控件当前绑定仅提供**创建**与 **Object 的通用方法/样式设置**。源码里没有导出额外的键盘专属方法（如设置关联的 Textarea、切换键盘布局等 API 未暴露）。  
> 你可以把它当作一个普通对象来布局、设置样式。

---

## 创建

```lua
-- parent 可为 nil（加到当前屏幕）或任意父对象
local kb = lvgl.Keyboard(nil, {
    x = 0,
    y = 160,
    w = lvgl.HOR_RES(),
    h = 120,
    -- 下面这些都是 Object 的通用属性/样式
    bg_color = lvgl.color_hex(0x202020),
    border_width = 1,
    border_color = lvgl.color_hex(0x404040),
})
```

参数：

| 参数名      | 类型               | 说明                       |
| -------- | ---------------- | ------------------------ |
| `parent` | `Object` | `nil` | 父对象；`nil` 时添加到当前活动屏幕     |
| `{}`     | `table`          | 属性表（使用 **Object** 的通用属性） |

---

## 特有 Methods

> **无**
> 当前绑定没有导出任何 Keyboard 专属方法；你可以使用 Object 的通用方法（如 `set`, `get`, `align_to`, `center`, `add_flag`, `set_style` 等）。

---

## 常用（继承自 Object）

- `set(tbl)`：设置属性/样式（见 Object.md 的属性说明）
- `get(key)`：读取属性（限已绑定到属性系统的键）
- 布局/尺寸/对齐：`center`, `align_to`, `set_flex_flow`, `set_flex_align`, `w/h/x/y` 等
- 样式：`set_style`, `add_style`, `remove_style(_all)`
- 滚动、可见性、标志位：`scroll_*`, `is_visible`, `add_flag`, `clear_flag` …

---

## 示例

```lua
-- 简单放到底部的全宽键盘
local kb = lvgl.Keyboard(nil, {
    y = lvgl.VER_RES() - 120,
    w = lvgl.HOR_RES(),
    h = 120,
    bg_color = lvgl.color_hex(0x1a1a1a),
    border_width = 1,
})

-- 作为普通对象参与布局（示例：放到容器底部）
local container = lvgl.Object(nil, {
    w = lvgl.HOR_RES(),
    h = lvgl.VER_RES(),
})
container:set_flex_flow(lvgl.FLEX_FLOW.COLUMN)
container:set_flex_align(lvgl.FLEX_ALIGN.START, lvgl.FLEX_ALIGN.START, lvgl.FLEX_ALIGN.END)

kb:set_parent(container)  -- 继承自 Object 的通用方法
```

---

## 注意事项

- 由于未导出键盘与 Textarea 的关联设置接口（例如“将键盘绑定到某个 Textarea”），目前只能将键盘当作普通可视组件来布局与美化。
- 如果后续版本导出更多 Keyboard 专属 API，本页会同步补充。