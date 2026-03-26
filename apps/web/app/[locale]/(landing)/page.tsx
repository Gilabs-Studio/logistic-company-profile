"use client";

import {
  AboutSection,
  ClosingCtaSection,
  HeroSection,
  IndustryPositioningSection,
  PhilosophySection,
  ServicesSection,
  SystemThinkingSection,
} from "@/features/landing/sections";

export default function LandingPage() {
  return (
    <div className="relative bg-white text-zinc-900 selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans">
      <div className="relative z-10 w-full flex flex-col">
        <HeroSection />

        <div className="relative z-20 bg-white">
          <AboutSection />
          <PhilosophySection />
          <ServicesSection />
          <SystemThinkingSection />
          <IndustryPositioningSection />
          <ClosingCtaSection />
        </div>
      </div>
    </div>
  );
}
