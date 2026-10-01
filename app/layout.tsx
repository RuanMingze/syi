import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sylphplay — 所有媒体，一处播放',
  description: 'Sylphplay 是 Ruanftrix 旗下的多功能媒体播放器，支持音乐、视频和图片播放，覆盖 iOS、Android、Windows、macOS 与 Linux。',
  generator: 'Ruanftrix',
  icons: {
    icon: '/sylphplay-icon.png',
    apple: '/sylphplay-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
