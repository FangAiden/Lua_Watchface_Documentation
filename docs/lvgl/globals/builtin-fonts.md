---
title: "内置字体"
description: "LVGL 内置字体"
tags: ["module:lvgl", "type:ref", "kind:globals"]
---

LVGL 提供了一组内置字体（`BUILTIN_FONT`），可直接使用而无需加载外部字体文件。  
这些字体基于 **Montserrat** 字体族，涵盖从小号到大号的多种字号，适合不同 UI 元素。

---

## 枚举表

| 值（字符串） | 说明 |
|------|------|
| **DEFAULT** | 默认字体（通常等价于 `MONTSERRAT_14`） |
| **MONTSERRAT_12** | 12 px 大小字体，适合小标签或紧凑 UI |
| **MONTSERRAT_12_SUBPX** | 12 px 次像素渲染版本（更平滑的边缘） |
| **MONTSERRAT_14** | 14 px 字体，常用于一般文本（默认） |
| **MONTSERRAT_16** | 16 px 字体，适合中等标题或主要标签 |
| **MONTSERRAT_18** | 18 px 字体，适合按钮或强调文字 |
| **MONTSERRAT_22** | 22 px 字体，适合二级标题 |
| **MONTSERRAT_24** | 24 px 字体，适合大标题或重要数值 |
| **MONTSERRAT_32** | 32 px 字体，适合主标题或仪表盘读数 |
