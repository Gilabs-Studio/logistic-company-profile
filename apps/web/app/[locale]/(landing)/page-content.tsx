"use client";

import { Suspense, lazy } from "react";
import { HeroSection } from "@/features/landing/sections";
import { useHeroLoading } from "@/features/landing/contexts/hero-loading-context";
import { SiteHeader } from "@/components/layouts/site-header";
import { SiteFooter } from "@/components/layouts/site-footer";
import { motion } from "framer-motion";

// Lazy load all sections for optimal performance
const AboutSection = lazy(() =>
  import("@/features/landing/sections").then((mod) => ({
    default: mod.AboutSection,
  }))
);
const PhilosophySection = lazy(() =>
  import("@/features/landing/sections").then((mod) => ({
    default: mod.PhilosophySection,
  }))
);
const ServicesSection = lazy(() =>
  import("@/features/landing/sections").then((mod) => ({
    default: mod.ServicesSection,
  }))
);
const SystemThinkingSection = lazy(() =>
  import("@/features/landing/sections").then((mod) => ({
    default: mod.SystemThinkingSection,
  }))
);
const IndustryPositioningSection = lazy(() =>
  import("@/features/landing/sections").then((mod) => ({
    default: mod.IndustryPositioningSection,
  }))
);
const TestimonialsSection = lazy(() =>
  import("@/features/landing/sections").then((mod) => ({
    default: mod.TestimonialsSection,
  }))
);
const ClosingCtaSection = lazy(() =>
  import("@/features/landing/sections").then((mod) => ({
    default: mod.ClosingCtaSection,
  }))
);

// Fallback component for lazy sections
function SectionSkeleton() {
  return (
    <div className="relative h-96 bg-linear-to-br from-zinc-50 to-zinc-100 animate-pulse" />
  );
}

export function PageContent() {
  const { isLoading } = useHeroLoading();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      className={`relative bg-white text-zinc-900 selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans ${
        isLoading ? "pointer-events-none" : ""
      }`}
    >
      {/* Header - only visible after intro completes */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? -20 : 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <SiteHeader />
      </motion.div>

      <div className="relative z-10 w-full flex flex-col">
        {/* Hero loads immediately - critical for initial experience */}
        <HeroSection />

        <div className="relative z-20 bg-white">
          {/* Lazy-loaded sections with suspense boundaries */}
          <Suspense fallback={<SectionSkeleton />}>
            <AboutSection />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <PhilosophySection />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <ServicesSection />
          </Suspense>

          {/* <IndustryExpertiseSection /> */}

          <Suspense fallback={<SectionSkeleton />}>
            <SystemThinkingSection />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <IndustryPositioningSection />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <TestimonialsSection />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <ClosingCtaSection />
          </Suspense>
        </div>
      </div>
      <SiteFooter />
    </motion.div>
  );
}
