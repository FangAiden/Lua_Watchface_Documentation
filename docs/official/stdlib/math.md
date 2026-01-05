---
title: "math（数学库）"
description: "常用数学函数与随机数接口速查"
tags: ["module:official", "stdlib"]
---

## 概览

`math` 提供常用数学函数（取整、三角、指数对数、随机数等）。  
多数运行时会保留 `math`，但也可能因裁剪而缺少少量函数。

## 常用常量

| 字段 | 类型 | 说明 | 可用性 |
|---|---|---|---|
| `math.pi` | `number` | 圆周率 | `常见可用` |
| `math.huge` | `number` | 正无穷（或近似） | `常见可用` |
| `math.maxinteger` | `integer` | 最大整数（整数模式） | `可能不可用（整数支持/裁剪）` |
| `math.mininteger` | `integer` | 最小整数（整数模式） | `可能不可用（整数支持/裁剪）` |

## 函数速查

| 函数 | 说明 | 可用性 |
|---|---|---|
| `math.abs(x)` | 绝对值 | `常见可用` |
| `math.ceil(x)` / `math.floor(x)` | 向上/向下取整 | `常见可用` |
| `math.max(...)` / `math.min(...)` | 多参数最大/最小 | `常见可用` |
| `math.modf(x)` | 拆分整数部分与小数部分 | `常见可用` |
| `math.sqrt(x)` | 平方根 | `常见可用` |
| `math.sin(x)` / `math.cos(x)` / `math.tan(x)` | 三角函数（弧度） | `常见可用` |
| `math.asin(x)` / `math.acos(x)` / `math.atan(y[, x])` | 反三角 | `常见可用` |
| `math.sinh(x)` / `math.cosh(x)` / `math.tanh(x)` | 双曲函数 | `可能不可用（裁剪）` |
| `math.rad(deg)` / `math.deg(rad)` | 角度/弧度转换 | `常见可用` |
| `math.log(x[, base])` / `math.exp(x)` | 对数/指数 | `常见可用` |
| `math.fmod(x, y)` | 浮点取模 | `可能不可用（裁剪）` |
| `math.frexp(x)` / `math.ldexp(m, e)` | 浮点拆分/合成 | `可能不可用（裁剪）` |
| `math.random([m[, n]])` | 随机数（区间取决于参数） | `常见可用` |
| `math.randomseed(x[, y])` | 设置随机种子 | `常见可用` |
| `math.tointeger(x)` | 转为整数（失败返回 nil） | `可能不可用（整数支持/版本差异）` |
| `math.type(x)` | 返回 `"integer"`/`"float"` | `可能不可用（整数支持/版本差异）` |
| `math.ult(m, n)` | 无符号比较（整数） | `可能不可用（整数支持/版本差异）` |

## 示例

```lua
print("pi", math.pi)
print("ceil", math.ceil(1.2), "floor", math.floor(1.8))

math.randomseed(os and os.time and os.time() or 12345)
print("rand 1..10", math.random(1, 10))
```

## 注意事项

- 三角函数参数单位是“弧度”，常用 `math.rad()`/`math.deg()` 转换。
- 设备侧随机数质量与种子来源取决于实现；如果没有 `os.time`，请用平台提供的时间/随机源替代。
