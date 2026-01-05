---
title: "table（表库）"
description: "数组操作、排序与 pack/unpack/move 速查"
tags: ["module:official", "stdlib"]
---

## 概览

`table` 提供对“数组型表”的常用操作（插入、删除、拼接、排序等），也包含一些打包/移动辅助函数。

## 函数速查

| 函数 | 说明 | 可用性 |
|---|---|---|
| `table.insert(t, [pos,] v)` | 插入元素 | `常见可用` |
| `table.remove(t[, pos])` | 删除元素并返回 | `常见可用` |
| `table.concat(t[, sep[, i[, j]]])` | 拼接数组元素为字符串 | `常见可用` |
| `table.sort(t[, comp])` | 排序（就地修改） | `常见可用` |
| `table.pack(...)` | 打包可变参数（包含 `n` 字段） | `可能不可用（固件裁剪/版本差异）` |
| `table.unpack(t[, i[, j]])` | 解包数组到多返回值 | `可能不可用（固件裁剪/版本差异）` |
| `table.move(a, f, e, t[, dest])` | 批量移动元素 | `可能不可用（固件裁剪/版本差异）` |

## 示例

```lua
local t = { "a", "c" }
table.insert(t, 2, "b")
print(table.concat(t, ",")) -- a,b,c

table.sort(t)
print(table.concat(t, ",")) -- a,b,c

if type(table.pack) == "function" then
  local packed = table.pack(10, 20, nil, 40)
  print("n", packed.n) -- 4
end
```

## 兼容性建议

- 对 `pack/unpack/move` 这类“版本/裁剪敏感”的函数，调用前先判断：`type(table.pack) == "function"`。
