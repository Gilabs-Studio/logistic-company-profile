"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const FOOTER_LINKS = [
  {
    titleKey: "footer.sections.company.title",
    links: [
      { nameKey: "header.nav.home", href: "/" },
      { nameKey: "header.nav.solutions", href: "/#services" },
      { nameKey: "header.nav.about", href: "/#about" },
      { nameKey: "footer.sections.industries.title", href: "/#industries" },
    ],
  },
  {
    titleKey: "footer.sections.solutions.title",
    links: [
      { nameKey: "footer.sections.solutions.links.airFreight", href: "/#services" },
      { nameKey: "footer.sections.solutions.links.seaFreight", href: "/#services" },
      { nameKey: "footer.sections.solutions.links.landTransport", href: "/#services" },
      { nameKey: "footer.sections.solutions.links.warehousing", href: "/#services" },
    ],
  },
  {
    titleKey: "footer.sections.industries.title",
    links: [
      { nameKey: "footer.sections.industries.links.machinery", href: "/#industries" },
      { nameKey: "footer.sections.industries.links.automotive", href: "/#industries" },
      { nameKey: "footer.sections.industries.links.chemicals", href: "/#industries" },
      { nameKey: "footer.sections.industries.links.lifeSciences", href: "/#industries" },
    ],
  },
];

export function SiteFooter() {
  const t = useTranslations("landing");

  return (
    <footer className="bg-white text-zinc-900 pt-16 pb-10 overflow-hidden border-t border-zinc-100">
      <div className="relative z-10 mx-auto w-full max-w-340 px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-4">
          {/* Link Columns */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.titleKey}>
              <h4 className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-8">
                {t(group.titleKey)}
              </h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.nameKey}>
                    <Link
                      href={link.href as any}
                      className="text-zinc-900 hover:text-primary transition-colors cursor-pointer text-base"
                    >
                      {t(link.nameKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Socials */}
          <div className="space-y-12">
            <div>
              <h4 className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-6">
                WED LOVE TO HELP YOU WITH EASE
              </h4>
              <a 
                href="mailto:hello@logisticprogressive.com" 
                className="text-2xl md:text-3xl font-medium text-zinc-900 hover:text-primary transition-colors cursor-pointer overflow-wrap-anywhere block"
              >
                hello@progressive.com
              </a>
            </div>

            <div className="space-y-6">
              <h4 className="text-zinc-400 text-xs font-semibold uppercase tracking-widest">
                Follow Us
              </h4>
              <div className="flex items-center gap-3">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Twitter, label: "X" },
                  { icon: Youtube, label: "YouTube" },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-900 hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm"
                    aria-label={item.label}
                  >
                    <item.icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Large Decorative Text - Aligned with Container */}
      <div className="relative z-10 mx-auto w-full max-w-340 px-6 lg:px-12 select-none pointer-events-none mb-4 py-4">
        <h2 
          className="flex justify-between w-full text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold text-zinc-200/80 leading-none tracking-tighter whitespace-nowrap"
          style={{
            maskImage: 'linear-gradient(to top, transparent 0%, black 60%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 60%)',
          }}
        >
          {t("footer.largeText").split("").map((char, index) => (
            <span key={`${char}-${index}`}>{char}</span>
          ))}
        </h2>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-340 px-6 lg:px-12">
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-100 grid grid-cols-1 md:grid-cols-3 items-center gap-6 text-sm text-zinc-400">
          <p className="text-center md:text-left">
            {t("footer.copyright")}
          </p>
          <div className="flex justify-center gap-8">
            <Link href="/terms" className="hover:text-zinc-900 transition-colors cursor-pointer">
              {t("footer.legal.termsAndConditions")}
            </Link>
          </div>
          <div className="flex justify-center md:justify-end gap-8">
            <Link href="/privacy" className="hover:text-zinc-900 transition-colors cursor-pointer">
              {t("footer.legal.privacyPolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
