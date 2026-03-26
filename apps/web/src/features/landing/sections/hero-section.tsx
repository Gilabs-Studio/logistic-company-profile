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
const adaptiveLerp = (
  current: number,
  target: number,
  progress: number,
): number => {
  const delta = target - current;
  const distance = Math.abs(delta);
  // Min factor 0.06 (smooth) → Max factor 0.25 (fast snap when >0.6s behind)
  let factor = Math.min(0.25, 0.06 + distance * 0.3);

  // Magnet at the end (>95% progress) to ensure clean landing
  if (progress > 0.95) {
    factor = Math.max(factor, 0.15);
  }

  return current + delta * factor;
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const FRAME_COUNT = 151;
  const currentFrameRef = useRef(1);
  const targetTimeRef = useRef(1);
  const rafIdRef = useRef(0);
  const [backgroundPhase, setBackgroundPhase] =
    useState<BackgroundPhase>("before");

  // ── 1. Image Preloading ─────────────────────────────────────────────
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const preloadImages = async () => {
      const promises = Array.from({ length: FRAME_COUNT }).map((_, i) => {
        return new Promise<void>((resolve) => {
          const img = new (globalThis.Image as any)();
          const frameNum = (i + 1).toString().padStart(4, "0");
          img.src = `/hero-frames/frame_${frameNum}.jpg`;
          img.onload = () => {
            loadedCount++;
            setLoadProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
            resolve();
          };
          img.onerror = resolve; // Skip failed frames
          loadedImages[i] = img;
        });
      });

      await Promise.all(promises);
      setImages(loadedImages);
      setImagesLoaded(true);
    };

    preloadImages();
  }, []);

  // ── 2. Rendering Logic ──────────────────────────────────────────────
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = images[index - 1];

    if (ctx && img?.complete) {
      const { width, height } = canvas;
      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let x = 0;
      let y = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = height * imgRatio;
        x = (width - drawWidth) / 2;
      } else {
        drawHeight = width / imgRatio;
        y = (height - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    }
  };

  // ── 3. Scroll & Loop ────────────────────────────────────────────────
  useEffect(() => {
    if (!imagesLoaded) return;

    const handleUpdate = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Update Phase
      let nextPhase: BackgroundPhase;
      if (rect.top > 0) {
        nextPhase = "before";
      } else if (rect.bottom > vh) {
        nextPhase = "pinned";
      } else {
        nextPhase = "after";
      }
      setBackgroundPhase(nextPhase);

      // Calculate Target Frame
      const scrollable = rect.height - vh;
      if (scrollable > 0) {
        const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
        const targetFrame = Math.max(
          1,
          Math.min(FRAME_COUNT, Math.floor(progress * FRAME_COUNT)),
        );
        targetTimeRef.current = targetFrame;
      }
    };

    const renderLoop = () => {
      const target = targetTimeRef.current;
      const current = currentFrameRef.current;

      if (Math.abs(target - current) > 0.1) {
        // Use the sophisticated adaptiveLerp for silky smooth catch-up
        const next = adaptiveLerp(current, target, target / FRAME_COUNT);
        currentFrameRef.current = next;
        drawFrame(Math.round(next));
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    // Initial draw
    drawFrame(Math.round(currentFrameRef.current));

    window.addEventListener("scroll", handleUpdate, { passive: true });
    window.addEventListener("resize", handleUpdate, { passive: true });
    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
    };
  }, [imagesLoaded, images]);

  // Adjust canvas size on resize
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawFrame(Math.round(currentFrameRef.current));
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [imagesLoaded]);

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
        {/* Scroll-driven Canvas background */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            imagesLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Loading Overlay or Fallback */}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm transition-opacity">
            <Image
              src="/2-side.webp"
              alt="Logistics Background"
              fill
              priority
              className="object-cover object-center opacity-40"
              sizes="100vw"
            />
            <div className="relative z-20 flex flex-col items-center gap-4">
              <div className="h-1 w-48 overflow-hidden rounded-full bg-zinc-200">
                <div
                  className="h-full bg-zinc-900 transition-all duration-300"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <span className="text-xs font-light tracking-widest text-zinc-500 uppercase">
                Optimizing Experience {loadProgress}%
              </span>
            </div>
          </div>
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

        <div className="relative min-h-[150vh] py-32 lg:py-40 flex flex-col items-center justify-center">
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
