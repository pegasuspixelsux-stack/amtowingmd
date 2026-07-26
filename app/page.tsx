import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HazardStripe from "@/components/HazardStripe";
import TrustBar from "@/components/TrustBar";
import About from "@/components/About";
import Services from "@/components/Services";
import EmergencyCTA from "@/components/EmergencyCTA";
import ReleaseForm from "@/components/ReleaseForm";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HazardStripe />
        <TrustBar />
        <About />
        <Services />
        <EmergencyCTA />
        <ReleaseForm />
        <WhyChooseUs />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
