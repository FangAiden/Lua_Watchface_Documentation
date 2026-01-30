---
title: "fs"
description: "文件系统 API"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

> 路径必须使用 NuttX 绝对路径（如 `/watchface/lua/...`），`S:` 前缀无效。

## 模块函数

```lua
lvgl.fs.open_file(path: string, mode: string) -> lv_fs userdata | nil
lvgl.fs.open_dir(path: string) -> lv_dir userdata | nil
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `path` | `string` | NuttX 绝对路径 |
| `mode` | `string` | `"r"` 读 / `"w"` 写 |

## lv_fs 方法（文件）

| 方法 | 说明 |
|------|------|
| `read(n)` | 读取 `n` 字节，返回 `string` |
| `read("*a")` | 读取全部内容，返回 `string` |
| `read(n1, n2, ...)` | 多参数读取，返回多个 `string` |
| `write(data)` | 写入内容 |
| `seek(whence?, offset?)` | 移动偏移。`whence`: `"set"` / `"cur"` / `"end"`，`offset`: 整数。返回当前位置 |
| `close()` | 关闭文件 |

> `read("*l")`、`read("*n")` **不支持**，会报 `invalid format`。

## lv_dir 方法（目录）

| 方法 | 说明 |
|------|------|
| `read()` | 读取下一条目，无更多时返回 `nil` |
| `close()` | 关闭目录 |

## 示例

```lua
-- 读取文件
local f = lvgl.fs.open_file("/watchface/lua/circle/circle.lua", "r")
if f then
  local content = f:read("*a")
  print("size:", #content)
  f:close()
end

-- 按字节读取
local f = lvgl.fs.open_file("/watchface/lua/circle/circle.lua", "r")
if f then
  local header = f:read(100)    -- 读前 100 字节
  local size = f:seek("end")    -- 获取文件大小
  f:seek("set", 0)              -- 回到开头
  f:close()
end

-- 遍历目录
local d = lvgl.fs.open_dir("/resource/app")
if d then
  local name = d:read()
  while name do
    print(name)
    name = d:read()
  end
  d:close()
end
```

## 已知可用路径

| 路径 | 内容 |
|------|------|
| `/watchface/lua/` | 表盘 Lua 源码（circle, clearheart, complexzone, corona, daynight） |
| `/watchface/` | 表盘资源（resource.bin、aod） |
| `/data/app/watchface/` | 已安装表盘（builtin / market） |
| `/resource/app/` | 系统应用目录（约 50 个） |
| `/resource/system/` | 系统资源 |
| `/resource/misc/` | 健康、运动等杂项 |
| `/font/` | 系统字体（MiSans TTF） |
| `/i18n/` | 国际化资源 |
| `/quickapp/` | 快应用 RPK |
| `/data/` | 用户数据（含 persist.db、apps.json） |
| `/etc/` | 系统配置（build.prop） |
