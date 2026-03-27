"use client";

import {
  AboutSection,
  ClosingCtaSection,
  HeroSection,
  IndustryExpertiseSection,
  IndustryPositioningSection,
  PhilosophySection,
  ServicesSection,
  SystemThinkingSection,
  TestimonialsSection,
} from "@/features/landing/sections";
import { SiteHeader } from "@/components/layouts/site-header";
import { SiteFooter } from "@/components/layouts/site-footer";

export default function LandingPage() {
  return (
    <div className="relative bg-white text-zinc-900 selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans">
      <SiteHeader />
      <div className="relative z-10 w-full flex flex-col">
        <HeroSection />

        <div className="relative z-20 bg-white">
          <AboutSection />
          <PhilosophySection />
          <ServicesSection />
          {/* <IndustryExpertiseSection /> */}
          <SystemThinkingSection />
          <IndustryPositioningSection />
          <TestimonialsSection />
          <ClosingCtaSection />
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
