---
tags: ["module:vibrator", "type:overview"]
---

# Vibrator 模块

> 统一的触觉反馈（震动）接口。  
> 典型用途：系统事件提示、UI 交互反馈、来电/闹钟/通知等场景。

---

## 模块结构

| 成员 | 类型 | 说明 |
|---|---|---|
| `vibrator.start(kind \[, opts])` | `function` | 启动一次震动或内置震动模式。`kind` 为模式编号或枚举值。 |
| `vibrator.cancel()` | `function` | 立刻停止当前震动（若支持可停止持续/循环模式）。 |
| `vibrator.type` | `table` | 震动类型枚举（见下文）。 |

> 注：上面的结构来自模块树快照；不同平台固件可能对细节有轻微差异。

---

## 震动类型枚举（`vibrator.type`）

| 枚举名 | 值 | 典型用途 |
|---|---:|---|
| `NONE` | `0` | 不震动（占位） |
| `CROWN` | `1` | 旋钮/表冠细微刻度反馈 |
| `KEY_BOARD` | `2` | 按键点击（轻触） |
| `WATCH_FACE` | `3` | 表盘轻触/进入 |
| `SUCCESS` | `4` | 成功提示（完成、保存成功） |
| `FAILED` | `5` | 失败/错误提示 |
| `SYSTEM_OPRATION` | `6` | 系统操作（返回、抽屉开合等） |
| `HEALTH_ALERT` | `7` | 健康告警（心率、久坐提醒等） |
| `SYSTEM_EVENT` | `8` | 系统事件（模式切换、连接状态） |
| `NOTIFICATION` | `9` | 普通通知 |
| `TARGET_DONE` | `10` | 目标达成/成就 |
| `BREATHING_TRAINING` | `11` | 呼吸训练节拍 |
| `INCOMING_CALL` | `12` | 来电震动（通常为持续/循环） |
| `CLOCK_ALARM` | `13` | 闹钟 |
| `SLEEP_ALARM` | `14` | 睡眠唤醒/轻柔闹钟 |

> 说明：以上为内置模式标识；具体震动节奏/强度由固件定义，不需要在应用侧拼接脉冲。

---

## API

### `vibrator.start(kind [, opts])`

启动震动模式。

- **参数**
  - `kind` (`number` | `enum`)：传 `vibrator.type.*` 或其对应的数值。
  - `opts` (`table`, 可选)：预留的可选参数。不同平台可能支持少量调节项（如时长/循环），若平台未实现则忽略。常见键位（如被支持）：
    - `repeat` (`boolean|number`)：是否循环/循环次数。
    - `duration` (`number`)：自定义持续时长（毫秒）。
    - `intensity` (`number`)：强度（0.0~1.0 或平台自定义档位）。

- **返回**
  - 无强制返回值约定；通常无需关注返回值。若调用失败，请关注日志或错误回调（若平台提供）。

#### 示例

```lua
-- 成功与失败提示
vibrator.start(vibrator.type.SUCCESS)
vibrator.start(vibrator.type.FAILED)

-- 普通通知
vibrator.start(vibrator.type.NOTIFICATION)

-- 来电：若平台支持循环，可传 repeat
vibrator.start(vibrator.type.INCOMING_CALL, { repeat = true })

-- 呼吸训练：平台若支持自定义时长/强度
vibrator.start(vibrator.type.BREATHING_TRAINING, { duration = 60000, intensity = 0.6 })
```

---

`vibrator.cancel()`

立即停止当前震动。

```lua
-- 页面离开 / 通话结束 / 训练结束时
vibrator.cancel()
```

---

## 与页面/状态的协同

- **页面切换/关闭**：若触发了持续/循环类震动（来电、闹钟、训练），务必在页面 `onDisappear`/`onDestroy` 或状态结束处调用 `vibrator.cancel()`。
- **编辑态/静音模式**：若你的应用有编辑/预览或“请勿打扰”模式，可在进入该模式时跳过 `vibrator.start` 或统一 `cancel()`。
- **与** `dataman` **联动（示例）：**

```lua
-- 达成目标即触发触感反馈
local token = dataman.subscribe("zone.complex.state", function(p)
  local v = p.value or {}
  if v.label == "GOAL_DONE" or v.level == 3 then
    vibrator.start(vibrator.type.TARGET_DONE)
  end
end)
```

---

## 最佳实践

- **语义化选择模式**：优先用语义最贴近的枚举（如 `SUCCESS`/`FAILED`），便于跨设备一致性。
- **尊重系统状态**：遵循系统“静音/请勿打扰/省电”策略，不强行震动（若平台提供状态查询请先判断）。
- **避免滥用**：列表滚动、频繁点击等高频交互不应每次都触发震动；将触感用于关键反馈点。
- **及时取消**：循环/长时震动必须在状态结束处 `cancel()`；避免遗留后台震动。
- **无障碍与用户偏好**：如平台支持震动开关或强度偏好，读取用户设置。

---

## 误用与排错

- **无效类型**：传入未定义的 `kind` 可能静默失败；请使用 `vibrator.type` 中的枚举值。
- **叠加调用**：连续多次 `start` 可能被后一次覆盖；若要队列式效果，需应用层自行节拍调度。
- **未取消循环**：来电/闹钟类常为循环；忘记 `cancel()` 会导致体验问题与电耗增加。
- **平台差异**：`opts` 字段是否生效取决于固件实现；请在不依赖 `opts` 的前提下设计兜底逻辑。
