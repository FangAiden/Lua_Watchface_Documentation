---
title: "LABEL 枚举"
description: "LVGL Enum: LABEL"
tags: ["module:lvgl", "type:ref", "kind:enum"]
---

`LABEL_MODE` 定义了标签（`lv_label`）在文本内容超出显示范围时的显示方式。  
不同模式可用于控制是否自动换行、滚动显示或截断文字。

---

## 枚举表

| 常量 | 值 | 说明 |
|------|----|------|
| **LONG_WRAP** | 0 | 自动换行。当文字超出标签宽度时，会自动在下一行继续显示 |
| **LONG_DOT** | 1 | 当文字太长时，在末尾显示 `...` 省略号 |
| **LONG_SCROLL** | 2 | 文字自动水平滚动（从右向左） |
| **LONG_SCROLL_CIRCULAR** | 3 | 循环滚动模式，滚动到末尾会从头接上继续滚动 |
| **LONG_CLIP** | 4 | 超出部分直接裁剪，不显示超出标签范围的文字 |
