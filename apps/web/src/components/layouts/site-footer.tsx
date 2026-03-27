"use client";

import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const FOOTER_LINKS = [
  {
    titleKey: "footer.sections.solutions.title",
    links: [
      { nameKey: "footer.sections.solutions.links.airFreight", href: "/#services" },
      { nameKey: "footer.sections.solutions.links.seaFreight", href: "/#services" },
      { nameKey: "footer.sections.solutions.links.landTransport", href: "/#services" },
      { nameKey: "footer.sections.solutions.links.warehousing", href: "/#services" },
      { nameKey: "footer.sections.solutions.links.customsCompliance", href: "/#services" },
    ],
  },
  {
    titleKey: "footer.sections.industries.title",
    links: [
      { nameKey: "footer.sections.industries.links.machinery", href: "/#industries" },
      { nameKey: "footer.sections.industries.links.automotive", href: "/#industries" },
      { nameKey: "footer.sections.industries.links.chemicals", href: "/#industries" },
      { nameKey: "footer.sections.industries.links.lifeSciences", href: "/#industries" },
      { nameKey: "footer.sections.industries.links.agriculture", href: "/#industries" },
    ],
  },
  {
    titleKey: "footer.sections.company.title",
    links: [
      { nameKey: "footer.sections.company.links.aboutUs", href: "/#about" },
      { nameKey: "footer.sections.company.links.ourNetwork", href: "/#" },
      { nameKey: "footer.sections.company.links.compliance", href: "/#" },
      { nameKey: "footer.sections.company.links.sustainability", href: "/#" },
      { nameKey: "footer.sections.company.links.careers", href: "/#" },
    ],
  },
];

export function SiteFooter() {
  const t = useTranslations("landing");

  return (
    <footer className="bg-zinc-900 text-zinc-400 py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="relative h-10 w-32 block">
              <Image
                src="/logo.png"
                alt={t("footer.logoAlt")}
                fill
                className="object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-zinc-500 max-w-sm leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="flex items-center gap-4">
              <button type="button" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-primary hover:border-primary hover:text-white transition-all cursor-pointer" aria-label="LinkedIn">
                in
              </button>
              <button type="button" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-primary hover:border-primary hover:text-white transition-all cursor-pointer" aria-label="X">
                x
              </button>
              <button type="button" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-primary hover:border-primary hover:text-white transition-all cursor-pointer" aria-label="Facebook">
                f
              </button>
              <button type="button" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-primary hover:border-primary hover:text-white transition-all cursor-pointer" aria-label="Instagram">
                ig
              </button>
            </div>
          </div>

          {/* Quick Links */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.titleKey}>
              <h4 className="text-white font-semibold mb-6">{t(group.titleKey)}</h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.nameKey}>
                    <Link
                      href={link.href as any}
                      className="hover:text-primary transition-colors cursor-pointer"
                    >
                      {t(link.nameKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6">{t("footer.contact.title")}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  Jl. Sukajaya 4 No.21B,<br />
                  Jelambar Baru, Jakarta Barat<br />
                  11460, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">+62 813-8579-9829</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">cs@kotakkilat.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-zinc-600">
            {t("footer.copyright")}
          </p>
          <div className="flex gap-8 text-sm text-zinc-600">
            <button type="button" className="hover:text-zinc-400 transition-colors cursor-pointer">{t("footer.legal.imprint")}</button>
            <button type="button" className="hover:text-zinc-400 transition-colors cursor-pointer">{t("footer.legal.privacyPolicy")}</button>
            <button type="button" className="hover:text-zinc-400 transition-colors cursor-pointer">{t("footer.legal.termsAndConditions")}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
