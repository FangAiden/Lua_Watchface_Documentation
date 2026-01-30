---
tags: ["module:lvgl", "type:ref", "kind:enum"]
---

# EVENT

| 常量 | 值 | 说明 |
|------|----|------|
| **ALL** | 0 | 匹配所有事件 |
| **PRESSED** | 1 | 对象被按下 |
| **PRESSING** | 2 | 按住持续触发 |
| **PRESS_LOST** | 3 | 按压状态丢失 |
| **SHORT_CLICKED** | 4 | 短按点击 |
| **LONG_PRESSED** | 5 | 长按触发 |
| **LONG_PRESSED_REPEAT** | 6 | 长按重复触发 |
| **CLICKED** | 7 | 点击完成 |
| **RELEASED** | 8 | 释放 |
| **SCROLL_BEGIN** | 9 | 开始滚动 |
| **SCROLL_END** | 11 | 滚动停止 |
| **SCROLL** | 12 | 滚动中 |
| **GESTURE** | 13 | 检测到手势 |
| **KEY** | 14 | 键盘/编码器输入 |
| **FOCUSED** | 16 | 获得焦点 |
| **DEFOCUSED** | 17 | 失去焦点 |
| **LEAVE** | 18 | 指针离开对象 |
| **HIT_TEST** | 19 | 命中测试 |
| **COVER_CHECK** | 21 | 覆盖检查 |
| **REFR_EXT_DRAW_SIZE** | 22 | 计算额外绘制区域 |
| **DRAW_MAIN_BEGIN** | 23 | 主区域绘制开始 |
| **DRAW_MAIN** | 24 | 主区域绘制中 |
| **DRAW_MAIN_END** | 25 | 主区域绘制结束 |
| **DRAW_POST_BEGIN** | 26 | 后绘制开始 |
| **DRAW_POST** | 27 | 后绘制中 |
| **DRAW_POST_END** | 28 | 后绘制结束 |
| **DRAW_PART_BEGIN** | 29 | 部分绘制开始 |
| **VALUE_CHANGED** | 30 | 值变化 |
| **INSERT** | 31 | 数据/文本插入 |
| **REFRESH** | 32 | 请求刷新 |
| **READY** | 33 | 动作完成 |
| **CANCEL** | 34 | 操作取消 |
| **DELETE** | 36 | 对象即将删除 |
| **CHILD_CHANGED** | 37 | 子对象变化 |
| **CHILD_CREATED** | 38 | 子对象创建 |
| **CHILD_DELETED** | 39 | 子对象删除 |
| **SCREEN_UNLOAD_START** | 40 | 屏幕开始卸载 |
| **SCREEN_LOAD_START** | 41 | 屏幕开始加载 |
| **SCREEN_LOADED** | 42 | 屏幕加载完成 |
| **SCREEN_UNLOADED** | 43 | 屏幕卸载完成 |
| **SIZE_CHANGED** | 44 | 对象大小变化 |
| **STYLE_CHANGED** | 45 | 样式变化 |
| **LAYOUT_CHANGED** | 46 | 布局更新 |
| **GET_SELF_SIZE** | 47 | 请求计算自身大小 |
