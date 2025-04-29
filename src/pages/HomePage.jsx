import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import FAQ from "../components/FAQ"; 
import CTA from "../components/CTA";
import SectionCompare from "../components/SectionCompare";
import ImageShowcase from "../components/ImageShowcase";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <Hero />
      <ImageShowcase />
      <HowItWorks />
      <SectionCompare />

      <section id="reviews">
        <TestimonialsCarousel />
      </section>

      <section id="faq">
        <FAQ /> {}
      </section>

      <CTA />
    </>
  );
}



