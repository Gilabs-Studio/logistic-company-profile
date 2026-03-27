import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { fadeUp } from "@/features/landing/constants/animations";
import { LANDING_CONTAINER_CLASS } from "@/features/landing/constants/layout";
import { useHeroLoading } from "@/features/landing/contexts/hero-loading-context";

type BackgroundPhase = "before" | "pinned" | "after";

const HERO_FRAME_COUNT = 151;

const getHeroFrameSrc = (frameNumber: number): string =>
  `/hero-frames/frame_${frameNumber.toString().padStart(4, "0")}.jpg`;

const preloadHeroFrame = (src: string): Promise<HTMLImageElement | null> =>
  new Promise((resolve) => {
    const image = document.createElement("img");
    image.src = src;
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
  });

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
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { setLoadProgress } = useHeroLoading();

  const currentFrameRef = useRef(1);
  const targetTimeRef = useRef(1);
  const rafIdRef = useRef(0);
  const [backgroundPhase, setBackgroundPhase] =
    useState<BackgroundPhase>("before");
  const t = useTranslations("landing");

  // ── 1. Progressive Image Preloading ─────────────────────────────────
  useEffect(() => {
    let loadedCount = 0;
    let isMounted = true;

    const updateGlobalProgress = (count: number) => {
      const progress = Math.floor((count / HERO_FRAME_COUNT) * 100);
      setLoadProgress(progress);
    };

    // Load first frame immediately
    void preloadHeroFrame(getHeroFrameSrc(1)).then((firstFrameImg) => {
      if (!isMounted) return;

      if (firstFrameImg) {
        loadedCount++;
        imagesRef.current[0] = firstFrameImg;
        updateGlobalProgress(loadedCount);
      }

      setImagesLoaded(true); // Start animation with first frame or fall back gracefully.
    });

    // Load remaining frames in background (non-blocking)
    // Schedule remaining loads after first frame
    const timer = setTimeout(() => {
      void Promise.all(
        Array.from({ length: HERO_FRAME_COUNT - 1 }, async (_, index) => {
          const image = await preloadHeroFrame(getHeroFrameSrc(index + 2));
          if (!isMounted || !image) {
            return;
          }

          loadedCount++;
          imagesRef.current[index + 1] = image;
          updateGlobalProgress(loadedCount);
        }),
      );
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [setLoadProgress]);

  // ── 2. Rendering Logic ──────────────────────────────────────────────
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Cache 2D context to avoid repeated getContext calls
    contextRef.current ??= canvas.getContext("2d");
    const ctx = contextRef.current;
    const img = imagesRef.current[index - 1];

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
  }, []);

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
          Math.min(HERO_FRAME_COUNT, Math.floor(progress * HERO_FRAME_COUNT)),
        );
        targetTimeRef.current = targetFrame;
      }
    };

    const renderLoop = () => {
      const target = targetTimeRef.current;
      const current = currentFrameRef.current;

      if (Math.abs(target - current) > 0.1) {
        // Use the sophisticated adaptiveLerp for silky smooth catch-up
        const next = adaptiveLerp(current, target, target / HERO_FRAME_COUNT);
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
  }, [imagesLoaded, drawFrame]);

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
  }, [drawFrame]);

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
        {/* Canvas background - shown when images are loaded */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            imagesLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="absolute inset-0 bg-linear-to-b from-white/70 via-white/85 to-white" />
      </div>

      <div className="relative z-10 flex w-full flex-col">
        <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden text-center">
          <motion.div className="z-20 w-full max-w-6xl px-6 lg:px-12">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="mx-auto max-w-7xl text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7rem] font-light leading-[1.05] tracking-tight text-zinc-900"
            >
              {t("hero.titleLine1")}
              <br />
              <span className="font-serif italic text-zinc-400">
                {t("hero.titleLine2")}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="mx-auto mt-12 max-w-2xl text-lg sm:text-xl font-light leading-relaxed text-zinc-500"
            >
              {t("hero.description")}
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
                  {t("hero.cta")}
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
                {t("hero.sectionTitleLine1")}
                <br />
                <span className="text-primary font-medium">
                  {t("hero.sectionTitleHighlight")}
                </span>
              </h2>
              <div className="mt-14 h-px w-24 bg-zinc-300 mx-auto" />
              <p className="mt-14 text-xl sm:text-2xl font-light leading-relaxed text-zinc-500">
                {t("hero.sectionBodyLine1")}
                <br />
                {t("hero.sectionBodyLine2")}
                <br />
                <strong className="text-zinc-900 font-medium pb-1 border-b border-zinc-200">
                  {t("hero.sectionBodyHighlight")}
                </strong>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
