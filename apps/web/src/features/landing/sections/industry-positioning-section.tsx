import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/features/landing/constants/animations";
import { LANDING_CONTAINER_CLASS } from "@/features/landing/constants/layout";

export function IndustryPositioningSection() {
  return (
    <section className="relative py-24 sm:py-32 border-y border-zinc-200 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10 bg-zinc-50">
        <Image
          src="/logistics_critical_infrastructure_bg.png"
          alt="Logistics Infrastructure Background"
          fill
          className="object-cover object-center opacity-[0.45]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-zinc-50 via-zinc-50/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-zinc-50 via-transparent to-zinc-50" />
      </div>

      <div className={`${LANDING_CONTAINER_CLASS} relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center`}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-3xl sm:text-4xl font-light text-zinc-900 mb-8">
            Operating Critical Infrastructures
          </h2>
          <div className="space-y-6 text-lg font-light text-zinc-600">
            <p>Handling high-value goods and time-sensitive cargo with structured precision</p>
            <div className="h-px w-full bg-zinc-300/60 my-8" />
            <p className="text-zinc-500 italic">
              Supporting manufacturing lines and enterprise distribution networks
              <br />
              <strong className="text-zinc-900 font-medium not-italic block mt-2">
                Delivering consistent results daily
              </strong>
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col justify-center lg:pl-10"
        >
          <h2 className="text-2xl sm:text-3xl font-light text-zinc-900 mb-8">
            Ensuring Distribution Integrity
          </h2>
          <div className="space-y-8 text-lg font-light text-zinc-600">
            <p>Maintaining high logistical standards for enterprise-level operations</p>
            <ul className="space-y-5 text-zinc-700">
              <li className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-zinc-200/80 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.05)]">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-base font-medium">Mitigating delays efficiently</span>
              </li>
              <li className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-zinc-200/80 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.05)]">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-base font-medium">Resolving supply chain complexity</span>
              </li>
              <li className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-zinc-200/80 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.05)]">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-base font-medium">Meeting operational targets consistently</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
