"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const points = [
  "Tailored optimization for every job",
  "AI-driven keyword matching",
  "Built for modern ATS systems",
  "Saves hours of manual editing",
  "Clean, professional resume templates",
];

export default function WhyChooseSection() {
  return (
    <section className="bg-gray-50 text-black py-16 md:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-black">
          Why Choose ResumeSync?
        </h2>
        <ul className="mt-10 space-y-3">
          {points.map((text, i) => (
            <li key={i}>
              <Card className="border-gray-200 bg-white shadow-sm">
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="font-medium text-gray-900">{text}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-gray-700 font-medium">
          Unlike generic resume builders, ResumeSync adapts your resume for each
          specific job.
        </p>
      </div>
    </section>
  );
}
