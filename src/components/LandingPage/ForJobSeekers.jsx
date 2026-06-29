"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Upload,
  ScanSearch,
  Sparkles,
  FileDown,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "Upload Your Resume",
    description:
      "Drop your existing resume in PDF or DOC format. We securely parse every detail.",
  },
  {
    icon: ScanSearch,
    number: "02",
    title: "Paste the Job Description",
    description:
      "Add the role you're targeting. Our AI matches keywords, skills, and context instantly.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Get Your Match Score",
    description:
      "See exactly where you stand — keyword gaps, ATS compatibility, and AI suggestions to improve.",
  },
  {
    icon: FileDown,
    number: "04",
    title: "Download & Apply",
    description:
      "Export your optimized resume in professional formats and apply with confidence.",
  },
];

export default function ForJobSeekers() {
  return (
    <section id="for-seekers" className="bg-gray-50 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
            For Job Seekers
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Land more interviews, effortlessly.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-gray-500">
            Stop sending the same resume everywhere. ResumeSync tailors your
            resume for every application with AI-powered optimization.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {steps.map(({ icon: Icon, number, title, description }) => (
            <div
              key={number}
              className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                  <Icon className="size-5" />
                </div>
                <span className="text-sm font-semibold text-gray-300">
                  {number}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-black">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-black px-8 text-base font-semibold text-white hover:bg-gray-800"
          >
            <Link href="/signup">
              Start Optimizing
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <p className="mt-3 text-xs text-gray-400">
            Free to use · No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}
