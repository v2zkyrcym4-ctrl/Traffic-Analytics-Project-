import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Rooms } from "@/components/Rooms";
import { Amenities } from "@/components/Amenities";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { LocationSection } from "@/components/LocationSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <About />
      <Rooms />
      <Amenities />
      <Gallery />
      <Testimonials />
      <LocationSection />
    </>
  );
}
