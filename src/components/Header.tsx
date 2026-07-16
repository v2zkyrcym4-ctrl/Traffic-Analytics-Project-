"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Leaf } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { siteConfig } from "@/lib/site";

export function Header() {
  const t = useTranslations();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: "/#about", label: t("nav.home") },
    { href: "/#rooms", label: t("nav.rooms") },
    { href: "/#amenities", label: t("nav.amenities") },
    { href: "/#gallery", label: t("nav.gallery") },
    { href: "/#location", label: t("nav.location") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ivory/95 backdrop-blur shadow-[0_1px_0_0_rgba(22,53,36,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Leaf className="h-6 w-6 text-forest-600" strokeWidth={1.5} />
          <span className="font-display text-xl tracking-wide text-forest-900">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide text-forest-900/80 hover:text-forest-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <LocaleSwitcher />
          <Link
            href="/booking"
            className="rounded-full bg-forest-800 px-5 py-2.5 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-forest-700"
          >
            {t("header.bookNow")}
          </Link>
        </div>

        <button
          className="lg:hidden text-forest-900"
          onClick={() => setOpen((v) => !v)}
          aria-label="menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-forest-800/10 bg-ivory px-6 py-6">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base text-forest-900/80"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex items-center justify-between">
            <LocaleSwitcher />
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="rounded-full bg-forest-800 px-5 py-2.5 text-sm font-medium text-ivory"
            >
              {t("header.bookNow")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
