import { useTranslations } from "next-intl";
import {
  ConciergeBell,
  ParkingSquare,
  Wifi,
  Coffee,
  Waves,
  Plane,
  ShieldCheck,
  PawPrint,
  type LucideIcon,
} from "lucide-react";

const icons: LucideIcon[] = [
  ConciergeBell,
  ParkingSquare,
  Wifi,
  Coffee,
  Waves,
  Plane,
  ShieldCheck,
  PawPrint,
];

type AmenityItem = { title: string; description: string };

export function Amenities() {
  const t = useTranslations("amenities");
  const items = t.raw("items") as AmenityItem[];

  return (
    <section id="amenities" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold-600">
          {t("eyebrow")}
        </p>
        <h2 className="font-display mt-4 text-4xl text-forest-900 lg:text-5xl">
          {t("title")}
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-forest-900/10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={item.title} className="bg-ivory p-8 transition-colors hover:bg-forest-50">
              <Icon className="h-7 w-7 text-forest-600" strokeWidth={1.5} />
              <h3 className="font-display mt-4 text-lg text-forest-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-900/60">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
