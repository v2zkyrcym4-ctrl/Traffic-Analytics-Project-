export const siteConfig = {
  name: "Greenwood Apartments",
  city: "Odessa",
  phone: "+380 48 123 45 67",
  phoneHref: "tel:+380481234567",
  email: "stay@greenwood-odessa.com",
  address: {
    ru: "ул. Гаванная, 10, Одесса, Украина",
    en: "10 Havanna St, Odessa, Ukraine",
    ua: "вул. Гаванна, 10, Одеса, Україна",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Havanna+St+10+Odessa+Ukraine",
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
