"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { localeNames } from "@/lib/site";

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => router.replace(pathname, { locale: loc })}
          className={`px-2 py-1 text-sm tracking-wide transition-colors rounded-md ${
            loc === locale
              ? "text-gold-600 font-semibold"
              : "text-forest-800/60 hover:text-forest-800"
          }`}
          aria-current={loc === locale}
        >
          {localeNames[loc]}
        </button>
      ))}
    </div>
  );
}
