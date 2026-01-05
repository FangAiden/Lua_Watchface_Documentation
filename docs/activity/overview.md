---
tags: ["module:activity", "type:overview"]
---

# Activity 模块

> 应用与页面状态管理模块。  
> 用于判断当前页面是否显示、是否处于编辑模式（例如表盘编辑模式），  
> 以及在多页面环境下协调动画 (`animengine`) 和数据订阅 (`dataman`) 的暂停与恢复。

---

## 模块结构

| 成员 | 类型 | 说明 |
|------|------|------|
| `activity.APPID` | `table` | 应用 ID 集合。 |
| `activity.APPID.LUA` | `number` | Lua 应用 ID（一般用于动态页面）。 |
| `activity.APPID.WATCHFACE` | `number` | 表盘应用 ID。 |
| `activity.isShown(opts)` | `function` | 判断指定应用/页面是否当前显示。 |

---

## 函数说明

### `activity.isShown(opts)`

#### **说明**
判断指定 `appID` 和 `pageID` 的页面是否正在显示。  
可用于识别是否处于编辑模式、是否需要暂停动画或数据刷新。

#### **函数签名**
```lua
activity.isShown({
    appID = <number>,
    pageID = <number>
}) -> boolean
```

**参数**

| 名称       | 类型       | 说明                                |
| -------- | -------- | --------------------------------- |
| `appID`  | `number` | 应用标识符，通常使用 `activity.APPID` 下的常量。 |
| `pageID` | `number` | 页面 ID（某应用内的具体页面）。                 |

**返回值**

| 类型        | 说明                              |
| --------- | ------------------------------- |
| `boolean` | 若页面正在显示则返回 `true`，否则返回 `false`。 |

---

## 使用场景与最佳实践

### 表盘编辑模式判断

```lua
local isWatchfaceEdit = activity.isShown {
    appID = activity.APPID.WATCHFACE,
    pageID = 2
}

if isWatchfaceEdit then
    print("当前处于表盘编辑模式")
else
    print("当前处于正常显示模式")
end
```

> 应用案例：当检测到编辑模式时，会暂停所有动画与数据订阅。

### 联动 `dataman` 与 `animengine`

> 常用于在编辑态暂停动画、恢复正常态播放动画。

```lua
local function activityIsShown()
    if activity == nil or activity.APPID == nil then return end

    local isWatchfaceEdit = activity.isShown {
        appID = activity.APPID.WATCHFACE,
        pageID = 2
    }

    -- 定时检测表盘编辑态
    local timer = lvgl.Timer {
        period = 200,
        cb = function()
            local editing = activity.isShown {
                appID = activity.APPID.WATCHFACE,
                pageID = 2
            }

            if editing then
                pageOnPause()   -- 暂停动画 & 数据订阅
            else
                pageOnResume()  -- 恢复动画 & 数据订阅
            end
        end
    }
end
```

**相关函数参考**

- `pageOnPause()`：自定义函数，用于停止动画 (`animengine`) 与暂停订阅 (`dataman.pause`)。
- `pageOnResume()`：恢复被暂停的动画和数据订阅。

---

### 与应用场景结合

```lua
if activity.isShown{ appID = activity.APPID.WATCHFACE, pageID = 2 } then
    -- 编辑模式下，不启动太阳/月亮动画
    return
end

StartSunAnimation(obj, template, angleStart, angleEnd, duration)
```

> 在昼夜场景动画中，编辑模式通常意味着用户正在调整表盘外观，<br />因此不应播放太阳轨迹动画或天气动态动画。

---

### 动态页面显示判断（多 appID 支持）

```lua
-- 示例：判断是否显示 Lua 应用页面
if activity.isShown{ appID = activity.APPID.LUA, pageID = 1 } then
    print("Lua 应用页面正在显示")
end
```

---

## APPID 约定表

| 常量名                        | 值    | 描述                   |
| -------------------------- | ---- | -------------------- |
| `activity.APPID.LUA`       | `56` | 通用 Lua 页面（可自定义界面逻辑）。 |
| `activity.APPID.WATCHFACE` | `2`  | 表盘应用。常用于判断是否在编辑模式中。  |

> 后续如有扩展应用，可增加 APPID.\<模块名\> 常量，例如：
```lua 
activity.APPID.SETTINGS = 10
activity.APPID.HEALTH = 11
```

---

## 生命周期控制模板

推荐在每个页面实现统一生命周期函数：

```lua
-- 页面暂停（编辑模式进入）
function pageOnPause()
    for _, a in ipairs(ui.animations or {}) do a:remove() end
    dataman.pauseAll()
    print("Page paused")
end

-- 页面恢复（退出编辑模式）
function pageOnResume()
    dataman.resumeAll()
    print("Page resumed")
end
```

> 建议配合 `lvgl.Timer` 轮询 `activity.isShown()` 状态进行管理。

---

## 模块交互关系

```lua
┌────────────────────┐
│   activity         │
│  └─ isShown()      │
│     ↓              │
│     状态检测        │
└──────┬─────────────┘
       │
       │ 触发暂停/恢复
       ▼
┌────────────────────┐
│   dataman          │
│  ├─ subscribe()    │
│  ├─ pause()        │
│  └─ resume()       │
└────────────────────┘
       │
       ▼
┌────────────────────┐
│   animengine       │
│  ├─ create()       │
│  ├─ start()        │
│  └─ remove()       │
└────────────────────┘
```

---

## 开发建议

- 始终检查 `activity.isShown()`，确保动画与数据订阅只在显示状态下运行；
- 在页面退出或进入编辑态时：
  - 调用 `dataman.pause(token)`；
  - 调用动画对象的 `:remove()`；
- 在恢复显示时：
  - 调用 `dataman.resume(token)`；
  - 重新启动 `animengine` 动画。

---

## 示例汇总

```lua
-- 表盘活动检测示例
if activity.isShown{ appID = activity.APPID.WATCHFACE, pageID = 2 } then
    dataman.pauseAll()
else
    dataman.resumeAll()
end

-- 动画与数据驱动结合
if not activity.isShown{ appID = activity.APPID.WATCHFACE, pageID = 2 } then
    local anim = animengine.create(ui.sun, config)
    anim:start()
end
```

---

## 模块总结

| 功能     | 描述                                 |
| ------ | ---------------------------------- |
| 状态检测   | 判断指定应用/页面是否当前显示                    |
| 编辑模式识别 | 检测是否处于表盘编辑态                        |
| 生命周期管理 | 与 `dataman`、`animengine` 协同控制暂停/恢复 |
| 扩展性    | 可通过 `APPID` 扩展多应用页面状态检测            |

> Tip：<br/>若项目包含多个可交互页面（如天气、健康、设置），<br/>可在每个页面入口检测自身 appID/pageID 状态，<br/>从而实现统一的前后台管理逻辑。<br/>
