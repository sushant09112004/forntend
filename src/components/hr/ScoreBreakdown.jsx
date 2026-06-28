"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";

const BREAKDOWN_LABELS = {
  skill: "Skill",
  role: "Role",
  semantic: "Semantic",
  bm25: "BM25",
  experience: "Experience",
  achievements: "Achievements",
  location: "Location",
  notice: "Notice",
};

export function ScoreBreakdown({ breakdown = {} }) {
  const entries = Object.entries(breakdown).filter(
    ([, value]) => value !== undefined && value !== null
  );

  if (!entries.length) return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="breakdown" className="border-none">
        <AccordionTrigger className="py-2 text-sm font-medium text-gray-700 hover:no-underline">
          Score Breakdown
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 pt-1">
            {entries.map(([key, value]) => (
              <div key={key} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">
                    {BREAKDOWN_LABELS[key] || key}
                  </span>
                  <span className="font-medium text-gray-800">{value}%</span>
                </div>
                <Progress value={value} className="h-1.5 bg-gray-100 [&>div]:bg-black" />
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
