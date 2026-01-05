---
tags: ["module:lvgl", "type:ref", "kind:enum"]
---

# SCROLLBAR_MODE 枚举

`SCROLLBAR_MODE` 用于控制对象滚动条（Scrollbar）的显示和隐藏逻辑。  
适用于所有支持滚动的控件（如 `lv_page`、`lv_list`、`lv_textarea` 等）。

---

## 枚举表

| 常量 | 值 | 说明 |
|------|----|------|
| **OFF** | 0 | 永不显示滚动条（即使内容超出范围） |
| **ON** | 1 | 始终显示滚动条，无论是否需要 |
| **ACTIVE** | 2 | 仅在滚动过程中显示滚动条，滚动停止后自动隐藏 |
| **AUTO** | 3 | 当内容超出边界时自动显示，内容适配时隐藏（推荐默认） |
