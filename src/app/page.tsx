import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AudienceRows from "@/components/AudienceRows";
import Engine from "@/components/Engine";
import Publishers from "@/components/Publishers";
import PlatformStrip from "@/components/PlatformStrip";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Engine />
        <AudienceRows />
        <Publishers />
        <PlatformStrip />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
