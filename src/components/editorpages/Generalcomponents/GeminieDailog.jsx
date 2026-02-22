"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SiGooglegemini } from "react-icons/si";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGeneralPurposeAI } from "@/hooks/useGeneralPurposeAI";

const PREDEFINED_OPTIONS = [
  { label: "Make more professional", value: "Rewrite this to sound more professional and polished for a resume." },
  { label: "Make more concise", value: "Shorten and tighten this. Keep only the most impactful points." },
  { label: "Make more impactful", value: "Rewrite with stronger action verbs and clearer impact. Keep it short." },
  { label: "Shorten", value: "Reduce length. Keep 1-3 bullet points or 2-3 short sentences only." },
  { label: "Make more detailed (brief)", value: "Add a bit more concrete detail (metrics, tools, outcomes) but keep it resume-length." },
];

/**
 * Reusable Gemini dialog: predefined options + custom text, resume context, strict short output.
 * @param {string} context - Resume/section text sent to Gemini as context (e.g. current description)
 * @param {(text: string) => void} onResult - Callback with the generated text
 * @param {string} [placeholder] - Placeholder for custom input
 * @param {string} [sectionLabel] - Optional label for accessibility
 */
export function GeminieDialog({ context = "", onResult, placeholder = "Or type your own instruction...", sectionLabel = "Edit with AI" }) {
  const { generate, loading, error } = useGeneralPurposeAI();
  const [customInput, setCustomInput] = useState("");
  const [open, setOpen] = useState(false);

  const runGenerate = async (userMessage) => {
    if (!userMessage?.trim()) return;
    try {
      const response = await generate(userMessage.trim(), context || undefined);
      if (response && onResult) onResult(response);
      setOpen(false);
      setCustomInput("");
    } catch (_) {
      // error state from hook
    }
  };

  const handlePredefined = (value) => {
    runGenerate(value);
  };

  const handleCustomSubmit = (e) => {
    e?.preventDefault();
    if (customInput.trim()) runGenerate(customInput.trim());
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          aria-label={sectionLabel}
          disabled={loading}
        >
          <SiGooglegemini className="h-5 w-5 text-blue-500" />
          {loading && <span className="text-xs text-gray-500">...</span>}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-2">
        <DropdownMenuGroup>
          {PREDEFINED_OPTIONS.map((opt) => (
            <DropdownMenuItem
              key={opt.label}
              onSelect={(e) => {
                e.preventDefault();
                handlePredefined(opt.value);
              }}
              disabled={loading}
            >
              {opt.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <form onSubmit={handleCustomSubmit} className="mt-2 space-y-2">
          <Label className="text-xs text-muted-foreground">Custom</Label>
          <div className="flex gap-2">
            <Input
              placeholder={placeholder}
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1"
              disabled={loading}
            />
            <Button type="submit" size="sm" disabled={loading || !customInput.trim()}>
              Send
            </Button>
          </div>
        </form>
        {error && (
          <p className="mt-2 text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
