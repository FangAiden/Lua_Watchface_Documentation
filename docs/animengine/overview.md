# Animengine 模块

---

## 概述

轻量动画引擎封装。用于为任意 `lvgl` 对象创建并驱动属性动画。

**已确认可用** API 仅包含本文列出的函数与方法；不额外假设未在工程中出现的能力。

---

## 模块概览

```lua
-- 模块表
animengine = {
  create = <function>,  -- 创建动画
}
```

**返回的动画实例（userdata）提供的方法：**

- `anim:start()` 开始播放动画
- `anim:remove()` 移除/销毁该动画（停止并释放资源）

> 以上方法已在项目代码中多处使用并验证：`anim:start()` 与 `anims:remove()`（数组遍历移除）模式。

---

## 快速上手

1. **准备动画配置（字符串）**

项目中采用「模板 + `string.format`」方式构建配置字符串：

```lua
local function BuildConfig(template, startVal, endVal, duration)
  local config = string.format(template, startVal, endVal, duration)
  return config
end
```

> 你可以维护一段模板（`template`），把起始值、结束值、时长等占位参数拼进配置字符串中，再传给 `animengine.create`。

2. **创建并启动动画**

```lua
local config = BuildConfig(template, fromValue, toValue, durationMs)
local anim = animengine.create(targetObject, config)
anim:start()
```

3. **批量移除已有动画（常见清理模式）**

```lua
if #ui.animSuns ~= 0 then
  for _, a in ipairs(ui.animSuns) do
    a:remove()
  end
  ui.animSuns = {}
end
```

---

## API 说明

`animengine.create(object, configString) -> anim`

- **参数**
  - `object`：`lvgl` 对象实例（任意可供属性变更的控件/容器等）。
  - `configString`：字符串。动画配置文本。项目中以模板 + `string.format` 方式生成。
- **返回**
  - `anim`：动画句柄（userdata）。
- **用法要点**
  - `configString` 的字段约定由引擎侧实现决定；当前工程里通过模板占位注入 `startVal`、`endVal`、`duration` 等关键值。
  - 创建后需调用 `anim:start()` 才会实际播放。

---

## 动画实例方法

`anim:start()`

- 启动/重启动画。

`anim:remove()`

- 停止并移除动画，释放与之关联的资源。
- 常与数组容器配合做批量清理（见「快速上手 / 3」）。

---

## 实战片段

**以「太阳/月亮」指示器为例**

```lua
local function StartSunAnimation(object, template, startVal, endVal, duration)
  if isWatchfaceEdit then return end

  -- 先清掉已有的同类动画
  if #ui.animSuns ~= 0 then
    for _, anims in ipairs(ui.animSuns) do
      anims:remove()
    end
    ui.animSuns = {}
  end

  -- 构建配置并创建动画
  local config = BuildConfig(template, startVal, endVal, duration)
  local anim = animengine.create(object, config)
  ui.animSuns[#ui.animSuns + 1] = anim
  anim:start()
end
```

> 同样的模式也用于「月亮」相关动画与其它场景：**创建前清理旧动画** → **生成配置** → `create` → `start`。

---

## 配置模板建议（实践指引）

虽然动画配置的解析由底层引擎决定，项目里已形成以下**通用模板约定**（供你编写模板时参考）：

- 起止值：`from` / `to`（或模板中对应位置的 `%s` 占位）
- 时长：`duration`（毫秒）
- 延迟（如需要）：`delay`
- 循环/往返（如需要）：`repeat`/`yoyo`
- 目标属性：`property`（例如 `"angle"`, `"x"`, `"y"`, `"opa"`, `"scale"` 等）
- 缓动（如需要）：`easing`（例如 `"linear"`, `"easeInOut"` …）

> 以上键名仅为**撰写模板时的推荐命名**，请保持与引擎实际解析端一致。当前仓库代码里通过 `string.format(template, startVal, endVal, duration)` 填充**至少**包含起止与时长的三个位置参数。

**示例模板（伪）：**

```lua
local template = [[
{
  "property":"angle",
  "from":%s,
  "to":%s,
  "duration":%s
}
]]
```

### 通用配置键说明

| 键                    | 类型       | 说明                          |
| -------------------- | -------- | --------------------------- |
| `fromState`          | `object` | 动画起始属性状态（例如旋转角度、缩放比例等）      |
| `toState`            | `object` | 动画结束属性状态                    |
| `config.duration`    | `number` | 动画持续时间（秒或毫秒，视引擎实现而定）        |
| `config.delay`       | `number` | 延迟开始时间                      |
| `config.ease`        | `array`  | 缓动曲线，如 `["linear",5.0]`     |
| `config.interations` | `string` | 动画循环次数 `"1"`、`"infinite"` 等 |
| `config.minVisible`  | `number` | （可选）最小可见值，常用于缩放/透明度动画       |

---

### 常用动画模板示例

#### ① 旋转动画（Rotate）

```lua
local rotateTemplate = [[
{
  "fromState": {"rotate": %d},
  "toState": {"rotate": %d},
  "config": {"duration": %f, "ease": ["linear", 5.0]}
}
]]
local cfg = string.format(rotateTemplate, 0, 360, 5.0)
local anim = animengine.create(target, cfg)
anim:start()
```

> 常用于图标旋转、太阳/月亮轨迹、指针运动。

---

#### ② 缩放动画（Image Zoom）

```lua
local zoomTemplate = [[
{
  "fromState": {"img_zoom": {"value": 1, "ease": ["linear",5.0]}},
  "toState": {"img_zoom": {"value": %f, "delay": %d, "duration": %d, "ease": ["linear",5.0]}},
  "config": {"delay":3}
}
]]
local cfg = string.format(zoomTemplate, 1.2, 0, 4000)
local anim = animengine.create(imageObj, cfg)
anim:start()
```

> 用于发光特效、渐现、气泡等。

---

#### ③ 位移动画（Translate）

```lua
local moveTemplate = [[
{
  "fromState": {"x": %d, "y": %d},
  "toState": {"x": %d, "y": %d},
  "config": {"duration": %f, "ease": ["easeInOut",3.0]}
}
]]
local cfg = string.format(moveTemplate, 0, 0, 50, 20, 2.0)
local anim = animengine.create(obj, cfg)
anim:start()
```

> 常用于元素进场/退场动画。

---

#### ④ 透明度动画（Opacity）

```lua
local opaTemplate = [[
{
  "fromState": {"opa": 0},
  "toState": {"opa": 255},
  "config": {"duration": %f, "ease": ["linear",1.0]}
}
]]
local cfg = string.format(opaTemplate, 1.0)
local anim = animengine.create(obj, cfg)
anim:start()
```

> 可用于淡入淡出、场景切换或组件显示控制。

---

#### ⑤ 组合动画（复杂多属性）

```lua
local complexTemplate = [[
{
  "fromState": {"x": 0, "opa": 0, "rotate": 0},
  "toState": {"x": 100, "opa": 255, "rotate": 360},
  "config": {"duration": %f, "ease": ["easeInOut",3.0]}
}
]]
local cfg = string.format(complexTemplate, 4.0)
local anim = animengine.create(widget, cfg)
anim:start()
```

> 同时控制多个属性，实现复合动效。

---

### 动画生命周期与管理

| 场景                    | 推荐操作                                      |
| --------------------- | ----------------------------------------- |
| 创建新动画前                | 遍历并调用 `:remove()` 清除旧动画                   |
| 页面暂停或切换               | 移除/停止当前动画组                                |
| 编辑模式（isWatchfaceEdit） | 避免创建新动画                                   |
| 动画句柄管理                | 存放在全局表中，如 `ui.animSuns`, `ui.animMoons` 等 |

```lua
for _, a in ipairs(ui.animMoons) do
    a:remove()
end
ui.animMoons = {}
```

---

## 常见模式与最佳实践

- **避免叠加**：创建新动画前，优先 `:remove()` 旧实例，防止同一对象/同一属性叠加驱动。
- **状态守卫**：在编辑模式等特殊状态（如 `isWatchfaceEdit`）下不启动动画，减少干扰与性能浪费。
- **集中管理**：将同类动画放进数组（如 `ui.animSuns`），便于统一清理与生命周期控制。
- **模板复用**：将不同对象但动画结构相同的配置写成可复用模板，仅注入差异化参数。

---

## 约束与声明

- 本文档仅收录在工程代码中已出现并验证的 `animengine` 能力：`create()` + 动画实例的 `start()`、`remove()`。
- 如需扩展（暂停/恢复/进度设定/回调等），请以引擎实现为准，或在模板中添加引擎支持的字段后自行验证。
