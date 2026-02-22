"use client";

import { Card, CardContent } from "@/components/ui/card";
import { XCircle } from "lucide-react";

const problems = [
  "You apply to 100 jobs but get no responses.",
  "Your resume is filtered out by ATS systems.",
  "You don't know which keywords recruiters are looking for.",
  "Tailoring your resume for every job takes too much time.",
];

export default function ProblemSection() {
  return (
    <section className="bg-gray-50 text-black py-16 md:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-black">
          Why Most Resumes Get Rejected
        </h2>
        <ul className="mt-10 space-y-4">
          {problems.map((text, i) => (
            <li key={i}>
              <Card className="border-gray-200 bg-white shadow-sm">
                <CardContent className="flex items-start gap-4 py-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <p className="text-gray-800 pt-0.5">{text}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-lg font-medium text-gray-700">
          Sending the same resume everywhere doesn&apos;t work anymore.
        </p>
      </div>
    </section>
  );
}
