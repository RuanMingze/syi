'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const repoUrl = 'https://github.com/RuanMingze/Sylphplay'
const releasesUrl = `${repoUrl}/releases`
const issuesUrl = `${repoUrl}/issues`

type Section = { id: string; label: string }

const sections: Section[] = [
  { id: 'start', label: '快速开始' },
  { id: 'env', label: '环境要求' },
  { id: 'build', label: '如何编译' },
  { id: 'build-notes', label: '构建注意事项' },
  { id: 'structure', label: '项目结构' },
  { id: 'ci', label: '持续集成' },
  { id: 'contribute', label: '如何贡献' },
  { id: 'links', label: '相关链接' },
]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function Code({ children }: { children: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-xl bg-[#191919] p-5 text-[13px] leading-6 text-[#e8e3dc]">
      <code>{children}</code>
    </pre>
  )
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-black/10 pt-10" data-aos="fade-up">
      <h2 className="text-2xl font-semibold tracking-[-.04em] sm:text-3xl">{title}</h2>
      <div className="mt-5 space-y-4 text-sm leading-7 text-[#6c6964]">{children}</div>
    </section>
  )
}

export default function DeveloperPage() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 })
  }, [])

  return (
    <main className="min-h-screen bg-[#f5f3ef] text-[#151515]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10" data-aos="fade-down">
        <Link href="/" className="flex items-center gap-3" aria-label="返回 Sylphplay 首页">
          <img src="/sylphplay-icon.png" alt="Sylphplay" className="h-9 w-9 rounded-full object-cover" />
          <span className="text-lg font-bold tracking-[-.04em]">Sylphplay</span>
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/" className="hidden rounded-full border border-black/10 px-5 py-2.5 text-[#6c6964] transition-colors hover:text-[#151515] sm:block">
            返回首页
          </Link>
          <a href={repoUrl} target="_blank" rel="noreferrer" className="rounded-full bg-[#191919] px-5 py-2.5 font-medium text-white transition-transform hover:-translate-y-1">
            GitHub <Arrow />
          </a>
        </div>
      </nav>

      <header className="mx-auto max-w-7xl px-6 pb-14 pt-10 lg:px-10 lg:pb-20 lg:pt-16" data-aos="fade-up">
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-[#77736d]">
          <span className="h-2 w-2 rounded-full bg-[#ff6b1a]" />
          Developer docs
        </div>
        <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-.07em] sm:text-6xl lg:text-7xl">
          开发者文档
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6c6964]">
          面向想参与 Sylphplay 的开发者的操作手册：如何准备环境、如何编译桌面版与手机版、项目结构，以及如何贡献。
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#build" className="rounded-full bg-[#191919] px-6 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-1">
            直接看编译步骤 <span aria-hidden="true">↓</span>
          </a>
          <Link href="/" className="rounded-full border border-black/15 bg-white px-6 py-3.5 text-sm font-medium hover:bg-[#faf9f7]">
            了解产品
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl gap-14 px-6 pb-28 lg:grid lg:grid-cols-[220px_1fr] lg:px-10">
        <aside className="hidden lg:block">
          <div className="sticky top-10 rounded-2xl border border-black/10 bg-white p-5" data-aos="fade-up">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[.18em] text-[#8d8982]">目录</p>
            <nav className="flex flex-col gap-1 text-sm text-[#6c6964]">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="rounded-lg px-3 py-2 transition-colors hover:bg-[#f5f3ef] hover:text-[#151515]">
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <div className="mt-14 space-y-12 lg:mt-0">
          <Block id="start" title="快速开始">
            <p>桌面版基于 <strong className="font-semibold text-[#151515]">Electron</strong>，手机版基于 <strong className="font-semibold text-[#151515]">Flutter</strong>。克隆仓库后，按下面的命令即可跑起来。</p>
            <Code>{`# 克隆仓库
git clone ${repoUrl}.git
cd Sylphplay

# 1. 安装依赖（务必使用 pnpm）
pnpm install

# 2. 启动
pnpm start      # 生产模式
pnpm dev        # 开发模式（带 --dev 标记）`}</Code>
          </Block>

          <Block id="env" title="环境要求">
            <ul className="space-y-2">
              <li>· <strong className="text-[#151515]">操作系统</strong>：Windows 10 / 11、macOS 10.15+、主流 Linux 发行版（x64）</li>
              <li>· <a className="text-[#ef5f18] hover:underline" href="https://nodejs.org" target="_blank" rel="noreferrer">Node.js</a>：<strong className="text-[#151515]">22+</strong>（pnpm 12 要求 Node 22 起）</li>
              <li>· 包管理器：<a className="text-[#ef5f18] hover:underline" href="https://pnpm.io" target="_blank" rel="noreferrer">pnpm</a>（推荐 <strong className="text-[#151515]">12+</strong>，构建脚本白名单见 <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">pnpm-workspace.yaml</code>）</li>
              <li>· .NET SDK：<strong className="text-[#151515]">net10.0</strong>（仅 Windows 构建 <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">assoc-helper</code> 时需要）</li>
              <li>· 手机版额外需要 Flutter SDK（Dart <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">&gt;=3.4.0</code>）</li>
            </ul>
            <p className="text-[#8d8982]">仓库默认使用官方源（npm 官方仓库 / Electron 官方分发）；国内本地开发若嫌慢，可在用户级 <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">~/.npmrc</code> 自行配置镜像，不影响仓库。</p>
          </Block>

          <Block id="build" title="如何编译">
            <p className="font-semibold text-[#151515]">桌面版</p>
            <p>构建产物统一输出到 <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">dist/</code>。按目标平台选择命令：</p>
            <Code>{`pnpm dist:win     # Windows：NSIS 安装包（会先编译 .NET helper）
pnpm dist:mac     # macOS：dmg
pnpm dist:linux   # Linux：deb

# pnpm dist 等价于 pnpm dist:win`}</Code>
            <p className="pt-2 font-semibold text-[#151515]">手机版</p>
            <Code>{`cd mobile

flutter pub get                  # 安装依赖
flutter run                      # 调试运行
flutter build apk --release      # 构建 Android APK
flutter build ipa --release      # 构建 iOS 包（需 macOS + Xcode）`}</Code>
          </Block>

          <Block id="build-notes" title="构建注意事项">
            <ul className="space-y-2">
              <li>· <strong className="text-[#151515]">macOS 包必须在 macOS 上构建</strong>：生成 <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">.icns</code> / <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">.dmg</code> 依赖系统的 <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">iconutil</code>、<code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">hdiutil</code>，需安装 Xcode Command Line Tools。产物默认未签名。</li>
              <li>· <strong className="text-[#151515]">Linux 包建议在 Linux（或 Docker）中构建</strong>：deb 需要 <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">dpkg</code>、<code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">fakeroot</code> 与 <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">binutils</code>（<code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">ar</code>）。</li>
              <li>· 原生依赖（<code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">sharp</code>、<code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">@resvg/resvg-js</code>）会按各平台自动安装对应二进制，无需额外处理。</li>
            </ul>
          </Block>

          <Block id="structure" title="项目结构">
            <Code>{`.
├── main.js                  # 主进程：窗口管理、系统集成、IPC、托盘、桌面歌词、DLC
├── preload.js               # 预加载脚本：安全暴露 window.sylph API
├── package.json             # 依赖 / 打包配置（electron-builder）
├── pnpm-workspace.yaml      # pnpm 配置：允许 electron 执行安装脚本
├── .github/workflows/       # CI：按 tag 构建各端产物（仅上传 artifact）
├── app/                     # 渲染进程：主界面、桌面歌词、对齐窗口
├── assets/                  # 图标与 Font Awesome 静态资源
├── assoc-helper/            # C# 文件关联工具（net10，仅 Windows）
├── mobile/                  # 手机版 Flutter 工程
└── dist/                    # 构建输出目录（勿提交）`}</Code>
            <p><strong className="text-[#151515]">架构</strong>：桌面版采用 Electron 经典三进程模型 —— 主进程只管系统集成，渲染进程负责全部业务 UI 与媒体逻辑，通过 <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">window.sylph</code> 与主进程通信；<code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">assoc-helper</code> 是独立 .NET 单文件，仅在用户点击「设为默认打开方式」时调用。</p>
          </Block>

          <Block id="ci" title="持续集成">
            <p>仓库通过 <strong className="text-[#151515]">GitHub Actions</strong> 在各平台原生 runner 上并行构建（Windows / macOS / Linux / Android / iOS 各一个工作流）。</p>
            <ul className="space-y-2">
              <li>· 触发方式：推送 <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">v*</code> tag，或手动 <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">workflow_dispatch</code></li>
              <li>· 工作流<strong className="text-[#151515]">只上传构建产物（artifact），不发布 Release</strong>，Release 由维护者手动发布</li>
              <li>· 不使用依赖缓存，避免缓存导致的构建异常</li>
            </ul>
          </Block>

          <Block id="contribute" title="如何贡献">
            <p>欢迎提交 Issue 与 Pull Request。动手前请先阅读 <code className="rounded bg-black/5 px-1.5 py-0.5 text-[13px]">CONTRIBUTING.md</code>（贡献规范与产品方向约束）。</p>
            <div className="rounded-2xl border border-black/10 bg-white p-5">
              <p className="font-semibold text-[#151515]">关于「加曲库」类 PR</p>
              <p className="mt-2">Sylphplay 是定位明确的<strong className="text-[#151515]">本地播放器</strong>（音频 + 视频 + 图片）。<strong className="text-[#151515]">我们不会</strong>添加音乐市场、在线曲库或付费/版权内容功能——这既出于个人项目的版权与付费现实，也为了避免偏离「不只做音乐」的产品初心。此类请求会被友好地关闭。</p>
            </div>
          </Block>

          <Block id="links" title="相关链接">
            <div className="grid gap-3 sm:grid-cols-2">
              <a href={repoUrl} target="_blank" rel="noreferrer" className="group rounded-2xl border border-black/10 bg-white p-5 transition-transform hover:-translate-y-1">
                <span className="flex items-center justify-between text-xs text-[#8d8982]"><span>源码仓库</span><Arrow /></span>
                <strong className="mt-8 block text-lg">GitHub 仓库</strong>
                <span className="mt-1 block text-xs text-[#8d8982]">RuanMingze/Sylphplay</span>
              </a>
              <a href={releasesUrl} target="_blank" rel="noreferrer" className="group rounded-2xl border border-black/10 bg-white p-5 transition-transform hover:-translate-y-1">
                <span className="flex items-center justify-between text-xs text-[#8d8982]"><span>下载</span><Arrow /></span>
                <strong className="mt-8 block text-lg">Releases</strong>
                <span className="mt-1 block text-xs text-[#8d8982]">各平台安装包</span>
              </a>
              <a href={issuesUrl} target="_blank" rel="noreferrer" className="group rounded-2xl border border-black/10 bg-white p-5 transition-transform hover:-translate-y-1">
                <span className="flex items-center justify-between text-xs text-[#8d8982]"><span>反馈</span><Arrow /></span>
                <strong className="mt-8 block text-lg">Issues</strong>
                <span className="mt-1 block text-xs text-[#8d8982]">报告问题与建议</span>
              </a>
              <Link href="/" className="group rounded-2xl border border-black/10 bg-white p-5 transition-transform hover:-translate-y-1">
                <span className="flex items-center justify-between text-xs text-[#8d8982]"><span>返回</span><Arrow /></span>
                <strong className="mt-8 block text-lg">产品介绍</strong>
                <span className="mt-1 block text-xs text-[#8d8982]">回到首页</span>
              </Link>
            </div>
          </Block>
        </div>
      </div>

      <footer className="flex flex-col gap-6 bg-[#191919] px-6 py-8 text-sm text-white/50 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-4 md:flex-row md:items-center">
          <span className="font-semibold text-white">Sylphplay</span>
          <span>© 2026 Ruanftrix. All rights reserved.</span>
          <span className="flex items-center gap-4">
            <Link href="/" className="font-medium text-white/70 hover:text-white">返回首页</Link>
            <a href={repoUrl} target="_blank" rel="noreferrer" className="font-medium text-white/70 hover:text-white">GitHub ↗</a>
          </span>
        </div>
      </footer>
    </main>
  )
}