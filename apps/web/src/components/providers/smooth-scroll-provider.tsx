"use client";

import { ReactLenis } from "lenis/react";
import type { LenisOptions } from "lenis";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  options?: LenisOptions;
}

export function SmoothScrollProvider({
  children,
  options,
}: Readonly<SmoothScrollProviderProps>) {
  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
