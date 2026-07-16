import { useLocale, useTranslations } from "next-intl";
import { MapPin, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function LocationSection() {
  const t = useTranslations("location");
  const locale = useLocale() as keyof typeof siteConfig.address;

  return (
    <section id="location" className="bg-ivory-dark/60 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:px-10">
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold-600">
            {t("eyebrow")}
          </p>
          <h2 className="font-display mt-4 text-balance text-4xl text-forest-900 lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-balance leading-relaxed text-forest-900/70">
            {t("text")}
          </p>

          <div className="mt-8 flex items-center gap-3 text-forest-900">
            <MapPin className="h-5 w-5 shrink-0 text-gold-600" />
            <span>{siteConfig.address[locale] ?? siteConfig.address.en}</span>
          </div>

          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-forest-800 px-6 py-3 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-forest-700"
          >
            {t("mapCta")}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="overflow-hidden rounded-3xl shadow-sm ring-1 ring-forest-900/10">
          <iframe
            title="Greenwood Apartments Odessa map"
            src="https://www.google.com/maps?q=Havanna+Street+10+Odessa+Ukraine&output=embed"
            className="h-[420px] w-full grayscale-[15%] lg:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
