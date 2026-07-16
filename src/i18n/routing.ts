import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en", "ua"],
  defaultLocale: "ru",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
