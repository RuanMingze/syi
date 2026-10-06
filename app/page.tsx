"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
const releasesUrl = "https://github.com/RuanMingze/Sylphplay/releases";
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
type MediaFeature = {
  icon: string;
  title: string;
  description: string;
  detail: string;
  image: string;
  imageAlt: string;
  className: string;
};
type IndexMetric = {
  label: string;
  value: number;
  suffix: string;
  description: string;
  color: string;
};
const indexMetrics: IndexMetric[] = [
  {
    label: "功能可用性",
    value: 85,
    suffix: "%",
    description: "持续完善中的真实状态",
    color: "#ef5f18",
  },
  {
    label: "默认网络请求",
    value: 0,
    suffix: "%",
    description: "默认不联网，保持本地优先",
    color: "#3f7770",
  },
  {
    label: "跨平台可用性",
    value: 92,
    suffix: "%",
    description: "覆盖桌面端与移动端",
    color: "#6b5d91",
  },
];
function IndexValue({ metric }: { metric: IndexMetric }) {
  const [value, setValue] = useState(metric.value === 0 ? 100 : 0);
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!isVisible) return;
    const startValue = metric.value === 0 ? 100 : 0;
    const duration = 1500;
    const startTime = performance.now();
    let frameId = 0;
    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue =
        startValue + (metric.value - startValue) * easedProgress;
      setValue(Math.round(nextValue));
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible, metric.value]);
  return (
    <div
      ref={targetRef}
      className="rounded-[1.5rem] border border-black/10 bg-[#f8f7f4] p-6"
      data-aos="fade-up"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-semibold text-[#716e68]">
          {metric.label}
        </span>
        <strong
          className="text-5xl font-semibold tracking-[-.08em]"
          style={{ color: metric.color }}
        >
          {value}
          {metric.suffix}
        </strong>
      </div>
      <div
        className="mt-6 h-1.5 overflow-hidden rounded-full bg-black/8"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full transition-[width] duration-100"
          style={{ width: `${value}%`, backgroundColor: metric.color }}
        />
      </div>
      <p className="mt-4 text-xs leading-5 text-[#8d8982]">
        {metric.description}
      </p>
    </div>
  );
}
const mediaFeatures: MediaFeature[] = [
  {
    icon: "♫",
    title: "沉浸式音乐",
    description: "自动识别歌词，让音乐不只被听见，也被看见。",
    detail: "支持歌词同步、播放速度与音量调节，让每一次聆听都保持自己的节奏。",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%9F%B3%E9%A2%91%E6%88%AA%E5%9B%BE-Usa6R732abv1gh0BNJDK8IvurXY2dW.png",
    imageAlt: "Sylphplay 音乐歌词播放界面",
    className: "bg-[#fff1e8]",
  },
  {
    icon: "▷",
    title: "流畅视频",
    description: "打开即播，清晰呈现每一帧画面与声音。",
    detail: "专注于播放本身，支持全屏观看、进度控制与常用视频格式。",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E8%A7%86%E9%A2%91%E6%88%AA%E5%9B%BE-0YYOAZdpJnz7ND1cCAzzniqWnu6wXH.png",
    imageAlt: "Sylphplay 视频播放界面",
    className: "bg-[#f2f0eb]",
  },
  {
    icon: "▧",
    title: "自由浏览图片",
    description: "用更大的视野查看、切换和欣赏你的图片。",
    detail: "沉浸式查看图片，支持缩放、切换与鹰眼图导航，浏览过程清晰顺手。",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E7%9C%8B%E5%9B%BE%E6%88%AA%E5%9B%BE-jrzUCtCeHOq6nKp1futDjEoqPNDjQt.png",
    imageAlt: "Sylphplay 图片浏览界面",
    className: "bg-[#e9f0f2]",
  },
];
export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<MediaFeature | null>(
    null
  );
  const [mediaIndex, setMediaIndex] = useState(0);
  const [previousMediaIndex, setPreviousMediaIndex] = useState<number | null>(null);
  const mediaTypes = ["图片", "音乐", "视频"];
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPreviousMediaIndex(mediaIndex);
      setMediaIndex((currentIndex) => (currentIndex + 1) % mediaTypes.length);
      window.setTimeout(() => setPreviousMediaIndex(null), 520);
    }, 2200);
    return () => window.clearInterval(intervalId);
  }, [mediaIndex, mediaTypes.length]);
  useEffect(() => {
    AOS.init({
      duration: 750,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);
  return (
    <>
      <style jsx>{`
        @keyframes media-enter {
          from { opacity: 0; transform: translateY(70%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes media-exit {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-70%); }
        }
        .media-enter { animation: media-enter 520ms cubic-bezier(.22, 1, .36, 1) both; }
        .media-exit { animation: media-exit 520ms cubic-bezier(.22, 1, .36, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .media-enter, .media-exit { animation: none; }
        }
      `}</style>
      <main className="min-h-screen overflow-hidden bg-[#f5f3ef] text-[#151515]">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10"
        data-aos="fade-down"
        data-aos-duration="600"
      >
        <a
          href="#top"
          className="flex items-center gap-3"
          aria-label="Sylphplay 首页"
        >
          <img
            src="/sylphplay-icon.png"
            alt="Sylphplay"
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="text-lg font-bold tracking-[-.04em]">Sylphplay</span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-[#716e68] md:flex">
          <a href="#features" className="hover:text-[#151515]">
            功能
          </a>
          <a href="#preview" className="hover:text-[#151515]">
            界面
          </a>
          <a href="#experimental" className="hover:text-[#151515]">
            实验性
          </a>
          <a href="#feedback" className="hover:text-[#151515]">
            反馈
          </a>
          <a href="/download" className="hover:text-[#151515]">
            下载
          </a>
        </div>
        <a
          href="/download"
          className="hidden rounded-full bg-[#191919] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-1 md:block"
        >
          立即下载 <Arrow />
        </a>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-full border border-black/10 px-3 py-2 text-sm md:hidden"
          aria-label="打开菜单"
        >
          菜单
        </button>
      </nav>
      {menuOpen && (
        <div className="mx-6 mb-4 rounded-2xl bg-white p-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm">
            <a href="#features">功能</a>
            <a href="#preview">界面</a>
            <a href="/download">下载</a>
          </div>
        </div>
      )}
      <section
        id="top"
        className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-10 lg:pb-32 lg:pt-24"
      >
        <div data-aos="fade-up">
          <div className="mb-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-[#77736d]">
            <span className="h-2 w-2 rounded-full bg-[#ff6b1a]" />
            Media, made simple
          </div>
          <h1 className="max-w-xl text-5xl font-semibold leading-[1.08] tracking-[-.07em] sm:text-6xl lg:text-[5.2rem]">
            所有
            <span
              className="relative inline-block min-w-[2em] text-[#ef5f18]"
              aria-live="polite"
              aria-atomic="true"
            >
              {previousMediaIndex !== null && (
                <span className="media-exit absolute inset-0" aria-hidden="true">
                  {mediaTypes[previousMediaIndex]}
                </span>
              )}
              <span key={mediaIndex} className="media-enter inline-block">
                {mediaTypes[mediaIndex]}
              </span>
            </span>
            ，
            <br />
            <em className="not-italic text-[#ef5f18]">一处播放。</em>
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-8 text-[#6c6964]">
            Sylphplay
            是一款面向所有设备的多功能媒体播放器。音乐、视频与图片，在一个安静、专注的空间里自然流动。
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="/download"
              className="rounded-full bg-[#191919] px-6 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-1"
            >
              下载 Sylphplay <Arrow />
            </a>
            <a
              href="#preview"
              className="rounded-full border border-black/15 bg-white px-6 py-3.5 text-sm font-medium hover:bg-[#faf9f7]"
            >
              查看界面
            </a>
          </div>
          <div className="mt-16 flex flex-wrap gap-8 text-xs text-[#8d8982]">
            <span>音乐 · 视频 · 图片</span>
            <span>iOS / Android / Desktop</span>
            <span>本地 · 默认不联网</span>
          </div>
        </div>
        <div className="relative" data-aos="fade-left" data-aos-delay="150">
          <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-[#f7b28d]/35 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border-[10px] border-[#1e1b17] bg-[#1e1b17] shadow-2xl">
            <img
              src="/sylphplay-main.png"
              alt="Sylphplay 主界面预览"
              className="aspect-[16/10] w-full object-cover object-center"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl bg-[#191919] px-5 py-4 text-white shadow-xl">
            <p className="text-[10px] uppercase tracking-[.2em] text-white/45">
              One player
            </p>
            <p className="mt-1 text-sm font-semibold">五大平台支持</p>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="border-t border-black/10 bg-white px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl" data-aos="fade-up">
            <p className="mb-4 text-sm font-semibold text-[#ef5f18]">
              它不止是播放器
            </p>
            <h2 className="text-4xl font-semibold tracking-[-.06em] sm:text-6xl">
              每一种媒体，
              <br />
              都有自己的节奏。
            </h2>
          </div>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {mediaFeatures.map((feature, index) => (
              <button
                type="button"
                key={feature.title}
                onClick={() => setSelectedFeature(feature)}
                className={`group rounded-[2rem] p-7 text-left transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef5f18] ${feature.className}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-start justify-between">
                  <div className="text-3xl" aria-hidden="true">
                    {feature.icon}
                  </div>
                  <span
                    className="text-xl opacity-40 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>
                <h3 className="mt-20 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#716e68]">
                  {feature.description}
                </p>
                <span className="mt-6 block text-xs font-semibold text-[#ef5f18]">
                  查看详情
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
      {selectedFeature && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
          role="presentation"
          onClick={() => setSelectedFeature(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="feature-dialog-title"
            className="w-full max-w-md rounded-[2rem] bg-[#fffaf6] p-7 text-[#191919] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="text-4xl" aria-hidden="true">
                {selectedFeature.icon}
              </div>
              <button
                type="button"
                onClick={() => setSelectedFeature(null)}
                className="rounded-full px-3 py-1 text-xl text-[#716e68] hover:bg-black/5"
                aria-label="关闭详情"
              >
                ×
              </button>
            </div>
            <h2
              id="feature-dialog-title"
              className="mt-8 text-2xl font-semibold"
            >
              {selectedFeature.title}
            </h2>
            <img
              src={selectedFeature.image}
              alt={selectedFeature.imageAlt}
              className="mt-5 aspect-video w-full rounded-2xl object-cover"
            />
            <p className="mt-4 text-sm leading-7 text-[#716e68]">
              {selectedFeature.detail}
            </p>
            <button
              type="button"
              onClick={() => setSelectedFeature(null)}
              className="mt-7 rounded-full bg-[#191919] px-5 py-3 text-sm font-medium text-white"
            >
              知道了
            </button>
          </section>
        </div>
      )}
      <section
        id="index"
        className="border-t border-black/10 bg-[#fffaf6] px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl" data-aos="fade-up">
            <p className="mb-4 text-sm font-semibold text-[#ef5f18]">
              透明指数
            </p>
            <h2 className="text-4xl font-semibold tracking-[-.06em] sm:text-6xl">
              不夸大，
              <br />
              把现在做到的写清楚。
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#716e68]">
              这些数字是当前版本的可用性参考，不是承诺。默认保持本地优先，功能也会随着每次更新继续变得完整。
            </p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {indexMetrics.map((metric) => (
              <IndexValue key={metric.label} metric={metric} />
            ))}
          </div>
        </div>
      </section>
      <section
        id="preview"
        className="bg-[#191919] px-6 py-24 text-white lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div data-aos="fade-up">
            <p className="mb-4 text-sm font-semibold text-[#ff8a4d]">
              界面预览
            </p>
            <h2 className="text-4xl font-semibold tracking-[-.06em] sm:text-6xl">
              专注内容，
              <br />
              而不是按钮。
            </h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <div
              className="overflow-hidden rounded-[1.5rem] border border-white/10"
              data-aos="zoom-in"
            >
              <div className="relative">
                <img
                  src="/sylphplay-gallery.png"
                  alt="Sylphplay 图片浏览界面"
                  className="aspect-video w-full object-cover"
                />
                <span
                  className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff8a4d] text-xs font-bold text-[#191919]"
                  aria-label="脚注 1"
                >
                  1
                </span>
              </div>
            </div>
            <div
              className="overflow-hidden rounded-[1.5rem] border border-white/10"
              data-aos="zoom-in"
              data-aos-delay="120"
            >
              <img
                src="/sylphplay-home.png"
                alt="Sylphplay 主页面界面"
                className="aspect-video w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        id="download"
        className="bg-[#ef5f18] px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div data-aos="fade-up">
            <p className="mb-5 text-sm font-semibold text-orange-100">
              现在就开始
            </p>
            <h2 className="max-w-3xl text-5xl font-semibold tracking-[-.07em] text-white sm:text-7xl">
              你的媒体，
              <br />
              由你来播放。
            </h2>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4" data-aos="fade-up" data-aos-delay="80">
            <a
              href="/download"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#ef5f18] transition-transform hover:-translate-y-1"
            >
              前往下载页 ↗
            </a>
            <a
              href={releasesUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              GitHub Releases
            </a>
            <span className="text-sm text-white/70">
              v1.0.2 · Windows x64 / 32-bit · macOS Intel / Apple Silicon · Linux deb / rpm / AppImage · Android · iOS
            </span>
          </div>
        </div>
      </section>
      <section
        id="experimental"
        className="border-t border-black/10 bg-[#211a13] px-6 py-24 text-[#f6eee5] lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl" data-aos="fade-up">
            <p className="mb-4 text-sm font-semibold text-[#ff8a4d]">
              实验性功能
            </p>
            <h2 className="text-4xl font-semibold tracking-[-.06em] sm:text-6xl">
              正在变好，
              <br />
              也还不够稳定。
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#b8a99b]">
              这些功能正在持续测试中，可能会出现异常或在后续版本中调整。欢迎通过反馈渠道告诉我们你的使用体验。
            </p>
          </div>
          <div className="mt-14 grid gap-3 lg:grid-cols-2">
            <div
              className="rounded-[1.5rem] border border-[#6b4d36] bg-[#19130e] p-6"
              data-aos="fade-up"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#ff8a4d]">
                    实验 · 歌词
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">
                    歌词逐字渐变填充
                  </h3>
                </div>
                <span className="rounded-full bg-[#ff7411] px-3 py-1 text-xs font-semibold text-white">
                  测试中
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#b8a99b]">
                歌词逐渐播放，当前行文字自左向右逐字填充，适合更细腻的跟唱体验。
              </p>
              <div className="mt-6 h-px bg-[#493526]" />
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-[#8c7968]">稳定性</span>
                <span className="font-semibold text-[#ff9a5e]">实验性</span>
              </div>
            </div>
            <div
              className="rounded-[1.5rem] border border-[#6b4d36] bg-[#19130e] p-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#ff8a4d]">
                    实验 · 播放
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">自动寻找歌词</h3>
                </div>
                <span className="rounded-full bg-[#ff7411] px-3 py-1 text-xs font-semibold text-white">
                  测试中
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#b8a99b]">
                本地歌词缺失时，联网从 LRC
                资源中查找。结果可能不准确，请以实际匹配效果为准。
              </p>
              <div className="mt-6 h-px bg-[#493526]" />
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-[#8c7968]">需要网络</span>
                <span className="font-semibold text-[#ff9a5e]">可选开启</span>
              </div>
            </div>
            <div
              className="rounded-[1.5rem] border border-[#6b4d36] bg-[#19130e] p-6 lg:col-span-2"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#ff8a4d]">
                    实验 · DLC
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">强制对齐 DLC</h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#b8a99b]">
                    字数级歌词对齐工具，下载后可在播放器中使用。目前仅支持
                    Windows，功能仍在持续调校。
                  </p>
                </div>
                <a
                  href={releasesUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-xl bg-[#ff7411] px-5 py-3 text-center text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  查看 Releases ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="feedback"
        className="border-t border-black/10 bg-[#fffaf6] px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl" data-aos="fade-up">
            <p className="mb-4 text-sm font-semibold text-[#ef5f18]">
              反馈渠道
            </p>
            <h2 className="text-4xl font-semibold tracking-[-.06em] sm:text-6xl">
              遇到问题，
              <br />
              欢迎告诉我们。
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#716e68]">
              无论是功能建议、问题反馈，还是使用中的小发现，都可以通过下面的渠道联系我们。
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <a
              href="mailto:sylphplay@ruanftrix.cn"
              className="group rounded-[1.5rem] border border-black/10 bg-white p-6 transition-transform hover:-translate-y-1"
              data-aos="fade-up"
            >
              <div className="flex items-start justify-between">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0e8] text-xl text-[#ef5f18]"
                  aria-hidden="true"
                >
                  @
                </span>
                <span
                  className="text-xl text-[#a29d95] transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
              <h3 className="mt-10 text-xl font-semibold">发送邮件</h3>
              <p className="mt-2 text-sm text-[#716e68]">
                sylphplay@ruanftrix.cn
              </p>
            </a>
            <a
              href="https://github.com/RuanMingze/Sylphplay/issues"
              target="_blank"
              rel="noreferrer"
              className="group rounded-[1.5rem] border border-black/10 bg-white p-6 transition-transform hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="flex items-start justify-between">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#191919] text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  GH
                </span>
                <span
                  className="text-xl text-[#a29d95] transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
              <h3 className="mt-10 text-xl font-semibold">GitHub Issues</h3>
              <p className="mt-2 text-sm text-[#716e68]">
                提交 Bug、建议或功能讨论
              </p>
            </a>
          </div>
        </div>
      </section>
      <footer className="flex flex-col gap-6 bg-[#191919] px-6 py-8 text-sm text-white/50 lg:px-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <span className="font-semibold text-white">Sylphplay</span>
          <span>© 2026 Ruanftrix. All rights reserved.</span>
          <span className="flex flex-wrap items-center gap-3">
            <span className="hidden sm:inline">
              Made for every kind of media.
            </span>
            <a
              href="#experimental"
              className="font-medium text-white/70 hover:text-white"
            >
              实验性功能
            </a>
            <a
              href="#feedback"
              className="font-medium text-white/70 hover:text-white"
            >
              反馈
            </a>
            <a
              href={releasesUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-white/70 hover:text-white"
            >
              Releases ↗
            </a>
            <a
              href="https://github.com/RuanMingze/Sylphplay/wiki"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white/10 px-5 py-2.5 font-medium text-white transition-colors hover:bg-white hover:text-[#191919]"
            >
              文档 ↗
            </a>
          </span>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/10 pt-5 text-xs leading-5 text-white/40">
          <p>
            <span className="mr-2 font-semibold text-white/65">1：</span>
            图片预览中的鹰眼图功能需手动开启。
          </p>
          <p>
            <span className="mr-2 font-semibold text-white/65">2：</span>
            Windows 32 位暂不提供强制对齐 DLC / 默认打开方式功能（.NET 10 已砍 win-x86 RID）。
          </p>
          <p>
            <span className="mr-2 font-semibold text-white/65">3：</span>
            Linux 提供 deb / rpm / AppImage 三种安装包，按需选择。
          </p>
          <p>
            <span className="mr-2 font-semibold text-white/65">4：</span>iOS
            安装包为未签名 IPA，需借助 AltStore、Sideloadly
            等工具重签名后侧载安装。
          </p>
        </div>
      </footer>
      </main>
    </>
  );
}
