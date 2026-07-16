"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const COUNT = 8;
const images = Array.from({ length: COUNT }, (_, i) => `/images/gallery/${i + 1}.svg`);

export function Gallery() {
  const t = useTranslations("gallery");
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((a) => (a === null ? a : (a - 1 + COUNT) % COUNT)),
    []
  );
  const next = useCallback(
    () => setActive((a) => (a === null ? a : (a + 1) % COUNT)),
    []
  );

  useEffect(() => {
    if (active === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, prev, next]);

  return (
    <section id="gallery" className="bg-forest-950 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold-300">
            {t("eyebrow")}
          </p>
          <h2 className="font-display mt-4 text-4xl text-ivory lg:text-5xl">
            {t("title")}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-xl ${
                i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
              }`}
            >
              <Image
                src={src}
                alt={`Greenwood gallery ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </button>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-950/95 p-4"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute right-5 top-5 text-ivory/80 hover:text-ivory"
            aria-label="close"
          >
            <X className="h-8 w-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 text-ivory/80 hover:text-ivory sm:left-8"
            aria-label="previous"
          >
            <ChevronLeft className="h-9 w-9" />
          </button>
          <div
            className="relative h-[70vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active]}
              alt={`Greenwood gallery ${active + 1}`}
              fill
              className="object-contain"
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 text-ivory/80 hover:text-ivory sm:right-8"
            aria-label="next"
          >
            <ChevronRight className="h-9 w-9" />
          </button>
        </div>
      )}
    </section>
  );
}
