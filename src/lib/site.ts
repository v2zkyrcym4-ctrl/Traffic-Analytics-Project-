export const siteConfig = {
  name: "Greenwood Apartments",
  city: "Odessa",
  phone: "+380 48 123 45 67",
  phoneHref: "tel:+380481234567",
  email: "stay@greenwood-odessa.com",
  address: {
    ru: "Французский бульвар 85/5, Одесса, Украина",
    en: "85/5 French Boulevard, Odessa, Ukraine",
    ua: "Французький бульвар 85/5, Одеса, Україна",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Французский+бульвар+85%2F5+Одесса",
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
