---
title: "NuttX Shell (nsh)"
description: "NuttX nsh shell 特性与命令参考"
tags: ["type:ref"]
---

# NuttX Shell (nsh)

设备使用 NuttX nsh，与 POSIX sh 差异较大。

## 命令格式

```
[nice [-d <niceness>]] <cmd> [> <file>|>> <file>] [&]
```

## Shell 语法

### 支持 ✅

| 特性 | 语法 |
|------|------|
| 分号链 | `cmd1; cmd2` |
| 管道 | `cmd1 \| cmd2` |
| 输出重定向 | `cmd > file`、`cmd >> file` |
| 变量赋值 | `set name value` |
| 变量引用 | `echo $name` |
| 后台执行 | `cmd &` |
| 条件测试 | `test -f path`、`[ -f path ]` |
| 算术 | `expr 1 + 2` |
| 脚本 | `source file.sh` |
| 子 shell | `sh -c 'cmd'` |

### 控制流

```sh
if test -f /tmp/file.txt
then
  echo exists
else
  echo not found
fi
```

```sh
while test $i -lt 3
do
  echo $i
  set i $(expr $i + 1)
done
```

> `until/do/done` 同样可用。

### 不支持 ❌

| 特性 | 说明 |
|------|------|
| `$(cmd)` | 命令替换不可用 |
| `&&` / `\|\|` | 逻辑链不可用，用 `;` 替代 |
| `2>&1` / `2>file` | stderr 重定向不可用 |
| 通配符 `*` `?` | 不支持 glob 展开 |
| `grep` / `sed` / `awk` | 不存在 |

## 文件系统

| 挂载点 | 类型 | 读写 |
|--------|------|------|
| `/data` | fatfs | ✅ 可读写 |
| `/tmp` | tmpfs | ✅ 可读写（重启清空） |
| 其余所有 | romfs | ❌ 只读 |

## 环境变量

```sh
env    # 查看所有
```

| 变量 | 示例值 |
|------|--------|
| `PWD` | `/` |
| `TZ` | `Asia/Shanghai` |

## 内置命令

### 文件操作

| 命令 | 用法 |
|------|------|
| `ls` | `ls [-lRsh] <dir>` |
| `cat` | `cat <path> [<path> ...]` |
| `cp` | `cp [-r] <src> <dest>` |
| `mv` | `mv <old> <new>` |
| `rm` | `rm [-rf] <path>` |
| `mkdir` | `mkdir [-p] <path>` |
| `rmdir` | `rmdir <path>` |
| `ln` | `ln [-s] <target> <link>` |
| `readlink` | `readlink <link>` |
| `truncate` | `truncate -s <length> <path>` |
| `cmp` | `cmp <path1> <path2>` |
| `md5` | `md5 <path>` |
| `dd` | `dd if=<in> of=<out> [bs=<size>] [count=<n>] [skip=<n>] [seek=<n>]` |
| `hexdump` | `hexdump <path>` |
| `mount` | `mount [-t <fstype> [-o <opts>] [<dev>] <mount-point>]` |
| `umount` | `umount <dir>` |

### 路径工具

| 命令 | 用法 |
|------|------|
| `basename` | `basename <path> [<suffix>]` |
| `dirname` | `dirname <path>` |
| `pwd` | `pwd` |
| `cd` | `cd <path>` |

### 进程管理

| 命令 | 用法 |
|------|------|
| `ps` | `ps [-heap] [pid ...]` |
| `kill` | `kill [-<signal>] <pid>` |
| `pkill` | `pkill [-<signal>] <name>` |
| `pidof` | `pidof <name>` |
| `wait` | `wait pid1 [pid2 ...]` |
| `nice` | `nice [-d <niceness>] <cmd>` |
| `sleep` | `sleep <sec>` |
| `usleep` | `usleep <usec>` |

### 系统信息

| 命令 | 用法 |
|------|------|
| `uname` | `uname [-a]` |
| `uptime` | `uptime` |
| `date` | `date [-s "MMM DD HH:MM:SS YYYY"]` |
| `df` | `df` |
| `free` | `free` |
| `dmesg` | `dmesg` |
| `env` | `env` |
| `resetcause` | `resetcause` |
| `fdinfo` | `fdinfo [pid]` |
| `time` | `time "<command>"` |

### 网络

| 命令 | 用法 |
|------|------|
| `ifconfig` | `ifconfig [interface ...]` |
| `ifup` / `ifdown` | `ifup <interface>` |
| `ping` | `ping [-c <count>] [-i <interval>] [-W <timeout>] [-s <size>] <host>` |
| `nslookup` | `nslookup <hostname>` |
| `wget` | `wget [-o <local-path>] <url>` |
| `arp` | `arp [-i <ifname>] [-a\|-d\|-s <ipaddr> [hwaddr]]` |

### 变量与脚本

| 命令 | 用法 |
|------|------|
| `set` | `set [{+\|-}{e\|x}] [<name> <value>]` |
| `unset` | `unset <name>` |
| `echo` | `echo [-n] [<string\|$name> ...]` |
| `printf` | `printf <string> [args ...]`（⚠️ 格式符不生效） |
| `expr` | `expr <expression>` |
| `test` / `[` | `test <expression>` |
| `true` / `false` | 返回 0 / 1 |
| `source` / `.` | `source <file>` |
| `exec` | `exec <cmd>` |
| `alias` / `unalias` | `alias [name[=value]]` |

### 系统控制

| 命令 | 用法 |
|------|------|
| `reboot` | `reboot` — ⚠️ 重启设备 |
| `poweroff` | `poweroff` — ⚠️ 关机 |
| `timedatectl` | `timedatectl [set-timezone TZ]` |

### 压缩/归档

| 命令 | 用法 |
|------|------|
| `tar` | `tar [-C rootdir] [-g] [-z] <-x\|-t\|-c> filename.tar [...]` |
| `gzip` | `gzip <file>`（⚠️ 无参数运行会阻塞导致崩溃） |
| `unzip` | `unzip <file.zip>` |

### 底层/调试

| 命令 | 用法 |
|------|------|
| `xd` | `xd <hex-address> <byte-count>` — 内存十六进制转储 |
| `mw` | `mw <hex-address>[=<hex-value>] [<byte-count>]` — 内存读写 |
| `memdump` | `memdump [pid\|used\|free\|on\|off]` |
| `insmod` | `insmod <file-path> <module-name>` |
| `rmmod` | `rmmod <module-name>` |
| `lsmod` | `lsmod` |
| `losetup` | `losetup [-d <dev>] \| [[-o <offset>] [-r] [-b <sect-size>] <dev> <file>]` |
| `mkrd` | `mkrd [-m <minor>] [-s <sect-size>] <nsectors>` — 创建 RAM 磁盘 |
| `mkfifo` | `mkfifo <path>` |
| `rpmsg` | `rpmsg <panic\|dump\|ping> <path\|all> [value\|times length ack sleep]` |
| `rptun` | `rptun <start\|stop\|reset\|panic\|dump\|ping\|test> <path\|all>` |
| `watch` | `watch [-n interval] [-c count] <command>` |

## Builtin Apps

### 脚本运行时

| 命令 | 说明 | 用法 |
|------|------|------|
| `lua` | Lua 5.4.0 解释器 | `lua [options] [file [args]]` |
| `qjs` | QuickJS 解释器（全局仅 `console`） | `qjs -e 'code'` / `qjs file.js` |
| `iwasm` | WebAssembly Micro Runtime | `iwasm [-f <func>] [--stack-size=n] [--heap-size=n] <file.wasm>` |
| `vapp` | AIoT JS 应用引擎 | `vapp [options] [file]`（同 `aiot`） |
| `aiotjsc` | AIoT JS 字节码编译器 | `aiotjsc [-o output] [-e] [-m] <file\|appdir>` |

### 网络工具

| 命令 | 说明 | 用法 |
|------|------|------|
| `curl` | HTTP/HTTPS/FTP/MQTT 客户端（curl 8.4.0-DEV, mbedTLS, zlib） | `curl [-X METHOD] [-d data] [-H header] [-o file] <url>` |
| `iperf` | 网络性能测试 | `iperf -s` / `iperf -c <ip> [-u] [-p port] [-t time] [-i interval]` |
| `ping` | ICMP Ping | `ping [-c <count>] [-i <interval>] [-W <timeout>] [-s <size>] <host>` |
| `wget` | HTTP 文件下载 | `wget [-o <local-path>] <url>` |
| `ftpd_start` | 启动 FTP 服务器 | `ftpd_start [-4\|-6]` |
| `ftpd_stop` | 停止 FTP 服务器 | `ftpd_stop` |
| `telnetd` | Telnet 服务器守护进程 | `telnetd` |
| `renew` | DHCP 续租 | `renew` |

### 媒体

| 命令 | 说明 | 用法 |
|------|------|------|
| `ffmpeg` | 多媒体转码处理 | `ffmpeg [options] -i <input> [options] <output>` |
| `ffprobe` | 媒体文件信息查看 | `ffprobe <file>` |
| `nxplayer` | 交互式音频播放器（NxPlayer 1.05） | `nxplayer`（交互式，`h` 查看命令） |
| `nxrecorder` | 音频录制 | `nxrecorder`（交互式） |
| `nxlooper` | 音频回环测试 | `nxlooper`（交互式） |
| `mediad` | 媒体服务守护进程 | 自动启动 |
| `mediatool` | 媒体服务交互式调试 | `mediatool`（交互式） |

**ffmpeg 支持的编解码器：**

| 类别 | 编解码器 |
|------|----------|
| 音频解码 | AAC (libhelix), AC3, FLAC, MP3, OPUS (libopus), Vorbis, AMR-NB/WB, ADPCM, SBC, LDAC, LC3 |
| 音频编码 | AAC, OPUS (libopus), AMR-NB, SBC, PCM, WavPack |
| 视频解码 | H.264, VP8, rawvideo |
| 视频编码 | MJPEG, MPEG4, rawvideo |
| 容器格式 | MP4, MP3, OGG, WAV, HLS, FLAC, AAC, AMR, MPEG-TS, SBC |
| 网络协议 | HTTP/HTTPS, FTP, TCP, UDP, RTP, TLS, HLS, Unix socket, rpmsg |
| 设备 | bluelet（蓝牙音频）, fbdev（帧缓冲）, nuttx（系统音频）, V4L2（摄像头） |

### 应用管理

| 命令 | 说明 | 用法 |
|------|------|------|
| `am` | Activity Manager | `am <start\|stop> <packagename>` |
| `pm` | 包管理器 | `pm <install\|uninstall> [packagename\|rpkfile]` |
| `vappmonitor` | 虚拟应用监控 | `vappmonitor <arg1> <arg2>` |

### 系统属性

| 命令 | 说明 | 用法 |
|------|------|------|
| `getprop` | 读取系统属性 | `getprop [key]`（无参数列出所有） |
| `setprop` | 设置系统属性 | `setprop <key> <value>` |
| `qemuprop` | 模拟器属性同步服务 | 自动启动 |

#### getprop 全量属性（设备采样）

采样时间：2026-01-30（adb shell getprop，emulator）

说明：以下“说明/值范围”为基于键名与当前值的推测，实际以系统文档为准。

| 属性键 | 当前值（观测） | 说明（推测） | 值范围（推测/格式） |
|------|------|------|------|
| `persist.bluetooth.log.changed` | `0` | 蓝牙日志变更标记 | 整数 |
| `persist.locale` | `zh_CN` | 系统 locale | locale 字符串（如 zh_CN） |
| `persist.phone.sco_volume` | `8` | 电话 SCO 音量等级 | 整数（等级） |
| `persist.replace_widget` | `true` | 是否替换小组件 | true/false |
| `persist.call_mode` | `1` | 通话模式 | 整数（模式枚举） |
| `persist.downkey.pkgname` | `com.xiaomi.miwear.sports` | 下键绑定包名 | 字符串 |
| `persist.selected_local` | `zh_CN` | 当前选择的 locale | locale 字符串（如 zh_CN） |
| `persist.setup_wizard` | `1` | 首次设置向导完成标记 | 0/1（布尔） |
| `persist.screen.touch_palm` | `1` | 掌触屏蔽开关 | 0/1（布尔） |
| `persist.system_novice_guidance` | `false` | 新手引导开关 | true/false |
| `persist.screen.dimmer_timeout` | `300000` | 屏幕变暗/息屏超时 | 非负整数（毫秒） |
| `persist.remind_womenhealth_data` | `false` | 女性健康提醒开关 | true/false |
| `persist.sms.db_version` | `2` | 短信数据库版本 | 整数（版本号） |
| `persist.modem_enabled` | `true` | 基带/调制解调器启用开关 | true/false |
| `persist.priv.com.xiaomi.wear.media` | `true` | 媒体相关私有权限开关 | true/false |
| `TELEPHONY_TYPE` | `6f7468657273` | 电话类型/制式标记 | 十六进制字符串 |
| `is_main_watchface` | `false` | 是否主表盘 | true/false |
| `miwear_conn_status` | `false` | MiWear 连接状态 | true/false |
| `bt_conn_status` | `false` | 蓝牙连接状态 | true/false |
| `activity_service_boot_ready` | `true` | activity_service 启动就绪标记 | true/false |
| `qemu.timezone` | `Unknown/Unknown` | QEMU 时区 | 时区字符串（Area/City） |
| `ro.sf.lcd_density` | `320` | 屏幕密度 | 整数（dpi） |
| `qemu.hw.mainkeys` | `0` | 是否有物理主键 | 0/1（布尔） |
| `dalvik.vm.heapsize` | `256m` | 虚拟机堆大小 | 内存大小字符串（如 256m） |
| `qemu.sf.fake_camera` | `none` | 模拟相机配置 | 字符串 |
| `ro.opengles.version` | `131072` | OpenGL ES 版本编码 | 整数（版本编码） |
| `vendor.qemu.dev.bootcomplete` | `1` | QEMU 启动完成标记 | 0/1（布尔） |
| `ro.product.device.devicetype` | `watch` | 设备类型 | 枚举（watch/phone 等） |
| `ro.product.device.screenshape` | `circle` | 屏幕形状 | 枚举（circle/rect 等） |
| `ro.build.id` | `202507160414` | 构建 ID | 构建 ID 字符串 |
| `ro.product.board` | `Emulator` | 板卡/硬件平台 | 字符串 |
| `ro.product.manufacturer` | `Xiaomi` | 厂商 | 字符串 |
| `ro.product.brand` | `Vela` | 品牌 | 字符串 |
| `ro.product.name` | `Emulator-Vela` | 产品名 | 字符串 |
| `ro.product.device` | `Emulator-Vela` | 设备名 | 字符串 |
| `ro.product.model` | `Emulator-Vela` | 型号 | 字符串 |
| `ro.build.version` | `12.0.0` | 系统版本 | 版本号字符串 |
| `ro.build.version.release` | `12.0.0` | 系统版本（release） | 版本号字符串 |
| `ro.build.codename` | `DEV` | 版本代号 | 字符串 |
### 蓝牙

| 命令 | 说明 | 用法 |
|------|------|------|
| `bluetoothd` | 蓝牙协议栈守护进程 | 自动启动 |
| `bttool` | 蓝牙调试工具 | `bttool <command> [args]` |
| `miconnect` | 小米设备连接服务 | 自动启动 |

**bttool 子命令：**

| 子命令 | 说明 |
|--------|------|
| `enable` / `disable` | 启用/禁用蓝牙 |
| `state` | 获取适配器状态 |
| `inquiry start <timeout>` / `inquiry stop` | 搜索设备（timeout: 1-48，即 1.28-61.44s） |
| `pair` | 响应配对请求 |
| `connect <addr>` / `disconnect <addr>` | 经典蓝牙连接 |
| `leconnect` / `ledisconnect <addr>` | BLE 连接 |
| `createbond <addr> <transport>` | 创建绑定（0:BLE, 1:BREDR） |
| `removebond <addr> <transport>` | 移除绑定 |
| `setalias <addr>` | 设置设备别名 |
| `device <addr>` | 查看设备信息 |
| `setphy <addr> <txphy> <rxphy>` | 设置 LE PHY（0:1M, 1:2M, 2:CODED） |
| `adv` | 广播管理 |
| `scan` | BLE 扫描 |
| `a2dpsrc` | A2DP Source 控制 |
| `avrcpct` | AVRCP 控制 |
| `hf` | 免提模式 |
| `ag` | 音频网关 |
| `spp` | 串口通信 |
| `hidd` | HID 设备 |
| `gattc` | GATT Client |
| `gatts` | GATT Server |
| `dump` | 转储适配器状态 |
| `log` | 日志控制 |

### DBus

| 命令 | 说明 | 用法 |
|------|------|------|
| `dbusdaemon` | DBus 系统总线守护进程 | `dbusdaemon --system --nopidfile --nofork` |
| `dbussend` | 发送 DBus 消息 | `dbussend [--system] [--print-reply] --dest=<name> --type=<type> <path> <method> [args]` |
| `dbusmonitor` | 监控 DBus 消息 | `dbusmonitor [--system\|--session\|--address ADDR] [--monitor\|--profile\|--pcap]` |

### 通信/电话

| 命令 | 说明 | 用法 |
|------|------|------|
| `ofonod` | oFono 电话服务守护进程 | 自动启动 |
| `rild` | RIL 守护进程 | 自动启动 |
| `telephonytool` | 电话调试工具 | `telephonytool`（交互式） |

### 日志与调试

| 命令 | 说明 | 用法 |
|------|------|------|
| `setlogmask` | 设置日志掩码级别 | `setlogmask <d\|i\|n\|w\|e\|c\|a\|r>`（d=DEBUG ... r=EMERG） |
| `offline_log` | 离线日志管理 | `offline_log <start[-d\|-w]\|stop\|clear>` |
| `dumpstack` | 转储所有线程栈 | `dumpstack` |
| `log_service` | 日志服务守护进程 | 自动启动 |

### uORB 传感器

| 命令 | 说明 | 用法 |
|------|------|------|
| `uorb_listener` | 监听 uORB 主题数据 | `uorb_listener [topics] [-n <count>] [-r <rate>] [-t <sec>] [-T] [-l]` |

**uorb_listener 参数：**

| 参数 | 说明 |
|------|------|
| `<topics>` | 主题名，多个用 `,` 分隔 |
| `-n <count>` | 接收消息数量（0=不限） |
| `-r <rate>` | 订阅频率（0=不限） |
| `-t <sec>` | 监听时长（默认 5s） |
| `-T` | 持续打印更新的主题 |
| `-l` | 仅执行一次快照 |
| `-f` | 记录到文件 |

### 安全

| 命令 | 说明 | 用法 |
|------|------|------|
| `opteed` | OP-TEE 安全守护进程 | 自动启动 |
| `ca_triad_tool` | TEE 设备三元组管理 | `ca_triad_tool <set\|get> <did\|key> [value]` |

### 系统服务（自动启动）

| 命令 | 说明 |
|------|------|
| `miwear` | 主系统服务（UI 框架、表盘管理、2MB 栈） |
| `miwear_activity_service` | Activity 生命周期管理 |
| `miwear_bluetooth` | 蓝牙管理服务 |
| `miwear_rtc_checker` | RTC 时钟校验 |
| `vibratord` | 振动马达服务 |
| `kvdbd` | 键值数据库服务（UnQLite） |
| `servicemanager` | 系统服务注册管理器 |
| `adbd` | ADB 守护进程 |

### 测试/演示

| 命令 | 说明 | 用法 |
|------|------|------|
| `hello` | Hello World 测试 | `hello` → 输出 `Hello, World!!` |
| `lvgldemo` | LVGL 演示 | `lvgldemo` |
| `uikit_demo` | UIKit 演示 | `uikit_demo`（交互式） |
| `feature_test_cli` | 特性测试 | `feature_test_cli`（交互式） |
| `adapter_test` | 适配器测试 | `adapter_test`（交互式） |
| `pipe` | 管道测试 | `pipe` |
| `sb` / `rb` | XMODEM 发送/接收 | `sb <file>` / `rb <file>` |
| `rpsock_client` / `rpsock_server` | RPMsg socket 测试 | |
| `lyra_lite_sdk_tools` | Lyra SDK 工具 | （交互式） |
