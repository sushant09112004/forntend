"use client";

import { cn } from "@/lib/utils";

export function ScoreProgress({ score, size = "md", className }) {
  const value = Math.min(100, Math.max(0, score || 0));
  const radius = size === "lg" ? 40 : size === "sm" ? 24 : 32;
  const stroke = size === "lg" ? 6 : 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const color =
    value >= 80
      ? "text-black"
      : value >= 60
        ? "text-gray-700"
        : value >= 40
          ? "text-gray-500"
          : "text-gray-400";

  const dim = (radius + stroke) * 2;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={dim} height={dim} className="-rotate-90">
        <circle
          cx={radius + stroke}
          cy={radius + stroke}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-gray-100"
        />
        <circle
          cx={radius + stroke}
          cy={radius + stroke}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn("transition-all duration-700 ease-out", color)}
        />
      </svg>
      <span
        className={cn(
          "absolute font-semibold",
          size === "lg" ? "text-xl" : size === "sm" ? "text-xs" : "text-sm",
          color
        )}
      >
        {Math.round(value)}%
      </span>
    </div>
  );
}
