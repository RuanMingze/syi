import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "下载 — Sylphplay",
  description: "下载 Sylphplay 各平台最新版本。Windows / macOS / Linux / Android / iOS。",
};

const RELEASES_URL = "https://github.com/RuanMingze/Sylphplay/releases";

const GH = (path: string) =>
  `https://gh-proxy.com/https://github.com/RuanMingze/Sylphplay/releases/download/v1.0.2/${path}`;

type Build = { label: string; url: string; suffix?: string };
type Platform = {
  id: string;
  name: string;
  subtitle: string;
  main: Build;
  extras?: Build[];
  note?: string;
  badge?: string;
};

const platforms: Platform[] = [
  {
    id: "windows",
    name: "Windows",
    subtitle: "Windows 10 / 11 · 64 位",
    badge: "推荐",
    main: {
      label: "Windows x64 · Setup.exe",
      url: GH("Sylphplay-1.0.2-Windows-x64-Setup.exe"),
      suffix: ".exe · 117 MB",
    },
    extras: [
      {
        label: "Windows 32 位（ia32）",
        url: GH("Sylphplay-1.0.2-Windows-ia32-Setup.exe"),
        suffix: ".exe · 111 MB",
      },
    ],
    note:
      "32 位版本暂不提供强制对齐 DLC / 默认打开方式功能（.NET 10 已移除 win-x86 RID）。",
  },
  {
    id: "macos",
    name: "macOS",
    subtitle: "macOS 12+",
    badge: "Apple Silicon",
    main: {
      label: "macOS arm64（M 系列）· .dmg",
      url: GH("Sylphplay-1.0.2-macOS-arm64-Setup.dmg"),
      suffix: ".dmg · 113 MB",
    },
    extras: [
      {
        label: "macOS x64（Intel）· .dmg",
        url: GH("Sylphplay-1.0.2-macOS-x64-Setup.dmg"),
        suffix: ".dmg · 118 MB",
      },
    ],
  },
  {
    id: "linux",
    name: "Linux",
    subtitle: "x86_64 内核 4.15+",
    badge: "任选其一",
    main: {
      label: "AppImage · 通用",
      url: GH("Sylphplay-1.0.2-Linux-x86_64-linux.AppImage"),
      suffix: ".AppImage · 131 MB",
    },
    extras: [
      {
        label: "deb · Debian / Ubuntu",
        url: GH("Sylphplay-1.0.2-Linux-amd64-linux.deb"),
        suffix: ".deb · 93 MB",
      },
      {
        label: "rpm · Fedora / RHEL / openSUSE",
        url: GH("Sylphplay-1.0.2-Linux-x86_64-linux.rpm"),
        suffix: ".rpm · 92 MB",
      },
    ],
  },
  {
    id: "android",
    name: "Android",
    subtitle: "Android 8.0+",
    main: {
      label: "Android APK",
      url: GH("Sylphplay-1.0.2-Android.apk"),
      suffix: ".apk · 64 MB",
    },
  },
  {
    id: "ios",
    name: "iOS",
    subtitle: "iOS 13+",
    badge: "未签名",
    main: {
      label: "iOS IPA",
      url: GH("Sylphplay-1.0.2-iOS.ipa"),
      suffix: ".ipa · 10 MB",
    },
    note:
      "安装包未签名，需借助 AltStore、Sideloadly 等工具重签名后侧载安装。",
  },
];

function PlatformCard({ p }: { p: Platform }) {
  return (
    <section
      id={p.id}
      className="group relative rounded-2xl border border-black/10 bg-white p-6 transition hover:border-black/20 hover:shadow-lg"
    >
      <header className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{p.name}</h2>
          <p className="mt-1 text-sm text-[#716e68]">{p.subtitle}</p>
        </div>
        {p.badge && (
          <span className="shrink-0 rounded-full border border-black/10 bg-[#f5f3ef] px-3 py-1 text-xs font-medium text-[#716e68]">
            {p.badge}
          </span>
        )}
      </header>
      <a
        href={p.main.url}
        className="block rounded-xl bg-[#191919] px-5 py-4 text-left text-white transition hover:bg-[#333]"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">{p.main.label}</div>
            {p.main.suffix && (
              <div className="mt-0.5 text-xs text-white/60">
                {p.main.suffix}
              </div>
            )}
          </div>
          <span className="text-lg leading-none opacity-60 transition group-hover:translate-x-0.5 group-hover:opacity-100">
            ↓
          </span>
        </div>
      </a>
      {p.extras && p.extras.length > 0 && (
        <ul className="mt-3 space-y-2">
          {p.extras.map((e) => (
            <li key={e.label}>
              <a
                href={e.url}
                className="flex items-center justify-between gap-3 rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#716e68] transition hover:border-black/20 hover:bg-[#faf9f7] hover:text-[#151515]"
              >
                <span>{e.label}</span>
                {e.suffix && (
                  <span className="shrink-0 text-xs text-[#8d8982]">
                    {e.suffix}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
      {p.note && (
        <p className="mt-4 rounded-lg border border-black/10 bg-[#faf9f7] px-3 py-2 text-xs leading-relaxed text-[#8d8982]">
          {p.note}
        </p>
      )}
    </section>
  );
}

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-[#f5f3ef] text-[#151515]">
      <header className="sticky top-0 z-10 border-b border-black/10 bg-[#f5f3ef]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold tracking-tight">
            Sylphplay
          </Link>
          <nav className="flex items-center gap-5 text-sm text-[#716e68]">
            <Link href="/" className="hover:text-[#151515]">
              返回首页
            </Link>
            <a
              href={RELEASES_URL}
              className="hover:text-[#151515]"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Releases ↗
            </a>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            下载 Sylphplay
          </h1>
          <p className="mt-3 max-w-2xl text-[#6c6964]">
            最新版本 v1.0.2，跨平台多媒体播放器。所有构建产物均通过 GitHub Actions
            自动打包，签名 / 未签名状态已在下方标注。
          </p>
          <p className="mt-2 text-xs text-[#8d8982]">
            下载链接使用 gh-proxy 加速；若节点不可用，可在{" "}
            <a
              className="underline hover:text-[#151515]"
              href={RELEASES_URL}
              target="_blank"
              rel="noreferrer"
            >
              GitHub Releases
            </a>{" "}
            直接下载。
          </p>
        </div>
        <nav className="mb-10 flex flex-wrap gap-2">
          {platforms.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="rounded-full border border-black/10 bg-white px-4 py-1.5 text-sm text-[#716e68] transition hover:border-black/20 hover:bg-[#faf9f7] hover:text-[#151515]"
            >
              {p.name}
            </a>
          ))}
        </nav>
        <div className="grid gap-5 md:grid-cols-2">
          {platforms.map((p) => (
            <PlatformCard key={p.id} p={p} />
          ))}
        </div>
        <footer className="mt-14 rounded-xl border border-black/10 bg-white p-6 text-sm text-[#716e68]">
          <ul className="space-y-2">
            <li>
              <span className="mr-2 font-semibold text-[#151515]">•</span>
              图片预览中的鹰眼图功能需在设置里手动开启。
            </li>
            <li>
              <span className="mr-2 font-semibold text-[#151515]">•</span>
              32 位 Windows 版本暂不提供强制对齐 DLC / 默认打开方式功能。
            </li>
            <li>
              <span className="mr-2 font-semibold text-[#151515]">•</span>
              Linux 三种安装包任选其一；AppImage 通吃主流发行版，deb / rpm
              适合系统包管理器生态。
            </li>
            <li>
              <span className="mr-2 font-semibold text-[#151515]">•</span>
              iOS 安装包为未签名 IPA，需借助 AltStore / Sideloadly
              等工具重签名后侧载安装。
            </li>
          </ul>
        </footer>
        <div className="mt-10 flex items-center justify-between text-xs text-[#8d8982]">
          <span>Sylphplay · Ruanftrix</span>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#716e68]"
          >
            查看全部 Releases ↗
          </a>
        </div>
      </div>
    </main>
  );
}
