"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { fadeUp } from "@/features/landing/constants/animations";
import { SERVICES } from "@/features/landing/data/landing-data";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const t = useTranslations("landing");

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      setScrollProgress(scrollLeft / (scrollWidth - clientWidth));
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="relative py-24 lg:py-40 bg-white overflow-hidden">
      <div className="w-full">
        {/* We use a two-column layout where the left column is aligned to the container 
            and the right column (slider) bleeds to the edge of the screen */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
          
          {/* Left Column: Content & Controls - Aligned to Landing Container */}
          <div className="w-full lg:w-[calc(33.33%+(100vw-85rem)/2)] lg:min-w-[400px]">
            {/* Inner padding to match LANDING_CONTAINER_CLASS px-6 lg:px-12 */}
            <div className="px-6 lg:pl-[calc((100vw-85rem)/2+3rem)] lg:pr-12">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-zinc-900 leading-[1.1]">
                  {t("services.titleLine1")}
                  <br />
                  <span className="text-zinc-400">{t("services.titleLine2")}</span>
                </h2>
                
                <div className="mt-12 hidden lg:flex items-center gap-4">
                  <button
                    onClick={() => scroll("left")}
                    disabled={!canScrollLeft}
                    className={cn(
                      "w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center transition-all cursor-pointer",
                      canScrollLeft ? "hover:bg-zinc-900 hover:text-white hover:border-zinc-900" : "opacity-30 cursor-not-allowed"
                    )}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scroll("right")}
                    disabled={!canScrollRight}
                    className={cn(
                      "w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center transition-all cursor-pointer",
                      canScrollRight ? "hover:bg-zinc-900 hover:text-white hover:border-zinc-900" : "opacity-30 cursor-not-allowed"
                    )}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-8 hidden lg:block w-32 h-[2px] bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    style={{ width: `${scrollProgress * 100}%` }}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Slider - Bleeds to screen edge */}
          <div className="w-full lg:w-[calc(66.66%-(100vw-85rem)/2)]">
            <div 
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 no-scrollbar px-6 lg:px-0"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.titleKey}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="min-w-[280px] sm:min-w-[400px] lg:min-w-[480px] snap-start"
                >
                  <div className="group relative aspect-4/3 rounded-3xl overflow-hidden mb-8 bg-zinc-100 border border-zinc-100 shadow-sm transition-all hover:shadow-xl hover:shadow-zinc-200/50">
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={t(service.titleKey)}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 480px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <service.icon className="w-16 h-16 text-zinc-300" strokeWidth={1} />
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-zinc-900/0 transition-colors duration-500 group-hover:bg-zinc-900/5" />
                  </div>
                  
                  <h3 className="text-2xl font-medium text-zinc-900 mb-4 tracking-tight">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-base font-light leading-relaxed text-zinc-500 line-clamp-4 lg:pr-12">
                    {t(service.descriptionKey)}
                  </p>
                </motion.div>
              ))}
              
              {/* Spacer at the end for bleeding effect */}
              <div className="min-w-[10vw] lg:min-w-[20vw]" />
            </div>

            {/* Mobile Controls padding adjustment */}
            <div className="px-6 lg:hidden">
              <div className="flex items-center justify-between mt-8">
                 <div className="flex gap-3">
                  {SERVICES.map((service, i) => (
                    <div 
                      key={service.titleKey} 
                      className={cn(
                        "h-1.5 rounded-full bg-zinc-100 transition-all duration-300",
                        Math.round(scrollProgress * (SERVICES.length - 1)) === i ? "w-8 bg-primary" : "w-1.5"
                      )} 
                    />
                  ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
