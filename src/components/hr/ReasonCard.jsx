import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function ReasonCard({ reason, className }) {
  if (!reason) return null;

  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50/80 to-white p-4",
        className
      )}
    >
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-black">
        <Sparkles className="size-4" />
        AI Match Reason
      </div>
      <p className="text-sm leading-relaxed text-gray-700">{reason}</p>
    </div>
  );
}
