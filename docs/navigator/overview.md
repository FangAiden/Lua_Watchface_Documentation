---
tags: ["module:navigator", "type:overview"]
---

# navigator

> 页面导航与返回。

## `navigator.finish()`

结束当前页面，返回上一级。

```lua
navigator.finish()
```

```lua
-- 清理后退出
for _, a in ipairs(ui.anims or {}) do a:remove() end
for _, token in ipairs(ui.tokens or {}) do dataman.pause(token) end
navigator.finish()
```
