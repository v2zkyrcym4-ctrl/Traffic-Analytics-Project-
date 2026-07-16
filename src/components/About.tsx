import Image from "next/image";
import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations("about");
  const stats = t.raw("stats") as { value: string; label: string }[];

  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div className="relative aspect-[6/7] w-full overflow-hidden rounded-3xl">
          <Image
            src="/images/about.webp"
            alt="Greenwood Apartments courtyard"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gold-600">
            {t("eyebrow")}
          </p>
          <h2 className="font-display mt-4 text-balance text-4xl leading-tight text-forest-900 lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-balance leading-relaxed text-forest-900/70">
            {t("text")}
          </p>

          <div className="mt-10 grid grid-cols-2 gap-8 border-t border-forest-900/10 pt-8 sm:grid-cols-4 lg:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl text-forest-800">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-forest-900/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
