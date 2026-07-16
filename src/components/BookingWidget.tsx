"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CalendarClock, CheckCircle2 } from "lucide-react";
import { buildBookingEngineUrl, isYieldPlanetConfigured } from "@/lib/yieldplanet";

type Props = {
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: string;
  initialRoom?: string;
};

export function BookingWidget({
  initialCheckIn = "",
  initialCheckOut = "",
  initialGuests = "2",
  initialRoom = "",
}: Props) {
  const t = useTranslations("booking");
  const tRooms = useTranslations("rooms");
  const locale = useLocale();
  const configured = isYieldPlanetConfigured();

  const rooms = tRooms.raw("items") as { id: string; name: string }[];

  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);
  const [room, setRoom] = useState(initialRoom);

  const iframeSrc = useMemo(
    () =>
      configured
        ? buildBookingEngineUrl({ checkIn, checkOut, guests, room, locale })
        : "",
    [configured, checkIn, checkOut, guests, room, locale]
  );

  if (configured) {
    return (
      <div className="overflow-hidden rounded-3xl bg-ivory shadow-sm ring-1 ring-forest-900/10">
        <iframe
          key={iframeSrc}
          src={iframeSrc}
          title="YieldPlanet Booking Engine"
          className="h-[80vh] w-full"
          loading="lazy"
        />
        <p className="px-6 py-3 text-center text-xs text-forest-900/40">
          {t("poweredBy")} YieldPlanet
        </p>
      </div>
    );
  }

  return (
    <RequestForm
      checkIn={checkIn}
      checkOut={checkOut}
      guests={guests}
      room={room}
      rooms={rooms}
      setCheckIn={setCheckIn}
      setCheckOut={setCheckOut}
      setGuests={setGuests}
      setRoom={setRoom}
    />
  );
}

function RequestForm({
  checkIn,
  checkOut,
  guests,
  room,
  rooms,
  setCheckIn,
  setCheckOut,
  setGuests,
  setRoom,
}: {
  checkIn: string;
  checkOut: string;
  guests: string;
  room: string;
  rooms: { id: string; name: string }[];
  setCheckIn: (v: string) => void;
  setCheckOut: (v: string) => void;
  setGuests: (v: string) => void;
  setRoom: (v: string) => void;
}) {
  const t = useTranslations("booking");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("/api/booking-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, checkIn, checkOut, guests, room, message }),
      });
    } finally {
      setStatus("sent");
    }
  }

  return (
    <div className="rounded-3xl bg-ivory p-6 shadow-sm ring-1 ring-forest-900/10 lg:p-10">
      <div className="flex items-start gap-4 rounded-2xl bg-gold-50 p-5">
        <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
        <div>
          <h3 className="font-display text-lg text-forest-900">
            {t("notConfigured.title")}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-forest-900/60">
            {t("notConfigured.text")}
          </p>
        </div>
      </div>

      {status === "sent" ? (
        <div className="mt-8 flex items-center gap-3 rounded-2xl bg-forest-50 p-6 text-forest-800">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <p className="text-sm">{t("form.success")}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label={t("form.name")}>
            <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </Field>
          <Field label={t("form.email")}>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </Field>
          <Field label={t("form.phone")}>
            <input required value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
          </Field>
          <Field label={t("form.room")}>
            <select value={room} onChange={(e) => setRoom(e.target.value)} className={inputClass}>
              <option value="">—</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t("form.checkIn")}>
            <input required type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={inputClass} />
          </Field>
          <Field label={t("form.checkOut")}>
            <input required type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={inputClass} />
          </Field>
          <Field label={t("form.guests")}>
            <input required type="number" min={1} max={12} value={guests} onChange={(e) => setGuests(e.target.value)} className={inputClass} />
          </Field>
          <div className="sm:col-span-2">
            <Field label={t("form.message")}>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className={inputClass} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-forest-800 px-6 py-3.5 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-forest-700 disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? "…" : t("form.submit")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-forest-900/15 bg-ivory px-4 py-2.5 text-sm text-forest-900 outline-none focus:border-forest-500";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-wider text-forest-700/70">
        {label}
      </span>
      {children}
    </label>
  );
}
