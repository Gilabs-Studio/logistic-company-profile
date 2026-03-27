import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeUp } from "@/features/landing/constants/animations";
import { LANDING_CONTAINER_CLASS } from "@/features/landing/constants/layout";

export function AboutSection() {
  const t = useTranslations("landing");

  return (
    <section id="about" className="relative py-24 lg:py-40">
      <div className={`${LANDING_CONTAINER_CLASS} grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center`}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-8"
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t("about.eyebrow")}
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-light leading-tight tracking-tight text-zinc-900">
            {t("about.titleLine1")}
            <br />
            {t("about.titleLine2")}
          </h2>

          <div className="mt-10 space-y-8 text-lg font-light leading-relaxed text-zinc-600">
            <p>
              <strong className="font-medium text-zinc-900">{t("about.introStrong")}</strong> {t("about.introText")}
            </p>
            <p>
              {t("about.body")}
            </p>
            <div className="p-6 bg-zinc-50 border-l-2 border-primary rounded-r-2xl">
              <p className="text-zinc-700 text-base">
                {t("about.highlightIntro")}
                <span className="text-primary font-medium block mt-2">
                  {t("about.highlightText")}
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-7 relative h-[600px] w-full rounded-2xl overflow-hidden bg-zinc-100"
        >
          <Image
            src="/login.png"
            alt={t("about.imageAlt")}
            fill
            className="object-cover mix-blend-multiply opacity-90"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
