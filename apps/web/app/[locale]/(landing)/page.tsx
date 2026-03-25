"use client";

import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import {
  ArrowRight,
  Plane,
  Ship,
  Truck,
  Warehouse,
  ShieldCheck,
  CheckCircle2,
  Globe2,
  Activity,
} from "lucide-react";

import { Globe } from "@/components/landing/globe";
import { HeroGraphic } from "@/components/landing/hero-graphic";

// Animation Variants - Elegant, spring-based reveals
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const W = "relative z-10 mx-auto w-full max-w-[85rem] px-6 lg:px-12";

const SERVICES = [
  {
    icon: Plane,
    title: "Air Freight",
    description: "Move critical shipments with precision timing and priority handling across global networks",
    span: "md:col-span-2 lg:col-span-2",
  },
  {
    icon: Ship,
    title: "Sea Freight",
    description: "Scale operations seamlessly from consolidated cargo to full container loads on optimized routes",
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    icon: Truck,
    title: "Land Transport",
    description: "Ensure the last mile performs optimally with integrated ground distribution systems",
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    description: "Turn storage facilities into operational assets that accelerate your distribution workflow",
    span: "md:col-span-2 lg:col-span-1",
  },
  {
    icon: ShieldCheck,
    title: "Customs Compliance",
    description: "Navigate border complexity efficiently so your operations stay uninterrupted",
    span: "md:col-span-3 lg:col-span-1 bg-zinc-900 text-white invert-colors",
  },
];

const VALUES = [
  {
    icon: Activity,
    title: "Complete Control",
    description: "Real-time visibility and structured execution across every distribution endpoint",
  },
  {
    icon: CheckCircle2,
    title: "Integrated Operations",
    description: "Connect into your existing workflows as a unified extension of your team",
  },
  {
    icon: Globe2,
    title: "Global Reach",
    description: "International logistics capability executed with localized precision",
  },
  {
    icon: ShieldCheck,
    title: "Risk Management",
    description: "Anticipate supply chain disruptions before they impact your business",
  },
];

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="relative bg-white text-zinc-900 selection:bg-primary/20 selection:text-primary overflow-x-hidden pt-20 font-sans">
      
      {/* Background Graphic Component */}
      <div className="absolute top-0 inset-x-0 h-[800px] pointer-events-none -z-10 bg-zinc-50/50 flex items-start justify-center overflow-hidden">
        <HeroGraphic className="w-full max-w-[1200px] h-full opacity-60 mix-blend-multiply text-primary/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white" />
      </div>

      <div className="relative z-10 w-full flex flex-col">

        {/* ════════════════════════════════════════════════════════
            1. HERO STATEMENT
        ════════════════════════════════════════════════════════ */}
        <section className="relative flex min-h-[85vh] flex-col items-center justify-center text-center">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className={`w-full max-w-6xl px-6 lg:px-12 z-20`}
          >
            <motion.h1 
              variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
              className="mx-auto max-w-7xl text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7rem] font-light leading-[1.05] tracking-tight text-zinc-900"
            >
              Strategic Logistics<br/>
              <span className="font-serif italic text-zinc-400">for Enterprise Operations</span>
            </motion.h1>

            <motion.p 
              variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
              className="mx-auto mt-12 max-w-2xl text-lg sm:text-xl font-light leading-relaxed text-zinc-500"
            >
              Connecting every stage of your supply chain from first-mile pickup to final delivery with intelligent tracking and comprehensive operational control
            </motion.p>

            <motion.div 
              variants={fadeUp} initial="hidden" animate="visible" custom={0.3}
              className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link href="/login" prefetch={false}>
                <Button className="cursor-pointer h-14 rounded-full px-10 text-sm tracking-wide bg-zinc-900 text-white hover:bg-zinc-800 shadow-xl shadow-zinc-900/10">
                  Start a Conversation
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ════════════════════════════════════════════════════════
            2. TRUST HOOK
        ════════════════════════════════════════════════════════ */}
        <section className="relative py-32 lg:py-40 flex flex-col items-center justify-center bg-zinc-50 border-y border-zinc-100">
          <div className={W}>
            <motion.div 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              className="mx-auto max-w-4xl text-center"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-snug tracking-tight text-zinc-900">
                Logistics requires continuous oversight and <br/>
                <span className="text-primary font-medium">control over operational uncertainty</span>
              </h2>
              <div className="mt-14 h-px w-24 bg-zinc-300 mx-auto" />
              <p className="mt-14 text-xl sm:text-2xl font-light leading-relaxed text-zinc-500">
                When timelines are rigid and margins are optimized<br/>
                you need a reliable infrastructure to run your distribution<br/>
                <strong className="text-zinc-900 font-medium pb-1 border-b border-zinc-200">Systematic execution at scale</strong>
              </p>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            3. ABOUT 
        ════════════════════════════════════════════════════════ */}
        <section className="relative py-24 lg:py-40">
          <div className={`${W} grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center`}>
            
            <motion.div 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-8"
            >
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Strategic Advantage</p>
              <h2 className="text-4xl sm:text-5xl lg:text-5xl font-light leading-tight tracking-tight text-zinc-900">
                Built for Complexity<br/>Trusted for Consistency
              </h2>
              
              <div className="mt-10 space-y-8 text-lg font-light leading-relaxed text-zinc-600">
                <p>
                  <strong className="font-medium text-zinc-900">An operational backbone</strong> for companies requiring high reliability
                </p>
                <p>
                  We design logistics systems to eliminate friction and streamline complex supply chains across global markets
                </p>
                <div className="p-6 bg-zinc-50 border-l-2 border-primary rounded-r-2xl">
                  <p className="text-zinc-700 text-base">
                    Ensuring goods move exactly as business demands
                    <span className="text-primary font-medium block mt-2">Fast when needed and predictable at all times</span>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-7 relative h-[600px] w-full rounded-2xl overflow-hidden bg-zinc-100"
            >
              <Image 
                src="/login.png" 
                alt="Logistics Operations" 
                fill 
                className="object-cover mix-blend-multiply opacity-90"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </motion.div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            4. PHILOSOPHY
        ════════════════════════════════════════════════════════ */}
        <section className="relative py-32 bg-zinc-900 overflow-hidden text-center">
          <div className={W}>
            <motion.div 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              className="mx-auto max-w-4xl"
            >
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] font-light leading-[1.05] tracking-tight text-white mb-16">
                Speed is Expected<br/>
                <span className="font-serif italic text-zinc-400">Precision is Mandatory</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-12 text-left items-start mt-16 max-w-3xl mx-auto">
                <p className="text-xl font-light text-zinc-300 leading-relaxed border-t border-zinc-700 pt-6">
                  Establishing delivery schedules based on high predictability
                </p>
                <div className="border-t border-zinc-700 pt-6">
                  <p className="text-lg font-light text-zinc-400 mb-6">
                    Logistics efficiency relies on how securely and consistently materials arrive
                  </p>
                  <p className="text-sm uppercase tracking-[0.1em] font-medium text-primary">
                    Reliability scales effectively
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            5. SERVICES
        ════════════════════════════════════════════════════════ */}
        <section className="relative py-24 lg:py-40 bg-zinc-50">
          <div className={W}>
            <motion.div 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              className="max-w-2xl text-left mb-20"
            >
              <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-zinc-900">
                Engineered Logistics<br/><span className="text-zinc-400">End to End Configuration</span>
              </h2>
              <p className="mt-6 text-lg text-primary font-medium">
                Solutions built around your operational requirement
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]"
            >
              {SERVICES.map((s) => {
                const isDark = s.span.includes("bg-zinc-900");
                return (
                  <motion.div 
                    key={s.title}
                    variants={fadeUpItem}
                    className={`relative p-10 rounded-3xl ${isDark ? s.span : `bg-white border border-zinc-200 shadow-sm ${s.span}`}`}
                  >
                    <s.icon className={`h-8 w-8 mb-8 ${isDark ? "text-primary" : "text-zinc-400"}`} strokeWidth={1.5} />
                    
                    <h3 className={`text-2xl font-medium mb-4 tracking-tight ${isDark ? "text-white" : "text-zinc-900"}`}>{s.title}</h3>
                    <p className={`font-light leading-relaxed text-sm lg:text-base ${isDark ? "text-zinc-300" : "text-zinc-500"}`}>
                      {s.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            9. SYSTEM THINKING + GLOBE
        ════════════════════════════════════════════════════════ */}
        <section className="relative py-32 lg:py-40 flex items-center justify-center overflow-hidden bg-white">
          <div className={`${W} grid lg:grid-cols-2 gap-16 items-center`}>
            
            <motion.div 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              className="z-10"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-zinc-900">
                Viewing Logistics<br/>
                <span className="text-primary font-medium">As A Unified System</span>
              </h2>
              <p className="mt-8 text-xl font-light text-zinc-600">
                Shipments functioning as parts of interconnected supply chains
              </p>
              <p className="mt-8 text-lg font-light text-zinc-500 leading-relaxed border-l-2 border-zinc-200 pl-6">
                Designing logistics from supplier hubs to final delivery endpoints to run as one continuous flow
              </p>

              <div className="mt-16 grid sm:grid-cols-2 gap-x-8 gap-y-10">
                {VALUES.map((val) => (
                  <div key={val.title} className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 text-zinc-500">
                        <val.icon className="w-4 h-4 text-primary" />
                      </div>
                      <h4 className="text-base font-medium text-zinc-900">{val.title}</h4>
                    </div>
                    <p className="text-zinc-500 leading-relaxed font-light pl-11 text-sm">{val.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
               variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
               className="relative lg:h-[800px] w-full flex items-center justify-center lg:justify-end"
            >
               <div className="w-[500px] h-[500px] lg:w-[800px] lg:h-[800px] opacity-90 right-[-100px] lg:absolute">
                 <Globe />
               </div>
            </motion.div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            7. INDUSTRY POSITIONING
        ════════════════════════════════════════════════════════ */}
        <section className="relative py-24 sm:py-32 bg-zinc-50 border-y border-zinc-200 overflow-hidden">
          <div className={`${W} grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-stretch`}>
            
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl font-light text-zinc-900 mb-8">
                Operating Critical Infrastructures
              </h2>
              <div className="space-y-6 text-lg font-light text-zinc-600">
                <p>Handling high-value goods and time-sensitive cargo with structured precision</p>
                <div className="h-px w-full bg-zinc-200 my-8" />
                <p className="text-zinc-500 italic">
                  Supporting manufacturing lines and enterprise distribution networks<br/>
                  <strong className="text-zinc-900 font-medium not-italic block mt-2">Delivering consistent results daily</strong>
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="bg-white rounded-3xl border border-zinc-200 p-10 lg:p-14 shadow-sm flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-light text-zinc-900 mb-8">
                Ensuring Distribution Integrity
              </h2>
              <div className="space-y-8 text-lg font-light text-zinc-600">
                <p>Maintaining high logistical standards for enterprise-level operations</p>
                <ul className="space-y-5 text-zinc-700">
                  <li className="flex items-center gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-100"><CheckCircle2 className="w-5 h-5 text-primary shrink-0"/> <span className="text-base font-medium">Mitigating delays efficiently</span></li>
                  <li className="flex items-center gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-100"><CheckCircle2 className="w-5 h-5 text-primary shrink-0"/> <span className="text-base font-medium">Resolving supply chain complexity</span></li>
                  <li className="flex items-center gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-100"><CheckCircle2 className="w-5 h-5 text-primary shrink-0"/> <span className="text-base font-medium">Meeting operational targets consistently</span></li>
                </ul>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            10. CLOSING STATEMENT / 11. CTA
        ════════════════════════════════════════════════════════ */}
        <section className="relative py-40 border-t border-zinc-200 bg-white">
          <div className={`${W} text-center`}>
            <motion.div 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              className="mx-auto max-w-3xl"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-zinc-900 leading-tight">
                Solidifying Your Distribution Network<br/>
                <span className="font-serif italic text-zinc-500">Built Upon Dependable Execution</span>
              </h2>
              
              <div className="mt-12 space-y-4 text-xl font-light text-zinc-600">
                <p>Establishing effective logistics execution</p>
                <p className="text-primary font-medium mt-6 text-2xl">Building structured systems for long-term operational success</p>
              </div>

              <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/login" prefetch={false}>
                  <Button className="cursor-pointer h-14 rounded-full px-10 text-sm tracking-wide bg-zinc-900 text-white hover:bg-zinc-800 shadow-xl shadow-zinc-900/10">
                    Design Your Network
                  </Button>
                </Link>
                <Link href="/contact" prefetch={false}>
                  <Button variant="outline" className="cursor-pointer h-14 rounded-full px-10 text-sm tracking-wide border-zinc-200 text-zinc-900 hover:bg-zinc-50 shadow-sm">
                    Contact Operations
                  </Button>
                </Link>
              </div>
              <p className="mt-14 text-xs uppercase tracking-[0.2em] font-medium text-zinc-400">
                <Link href="/login" className="hover:text-primary transition-colors cursor-pointer mr-6">Consult Associates</Link>
                •
                <Link href="/login" className="hover:text-primary transition-colors cursor-pointer ml-6">Initialize Conversation</Link>
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
}
