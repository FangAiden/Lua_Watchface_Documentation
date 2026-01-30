---
tags: ["module:animengine", "type:overview"]
---

# animengine

> JSON 配置驱动的 LVGL 属性动画引擎。

## `animengine.create(object, configString)`

```lua
local anim = animengine.create(targetObj, jsonConfig)
anim:start()
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `object` | `userdata` | LVGL 对象 |
| `configString` | `string` | JSON 动画配置 |

**返回值**：动画实例（userdata）

| 方法 | 说明 |
|------|------|
| `anim:start()` | 启动动画 |
| `anim:remove()` | 停止并销毁 |
| `anim:modify(json)` | 修改参数（传入新的 JSON 配置字符串） |

## 可动画属性

以下属性已验证可用，支持同时动画多个属性（如 `x` + `y` 同时运动）：

| 属性 | 说明 |
|------|------|
| `x` | 水平位置 |
| `y` | 垂直位置 |
| `rotate` | 旋转角度 |
| `opacity` | 透明度 |
| `scale` | 缩放 |

## JSON 配置格式

| 键 | 类型 | 说明 |
|----|------|------|
| `fromState` | `object` | 起始属性 |
| `toState` | `object` | 结束属性 |
| `config.duration` | `number` | 持续时间（秒，float） |
| `config.delay` | `number` | 延迟时间（秒，float） |
| `config.easing` | `string` | 缓动函数 |
| `config.interations` | `string` | 循环次数（注意拼写） |

### easing 缓动函数

| 值 | 说明 |
|----|------|
| `"linear"` | 线性 |
| `"ease_in"` | 缓入 |
| `"ease_out"` | 缓出 |
| `"ease_in_out"` | 缓入缓出 |
| `"spring"` | 弹性 |

### interations 循环次数

| 值 | 说明 |
|----|------|
| `"0"` | 不循环 |
| `"1"` | 播放一次 |
| `"2"` | 播放两次 |
| `"-1"` | 无限循环 |
| `"loop"` | 无限循环 |
| `"once"` | 播放一次 |
| `"infinite"` | 无限循环 |
| _(省略)_ | 默认行为 |

:::caution JSON 格式注意
JSON 必须是单行或正确格式化的字符串。包含字面换行符的多行 JSON 可能导致解析错误。
使用 Lua 多行字符串 `[[ ]]` 时需注意格式。
:::

## 旋转模板

```lua
local tpl = [[
    {
        "fromState": { "rotate": %d },
        "toState": { "rotate": %d },
        "config": { "duration": %f, "interations": "1" }
    }
]]
local anim = animengine.create(obj, string.format(tpl, 0, 360, 0.1))
anim:start()
```

## 多属性动画示例

```lua
local tpl = [[
    {
        "fromState": { "x": 0, "y": 0 },
        "toState": { "x": 100, "y": 50 },
        "config": { "duration": 1.0, "easing": "ease_in_out", "delay": 0.5 }
    }
]]
local anim = animengine.create(obj, string.format(tpl))
anim:start()
```

## 缩放模板

```lua
local tpl = [[
    {
        "fromState": {
            "img_zoom": { "value": 1, "ease": ["linear", 5.0], "minVisible": 0.01 }
        },
        "toState": {
            "img_zoom": { "value": %f, "delay": %d, "duration": %d, "ease": ["linear", 5.0], "minVisible": 0.01 }
        },
        "config": { "ease": ["linear", 5.0], "delay": 3 }
    }
]]
local anim = animengine.create(img, string.format(tpl, 1.3, 0, 400))
anim:start()
```
