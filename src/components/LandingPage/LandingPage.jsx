"use client";

import HeroSection from "./HeroSection";
import ProblemSection from "./ProblemSection";
import SolutionSection from "./SolutionSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import WhyChooseSection from "./WhyChooseSection";
import ResumeFormatsSection from "./ResumeFormatsSection";
import TestimonialSection from "./TestimonialSection";
import PricingSection from "./PricingSection";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <ResumeFormatsSection />
      <TestimonialSection />
      <PricingSection />
    </main>
  );
}
