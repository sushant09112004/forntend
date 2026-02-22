"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

const formats = [
  "Modern Professional",
  "Corporate Classic",
  "Minimal Clean",
  "Creative Edge",
];

export default function ResumeFormatsSection() {
  return (
    <section className="bg-white text-black py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-black">
          Professional Resume Templates
        </h2>
        <p className="mt-6 text-lg text-gray-700 text-center max-w-2xl mx-auto">
          Choose from modern, corporate, minimal, and creative resume formats
          designed for maximum readability and ATS compatibility.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {formats.map((name) => (
            <Card
              key={name}
              className="border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="flex items-center gap-4 py-6 px-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-gray-200">
                  <FileText className="h-6 w-6 text-gray-700" />
                </div>
                <p className="font-semibold text-black">{name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
