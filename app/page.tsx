'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'

const releasesUrl = 'https://github.com/RuanMingze/Sylphplay/releases'

const downloads = [
  ['Windows', 'x64', 'https://gh-proxy.com/https://github.com/RuanMingze/Sylphplay/releases/download/v1.0.0/Sylphplay-1.0.0-Windows-x64-Setup.exe', ''],
  ['macOS', 'x64', 'https://gh-proxy.com/https://github.com/RuanMingze/Sylphplay/releases/download/v1.0.0/Sylphplay-1.0.0-macOS-x64-Setup.dmg', ''],
  ['Linux', 'x64', 'https://gh-proxy.com/https://github.com/RuanMingze/Sylphplay/releases/download/v1.0.0/Sylphplay-1.0.0-Linux-x64-Setup.deb', '4'],
  ['Android', 'APK', 'https://gh-proxy.com/https://github.com/RuanMingze/Sylphplay/releases/download/v1.0.0/Sylphplay-1.0.0-Android.apk', ''],
  ['iOS', 'IPA', 'https://gh-proxy.com/https://github.com/RuanMingze/Sylphplay/releases/download/v1.0.0/Sylphplay-1.0.0-iOS.ipa', '5'],
]

function Arrow() { return <span aria-hidden="true">↗</span> }

type MediaFeature = {
  icon: string
  title: string
  description: string
  detail: string
  image: string
  imageAlt: string
  className: string
}

type IndexMetric = {
  label: string
  value: number
  suffix: string
  description: string
  color: string
}

const indexMetrics: IndexMetric[] = [
  { label: '功能可用性', value: 85, suffix: '%', description: '持续完善中的真实状态', color: '#ef5f18' },
  { label: '默认网络请求', value: 0, suffix: '%', description: '默认不联网，保持本地优先', color: '#3f7770' },
  { label: '跨平台可用性', value: 99, suffix: '%', description: '覆盖桌面端与移动端', color: '#6b5d91' },
]

function IndexValue({ metric }: { metric: IndexMetric }) {
  const [value, setValue] = useState(metric.value === 0 ? 100 : 0)
  const [isVisible, setIsVisible] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = targetRef.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.35 })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const startValue = metric.value === 0 ? 100 : 0
    const duration = 1500
    const startTime = performance.now()
    let frameId = 0

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const nextValue = startValue + (metric.value - startValue) * easedProgress
      setValue(Math.round(nextValue))
      if (progress < 1) frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [isVisible, metric.value])

  return <div ref={targetRef} className="rounded-[1.5rem] border border-black/10 bg-[#f8f7f4] p-6" data-aos="fade-up">
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-sm font-semibold text-[#716e68]">{metric.label}</span>
      <strong className="text-5xl font-semibold tracking-[-.08em]" style={{ color: metric.color }}>{value}{metric.suffix}</strong>
    </div>
    <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-black/8" aria-hidden="true"><div className="h-full rounded-full transition-[width] duration-100" style={{ width: `${value}%`, backgroundColor: metric.color }} /></div>
    <p className="mt-4 text-xs leading-5 text-[#8d8982]">{metric.description}</p>
  </div>
}

const mediaFeatures: MediaFeature[] = [
  {
    icon: '♫',
    title: '沉浸式音乐',
    description: '自动识别歌词，让音乐不只被听见，也被看见。',
    detail: '支持歌词同步、播放速度与音量调节，让每一次聆听都保持自己的节奏。',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%9F%B3%E9%A2%91%E6%88%AA%E5%9B%BE-Usa6R732abv1gh0BNJDK8IvurXY2dW.png',
    imageAlt: 'Sylphplay 音乐歌词播放界面',
    className: 'bg-[#fff1e8]',
  },
  {
    icon: '▷',
    title: '流畅视频',
    description: '打开即播，清晰呈现每一帧画面与声音。',
    detail: '专注于播放本身，支持全屏观看、进度控制与常用视频格式。',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%A7%86%E9%A2%91%E6%88%AA%E5%9B%BE-0YYOAZdpJnz7ND1cCAzzniqWnu6wXH.png',
    imageAlt: 'Sylphplay 视频播放界面',
    className: 'bg-[#f2f0eb]',
  },
  {
    icon: '▧',
    title: '自由浏览图片',
    description: '用更大的视野查看、切换和欣赏你的图片。',
    detail: '沉浸式查看图片，支持缩放、切换与鹰眼图导航，浏览过程清晰顺手。',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%9C%8B%E5%9B%BE%E6%88%AA%E5%9B%BE-jrzUCtCeHOq6nKp1futDjEoqPNDjQt.png',
    imageAlt: 'Sylphplay 图片浏览界面',
    className: 'bg-[#e9f0f2]',
  },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState<MediaFeature | null>(null)
  useEffect(() => { AOS.init({ duration: 750, easing: 'ease-out-cubic', once: true, offset: 80 }) }, [])

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f3ef] text-[#151515]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10" data-aos="fade-down" data-aos-duration="600">
        <a href="#top" className="flex items-center gap-3" aria-label="Sylphplay 首页"><img src="/sylphplay-icon.png" alt="Sylphplay" className="h-9 w-9 rounded-full object-cover" /><span className="text-lg font-bold tracking-[-.04em]">Sylphplay</span></a>
        <div className="hidden items-center gap-8 text-sm text-[#716e68] md:flex"><a href="#features" className="hover:text-[#151515]">功能</a><a href="#preview" className="hover:text-[#151515]">界面</a><a href="#download" className="hover:text-[#151515]">下载</a></div>
        <a href="#download" className="hidden rounded-full bg-[#191919] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-1 md:block">立即下载 <Arrow /></a>
        <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-full border border-black/10 px-3 py-2 text-sm md:hidden" aria-label="打开菜单">菜单</button>
      </nav>
      {menuOpen && <div className="mx-6 mb-4 rounded-2xl bg-white p-4 md:hidden"><div className="flex flex-col gap-4 text-sm"><a href="#features">功能</a><a href="#preview">界面</a><a href="#download">下载</a></div></div>}

      <section id="top" className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-10 lg:pb-32 lg:pt-24">
        <div data-aos="fade-up"><div className="mb-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-[#77736d]"><span className="h-2 w-2 rounded-full bg-[#ff6b1a]" />Media, made simple</div><h1 className="max-w-xl text-6xl font-semibold leading-[.94] tracking-[-.08em] sm:text-7xl lg:text-[6.4rem]">所有媒体，<br /><em className="not-italic text-[#ef5f18]">一处播放。</em></h1><p className="mt-8 max-w-lg text-lg leading-8 text-[#6c6964]">Sylphplay 是一款面向所有设备的多功能媒体播放器。音乐、视频与图片，在一个安静、专注的空间里自然流动。</p><div className="mt-10 flex flex-wrap gap-3"><a href="#download" className="rounded-full bg-[#191919] px-6 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-1">下载 Sylphplay <Arrow /></a><a href="#preview" className="rounded-full border border-black/15 bg-white px-6 py-3.5 text-sm font-medium hover:bg-[#faf9f7]">查看界面</a></div><div className="mt-16 flex flex-wrap gap-8 text-xs text-[#8d8982]"><span>音乐 · 视频 · 图片</span><span>iOS / Android / Desktop</span><span>本地 · 默认不联网</span></div></div>
        <div className="relative" data-aos="fade-left" data-aos-delay="150"><div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-[#f7b28d]/35 blur-3xl" /><div className="relative overflow-hidden rounded-[2rem] border-[10px] border-[#1e1b17] bg-[#1e1b17] shadow-2xl"><img src="/sylphplay-main.png" alt="Sylphplay 主界面预览" className="aspect-[16/10] w-full object-cover object-center" /></div><div className="absolute -bottom-5 -left-5 rounded-2xl bg-[#191919] px-5 py-4 text-white shadow-xl"><p className="text-[10px] uppercase tracking-[.2em] text-white/45">One player</p><p className="mt-1 text-sm font-semibold">五大平台支持</p></div></div>
      </section>

      <section id="features" className="border-t border-black/10 bg-white px-6 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-7xl"><div className="max-w-2xl" data-aos="fade-up"><p className="mb-4 text-sm font-semibold text-[#ef5f18]">它不止是播放器</p><h2 className="text-4xl font-semibold tracking-[-.06em] sm:text-6xl">每一种媒体，<br />都有自己的节奏。</h2></div><div className="mt-16 grid gap-4 md:grid-cols-3">{mediaFeatures.map((feature, index) => <button type="button" key={feature.title} onClick={() => setSelectedFeature(feature)} className={`group rounded-[2rem] p-7 text-left transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef5f18] ${feature.className}`} data-aos="fade-up" data-aos-delay={index * 100}><div className="flex items-start justify-between"><div className="text-3xl" aria-hidden="true">{feature.icon}</div><span className="text-xl opacity-40 transition-transform group-hover:translate-x-1" aria-hidden="true">↗</span></div><h3 className="mt-20 text-xl font-semibold">{feature.title}</h3><p className="mt-3 text-sm leading-7 text-[#716e68]">{feature.description}</p><span className="mt-6 block text-xs font-semibold text-[#ef5f18]">查看详情</span></button>)}</div></div></section>

      {selectedFeature && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6" role="presentation" onClick={() => setSelectedFeature(null)}><section role="dialog" aria-modal="true" aria-labelledby="feature-dialog-title" className="w-full max-w-md rounded-[2rem] bg-[#fffaf6] p-7 text-[#191919] shadow-2xl" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between"><div className="text-4xl" aria-hidden="true">{selectedFeature.icon}</div><button type="button" onClick={() => setSelectedFeature(null)} className="rounded-full px-3 py-1 text-xl text-[#716e68] hover:bg-black/5" aria-label="关闭详情">×</button></div><h2 id="feature-dialog-title" className="mt-8 text-2xl font-semibold">{selectedFeature.title}</h2><img src={selectedFeature.image} alt={selectedFeature.imageAlt} className="mt-5 aspect-video w-full rounded-2xl object-cover" /><p className="mt-4 text-sm leading-7 text-[#716e68]">{selectedFeature.detail}</p><button type="button" onClick={() => setSelectedFeature(null)} className="mt-7 rounded-full bg-[#191919] px-5 py-3 text-sm font-medium text-white">知道了</button></section></div>}

      <section id="index" className="border-t border-black/10 bg-[#fffaf6] px-6 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-7xl"><div className="max-w-2xl" data-aos="fade-up"><p className="mb-4 text-sm font-semibold text-[#ef5f18]">透明指数</p><h2 className="text-4xl font-semibold tracking-[-.06em] sm:text-6xl">不夸大，<br />把现在做到的写清楚。</h2><p className="mt-6 max-w-xl text-sm leading-7 text-[#716e68]">这些数字是当前版本的可用性参考，不是承诺。默认保持本地优先，功能也会随着每次更新继续变得完整。</p></div><div className="mt-14 grid gap-4 md:grid-cols-3">{indexMetrics.map((metric) => <IndexValue key={metric.label} metric={metric} />)}</div></div></section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-32"><div data-aos="fade-right"><p className="mb-4 text-sm font-semibold text-[#ef5f18]">歌词工具</p><h2 className="text-4xl font-semibold tracking-[-.06em] sm:text-6xl">听歌时，<br />歌词自动跟上。</h2><p className="mt-6 max-w-md text-sm leading-7 text-[#716e68]">Sylphplay 会自动识别当前音乐的歌词。需要更精准的体验时，还可以下载强制对齐歌词 DLC，让每一句歌词都与节拍准确贴合。</p><div className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#191919] px-5 py-3 text-sm text-white"><span className="h-2 w-2 rounded-full bg-[#ff6b1a]" />强制对齐歌词 DLC<sup className="ml-0.5 text-[10px] font-bold text-[#ff8a4d]" aria-label="脚注 1">1</sup></div></div><div className="relative" data-aos="fade-left"><div className="absolute -inset-4 rounded-[2rem] bg-[#ffd9c5] blur-2xl" /><img src="/sylphplay-sync.png" alt="Sylphplay 强制对齐歌词工具截图" className="relative w-full rounded-[1.5rem] border-8 border-[#211b15] shadow-xl" /></div></section>

      <section id="preview" className="bg-[#191919] px-6 py-24 text-white lg:px-10 lg:py-32"><div className="mx-auto max-w-7xl"><div data-aos="fade-up"><p className="mb-4 text-sm font-semibold text-[#ff8a4d]">界面预览</p><h2 className="text-4xl font-semibold tracking-[-.06em] sm:text-6xl">专注内容，<br />而不是按钮。</h2></div><div className="mt-14 grid gap-5 md:grid-cols-2"><div className="overflow-hidden rounded-[1.5rem] border border-white/10" data-aos="zoom-in"><div className="relative"><img src="/sylphplay-gallery.png" alt="Sylphplay 图片浏览界面" className="aspect-video w-full object-cover" /><span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff8a4d] text-xs font-bold text-[#191919]" aria-label="脚注 2">2</span></div></div><div className="overflow-hidden rounded-[1.5rem] border border-white/10" data-aos="zoom-in" data-aos-delay="120"><img src="/sylphplay-home.png" alt="Sylphplay 主页面界面" className="aspect-video w-full object-cover" /></div></div></div></section>

      <section id="download" className="bg-[#ef5f18] px-6 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-7xl"><div data-aos="fade-up"><p className="mb-5 text-sm font-semibold text-orange-100">现在就开始</p><h2 className="max-w-3xl text-5xl font-semibold tracking-[-.07em] text-white sm:text-7xl">你的媒体，<br />由你来播放。</h2></div><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{downloads.map(([name, meta, url, note], index) => <a key={name} href={url} data-aos="fade-up" data-aos-delay={index * 70} className="group rounded-2xl bg-white/10 p-5 text-white transition-colors hover:bg-white hover:text-[#191919]"><span className="flex items-center justify-between text-xs opacity-60"><span>0{index + 1}</span><Arrow /></span><strong className="mt-10 block text-lg">{name}</strong><span className="mt-1 block text-xs opacity-60">{meta} · v1.0.0{note && <sup className="ml-1 font-bold" aria-label={`脚注 ${note}`}>{note}</sup>}</span></a>)}</div><div className="mt-8 flex flex-wrap items-center gap-4"><a href={releasesUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#ef5f18] transition-transform hover:-translate-y-1">查看全部版本 Releases <Arrow /></a><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white" aria-label="脚注 3">3</span></div></div></section>

      <footer className="flex flex-col gap-6 bg-[#191919] px-6 py-8 text-sm text-white/50 lg:px-10"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><span className="font-semibold text-white">Sylphplay</span><span>© 2026 Ruanftrix. All rights reserved.</span><span className="flex flex-wrap items-center gap-3"><span className="hidden sm:inline">Made for every kind of media.</span><a href={releasesUrl} target="_blank" rel="noreferrer" className="font-medium text-white/70 hover:text-white">Releases ↗</a><Link href="/developer" className="rounded-full bg-white/10 px-5 py-2.5 font-medium text-white transition-colors hover:bg-white hover:text-[#191919]">开发者文档</Link></span></div><div className="flex flex-col gap-2 border-t border-white/10 pt-5 text-xs leading-5 text-white/40"><p><span className="mr-2 font-semibold text-white/65">1：</span>强制对齐歌词 DLC 目前仅支持 Windows。</p><p><span className="mr-2 font-semibold text-white/65">2：</span>图片预览中的鹰眼图功能需手动开启。</p><p><span className="mr-2 font-semibold text-white/65">3：</span>目前电脑端暂时只支持 64 位系统。</p><p><span className="mr-2 font-semibold text-white/65">4：</span>Linux 目前仅提供 deb 安装包，暂不提供 AppImage 等其它格式。</p><p><span className="mr-2 font-semibold text-white/65">5：</span>iOS 安装包为未签名 IPA，需借助 AltStore、Sideloadly 等工具重签名后侧载安装。</p></div></footer>
    </main>
  )
}
