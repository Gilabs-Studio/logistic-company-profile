"use client";

import React, { createContext, useContext, useMemo, useState, useCallback, ReactNode } from "react";

interface HeroLoadingContextType {
  isLoading: boolean;
  loadProgress: number;
  setIsLoading: (loading: boolean) => void;
  setLoadProgress: (progress: number) => void;
}

const HeroLoadingContext = createContext<HeroLoadingContextType | undefined>(undefined);

export function HeroLoadingProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const handleSetProgress = useCallback((progress: number) => {
    setLoadProgress(Math.floor(progress));
    // Auto-hide splash when all frames are loaded (100%)
    if (progress >= 100) {
      // Small delay untuk smooth transition + animation completion
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      loadProgress,
      setIsLoading,
      setLoadProgress: handleSetProgress,
    }),
    [handleSetProgress, isLoading, loadProgress],
  );

  return (
    <HeroLoadingContext.Provider value={value}>
      {children}
    </HeroLoadingContext.Provider>
  );
}

export function useHeroLoading() {
  const context = useContext(HeroLoadingContext);
  if (!context) {
    throw new Error("useHeroLoading must be used within HeroLoadingProvider");
  }
  return context;
}
