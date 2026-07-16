export const siteConfig = {
  name: "Greenwood Apartments",
  city: "Odessa",
  phone: "+380 48 123 45 67",
  phoneHref: "tel:+380481234567",
  email: "stay@greenwood-odessa.com",
  address: {
    ru: "Одесса, Украина",
    en: "Odessa, Ukraine",
    ua: "Одеса, Україна",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Odessa+seafront+Ukraine",
  social: {
    instagram: "https://instagram.com/greenwood.odessa",
    facebook: "https://facebook.com/greenwood.odessa",
    whatsapp: "https://wa.me/380481234567",
  },
} as const;

export const localeNames: Record<string, string> = {
  ru: "RU",
  en: "EN",
  ua: "UA",
};
