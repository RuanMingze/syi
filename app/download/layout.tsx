import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "下载 — Sylphplay",
  description: "下载 Sylphplay 各平台最新版本。Windows / macOS / Linux / Android / iOS。",
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
