import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";

type Testimonial = { name: string; origin: string; text: string; rating: number };

export function Testimonials() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as Testimonial[];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold-600">
          {t("eyebrow")}
        </p>
        <h2 className="font-display mt-4 text-4xl text-forest-900 lg:text-5xl">
          {t("title")}
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl bg-forest-50/60 p-8 ring-1 ring-forest-900/5"
          >
            <Quote className="h-6 w-6 text-gold-500" />
            <p className="mt-4 text-sm leading-relaxed text-forest-900/75">
              &ldquo;{item.text}&rdquo;
            </p>
            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="font-display text-base text-forest-900">
                  {item.name}
                </div>
                <div className="text-xs text-forest-900/50">{item.origin}</div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-gold-400 text-gold-400"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
