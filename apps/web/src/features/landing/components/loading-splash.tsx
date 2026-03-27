"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useHeroLoading } from "../contexts/hero-loading-context";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 1 },
  visible: {
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

const logoVariants = {
  hidden: { scale: 0.98 },
  visible: {
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

const lineVariants = {
  hidden: { scaleX: 0, opacity: 1 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

const textVariants = {
  hidden: { opacity: 1 },
  visible: {
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

export function IntroSplash() {
  const { isLoading } = useHeroLoading();
  const [shouldShowContent, setShouldShowContent] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Delay dismounting to allow exit animation
      const timer = setTimeout(() => setShouldShowContent(false), 850);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && shouldShowContent && (
        <motion.div
          key="intro"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-white"
        >
          {/* Background Elements */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Subtle gradient circles */}
            <motion.div
              className="absolute -right-1/4 -top-1/2 h-96 w-96 rounded-full bg-linear-to-br from-zinc-100 to-transparent blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.24, 0.38, 0.24],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-1/3 -left-1/4 h-80 w-80 rounded-full bg-linear-to-tr from-zinc-100 to-transparent blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.18, 0.3, 0.18],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center justify-center px-6">
            {/* Main Logo/Title */}
            <motion.div variants={logoVariants} className="mb-7 text-center">
              <h1 className="text-5xl font-light tracking-tight text-zinc-900 sm:text-6xl md:text-7xl">
                Strategic
              </h1>
            </motion.div>

            {/* Divider Line */}
            <motion.div
              variants={lineVariants}
              className="mb-7 h-px w-16 origin-left bg-zinc-900"
            />

            {/* Subtitle */}
            <motion.div variants={textVariants} className="mb-10 text-center">
              <p className="text-lg font-light tracking-wide text-zinc-500 sm:text-xl">
                Enterprise Logistics
              </p>
            </motion.div>

            {/* Loading Dots */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2"
              aria-label="Loading"
            >
              <span className="sr-only">Loading</span>
              <motion.span
                animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1, 0.85] }}
                transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
                className="block h-2.5 w-2.5 rounded-full bg-zinc-900"
              />
              <motion.span
                animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1, 0.85] }}
                transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut", delay: 0.12 }}
                className="block h-2.5 w-2.5 rounded-full bg-zinc-900"
              />
              <motion.span
                animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1, 0.85] }}
                transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut", delay: 0.24 }}
                className="block h-2.5 w-2.5 rounded-full bg-zinc-900"
              />
            </motion.div>

            {/* Tiny caption */}
            <motion.div variants={itemVariants} className="mt-6 text-center">
              <p className="text-[11px] font-light tracking-[0.35em] text-zinc-400 uppercase">
                Loading
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
