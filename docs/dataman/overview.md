# Dataman 模块

> 统一的数据订阅与分发模块。  
> 典型用途：订阅**时间/日出日落/区域状态/数值传感**等数据源，收到数据后驱动 UI 或动画（配合 `animengine`、`lvgl` 使用）。

---

## 模块结构

| 成员 | 类型 | 说明 |
|---|---|---|
| `dataman.subscribe(topic, handler \| opts)` | `function` | 订阅某个数据源（主题）。返回**订阅句柄**（token）。 |
| `dataman.pause(token)` | `function` | 暂停该订阅（保留状态，不再回调）。 |
| `dataman.resume(token)` | `function` | 恢复该订阅（继续回调）。 |

> **订阅句柄 token**：`dataman.subscribe(...)` 的返回值；用于精确地 `pause/resume` 指定订阅。

---

## subscribe

### 签名

```lua
-- 简写（字符串主题 + 回调）
local token = dataman.subscribe("topic.name", function(payload) ... end)

-- 完整（表参数）
local token = dataman.subscribe{
  topic   = "topic.name",
  cb      = function(payload) ... end,
  period  = 0,          -- (可选) 轮询/刷新周期（毫秒/秒，按平台实现）
  debounce= 0,          -- (可选) 去抖间隔
  distinct= true,       -- (可选) 仅在值变化时回调
  immediate = true,     -- (可选) 订阅后立即触发一次当前值
  on_error = function(err) ... end, -- (可选) 错误回调
}
```

### 回调 payload 约定（通用）

```lua
payload = {
  ts   = <number>      -- 时间戳（可选）
  value= <any>         -- 主题的主值（数值/布尔/表）
  meta = <table>       -- 附加信息（来源、单位、置信度等，可选）
}
```

> 实际字段会随主题不同而不同。下面的案例中给出了各主题常见结构。

---

## 生命周期与最佳实践

- 保存并管理 token：同一页面可能多个订阅，建议数组化统一管理。
- 页面切换/暂停：使用 `dataman.pause(token)` 暂停；恢复时 `dataman.resume(token)`。
- 与编辑态联动：若存在 `activity.isShown{ appID=..., pageID=... }` 的编辑状态，建议编辑模式下暂停订阅以减少无效回调与动画。

```lua
-- 统一管理
local subs = {}

local function addSub(token) subs[#subs+1] = token end
local function pauseAll() for _,t in ipairs(subs) do dataman.pause(t) end end
local function resumeAll() for _,t in ipairs(subs) do dataman.resume(t) end end
```

---

## 结合真实场景的可用案例

> 以下示例只聚焦 `dataman` 的调用与 `payload` 处理；动画部分可用你现有的 `animengine` 模板替换。

### 订阅日出/日落与当前太阳角（驱动白天/夜晚场景）

```lua
-- 订阅日出日落信息
local sunInfoToken = dataman.subscribe("astro.sun.info", function(p)
  -- 期望 payload：
  -- p.value = { sunriseHour=6, sunriseMinute=25, sunsetHour=18, sunsetMinute=12 }
  sunRiseHour, sunRiseMinute = p.value.sunriseHour, p.value.sunriseMinute
  sunSetHour,  sunSetMinute  = p.value.sunsetHour,  p.value.sunsetMinute
  -- 更新 UI（如显示/隐藏未知态占位图）
end)

-- 订阅当前太阳角（用于绘制/动画太阳与月亮）
local sunAngleToken = dataman.subscribe("astro.sun.angle", function(p)
  -- 期望 payload：p.value = <number> 0~360
  local angle = p.value
  angle = math.min(angle, 148) -- 例：根据你的业务限制上限
  -- 根据 angle 选择播放 Sun/Moon 动画（配合 animengine.start）
end)

-- 管理
addSub(sunInfoToken)
addSub(sunAngleToken)
```

**编辑态联动（可选）：**

```lua
local isEdit = activity.isShown{ appID = activity.APPID.WATCHFACE, pageID = 2 }
if isEdit then pauseAll() else resumeAll() end
```

---

### 订阅旋转角或进度（驱动圆形/指针旋转）

```lua
-- 订阅主题：圆形/指针角度（0~360）
local token = dataman.subscribe("ui.circle.angle", function(p)
  local angle = p.value or 0
  -- 用 angle 构造 animengine 旋转动画的 config，或直接设置对象旋转
end)

addSub(token)
```

---

### 订阅发光/缩放强度（驱动光晕、呼吸效果）

```lua
-- 订阅主题：光晕强度或图片缩放比例
local token = dataman.subscribe("ui.corona.intensity", function(p)
  -- 期望 payload：
  -- p.value = { zoom=1.15, opa=180, duration=1200 }
  local v = p.value or {}
  local zoom, opa, dur = v.zoom or 1.0, v.opa or 255, v.duration or 800

  -- 使用 animengine 组合缩放 + 透明度动画
  -- zoom -> img_zoom, opa -> 透明度
end)

addSub(token)
```

---

### 订阅区域状态（多属性复合动画/显隐）

```lua
-- 订阅主题：复杂区域状态（如天气、空气质量、活动状态）
local token = dataman.subscribe("zone.complex.state", function(p)
  -- 期望 payload：
  -- p.value = { visible=true, level=2, label="GOOD", color=0x00FF88 }
  local v = p.value or {}
  -- 根据 visible 控制对象显隐；根据 level/label/color 决定动效与风格
  -- 例如 level>=2 时播放强调动画，否则淡入静态显示
end, { distinct = true })

addSub(token)
```

---

### 进阶：按需暂停/恢复

```lua
-- 场景进入编辑模式
local function onEnterEdit()
  pauseAll()
  -- 同时停止动画（如果你也维护了 anim 列表）
end

-- 场景退出编辑模式
local function onExitEdit()
  resumeAll()
end
```

---

## 主题约定表（Topic Convention Table）

| 主题名称 | 数据格式 / 示例 | 更新频率 | 典型用途 | 备注 |
|-----------|-----------------|-----------|-----------|------|
| **astro.sun.info** | `{ sunriseHour=6, sunriseMinute=25, sunsetHour=18, sunsetMinute=12 }` | 日变化 | 日出 / 日落时间计算 | 与太阳角度 (`astro.sun.angle`) 搭配用于昼夜切换动画。 |
| **astro.sun.angle** | `45.5` (number，0~360°) | 每秒或分钟 | 当前太阳角位置 | 控制太阳/月亮在轨道上的旋转动画。 |
| **astro.moon.angle** | `180.0` (number) | 每秒或分钟 | 当前月亮角位置 | 夜间月相显示或阴影过渡动画。 |
| **ui.circle.angle** | `number` (0~360) | 高频（UI帧同步） | 圆形表盘、指针旋转 | 常配合 `animengine` 实现平滑指针。 |
| **ui.circle.progress** | `{ value=0.85, max=1.0 }` | 秒级 | 环形进度动画 | 适用于心率圈、步数圈等。 |
| **ui.corona.intensity** | `{ zoom=1.15, opa=180, duration=1200 }` | 动态 | 发光 / 呼吸动效 | 控制光晕类图层（Image Zoom + 透明度）。 |
| **zone.complex.state** | `{ visible=true, level=2, label="GOOD", color=0x00FF88 }` | 秒级 | 复合区域状态（空气质量/天气/活动等） | 用于高亮或隐藏区域组件。 |
| **zone.weather.info** | `{ temp=26, humidity=0.6, cond="Sunny" }` | 分钟级 | 环境信息更新 | 可驱动主题切换（日夜场景）。 |
| **sys.time** | `{ hour=12, minute=30, second=15 }` | 秒级 | 系统时间同步 | 常用于表盘时针/分针/秒针控制。 |
| **sys.battery** | `{ percent=0.82, charging=true }` | 30秒~1分钟 | 电量图标显示 | 可扩展电量动画（电量闪烁、进度条等）。 |
| **sys.activity** | `{ appID=2, pageID=1 }` | 状态变化时 | 当前活动页面 | 配合 `activity.isShown` 判断编辑态。 |
| **watchface.mode** | `"edit" / "normal"` | 状态切换时 | 表盘编辑模式 | 控制动画暂停或重启。 |
| **ui.anim.status** | `"running" / "paused" / "stopped"` | 内部事件 | 动画全局状态 | 可与 `dataman.pause/resume` 联动。 |

---

### 命名建议
| 类型 | 前缀建议 | 示例 |
|------|----------|------|
| 天文/时间数据 | `astro.` | `astro.sun.info`, `astro.sun.angle` |
| UI/动画数据 | `ui.` | `ui.circle.angle`, `ui.corona.intensity` |
| 系统状态数据 | `sys.` | `sys.time`, `sys.battery` |
| 区域/天气数据 | `zone.` | `zone.weather.info`, `zone.complex.state` |
| 应用/页面状态 | `activity.` / `watchface.` | `activity.state`, `watchface.mode` |

---

### 订阅策略建议
| 场景 | 推荐策略 |
|------|-----------|
| 高频变化（角度、旋转） | `distinct=false`, `debounce=0` |
| 慢速数据（日出、天气） | `distinct=true`, `period=60000` |
| 状态切换类（visible、mode） | `distinct=true`, `immediate=true` |
| 动画控制类（ui.anim.status） | `distinct=false`, `debounce=50` |

---

### 与动画联动（典型组合）

| 主题 | 动画属性 | 模板建议 |
|------|-----------|----------|
| `astro.sun.angle` | `rotate` | 旋转模板（Rotate） |
| `ui.corona.intensity` | `img_zoom` + `opa` | 缩放模板（Image Zoom） |
| `ui.circle.angle` | `rotate` | 指针旋转模板 |
| `zone.complex.state` | `x` + `opa` + `color` | 组合模板（Complex） |
| `sys.battery` | `img_zoom` | 闪烁/缩放动画 |
| `watchface.mode` | 动画组控制 | 调用 `anim:remove()` 或 `dataman.pause()` |

---

## 误用和排错

- **拿到 token 再 pause/resume**：`dataman.pause(token)` 只作用于该 token 对应的订阅
- 避免在回调里做**阻塞**操作（动画/图片解码放到异步或短时）
- 对 `payload` 做空值保护：`p` / `p.value` 可能为 `nil`
- 订阅过多时注意**去抖**/**去重**，避免 UI 抖动与高频重绘

---

## 小结

- `dataman` 是你的**数据驱动总线**，用订阅主题的方式触发 UI 更新和动画。
- 每个订阅函数都可以与 `animengine` 或 `lvgl` 控件直接交互。
- 配合 `activity` 模块，可实现完整的页面生命周期（暂停 / 恢复 / 编辑态控制）。

---

> **建议**：将所有订阅主题与回调集中定义在 `dataman_topics.lua` 或 `pageSubscribes.lua` 中，统一管理。这样在调试或迁移时不必逐文件查找订阅来源。