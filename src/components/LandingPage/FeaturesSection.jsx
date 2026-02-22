"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  Target,
  Search,
  Sparkles,
  FileType,
  GripVertical,
  FileDown,
  Copy,
} from "lucide-react";

const features = [
  { icon: CheckCircle2, label: "ATS Compatibility Check" },
  { icon: Target, label: "Resume–Job Description Match Score" },
  { icon: Search, label: "Keyword Gap Analysis" },
  { icon: Sparkles, label: "AI-Powered Resume Suggestions" },
  { icon: FileType, label: "Multiple Resume Formats" },
  { icon: GripVertical, label: "Drag-and-Drop Resume Sections" },
  { icon: FileDown, label: "Export to PDF" },
  { icon: Copy, label: "Save Multiple Resume Versions" },
];

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50 text-black py-16 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-black">
          Everything You Need to Land Interviews
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, label }) => (
            <Card
              key={label}
              className="border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="flex items-start gap-4 py-5 px-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-medium text-gray-900 pt-0.5">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
