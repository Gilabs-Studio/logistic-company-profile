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

// Animation Variants - Elegant, spring-based reveals
// We minimize `transition-all` on hover and prefer distinct layout compositions instead of heavy CSS transitions
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }, // Custom minimal easing
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

// 60-30-10 Color Rule Application (Premium Light Theme):
// 60% Background: bg-white / bg-zinc-50 (Crisp pure whites)
// 30% Secondary: text-zinc-900 / bg-zinc-100 / border-zinc-200 (Charcoal text, subtle separating lines)
// 10% Accent: text-primary (Electric Blue or subtle gold, matching corporate logistics)

const W = "relative z-10 mx-auto w-full max-w-[85rem] px-6 lg:px-12";

const SERVICES = [
  {
    icon: Plane,
    title: "Air Freight",
    description: "When time defines value, speed becomes strategy. We move critical shipments with precision timing, priority handling, and full visibility.",
    span: "md:col-span-2 lg:col-span-2",
  },
  {
    icon: Ship,
    title: "Sea Freight",
    description: "Scale without compromise. From consolidated cargo to full container loads, we optimize routes, cost, and reliability at global scale.",
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    icon: Truck,
    title: "Land Transport",
    description: "The last mile is where most systems fail. We ensure it's where yours performs best.",
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    icon: Warehouse,
    title: "Warehousing & Fulfillment",
    description: "Storage is not enough. We turn warehouses into operational assets that accelerate your distribution.",
    span: "md:col-span-2 lg:col-span-1",
  },
  {
    icon: ShieldCheck,
    title: "Customs & Compliance",
    description: "Borders shouldn't slow business. We navigate complexity so your operations stay uninterrupted.",
    span: "md:col-span-3 lg:col-span-1 bg-zinc-900 text-white invert-colors", // Contrast block
  },
];

const VALUES = [
  {
    icon: Activity,
    title: "Control, Not Guesswork",
    description: "Real-time visibility, structured execution, and zero ambiguity.",
  },
  {
    icon: CheckCircle2,
    title: "A System, Not a Vendor",
    description: "We integrate into your operations — becoming part of your workflow.",
  },
  {
    icon: Globe2,
    title: "Global Capability, Local Precision",
    description: "International reach, executed with on-ground expertise.",
  },
  {
    icon: ShieldCheck,
    title: "Risk Reduction Built-In",
    description: "We anticipate problems before they exist.",
  },
];

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="relative bg-white text-zinc-900 selection:bg-primary/20 selection:text-primary overflow-x-hidden pt-20 font-sans">
      
      {/* ── Minimalist ambient background light ── */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-zinc-100/80 via-white to-white pointer-events-none -z-10" />

      <div className="relative z-10 w-full flex flex-col">

        {/* ════════════════════════════════════════════════════════
            1. HERO STATEMENT
        ════════════════════════════════════════════════════════ */}
        <section className="relative flex min-h-[85vh] flex-col items-center justify-center text-center">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className={`w-full max-w-6xl px-6 lg:px-12 z-20`}
          >
            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
              className="mb-8 lg:mb-12 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
            >
              Precision ⋅ Control ⋅ Intelligence
            </motion.p>
            
            <motion.h1 
              variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
              className="mx-auto max-w-5xl text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7rem] font-light leading-[1.05] tracking-tight text-zinc-900"
            >
              We Don&apos;t Move Goods.<br/>
              <span className="font-serif italic text-zinc-400">We Move Business Forward.</span>
            </motion.h1>

            <motion.p 
              variants={fadeUp} initial="hidden" animate="visible" custom={0.3}
              className="mx-auto mt-12 max-w-2xl text-lg sm:text-xl font-light leading-relaxed text-zinc-500"
            >
              <span className="text-zinc-800">Behind every shipment is a decision that impacts revenue, reputation, and reliability.</span><br className="max-sm:hidden" />
              We exist to ensure none of them fail.
            </motion.p>

            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={0.4}
              className="mx-auto mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-zinc-500 border-l border-zinc-200 pl-4 text-left sm:text-center sm:border-l-0 sm:pl-0"
            >
              From first-mile pickup to final delivery, we engineer certainty into every movement — across land, sea, and air — with precision, control, and intelligence.
            </motion.p>

            <motion.div 
              variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
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
            2. TRUST HOOK (IMPACT SECTION) - Large Typography
        ════════════════════════════════════════════════════════ */}
        <section className="relative py-32 lg:py-40 flex flex-col items-center justify-center bg-zinc-50 border-y border-zinc-100">
          <div className={W}>
            <motion.div 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              className="mx-auto max-w-4xl text-center"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light leading-snug tracking-tight text-zinc-900">
                Logistics isn&apos;t about trucks, containers, or warehouses. <br/>
                <span className="text-primary font-medium">It&apos;s about control in uncertainty.</span>
              </h2>
              <div className="mt-14 h-px w-24 bg-zinc-300 mx-auto" />
              <p className="mt-14 text-xl sm:text-2xl font-light leading-relaxed text-zinc-500">
                When timelines are tight, regulations are complex, and margins are thin —<br/>
                you don&apos;t need a vendor.<br/>
                <strong className="text-zinc-900 font-medium">You need a system.</strong>
              </p>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            3. ABOUT (ASYMMETRIC LAYOUT)
        ════════════════════════════════════════════════════════ */}
        <section className="relative py-24 lg:py-40">
          <div className={`${W} grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center`}>
            
            {/* Text Content (Col 1-5) */}
            <motion.div 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-8"
            >
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">The Paradigm Shift</p>
              <h2 className="text-4xl sm:text-5xl lg:text-5xl font-light leading-tight tracking-tight text-zinc-900">
                Built for Complexity.<br/>Trusted for Consistency.
              </h2>
              
              <div className="mt-10 space-y-8 text-lg font-light leading-relaxed text-zinc-600">
                <p>
                  <strong className="font-medium text-zinc-900">We are not a logistics provider.</strong><br/>
                  We are an operational backbone for companies that cannot afford failure.
                </p>
                <p>
                  In a world where delays cost millions and miscommunication breaks supply chains, we design logistics systems that eliminate friction — not just manage it.
                </p>
                <div className="p-6 bg-zinc-50 border-l-2 border-primary rounded-r-2xl">
                  <p className="text-zinc-700 text-base">
                    Our role is simple: ensure your goods move exactly as your business demands —
                    <span className="text-primary font-medium block mt-2">fast when needed, precise when critical, scalable when required.</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Image (Col 6-12) overlapping */}
            <motion.div 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-7 relative h-[600px] w-full rounded-2xl overflow-hidden bg-zinc-100"
            >
              <Image 
                src="/login.png" 
                alt="Logistics Operations" 
                fill 
                className="object-cover"
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
                Speed is Easy.<br/>
                <span className="font-serif italic text-zinc-400">Precision is Rare.</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-12 text-left items-start mt-16 max-w-3xl mx-auto">
                <p className="text-xl font-light text-zinc-300 leading-relaxed border-t border-zinc-700 pt-6">
                  Anyone can deliver fast.<br/>Very few can deliver right.
                </p>
                <div className="border-t border-zinc-700 pt-6">
                  <p className="text-lg font-light text-zinc-400 mb-6">
                    We believe logistics is not about how quickly things move — but how predictably they arrive.
                  </p>
                  <p className="text-sm uppercase tracking-[0.1em] font-medium text-primary">
                    Predictability scales. Chaos does not.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            5. SERVICES (ASSYMETRIC BENTO GRID)
        ════════════════════════════════════════════════════════ */}
        <section className="relative py-24 lg:py-40 bg-zinc-50">
          <div className={W}>
            <motion.div 
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              className="max-w-2xl text-left mb-20"
            >
              <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-zinc-900">
                Engineered Logistics.<br/><span className="text-zinc-400">Not Just Services.</span>
              </h2>
              <p className="mt-6 text-lg text-primary font-medium">
                Every solution is built around your operation — not ours.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]"
            >
              {SERVICES.map((s, i) => {
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
                Logistics is a System.<br/>
                <span className="text-primary font-medium">We Treat It Like One.</span>
              </h2>
              <p className="mt-8 text-xl font-light text-zinc-600">
                Every shipment is part of a larger chain — and every weak link creates cost.
              </p>
              <p className="mt-8 text-lg font-light text-zinc-500 leading-relaxed border-l-2 border-zinc-200 pl-6">
                We design logistics as a connected system: from supplier to warehouse, from port to final delivery — optimized as one continuous flow.
              </p>

              {/* VALUE PROPOSITION LIST INSIDE SYSTEM THINKING */}
              <div className="mt-16 grid sm:grid-cols-2 gap-x-8 gap-y-10">
                {VALUES.map((val, idx) => (
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
               {/* 3D GLOBE COMPONENT */}
               <div className="w-[500px] h-[500px] lg:w-[800px] lg:h-[800px] opacity-90 right-[-100px] lg:absolute">
                 <Globe />
               </div>
            </motion.div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            7. INDUSTRY POSITIONING & 8. SOCIAL PROOF
        ════════════════════════════════════════════════════════ */}
        <section className="relative py-24 sm:py-32 bg-zinc-50 border-y border-zinc-200 overflow-hidden">
          <div className={`${W} grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-stretch`}>
            
            {/* Position */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl font-light text-zinc-900 mb-8">
                Built for Industries That Cannot Afford Mistakes
              </h2>
              <div className="space-y-6 text-lg font-light text-zinc-600">
                <p>Whether you&apos;re moving high-value goods, time-sensitive products, or complex cargo — our systems are designed to handle pressure.</p>
                <div className="h-px w-full bg-zinc-200 my-8" />
                <p className="text-zinc-500 italic">
                  From manufacturing lines that depend on precision timing,<br/>
                  to distribution networks that demand speed at scale —<br/>
                  <strong className="text-zinc-900 font-medium not-italic">we operate where failure is not an option.</strong>
                </p>
              </div>
            </motion.div>
            
            {/* Proof */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="bg-white rounded-3xl border border-zinc-200 p-10 lg:p-14 shadow-sm flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-light text-zinc-900 mb-8">
                Trusted When It Matters Most
              </h2>
              <div className="space-y-8 text-lg font-light text-zinc-600">
                <p>Our clients don&apos;t come to us for convenience. They come when logistics becomes critical.</p>
                <ul className="space-y-5 text-zinc-700">
                  <li className="flex items-center gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-100"><CheckCircle2 className="w-5 h-5 text-primary shrink-0"/> <span className="text-base font-medium">When delays are unacceptable.</span></li>
                  <li className="flex items-center gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-100"><CheckCircle2 className="w-5 h-5 text-primary shrink-0"/> <span className="text-base font-medium">When complexity increases.</span></li>
                  <li className="flex items-center gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-100"><CheckCircle2 className="w-5 h-5 text-primary shrink-0"/> <span className="text-base font-medium">When the stakes are high.</span></li>
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
                If Logistics Is Critical to Your Business —<br/>
                <span className="font-serif italic text-zinc-500">It Shouldn&apos;t Be Left to Chance.</span>
              </h2>
              
              <div className="mt-12 space-y-4 text-xl font-light text-zinc-600">
                <p>You don&apos;t need more options.<br/>You need the right execution.</p>
                <p className="text-primary font-medium mt-6 text-2xl">Let&apos;s build a system that moves your business forward.</p>
              </div>

              <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/login" prefetch={false}>
                  <Button className="cursor-pointer h-14 rounded-full px-10 text-sm tracking-wide bg-zinc-900 text-white hover:bg-zinc-800 shadow-xl shadow-zinc-900/10">
                    Design Your Logistics System
                  </Button>
                </Link>
                <Link href="/contact" prefetch={false}>
                  <Button variant="outline" className="cursor-pointer h-14 rounded-full px-10 text-sm tracking-wide border-zinc-200 text-zinc-900 hover:bg-zinc-50 shadow-sm">
                    Plan Your Next Movement
                  </Button>
                </Link>
              </div>
              <p className="mt-14 text-xs uppercase tracking-[0.2em] font-medium text-zinc-400">
                <Link href="/login" className="hover:text-primary transition-colors cursor-pointer mr-6">Speak With Our Team</Link>
                •
                <Link href="/login" className="hover:text-primary transition-colors cursor-pointer ml-6">Start a Conversation</Link>
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
}
