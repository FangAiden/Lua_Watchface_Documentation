---
tags: ["module:navigator", "type:overview"]
---

# Navigator 模块

> 页面导航与返回控制模块。  
> 用于在应用内部统一处理页面切换、关闭、返回等逻辑。  
> 常见于表盘页面、活动页面、设置页之间的跳转与结束。

---

## 模块结构

| 成员 | 类型 | 说明 |
|---|---|---|
| `navigator.finish()` | `function` | 结束当前页面或返回上一级页面。 |

> 模块树中仅定义了 `finish()` 方法；其余导航行为由系统或框架自动管理。  
> 该模块主要提供“退出当前场景”或“返回上一级”的通用接口。

---

## API

### `navigator.finish()`

结束当前页面（或活动），并返回到上一级界面。  
常用于：
- 用户点击“返回”按钮；
- 动作完成后自动关闭当前界面；
- 动画或弹窗结束后退出场景。

#### 语法

```lua
navigator.finish()
```

---

## 示例

```lua
-- 按钮回调中关闭当前页面
btn_back:onClick(function()
  navigator.finish()
end)

-- 操作完成后自动退出
local function onSaveSuccess()
  vibrator.start(vibrator.type.SUCCESS)
  navigator.finish()
end
```

---

## 使用场景

| 场景            | 示例                                   |
| ------------- | ------------------------------------ |
| **设置页面返回表盘**  | 用户修改设置后点击返回，调用 `navigator.finish()`。 |
| **弹窗关闭**      | 弹窗确认或取消后退出弹窗层。                       |
| **任务完成自动退出**  | 完成运动、呼吸训练、健康任务后退出活动页面。               |
| **动画结束回到主界面** | 动画播放完后执行返回逻辑。                        |

---

## 与其他模块的协同

- `vibrator` **模块**：在页面退出时配合震动反馈。

```lua
vibrator.start(vibrator.type.SYSTEM_OPRATION)
navigator.finish()
```

- `dataman` **模块**：订阅数据状态变化，在特定条件触发退出。

```lua
local token = dataman.subscribe("sys.activity", function(p)
  if p.value.pageID == 0 then
    navigator.finish()
  end
end)
```

- `screen` **模块**：在息屏或超时后自动退出。

```lua
screen.on("off", function()
  navigator.finish()
end)
```

---

## 最佳实践

- **统一返回逻辑**：所有返回/关闭操作建议通过 `navigator.finish()` 实现，保持一致性。
- **资源清理**：在退出前先释放动画、订阅、定时器等资源。
- **用户体验**：退出前可结合震动或过渡动画，提示页面关闭。
- **状态判断**：确保仅在安全状态下调用（例如操作未中断、数据已保存）。

```lua
-- 退出前清理
local function safeExit()
  pauseAll()
  dataman.pauseAll()
  animator.stopAll()
  navigator.finish()
end
```
