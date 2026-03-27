"use client";

import { HeroLoadingProvider } from "@/features/landing/contexts/hero-loading-context";
import { IntroSplash } from "@/features/landing/components/loading-splash";
import { PageContent } from "./page-content";

export default function LandingPage() {
  return (
    <HeroLoadingProvider>
      <IntroSplash />
      <PageContent />
    </HeroLoadingProvider>
  );
}
