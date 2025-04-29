import React from "react";
import SpongeIcon from "../assets/girlfio.png";
import GirlImage from "../assets/girlfio.png";
import EraserIcon from "../assets/girlfio.png";

import WhyPeopleLove from "../components/WhyPeopleLove";
import SeeResults from "../components/SeeResults";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA"; 

export default function BackgroundPage() {
  return (
    <div className="bg-white py-20 px-6">
      {}
      <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
        {}
        <div className="flex flex-col items-start md:items-start text-left max-w-xl">
          <div className="flex items-center mb-4">
            <h1 className="text-4xl font-bold text-gray-900 font-sans">
              Remove Background from Any
            </h1>
          </div>
          <p className="text-lg text-gray-700 mb-10">
            Upload your image and let AI do the magic — get a clean, transparent background or replace it in one click.
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 w-full text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-full transition mb-3">
              Upload image
            </button>
            <p className="text-gray-500">or Drag & Drop Here</p>
          </div>
        </div>

        {}
        <div className="relative flex justify-center items-center">
          <div className="bg-white rounded-3xl p-2 relative z-10">
            <img src={GirlImage} alt="Girl" className="w-full rounded-3xl" />
          </div>
        </div>
      </div>

      {}
      <div className="mt-24">
        <WhyPeopleLove />
      </div>

      {}
      <div className="mt-24">
        <SeeResults />
      </div>

      {}
      <div className="mt-9">
        <TestimonialsCarousel />
      </div>

      {}
      <section id="faq" className="mt-9">
        <FAQ />
      </section>

      {}
      <div className="mt-9">
        <CTA />
      </div>
    </div>
  );
}

