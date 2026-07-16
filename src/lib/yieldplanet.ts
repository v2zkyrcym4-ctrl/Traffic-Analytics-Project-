/**
 * YieldPlanet Booking Engine connection settings.
 *
 * Fill these environment variables once the YieldPlanet hotel account exists
 * (see README.md "Connecting YieldPlanet" for the exact steps to obtain them
 * from the YieldPlanet partner dashboard). Until they are set, the booking
 * page falls back to a manual request form instead of the live widget.
 *
 * NEXT_PUBLIC_YIELDPLANET_BE_URL is the iframe URL template YieldPlanet
 * gives you for this property. It may contain the tokens below, which get
 * substituted at runtime with the guest's actual search:
 *   {hotelId} {checkIn} {checkOut} {guests} {roomId} {locale}
 */
export const yieldPlanetConfig = {
  hotelId: process.env.NEXT_PUBLIC_YIELDPLANET_HOTEL_ID ?? "",
  bookingEngineUrl: process.env.NEXT_PUBLIC_YIELDPLANET_BE_URL ?? "",
};

export function isYieldPlanetConfigured() {
  return Boolean(yieldPlanetConfig.hotelId && yieldPlanetConfig.bookingEngineUrl);
}

export type BookingSearch = {
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  room?: string;
  locale: string;
};

export function buildBookingEngineUrl(search: BookingSearch): string {
  return yieldPlanetConfig.bookingEngineUrl
    .replaceAll("{hotelId}", yieldPlanetConfig.hotelId)
    .replaceAll("{checkIn}", search.checkIn ?? "")
    .replaceAll("{checkOut}", search.checkOut ?? "")
    .replaceAll("{guests}", search.guests ?? "2")
    .replaceAll("{roomId}", search.room ?? "")
    .replaceAll("{locale}", search.locale);
}
