# Codex 完全入门指南

> 给第一次接触 AI 编程工具的电脑小白：先认识工具，再选择安装方式，最后完成一次安全的首次使用。
>
> 本文只写能够从官方文档或项目 README 确认的内容。社区工具和第三方 API 的行为会随版本变化，请以它们自己的发布页和设置页面为准。

## 先看结论

这里有四个容易混淆的名字：

| 名称 | 它是什么 | 它不是什么 |
| --- | --- | --- |
| **OpenAI Codex** | OpenAI 的编程智能体/产品名称，具体入口可能是官方 Codex CLI 或桌面应用 | 不是 DeepSeek，也不是 CC Switch |
| **CC Switch** | 开源的 AI 编程 CLI 统一管理工具，可管理 Codex、Claude Code、Gemini CLI、OpenCode、OpenClaw、Hermes Agent 等工具的供应商配置、本地路由、MCP、Skills、会话和用量 | 不是模型，不是 API 服务商，也不是网络加速器 |
| **Codex++** | 面向 OpenAI Codex / ChatGPT 桌面应用的外部启动器和管理工具，可切换供应商、转换协议、管理会话并提供界面增强 | 不是 OpenAI 官方 Codex 本体，也不是官方 Codex CLI |
| **Watt Toolkit** | 开源、跨平台的多功能游戏工具箱，原名 Steam++ | 不是 OpenAI 加速器、Codex 配置器或 GPT 中转站 |

## 你该选哪条路

### 路线 1：只使用官方 Codex

适合希望使用官方账号、官方登录和官方支持的人。先从 OpenAI 官方 Codex 文档进入，按官方页面选择 CLI 或桌面入口。官方页面的安装命令、登录方式和配置项可能会更新，本文不复制未经核对的命令。

### 路线 2：使用 CC Switch 管理多个 CLI 供应商

适合已经安装 Codex CLI，想在多个供应商之间切换，或者需要管理本地路由、MCP、Skills 和用量的人。CC Switch 的具体下载包、支持平台和界面，以 [ccswitch.io](https://www.ccswitch.io) 及其官方仓库为准。

### 路线 3：使用 Codex++ 管理桌面版 Codex

适合使用 OpenAI Codex / ChatGPT 桌面应用，并希望用图形界面管理供应商、模型、会话或增强功能的人。它需要从 [Codex++ Releases](https://github.com/BigPizzaV3/CodexPlusPlus/releases) 下载对应系统安装包。

### 路线 4：使用 DeepSeek 或其他兼容 API

适合已经拥有某个 API 服务商账号，并确认该服务商提供与 Codex 兼容的协议、Base URL、模型名称和 Key 的人。DeepSeek API 在中国大陆通常可以直接访问，但“能访问 DeepSeek”不等于“官方 Codex 原生支持 DeepSeek”。通常需要通过 CC Switch、Codex++ 或其他明确支持自定义供应商的工具接入。

## 一、安装前准备

### 1. 先确认你要安装的是哪一个

- 想要官方产品：去 OpenAI 官方 Codex 页面。
- 想要多供应商图形管理：看 CC Switch。
- 想要管理桌面版 Codex：看 Codex++。
- 想要加速 GitHub 下载：可以了解 Watt Toolkit，但它不是 Codex 的必需依赖；本文只把它作为下载 CC Switch 的可选 GitHub 辅助工具。

不要从搜索结果中的“破解版”“一键配置包”“未知网盘安装包”安装，也不要把 API Key 发到群聊、截图、issue 或网页表单里。

### 2. Windows 基础准备

如果安装说明要求 Node.js，再去 [Node.js 官网](https://nodejs.org) 下载 **LTS** 版本，双击安装包，一路使用默认选项即可。安装后重新打开终端，让系统刷新环境变量。

如果某个桌面安装包已经自带运行环境，就不需要为了它额外安装 Node.js。以该项目自己的安装说明为准。

### 3. 终端是什么

Windows 的终端就是一个可以输入文字命令的小窗口：

1. 按 `Win` 键，搜索“PowerShell”或“终端”。
2. 打开后，把教程中的命令复制进去。
3. 按回车执行。
4. 不认识的命令不要随便执行；看不懂报错时，把报错文字复制出来再处理。

## 二、安装官方 Codex

官方 Codex 的安装方式和入口会随产品更新。建议按下面顺序操作：

1. 打开 OpenAI 官方 Codex 文档或产品页面。
2. 选择与你的系统对应的入口（CLI 或桌面应用）。
3. 只使用官方页面给出的当前安装命令或安装包。
4. 第一次启动时，按照官方登录流程完成授权。
5. 在一个空项目或练习项目中测试，不要一开始就在重要项目里允许自动改文件。

### 第一次对话可以这样说

```text
先不要修改文件。请先阅读当前项目结构，用简单中文告诉我你看到了哪些文件，以及你准备怎么做。等待我确认后再编辑。
```

这样可以先确认 Codex 是否打开了正确的项目目录，也能避免它直接改错文件。

## 三、CC Switch：它负责什么

根据 CC Switch 官网介绍，它是一个 **AI 编程 CLI 统一管理工具**，核心是帮助你管理多个 CLI 工具的供应商配置和工作流。它支持的范围包括 Codex、Claude Code、Gemini CLI、OpenCode、OpenClaw、Hermes Agent 等，并包含供应商配置、本地路由、MCP、Skills、会话和用量等能力。

### 用 CC Switch 的基本流程

1. 从 [ccswitch.io](https://www.ccswitch.io) 或官网链接到的官方仓库获取安装包。
2. 安装并打开 CC Switch。
3. 在工具列表中选择你已经安装的 CLI。
4. 在供应商页面添加你自己的供应商信息：名称、协议、Base URL、模型和 API Key。具体字段以当前版本界面为准。
5. 使用“测试”或类似功能确认供应商可用。
6. 再切换到目标供应商，启动对应的 CLI。

### CC Switch 与中转 API 的关系

CC Switch 本身不是中转站，也不会凭空提供模型额度。你仍然需要：

- 官方账号，或
- 你自己注册的 API 服务商账号，或
- 你信任的第三方中转服务账号。

中转服务会看到你发送给它的请求。使用前应查看服务商的隐私、计费、保留日志和退款规则，不要把敏感项目源码发送给不信任的服务商。

## 四、Codex++：它负责什么

根据 Codex++ 官方 README，它是 **面向 OpenAI Codex / ChatGPT 桌面应用的外部启动器与管理工具**。它通过 Chromium DevTools Protocol 和本地辅助服务工作，不修改官方应用的 `app.asar`，也不向安装目录写补丁文件。

### 安装 Codex++

从 [Codex++ Releases](https://github.com/BigPizzaV3/CodexPlusPlus/releases) 下载最新版：

- Windows：文件名类似 `CodexPlusPlus-*-windows-x64-setup.exe`
- macOS Intel：文件名类似 `CodexPlusPlus-*-macos-x64.dmg`
- macOS Apple Silicon：文件名类似 `CodexPlusPlus-*-macos-arm64.dmg`

安装后通常有两个入口：

- **Codex++**：启动官方桌面应用并加载已保存的供应商配置和增强功能。
- **Codex++ 管理工具**：管理供应商、模型、会话、工具插件、增强功能、脚本、更新和诊断。

首次使用按官方 README 的建议：先打开管理工具，确认官方应用路径和运行状态，再配置供应商或增强功能，最后从 Codex++ 入口启动。

### 在 Codex++ 中接入兼容 API

Codex++ 官方 README 明确区分了几种供应商模式：

- **官方登录**：只使用 ChatGPT / Codex 官方账号。
- **官方登录 + API**：保留官方账号和插件入口，但模型请求走兼容 API。
- **纯 API**：不依赖官方账号，使用自定义 Base URL 和 Key。
- **聚合供应商**：在多个普通 API 供应商之间路由。

具体配置请在 Codex++ 管理工具中完成，不要照抄网上流传的旧版 JSON。当前 README 提到的配置数据位置是：

- Codex 配置：`~/.codex/config.toml`
- Codex 登录状态：`~/.codex/auth.json`
- Codex++ 状态与日志：`~/.codex-session-delete/`

不要把 `auth.json`、API Key 或包含 Key 的配置文件上传到 GitHub。

## 五、DeepSeek API：能用，但要分清边界

DeepSeek 是独立的模型和 API 服务。它在中国大陆通常可以直接访问，但它不是 OpenAI Codex，也不会因为安装 Codex 就自动出现。

### 正确的接入思路

1. 在 DeepSeek 官方平台注册账号并创建 API Key。
2. 查看 DeepSeek 当前 API 文档，确认可用的 Base URL、协议和模型名。
3. 确认你使用的工具支持自定义供应商：例如 CC Switch 或 Codex++ 的对应模式。
4. 在工具的供应商界面填写 Base URL、API Key、协议和模型。
5. 先用工具内的测试功能验证，再启动 Codex。

### 不要复制网上的旧配置

网上常见的“一键配置”文章，可能把不同项目、不同版本的命令和配置文件混在一起。本文不提供未经对应项目 README 确认的安装命令、配置键名或配置文件路径。

不同工具、不同版本的配置字段不能混用。看到配置示例时，必须确认它属于哪个工具、哪个版本，并从对应项目的官方发布页重新核对。

## 六、Watt Toolkit：只讲它真正做的事

Watt Toolkit 官方 README 将它介绍为“开源跨平台的多功能游戏工具箱”，原名 Steam++，其大部分功能需要安装 Steam。它不是 OpenAI、Codex、CC Switch 或 GPT 中转服务。

因此，本教程只建议把它当作**可选的 GitHub 访问/下载辅助工具**来了解：

- 它不是 Codex 的安装前置条件。
- 它不是 OpenAI API 加速器。
- 它不能替你注册 API、提供模型额度或配置 DeepSeek。
- 使用前应以 Watt Toolkit 当前官方 README 和软件界面为准。

## 七、最小安全配置

### API Key

- 只在可信的官方平台或你选择的供应商设置页面输入。
- 不要写进 Git 仓库、README、截图、聊天记录或 issue。
- 如果不小心泄露，立刻到供应商后台撤销并重新创建。

### 项目权限

第一次使用 AI 编程工具时：

1. 先备份项目，或使用 Git。
2. 先让工具阅读和解释，不要立即自动执行。
3. 对删除文件、安装依赖、联网、提交代码等操作逐项确认。
4. 让工具修改后查看差异，再运行测试。

### 给小白的第一条任务

```text
请先不要修改任何文件。阅读当前项目，告诉我入口文件、主要目录和运行方式。如果需要安装依赖或执行命令，先列出命令并说明用途，等待我确认。
```

## 八、常见问题

### 为什么有了 Codex 还要 CC Switch 或 Codex++？

它们解决的是管理问题，不是同一个产品：CC Switch 面向多个 AI CLI 的供应商和工作流管理；Codex++ 面向桌面版 Codex / ChatGPT 的外部启动和管理。只想使用官方 Codex 时，不需要强行安装它们。

### Watt Toolkit 能不能解决 Codex 连接 OpenAI 的问题？

不能把它当作解决方案。Watt Toolkit 官方 README 的定位是游戏工具箱。本教程不声称它能加速 OpenAI API。

### DeepSeek 能不能直接替代 OpenAI Codex？

不能简单这样说。DeepSeek 是模型/API，Codex 是编程产品/工具。要把 DeepSeek 用进 Codex 工作流，必须有一个明确支持自定义供应商和兼容协议的中间工具，并按该工具版本配置。

### 为什么网上教程的配置文件不一样？

因为可能是不同产品、不同版本、不同安装方式，或者是非官方工具。先确认教程讲的是官方 Codex、CC Switch、Codex++ 还是其他项目，再核对对应项目的 README 和发行版本。

## 参考资料

- [CC Switch 官网](https://www.ccswitch.io)
- [Codex++ 官方 README](https://github.com/BigPizzaV3/CodexPlusPlus/blob/main/README.md)
- [Codex++ Releases](https://github.com/BigPizzaV3/CodexPlusPlus/releases)
- [Watt Toolkit 官方 README](https://github.com/lanyongjia/watt-toolkit/blob/develop/README.md)
- [OpenAI Codex 官方文档](https://developers.openai.com/codex)
- [DeepSeek 官方平台](https://platform.deepseek.com)

> 资料会更新。安装命令、版本要求、配置字段和供应商兼容性都应以对应项目当前官方页面为准。
