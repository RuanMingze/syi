"use client";

import { useEffect, useState } from "react";

function detectOS(): string | null {
  if (typeof navigator === "undefined") return null;

  const ua = navigator.userAgent;
  const platform = navigator.platform || "";

  if (/Win32|Win64|Windows/i.test(ua)) return "windows";
  if (/iPhone|iPod/i.test(ua)) return "ios";
  if (/iPad/i.test(ua)) return "ios";
  if (platform === "MacIntel" && navigator.maxTouchPoints > 1) return "ios";
  if (/Macintosh|Mac OS X/i.test(ua)) return "macos";
  if (/Android/i.test(ua)) return "android";
  if (/Linux|X11/i.test(ua)) return "linux";

  return null;
}

export function RecommendedBadge({ platformId }: { platformId: string }) {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    setMatch(detectOS() === platformId);
  }, [platformId]);

  if (!match) return null;

  return (
    <span className="shrink-0 rounded-full bg-[#ef5f18] px-3 py-1 text-xs font-medium text-white">
      适合您的系统
    </span>
  );
}
