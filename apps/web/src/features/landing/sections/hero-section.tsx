import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { fadeUp } from "@/features/landing/constants/animations";
import { LANDING_CONTAINER_CLASS } from "@/features/landing/constants/layout";

type BackgroundPhase = "before" | "pinned" | "after";

/**
 * Adaptive LERP: the further the target, the faster we snap toward it.
 * Close range → silky smooth. Far range → fast catch-up.
 */
const adaptiveLerp = (current: number, target: number): number => {
  const delta = target - current;
  const distance = Math.abs(delta);
  // Min factor 0.06 (smooth) → Max factor 0.25 (fast snap when >0.6s behind)
  const factor = Math.min(0.25, 0.06 + distance * 0.3);
  return current + delta * factor;
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rafIdRef = useRef(0);
  // Guard: don't spam currentTime while browser is still seeking
  const isSeekingRef = useRef(false);

  const [backgroundPhase, setBackgroundPhase] =
    useState<BackgroundPhase>("before");
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // ── 1. Video Loading ────────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Already cached / ready
    if (video.readyState >= 2) {
      setVideoReady(true);
    }

    const onReady = () => {
      setVideoReady(true);
      setVideoFailed(false);
    };
    const onError = () => setVideoFailed(true);
    // Track seeking state so the rAF loop doesn't pile up seeks
    const onSeeking = () => {
      isSeekingRef.current = true;
    };
    const onSeeked = () => {
      isSeekingRef.current = false;
    };

    video.addEventListener("loadedmetadata", onReady);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("canplaythrough", onReady);
    video.addEventListener("error", onError);
    video.addEventListener("seeking", onSeeking);
    video.addEventListener("seeked", onSeeked);

    return () => {
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("canplaythrough", onReady);
      video.removeEventListener("error", onError);
      video.removeEventListener("seeking", onSeeking);
      video.removeEventListener("seeked", onSeeked);
    };
  }, []);

  // ── 2. Scroll-Scrubbing & Adaptive Animation Loop ──────────────────
  useEffect(() => {
    const computeTarget = () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Background phase
      const nextPhase: BackgroundPhase =
        rect.top > 0 ? "before" : rect.bottom > vh ? "pinned" : "after";
      setBackgroundPhase((p) => (p === nextPhase ? p : nextPhase));

      // Target video time
      if (video?.duration && isFinite(video.duration)) {
        const scrollable = rect.height - vh;
        if (scrollable > 0) {
          const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
          targetTimeRef.current = progress * video.duration;
        }
      }
    };

    const tick = () => {
      const video = videoRef.current;

      // Skip seek if already seeking — prevents queue pile-up
      if (video?.duration && isFinite(video.duration) && !isSeekingRef.current) {
        const target = targetTimeRef.current;
        const next = adaptiveLerp(currentTimeRef.current, target);
        currentTimeRef.current = next;

        // ~1 frame threshold at 30fps  → less seeking = smoother
        if (Math.abs(video.currentTime - next) > 0.033) {
          video.currentTime = next;
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    computeTarget();
    window.addEventListener("scroll", computeTarget, { passive: true });
    window.addEventListener("resize", computeTarget, { passive: true });
    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("scroll", computeTarget);
      window.removeEventListener("resize", computeTarget);
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
        {/* Scroll-driven video background */}
        {!videoFailed && (
          <video
            ref={videoRef}
            src="/scroll-bg.webm"
            muted
            playsInline
            preload="auto"
            autoPlay={false}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Fallback static image */}
        {(videoFailed || !videoReady) && (
          <Image
            src="/2-side.webp"
            alt="Logistics Background"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        )}

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
