"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

const freeFeatures = [
  "Limited resume scans",
  "Basic match score",
  "Limited format downloads",
];

const proFeatures = [
  "Unlimited resume scans",
  "Advanced keyword optimization",
  "Full format access",
  "Priority AI suggestions",
];

export default function PricingSection() {
  return (
    <section className="bg-white text-black py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-black">
          Simple, Transparent Pricing
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <h3 className="text-xl font-semibold text-black">Free Plan</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-700">
                    <Check className="h-4 w-4 shrink-0 text-gray-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-2 border-black bg-white shadow-sm">
            <CardHeader>
              <h3 className="text-xl font-semibold text-black">Pro Plan</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-800 font-medium">
                    <Check className="h-4 w-4 shrink-0 text-black" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="mt-10 text-center">
          <Button
            asChild
            size="lg"
            className="rounded-lg bg-black hover:bg-gray-800 text-white px-8"
          >
            <Link href="/home">Start Free Today</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
