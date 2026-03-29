import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/features/landing/constants/animations";
import { LANDING_CONTAINER_CLASS } from "@/features/landing/constants/layout";
import { Mail } from "lucide-react";

export function ClosingCtaSection() {
  const t = useTranslations("landing");

  return (
    <section className="relative pt-24 pb-16 bg-white border-t border-zinc-100">
      <div className={LANDING_CONTAINER_CLASS}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Heading */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 leading-[1.1]">
              <span className="block">{t("closingCta.titleLine1")}</span>
              <span className="block">{t("closingCta.titleLine2")}</span>
            </h2>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-zinc-500 text-lg leading-relaxed max-w-md">
              {t("closingCta.newsletter.title")}
            </p>

            <div className="relative max-w-md">
              <div 
                className="relative flex items-center p-2 rounded-full border border-zinc-200 bg-zinc-50/50 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all"
                suppressHydrationWarning
              >
                <div className="pl-4 pr-2 text-zinc-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  placeholder={t("closingCta.newsletter.placeholder")}
                  className="w-full bg-transparent border-none outline-none text-zinc-900 placeholder:text-zinc-400 px-2"
                />
                <Button className="cursor-pointer bg-primary text-white rounded-full px-8 py-3 h-auto font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
                  {t("closingCta.newsletter.button")}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
