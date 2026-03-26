import { motion } from "framer-motion";
import { fadeUp, fadeUpItem, staggerContainer } from "@/features/landing/constants/animations";
import { LANDING_CONTAINER_CLASS } from "@/features/landing/constants/layout";
import { SERVICES } from "@/features/landing/data/landing-data";

export function ServicesSection() {
  return (
    <section className="relative py-24 lg:py-40 bg-zinc-50">
      <div className={LANDING_CONTAINER_CLASS}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl text-left mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-zinc-900">
            Engineered Logistics
            <br />
            <span className="text-zinc-400">End to End Configuration</span>
          </h2>
          <p className="mt-6 text-lg text-primary font-medium">
            Solutions built around your operational requirement
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]"
        >
          {SERVICES.map((service) => {
            const isDark = service.span.includes("bg-zinc-900");

            return (
              <motion.div
                key={service.title}
                variants={fadeUpItem}
                className={`relative p-10 rounded-3xl ${isDark ? service.span : "bg-white border border-zinc-200 shadow-sm " + service.span}`}
              >
                <service.icon
                  className={`h-8 w-8 mb-8 ${isDark ? "text-primary" : "text-zinc-400"}`}
                  strokeWidth={1.5}
                />

                <h3
                  className={`text-2xl font-medium mb-4 tracking-tight ${isDark ? "text-white" : "text-zinc-900"}`}
                >
                  {service.title}
                </h3>
                <p
                  className={`font-light leading-relaxed text-sm lg:text-base ${isDark ? "text-zinc-300" : "text-zinc-500"}`}
                >
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
