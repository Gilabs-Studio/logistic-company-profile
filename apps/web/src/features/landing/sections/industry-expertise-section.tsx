import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeUp } from "@/features/landing/constants/animations";
import { LANDING_CONTAINER_CLASS } from "@/features/landing/constants/layout";
import { INDUSTRIES } from "@/features/landing/data/landing-data";

export function IndustryExpertiseSection() {
  const t = useTranslations("landing");

  return (
    <section id="industries" className="relative py-24 lg:py-40 bg-white overflow-hidden">
      <div className={LANDING_CONTAINER_CLASS}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-zinc-900">
            {t("industryExpertise.titleLine1")}
            <br />
            <span className="text-zinc-400">{t("industryExpertise.titleLine2")}</span>
          </h2>
          <p className="mt-6 text-lg text-primary font-medium">{t("industryExpertise.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INDUSTRIES.map((industry) => (
            <motion.div
              key={industry.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative h-[400px] rounded-3xl overflow-hidden border border-zinc-200 shadow-sm"
            >
              {/* Card Image Background */}
              {industry.image && (
                <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-900/90 via-zinc-900/40 to-transparent" />
                </div>
              )}

              <div className="relative z-10 h-full p-10 flex flex-col justify-end">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-primary">
                    <industry.icon className="w-6 h-6" />
                  </div>
                  <div className="text-zinc-300 font-mono text-[10px] tracking-widest uppercase bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    {t("industryExpertise.sectorLabel")} / {industry.id}
                  </div>
                </div>

                <h3 className="text-2xl font-medium text-white mb-3 tracking-tight">
                  {t(industry.titleKey)}
                </h3>
                <p className="text-zinc-200 font-light leading-relaxed max-w-sm text-sm">
                  {t(industry.descriptionKey)}
                </p>
                
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary cursor-pointer border-t border-white/10 pt-6">
                  {`${t("industryExpertise.learnMore")} `}
                  <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
