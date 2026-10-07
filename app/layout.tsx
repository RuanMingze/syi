import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sylphplay — 所有媒体，一处播放',
  description: 'Sylphplay 是 Ruanftrix 旗下的多功能媒体播放器，支持音乐、视频和图片播放，覆盖 iOS、Android、Windows、macOS 与 Linux。',
  icons: {
    icon: '/sylphplay-icon.png',
    apple: '/sylphplay-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: 'black',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
