import { motion } from "framer-motion";
import { fadeUp } from "@/features/landing/constants/animations";
import { LANDING_CONTAINER_CLASS } from "@/features/landing/constants/layout";

export function TrustHookSection() {
  return (
    <section className="relative py-32 lg:py-40 flex flex-col items-center justify-center bg-zinc-50 border-y border-zinc-100">
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
            <span className="text-primary font-medium">control over operational uncertainty</span>
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
    </section>
  );
}
