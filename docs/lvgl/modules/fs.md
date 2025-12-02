---
title: "fs"
description: "文件系统：打开文件/目录、读写、遍历与定位"
tags: ["module:lvgl", "type:ref", "kind:function"]
---

## 概述

`lvgl.fs` 提供对 LVGL 文件系统抽象层的 Lua 访问，包括：
- 打开/读取/写入/关闭 **文件**
- 打开/遍历/关闭 **目录**
- 文件定位（`seek`）与当前位置查询（`tell` 效果通过 `seek` 返回）

底层基于 `lv_fs_*` 系列接口，read/write 返回值与错误处理遵循 LVGL 的 `lv_fs_res_t`。

---

## 定义

```lua
-- 模块
lvgl.fs.open_file(path: string, mode?: "r"|"w"|组合) -> file|nil, err_msg?, err_code?
lvgl.fs.open_dir(path: string) -> dir|nil, err_msg?, err_code?

-- file 句柄方法
file:read(fmt_or_len, ...) -> ...        -- 支持 "*a" 或 数字长度；不支持 "n"/"l"/"L"
file:write(val1, val2, ...) -> file|nil, "failed", err_code
file:seek(whence?: "set"|"cur"|"end", offset?: integer) -> new_pos|nil, "failed", err_code
file:close() -> nil

-- dir 句柄方法
dir:read() -> name|string|nil            -- 读到末尾或出错返回 nil
dir:close() -> nil
```

---

### 打开文件

```lua
local f, err, errno = lvgl.fs.open_file("/path/to/data.bin", "rw")
if not f then
  print("open failed:", err, errno)
  return
end
```

- `mode`：字符串中包含 `r` 表示读、包含 `w` 表示写；可组合（如 `"rw"`）。
- 成功返回 **file userdata**；失败返回 `nil, "open failed: <path>\n", <lv_fs_res_t>`。

> 句柄关闭前重复使用会报错：`attempt to use a closed file`。

---

### 读取

```lua
-- 读取所有内容
local all = f:read("*a")

-- 读取固定字节数（例如 128 字节）
local chunk = f:read(128)
if not chunk then
  -- 读到 EOF 返回 nil
end

-- 不支持： "*n"、"*l" 等格式
```

- `f:read("*a")`：一次性读完整个文件。
- `f:read(N)`：读 `N` 字节；若 0 字节或到 EOF，返回 `nil`。
- 其他格式（`n`、`l`、`L`）**不支持**，会抛参数错误。

---

### 写入

```lua
-- 可传入字符串或数字（数字将被转为字符串写入）
local ok = f:write("hello", 123, "\n")
if not ok then
  -- 失败返回：nil, "failed", <lv_fs_res_t>
end
```

- 成功：返回 `file` 本身（便于链式调用）。
- 失败：`nil, "failed", <lv_fs_res_t>`。

---

### 定位（seek）

```lua
-- 将文件指针移动到距离文件头 0 的位置
local pos = f:seek("set", 0)      -- 返回新的位置（整数）

-- 相对当前位置前进 10 字节
local pos = f:seek("cur", 10)

-- 定位到文件尾部
local pos = f:seek("end", 0)

-- 失败返回：nil, "failed", <lv_fs_res_t>
```

- `whence` 可为 `"set"|"cur"|"end"`（默认 `"cur"`）。
- `offset` 默认为 `0`。
- 成功返回**当前文件位置**（`uint32_t` 转为整数），失败返回 `nil, "failed", <lv_fs_res_t>`。

---

### 关闭与 GC

```lua
f:close()         -- 主动关闭
-- 或在 GC / with 语义里自动关闭（__gc/__close）
```

- 关闭后再次使用会抛错：`attempt to use a closed file`。
- `__gc` / `__close` 会在回收时确保句柄被关闭。

---

### 目录操作

```lua
local d, err, errno = lvgl.fs.open_dir("/path/to/dir")
if not d then
  print("open dir failed:", err, errno)
  return
end

while true do
  local name = d:read()
  if not name then break end
  print("entry:", name)
end

d:close()
```

- `open_dir(path)`：成功返回 **dir userdata**；失败返回 `nil, "open failed: <path>\n", <lv_fs_res_t>`。
- `dir:read()`：返回下一个条目的名称字符串；读到末尾或错误返回 `nil`。
- `dir:close()`：关闭目录句柄；GC 时也会自动关闭。

---

## 示例: 复制文件

```lua
local src = "/fs/in.bin"
local dst = "/fs/out.bin"

local fin, e1, n1 = lvgl.fs.open_file(src, "r")
assert(fin, e1)

local fout, e2, n2 = lvgl.fs.open_file(dst, "w")
assert(fout, e2)

while true do
  local buf = fin:read(1024)
  if not buf then break end
  local ok = fout:write(buf)
  assert(ok, "write failed")
end

fin:close()
fout:close()
```

---

## 错误处理与返回值

- **打开失败**：`nil, "open failed: <path>\n", <lv_fs_res_t>`
- **读到 EOF**：`read(N)` 返回 `nil`；`read("*a")` 总是成功（可能返回空串）。
- **写入失败**：`nil, "failed", <lv_fs_res_t>`
- **seek 失败**：`nil, "failed", <lv_fs_res_t>`
- **已关闭句柄**：再次使用会抛异常（Lua error）。

---

## 备注

- `read("*a")` 内部按 `LUAL_BUFFERSIZE` 分块读取直到结束。
- 数字写入时会先转字符串再写入。
- 目录项读取缓冲区大小为 `PATH_MAX`（实现中用于临时存放文件名）。
- `lv_fs` 的底层驱动需在你的平台正确注册（SPI Flash、SD 卡、POSIX、RAMFS 等）。