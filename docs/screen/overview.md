---
title: "Screen 模块"
description: "屏幕状态/背光/息屏事件（待验证）"
tags: ["module:screen", "type:overview"]
---

> 当前文档状态：在现有镜像/运行时分析中**未提取到稳定可复现的 API**。  
> 本页以“如何探测与补全文档”为主，避免对未知接口做强假设。

## 这个模块可能用于什么（经验参考）

不同固件/平台的 `screen` 模块常见能力包括：

- 监听亮屏/息屏事件
- 控制常亮/防休眠（keep awake）
- 背光亮度调节
- 常显（AOD）相关状态

> 上述仅为常见场景，不代表你的固件一定提供；请以运行时验证为准。

## 如何在设备/模拟器上探测

> 建议把探索代码放在 **按钮事件** 或 **定时器回调** 中触发，避免初始化阶段直接执行。

### 1) 确认模块是否存在

```lua
print("screen:", screen)
```

### 2) 尝试枚举成员（仅表类型适用）

```lua
if type(screen) == "table" then
  for k, v in pairs(screen) do
    print("screen.", k, v)
  end
else
  print("screen type:", type(screen))
end
```

### 3) 试探性注册事件回调（如存在）

`docs/navigator/overview.md` 中给出了 `screen.on("off", ...)` 的示例，但该接口在你的固件上**未必存在**。

```lua
if screen and type(screen.on) == "function" then
  screen.on("off", function()
    print("[screen] off")
  end)

  screen.on("on", function()
    print("[screen] on")
  end)
end
```

## 如何补全文档（欢迎贡献）

如果你在设备上验证到了可用 API，建议补充以下信息，方便把“猜测”变成“可用文档”：

- 设备型号/固件版本
- `print(screen)` 与成员枚举输出
- 最小可复现示例（建议带保护判断 `type(screen.xxx) == "function"`）
- 回调参数/返回值（若有）与触发条件（亮屏/息屏/超时等）
