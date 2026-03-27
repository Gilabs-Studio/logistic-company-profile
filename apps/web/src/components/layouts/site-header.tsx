"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useLenis } from "lenis/react";

const NAV_LINKS = [
  { labelKey: "header.nav.home", href: "/" },
  { labelKey: "header.nav.solutions", href: "/#services" },
  { labelKey: "header.nav.industries", href: "/#industries" },
  { labelKey: "header.nav.about", href: "/#about" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();
  const t = useTranslations("landing");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);
      if (element && lenis) {
        lenis.scrollTo(element, { offset: -80 });
      }
      setIsMobileMenuOpen(false);
    }
  };

  const toggleLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as any });
    setIsLangOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-100 transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-zinc-200 py-3 shadow-sm"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative h-10 w-32 shrink-0 flex">
          <Image
            src="/logo.png"
            alt={t("header.logoAlt")}
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.labelKey}
              href={link.href as any}
              onClick={(e) => handleScrollTo(e as any, link.href)}
              className="text-sm font-medium text-zinc-600 hover:text-primary transition-colors cursor-pointer"
            >
              {t(link.labelKey)}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-primary transition-colors py-2 cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{locale}</span>
              <ChevronDown className={cn("w-3 h-3 transition-transform", isLangOpen && "rotate-180")} />
            </button>
            
            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-32 bg-white border border-zinc-200 rounded-xl shadow-xl py-2 overflow-hidden"
                >
                  <button
                    onClick={() => toggleLanguage("en")}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm hover:bg-zinc-50 transition-colors cursor-pointer",
                      locale === "en" ? "text-primary font-semibold" : "text-zinc-600"
                    )}
                  >
                      {t("header.languages.en")}
                  </button>
                  <button
                    onClick={() => toggleLanguage("id")}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm hover:bg-zinc-50 transition-colors cursor-pointer",
                      locale === "id" ? "text-primary font-semibold" : "text-zinc-600"
                    )}
                  >
                      {t("header.languages.id")}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button variant="default" size="sm" className="rounded-full px-6 cursor-pointer">
              {t("header.contactNow")}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-zinc-600 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-zinc-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.labelKey}
                  href={link.href as any}
                  onClick={(e) => handleScrollTo(e as any, link.href)}
                  className="text-lg font-medium text-zinc-900 cursor-pointer"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <div className="h-px bg-zinc-100 w-full" />
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <button
                    onClick={() => toggleLanguage("en")}
                    className={cn(
                      "text-sm font-medium cursor-pointer",
                      locale === "en" ? "text-primary underline" : "text-zinc-500"
                    )}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => toggleLanguage("id")}
                    className={cn(
                      "text-sm font-medium cursor-pointer",
                      locale === "id" ? "text-primary underline" : "text-zinc-500"
                    )}
                  >
                    ID
                  </button>
                </div>
                <Button variant="default" className="rounded-full cursor-pointer">
                  {t("header.contactNow")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
