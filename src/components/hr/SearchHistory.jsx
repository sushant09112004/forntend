"use client";

import { Clock, History } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchHistory({ history = [], onSelect, activeQuery }) {
  if (!history.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 p-4 text-center">
        <History className="mx-auto mb-2 size-5 text-gray-400" />
        <p className="text-xs text-gray-500">Recent searches appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {history.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect(item)}
          className={cn(
            "flex w-full items-start gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition-all hover:border-gray-400 hover:bg-gray-50/50",
            activeQuery === item
              ? "border-gray-400 bg-gray-50 text-black"
              : "border-gray-200 bg-white text-gray-700"
          )}
        >
          <Clock className="mt-0.5 size-3.5 shrink-0 text-gray-400" />
          <span className="line-clamp-2">{item}</span>
        </button>
      ))}
    </div>
  );
}
