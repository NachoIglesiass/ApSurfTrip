import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Mission from "@/components/sections/Mission";
import Navbar from "@/components/sections/Navbar";
import ScrollReveal from "@/components/sections/ScrollReveal";
import Testimonials from "@/components/sections/Testimonials";
import Trips from "@/components/sections/Trips";
import WhyUs from "@/components/sections/WhyUs";
import { trips } from "@/data/site";
import { withLocalTripImages } from "@/lib/trip-images";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Trips trips={withLocalTripImages(trips)} />
        <Mission />
        <WhyUs />
        <HowItWorks />
        <ScrollReveal />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
