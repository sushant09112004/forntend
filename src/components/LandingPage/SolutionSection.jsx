"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, BarChart3, Send } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload your resume." },
  { icon: FileText, title: "Paste the job description." },
  { icon: BarChart3, title: "Get an instant match score." },
  { icon: Send, title: "Apply with an optimized resume." },
];

export default function SolutionSection() {
  return (
    <section className="bg-white text-black py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-black">
          Meet ResumeSync
        </h2>
        <p className="mt-6 text-lg text-gray-700 text-center max-w-2xl mx-auto">
          ResumeSync intelligently compares your resume with any job description
          and gives you a detailed match score, keyword gaps, and AI-powered
          improvement suggestions.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ icon: Icon, title }, i) => (
            <Card
              key={i}
              className="border-gray-200 bg-white text-center shadow-sm"
            >
              <CardContent className="pt-6 pb-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white mb-3">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Step {i + 1}
                </span>
                <p className="mt-1 font-medium text-black">{title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild size="lg" className="rounded-lg bg-black hover:bg-gray-800 text-white">
            <Link href="/home">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
