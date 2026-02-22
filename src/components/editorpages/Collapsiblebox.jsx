"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { GeminieDialog } from "./Generalcomponents/GeminieDailog";

export default function Collapsiblebox({ item, onChange, onAiResult }) {
  const [isOpen, setIsOpen] = useState(false);
  const summary = item?.summary ?? "";

  return (
    <div className="border-b border-gray-300 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="font-medium text-lg">Progessional Summary </span>
        <span className="text-xl">
          {isOpen ? "-" : "+"}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 mt-2" : "max-h-0"
        }`}
      >
        <div className="mt-2">
          <div className="flex items-center justify-between gap-2 mb-1">
            <Label className="text-sm text-muted-foreground">Summary</Label>
            {onAiResult && (
              <GeminieDialog
                context={summary}
                onResult={onAiResult}
                placeholder="e.g. more executive, add metrics..."
                sectionLabel="Edit summary with AI"
              />
            )}
          </div>
          <textarea
            value={summary}
            onChange={onChange}
            rows={4}
            placeholder="Enter your professional summary..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
      </div>
    </div>
  );
}
