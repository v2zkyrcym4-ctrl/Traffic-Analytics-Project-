import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookingWidget } from "@/components/BookingWidget";

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("booking");
  const sp = await searchParams;

  const asString = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v ?? "";

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold-600">
          {t("eyebrow")}
        </p>
        <h1 className="font-display mt-4 text-4xl text-forest-900 lg:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-forest-900/70">{t("subtitle")}</p>
      </div>

      <div className="mt-14">
        <BookingWidget
          initialCheckIn={asString(sp.checkIn)}
          initialCheckOut={asString(sp.checkOut)}
          initialGuests={asString(sp.guests) || "2"}
          initialRoom={asString(sp.room)}
        />
      </div>
    </section>
  );
}
