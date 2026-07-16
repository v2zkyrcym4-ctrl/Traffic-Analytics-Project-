import { NextResponse } from "next/server";

export type BookingRequestPayload = {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  room: string;
  message?: string;
};

// Manual-booking fallback used while the YieldPlanet Booking Engine isn't
// connected yet. Wire this up to your notification channel of choice
// (email via Resend/SMTP, a Telegram bot, a CRM webhook, etc.) — see
// README.md "Connecting YieldPlanet" for details. For now it just logs the
// request server-side so nothing is silently dropped.
export async function POST(request: Request) {
  const body = (await request.json()) as Partial<BookingRequestPayload>;

  if (!body.name || !body.email || !body.checkIn || !body.checkOut) {
    return NextResponse.json(
      { ok: false, error: "missing_fields" },
      { status: 400 }
    );
  }

  console.log("[booking-request]", body);

  return NextResponse.json({ ok: true });
}
