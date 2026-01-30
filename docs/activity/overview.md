---
tags: ["module:activity", "type:overview"]
---

# activity

> 页面状态管理，检测编辑模式与显示状态。

## `activity.isShown(opts)`

```lua
local editing = activity.isShown {
    appID = activity.APPID.WATCHFACE,
    pageID = 2
}
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `opts.appID` | `number` | 应用 ID |
| `opts.pageID` | `number` | 页面 ID |

**返回值**：`boolean`

## APPID

| 常量 | 值 |
|------|----|
| `activity.APPID.WATCHFACE` | `2` |
| `activity.APPID.LUA` | `56` |

## 生命周期模式

```lua
local lastEdit = false
lvgl.Timer {
    period = 200,
    cb = function(t)
        local editing = activity.isShown {
            appID = activity.APPID.WATCHFACE, pageID = 2
        }
        if editing and not lastEdit then pageOnPause() end
        if not editing and lastEdit then pageOnResume() end
        lastEdit = editing
    end
}

function pageOnPause()
    for _, a in ipairs(ui.anims or {}) do a:remove() end
    ui.anims = {}
    for _, token in ipairs(ui.tokens or {}) do dataman.pause(token) end
end

function pageOnResume()
    for _, token in ipairs(ui.tokens or {}) do dataman.resume(token) end
end
```
