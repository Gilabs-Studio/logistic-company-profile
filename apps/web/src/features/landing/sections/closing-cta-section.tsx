import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { fadeUp } from "@/features/landing/constants/animations";
import { LANDING_CONTAINER_CLASS } from "@/features/landing/constants/layout";

export function ClosingCtaSection() {
  const t = useTranslations("landing");

  return (
    <section className="relative py-40 border-t border-zinc-200 bg-white">
      <div className={`${LANDING_CONTAINER_CLASS} text-center`}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-3xl"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-zinc-900 leading-tight">
            {t("closingCta.titleLine1")}
            <br />
            <span className="font-serif italic text-zinc-500">{t("closingCta.titleLine2")}</span>
          </h2>

          <div className="mt-12 space-y-4 text-xl font-light text-zinc-600">
            <p>{t("closingCta.intro")}</p>
            <p className="text-primary font-medium mt-6 text-2xl">
              {t("closingCta.emphasis")}
            </p>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login" prefetch={false}>
              <Button className="cursor-pointer h-14 rounded-full px-10 text-sm tracking-wide bg-zinc-900 text-white hover:bg-zinc-800 shadow-xl shadow-zinc-900/10">
                {t("closingCta.primaryCta")}
              </Button>
            </Link>
            <Link href="/contact" prefetch={false}>
              <Button
                variant="outline"
                className="cursor-pointer h-14 rounded-full px-10 text-sm tracking-wide border-zinc-200 text-zinc-900 hover:bg-zinc-50 shadow-sm"
              >
                {t("closingCta.secondaryCta")}
              </Button>
            </Link>
          </div>
          <p className="mt-14 text-xs uppercase tracking-[0.2em] font-medium text-zinc-400">
            <Link
              href="/login"
              className="hover:text-primary transition-colors cursor-pointer mr-6"
            >
              {t("closingCta.consult")}
            </Link>
            •
            <Link
              href="/login"
              className="hover:text-primary transition-colors cursor-pointer ml-6"
            >
              {t("closingCta.initialize")}
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
