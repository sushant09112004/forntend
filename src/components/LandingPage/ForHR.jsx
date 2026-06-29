"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Search,
  Star,
  BarChart3,
  Brain,
  Users,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Semantic Candidate Search",
    description:
      "Describe your ideal hire in plain English. Our AI finds the best matches from the candidate pool using deep semantic analysis.",
  },
  {
    icon: Brain,
    title: "AI Match Scoring",
    description:
      "Every candidate gets a detailed match score — broken down by skills, experience, role fit, and keyword relevance.",
  },
  {
    icon: Star,
    title: "Shortlist & Manage",
    description:
      "Save promising candidates to your shortlist. Add notes, compare profiles, and collaborate with your team.",
  },
  {
    icon: BarChart3,
    title: "Skill Gap Analysis",
    description:
      "See exactly which skills candidates match and where the gaps are. Make data-driven hiring decisions.",
  },
  {
    icon: Users,
    title: "Candidate Profiles",
    description:
      "View detailed profiles with experience, achievements, skills, and AI-generated fit reasoning — all in one place.",
  },
];

export default function ForHR() {
  return (
    <section id="for-hr" className="bg-white px-4 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
            For HR Teams
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Hire smarter with AI.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-gray-500">
            Stop manually scanning hundreds of resumes. ResumeSync&apos;s HR portal
            uses semantic AI to find the perfect candidates in seconds.
          </p>
        </div>

        {/* Features List */}
        <div className="mt-16 space-y-4">
          {features.map(({ icon: Icon, title, description }, i) => (
            <div
              key={i}
              className="group flex items-start gap-6 rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-200 hover:border-gray-200 hover:shadow-sm sm:p-8"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                <Icon className="size-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-black sm:text-lg">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-black px-8 text-base font-semibold text-white hover:bg-gray-800"
          >
            <Link href="/hr/login">
              Access HR Portal
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-full border-gray-300 px-8 text-base font-semibold text-black hover:bg-gray-50"
          >
            <Link href="/hr/login">Create HR Account</Link>
          </Button>
        </div>
        <p className="mt-4 text-center text-xs text-gray-400">
          Free to get started · No setup required
        </p>
      </div>
    </section>
  );
}
