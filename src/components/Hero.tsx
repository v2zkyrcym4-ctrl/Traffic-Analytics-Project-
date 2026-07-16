"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronDown, Search } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("hero");
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("guests", String(guests));
    router.push(`/booking?${params.toString()}`);
  }

  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="Greenwood Apartments Odessa"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/40 to-forest-950/20" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-40 lg:px-10">
        <p className="text-xs uppercase tracking-[0.35em] text-gold-300">
          {t("eyebrow")}
        </p>
        <h1 className="font-display mt-4 max-w-3xl text-balance text-5xl leading-tight text-ivory sm:text-6xl lg:text-7xl">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-xl text-balance text-lg text-ivory/80">
          {t("subtitle")}
        </p>

        <form
          onSubmit={handleSearch}
          className="mt-10 grid grid-cols-1 gap-3 rounded-2xl bg-ivory/95 p-4 shadow-2xl backdrop-blur sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:gap-2 lg:p-3"
        >
          <label className="flex flex-col gap-1 rounded-xl px-3 py-2 text-left lg:px-4">
            <span className="text-[11px] uppercase tracking-wider text-forest-700/70">
              {t("search.checkIn")}
            </span>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="bg-transparent text-sm text-forest-900 outline-none"
              required
            />
          </label>
          <label className="flex flex-col gap-1 rounded-xl px-3 py-2 text-left lg:px-4">
            <span className="text-[11px] uppercase tracking-wider text-forest-700/70">
              {t("search.checkOut")}
            </span>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-transparent text-sm text-forest-900 outline-none"
              required
            />
          </label>
          <label className="flex flex-col gap-1 rounded-xl px-3 py-2 text-left lg:px-4">
            <span className="text-[11px] uppercase tracking-wider text-forest-700/70">
              {t("search.guests")}
            </span>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="bg-transparent text-sm text-forest-900 outline-none"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-forest-800 px-6 py-3.5 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-forest-700"
          >
            <Search className="h-4 w-4" />
            {t("search.submit")}
          </button>
        </form>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-ivory/70 hover:text-ivory"
        aria-label={t("scroll")}
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}
