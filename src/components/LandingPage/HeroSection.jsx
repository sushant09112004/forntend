"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, FileCheck, Lock } from "lucide-react";

export default function HeroSection() {
  const trustItems = [
    { icon: Sparkles, label: "AI Powered" },
    { icon: FileCheck, label: "ATS Optimized" },
    { icon: Lock, label: "Secure & Private" },
  ];

  return (
    <section className="relative bg-white text-black py-16 md:py-24 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black max-w-4xl mx-auto leading-tight">
          Sync Your Resume With Any Job Description in Seconds
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          ResumeSync uses AI to analyze your resume against job descriptions,
          optimize keywords, improve ATS compatibility, and increase your
          interview chances.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="rounded-lg px-8 text-base font-semibold bg-black hover:bg-gray-800 text-white">
            <Link href="/home">Upload Resume</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-lg px-8 text-base font-semibold border-2 border-black text-black hover:bg-gray-100">
            <Link href="/home">Try Free Now</Link>
          </Button>
        </div>
        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {trustItems.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-gray-700 font-medium"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
                <Icon className="h-4 w-4 text-black" />
              </div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
