import { motion } from "framer-motion";
import { fadeUp } from "@/features/landing/constants/animations";
import { LANDING_CONTAINER_CLASS } from "@/features/landing/constants/layout";

export function PhilosophySection() {
  return (
    <section className="relative py-32 bg-zinc-900 overflow-hidden text-center">
      <div className={LANDING_CONTAINER_CLASS}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-4xl"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] font-light leading-[1.05] tracking-tight text-white mb-16">
            Speed is Expected
            <br />
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
  );
}
