"use client";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ForJobSeekers from "./ForJobSeekers";
import ForHR from "./ForHR";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <HeroSection />
      <ForJobSeekers />
      <ForHR />
      <Footer />
    </main>
  );
}
