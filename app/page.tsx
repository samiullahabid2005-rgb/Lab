import Hero from "@/components/home/Hero";
import PopularTests from "@/components/home/PopularTests";
import PackagesPreview from "@/components/home/PackagesPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import Faq from "@/components/home/Faq";
import ContactCta from "@/components/home/ContactCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularTests />
      <PackagesPreview />
      <WhyChooseUs />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <Faq />
      <ContactCta />
    </>
  );
}
