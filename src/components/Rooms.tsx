import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Users, Maximize2 } from "lucide-react";

type RoomItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  area: number;
  guests: number;
  amenities: string[];
};

export function Rooms() {
  const t = useTranslations("rooms");
  const locale = useLocale();
  const items = t.raw("items") as RoomItem[];

  const currencyFormatter = new Intl.NumberFormat(
    locale === "ru" ? "ru-RU" : locale === "ua" ? "uk-UA" : "en-US",
    { style: "currency", currency: "EUR", maximumFractionDigits: 0 }
  );

  return (
    <section id="rooms" className="bg-ivory-dark/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold-600">
            {t("eyebrow")}
          </p>
          <h2 className="font-display mt-4 text-4xl text-forest-900 lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-forest-900/70">{t("subtitle")}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((room) => (
            <div
              key={room.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-ivory shadow-sm ring-1 ring-forest-900/5 transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={`/images/rooms/${room.id}.svg`}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl text-forest-900">
                  {room.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-forest-900/60">
                  {room.description}
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs text-forest-900/60">
                  <span className="flex items-center gap-1">
                    <Maximize2 className="h-3.5 w-3.5" />
                    {room.area} {t("area")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {room.guests} {t("guests")}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {room.amenities.map((a) => (
                    <span
                      key={a}
                      className="rounded-full bg-forest-50 px-2.5 py-1 text-[11px] text-forest-700"
                    >
                      {a}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-forest-900/10 pt-4">
                  <div>
                    <span className="text-[11px] uppercase text-forest-900/50">
                      {t("from")}
                    </span>
                    <div className="font-display text-lg text-forest-900">
                      {currencyFormatter.format(room.price)}
                      <span className="text-xs font-sans text-forest-900/50">
                        {t("perNight")}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/booking?room=${room.id}`}
                    className="rounded-full bg-forest-800 px-4 py-2 text-xs font-medium tracking-wide text-ivory transition-colors hover:bg-forest-700"
                  >
                    {t("bookButton")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
