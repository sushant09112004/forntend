"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-white px-4 pb-20 pt-20 md:pb-32 md:pt-28">
      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-medium tracking-wide text-gray-600">
          AI-Powered Resume Platform
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-black sm:text-5xl md:text-6xl lg:text-7xl">
          Your resume,{" "}
          <span className="block">perfectly synced.</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-500 sm:text-xl">
          Match your resume to any job description. Optimize for ATS.
          Get hired faster. Built for candidates and HR teams.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-black px-8 text-base font-semibold text-white hover:bg-gray-800"
          >
            <Link href="/signup">
              Get Started Free
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-full border-2 border-black px-8 text-base font-semibold text-black hover:bg-gray-50"
          >
            <Link href="/hr/login">HR Portal</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 flex max-w-md justify-center gap-12 border-t border-gray-100 pt-8">
          <div className="text-center">
            <p className="text-2xl font-bold text-black">10K+</p>
            <p className="mt-1 text-xs font-medium text-gray-400">Resumes Optimized</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-black">95%</p>
            <p className="mt-1 text-xs font-medium text-gray-400">ATS Pass Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-black">3x</p>
            <p className="mt-1 text-xs font-medium text-gray-400">More Interviews</p>
          </div>
        </div>
      </div>
    </section>
  );
}
