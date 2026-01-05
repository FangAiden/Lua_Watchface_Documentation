---
title: "Lua 标准库"
description: "离线参考：标准库模块索引与使用建议"
tags: ["module:official", "type:overview", "stdlib"]
---

本栏目把 Lua 标准库整理为**站内离线文档**，便于在打包后的 App 中直接查阅。  
由于不同固件/运行时裁剪差异，**并非所有标准库/函数都一定存在**；请以实机验证为准。

## 可用性标注

各页面的函数速查表会给出“可用性”标注（经验判断）：

| 标注 | 含义 |
|---|---|
| `常见可用` | 多数 Lua 运行时通常具备 |
| `可能不可用（…）` | 受固件裁剪、权限、文件系统、Lua 版本/构建选项等影响 |

> 建议在调用前用 `type(xxx.fn) == "function"` 做保护判断。

## 离线索引

- [全局环境（_G）](./stdlib/globals.md)
- [coroutine（协程）](./stdlib/coroutine.md)
- [debug（调试库）](./stdlib/debug.md)
- [io（输入输出）](./stdlib/io.md)
- [math（数学库）](./stdlib/math.md)
- [os（系统库）](./stdlib/os.md)
- [package（模块加载）](./stdlib/package.md)
- [string（字符串库）](./stdlib/string.md)
- [table（表库）](./stdlib/table.md)

## 如何判断“你的设备是否支持”

建议在**按钮事件**或**定时器回调**里运行以下探测代码（避免初始化阶段直接跑导致不稳定）：

```lua
local function has(name)
  local ok = type(_G[name]) ~= "nil"
  print(name, ok and "OK" or "MISSING", type(_G[name]))
end

for _, n in ipairs({ "coroutine", "debug", "io", "math", "os", "package", "string", "table" }) do
  has(n)
end
```

如果某个库存在但函数缺失，优先用 `type(xxx.fn) == "function"` 做保护判断，再决定是否启用相关能力。
