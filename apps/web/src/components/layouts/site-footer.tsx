"use client";

import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "@/i18n/routing";

const FOOTER_LINKS = [
  {
    title: "Solutions",
    links: [
      { name: "Air Freight", href: "/#services" },
      { name: "Sea Freight", href: "/#services" },
      { name: "Land Transport", href: "/#services" },
      { name: "Warehousing", href: "/#services" },
      { name: "Customs Compliance", href: "/#services" },
    ],
  },
  {
    title: "Industries",
    links: [
      { name: "Machinery", href: "/#industries" },
      { name: "Automotive", href: "/#industries" },
      { name: "Chemicals", href: "/#industries" },
      { name: "Life Sciences", href: "/#industries" },
      { name: "Agriculture", href: "/#industries" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/#about" },
      { name: "Our Network", href: "/#" },
      { name: "Compliance", href: "/#" },
      { name: "Sustainability", href: "/#" },
      { name: "Careers", href: "/#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="relative h-10 w-32 block">
              <Image
                src="/logo.png"
                alt="Logistic Logo"
                fill
                className="object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-zinc-500 max-w-sm leading-relaxed">
              Global logistics solutions engineered for precision and scale. 
              Connecting markets and empowering businesses with seamless supply chain integration.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all cursor-pointer">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all cursor-pointer">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all cursor-pointer">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all cursor-pointer">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h4 className="text-white font-semibold mb-6">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href as any}
                      className="hover:text-primary transition-colors cursor-pointer"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
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
            2026 © GILABS Integrated Management System. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-zinc-600">
            <a href="#" className="hover:text-zinc-400 transition-colors cursor-pointer">Imprint</a>
            <a href="#" className="hover:text-zinc-400 transition-colors cursor-pointer">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors cursor-pointer">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
