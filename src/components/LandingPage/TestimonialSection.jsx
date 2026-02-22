"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "I started getting interview calls within a week of using ResumeSync.",
    initial: "S",
  },
  {
    quote:
      "The match score feature helped me understand exactly what recruiters want.",
    initial: "J",
  },
  {
    quote: "ResumeSync made tailoring resumes effortless.",
    initial: "M",
  },
];

export default function TestimonialSection() {
  return (
    <section className="bg-gray-50 text-black py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-black">
          Success Stories
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, initial }, i) => (
            <Card
              key={i}
              className="border-gray-200 bg-white shadow-sm flex flex-col"
            >
              <CardContent className="pt-6 pb-6 flex flex-col flex-1">
                <Quote className="h-8 w-8 text-gray-300 mb-3" />
                <p className="text-gray-800 flex-1">&ldquo;{quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-gray-200">
                    <AvatarFallback className="bg-black text-white text-sm font-medium">
                      {initial}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-600">
                    User
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
