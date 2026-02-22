"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, Scan, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Resume",
    description: "Upload your existing resume in PDF or DOC format.",
  },
  {
    icon: FileText,
    title: "Add Job Description",
    description: "Paste the job description you want to apply for.",
  },
  {
    icon: Scan,
    title: "Analyze & Optimize",
    description:
      "ResumeSync scans keywords, skills, and relevance using AI.",
  },
  {
    icon: Download,
    title: "Download & Apply",
    description: "Download your optimized resume and apply confidently.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-white text-black py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-black">
          How ResumeSync Works
        </h2>
        <div className="mt-12 space-y-6">
          {steps.map(({ icon: Icon, title, description }, i) => (
            <Card
              key={i}
              className="border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-6 px-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-black text-white text-xl font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-black flex items-center gap-2">
                    <Icon className="h-5 w-5 text-gray-600" />
                    {title}
                  </h3>
                  <p className="mt-1 text-gray-700">{description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
