import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { fadeUp } from "@/features/landing/constants/animations";
import { LANDING_CONTAINER_CLASS } from "@/features/landing/constants/layout";

type BackgroundPhase = "before" | "pinned" | "after";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [backgroundPhase, setBackgroundPhase] =
    useState<BackgroundPhase>("before");

  useEffect(() => {
    let rafId = 0;

    const updateBackgroundPhase = () => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      let nextPhase: BackgroundPhase;
      if (rect.top > 0) {
        nextPhase = "before";
      } else if (rect.bottom > viewportHeight) {
        nextPhase = "pinned";
      } else {
        nextPhase = "after";
      }

      setBackgroundPhase((prevPhase) =>
        prevPhase === nextPhase ? prevPhase : nextPhase,
      );
    };

    const handleViewportUpdate = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(updateBackgroundPhase);
    };

    updateBackgroundPhase();
    window.addEventListener("scroll", handleViewportUpdate, { passive: true });
    window.addEventListener("resize", handleViewportUpdate);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleViewportUpdate);
      window.removeEventListener("resize", handleViewportUpdate);
    };
  }, []);

  let backgroundPositionClass = "absolute inset-x-0 top-0 h-screen";
  if (backgroundPhase === "pinned") {
    backgroundPositionClass = "fixed inset-0";
  } else if (backgroundPhase === "after") {
    backgroundPositionClass = "absolute inset-x-0 bottom-0 h-screen";
  }

  return (
    <section ref={sectionRef} className="relative w-full">
      <div
        className={`${backgroundPositionClass} pointer-events-none -z-10 overflow-hidden`}
      >
        <Image
          src="/2-side.webp"
          alt="Logistics Background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-white/70 via-white/85 to-white" />
      </div>

      <div className="relative z-10 flex w-full flex-col pt-20">
        <div className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden text-center">
          <motion.div className="z-20 w-full max-w-6xl px-6 lg:px-12">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="mx-auto max-w-7xl text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7rem] font-light leading-[1.05] tracking-tight text-zinc-900"
            >
              Strategic Logistics
              <br />
              <span className="font-serif italic text-zinc-400">
                for Enterprise Operations
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="mx-auto mt-12 max-w-2xl text-lg sm:text-xl font-light leading-relaxed text-zinc-500"
            >
              Connecting every stage of your supply chain from first-mile pickup
              to final delivery with intelligent tracking and comprehensive
              operational control
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row"
            >
              <Link href="/login" prefetch={false}>
                <Button className="cursor-pointer h-14 rounded-full bg-zinc-900 px-10 text-sm tracking-wide text-white shadow-xl shadow-zinc-900/10 hover:bg-zinc-800">
                  Start a Conversation
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative min-h-screen py-32 lg:py-40 flex flex-col items-center justify-center">
          <div className={LANDING_CONTAINER_CLASS}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mx-auto max-w-4xl text-center"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-snug tracking-tight text-zinc-900">
                Logistics requires continuous oversight and
                <br />
                <span className="text-primary font-medium">
                  control over operational uncertainty
                </span>
              </h2>
              <div className="mt-14 h-px w-24 bg-zinc-300 mx-auto" />
              <p className="mt-14 text-xl sm:text-2xl font-light leading-relaxed text-zinc-500">
                When timelines are rigid and margins are optimized
                <br />
                you need a reliable infrastructure to run your distribution
                <br />
                <strong className="text-zinc-900 font-medium pb-1 border-b border-zinc-200">
                  Systematic execution at scale
                </strong>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
