import { useLocale, useTranslations } from "next-intl";
import { Leaf, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path d="M15 8.5h2v-3.2C16.6 5.1 15.5 5 14.4 5c-2.4 0-4 1.5-4 4.1V12H8v3h2.4v7h3V15H16l0.5-3h-3.1V9.5c0-.86.24-1 1.6-1Z" />
    </svg>
  );
}

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as keyof typeof siteConfig.address;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-900 text-ivory/80">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-gold-300" strokeWidth={1.5} />
              <span className="font-display text-lg text-ivory">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ivory/60">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h3 className="font-display text-base text-ivory">
              {t("footer.contactsTitle")}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ivory/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold-300" />
                <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold-300" />
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-gold-300" />
                <span>{siteConfig.address[locale] ?? siteConfig.address.en}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base text-ivory">
              {t("footer.linksTitle")}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ivory/70">
              <li><Link href="/#rooms">{t("nav.rooms")}</Link></li>
              <li><Link href="/#amenities">{t("nav.amenities")}</Link></li>
              <li><Link href="/#gallery">{t("nav.gallery")}</Link></li>
              <li><Link href="/booking">{t("nav.bookNow")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base text-ivory">
              {t("footer.socialTitle")}
            </h3>
            <div className="mt-4 flex gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-ivory/20 p-2 hover:border-gold-300 hover:text-gold-300"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-ivory/20 p-2 hover:border-gold-300 hover:text-gold-300"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-ivory/10 pt-6 text-center text-xs text-ivory/50">
          {t("footer.rights", { year })}
        </div>
      </div>
    </footer>
  );
}
