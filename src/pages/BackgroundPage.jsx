import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import GirlImage from "../assets/girlfio.png";
import WhyPeopleLove from "../components/WhyPeopleLove";
import SeeResults from "../components/SeeResults";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Loader from "../components/Loader";

export default function BackgroundPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showUnsupportedModal, setShowUnsupportedModal] = useState(false);
  const [showFileTooLargeModal, setShowFileTooLargeModal] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setShowUnsupportedModal(true);
        return;
      }
  
      const maxSize = 10 * 1024 * 1024; 
      if (file.size > maxSize) {
        setShowFileTooLargeModal(true);
        return;
      }
  
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          navigate("/process-background", { state: { image: imageData } });
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };
  
  

  return (
    <div className="bg-white py-20 px-6 relative">
      {loading && <Loader />}

      <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl mx-auto">
          <div className="flex items-center mb-4">
            <h1 className="text-4xl font-bold text-gray-900 font-sans">
              Remove Background from Any
            </h1>
          </div>
          <p className="text-lg text-gray-700 mb-10">
            Upload your image and let AI do the magic — get a clean, transparent background or replace it in one click.
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 w-full text-center">
            <label
              htmlFor="file-upload"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-full transition mb-3 inline-block cursor-pointer"
            >
              Upload image
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <p className="text-gray-500">or Drag & Drop Here</p>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <div className="bg-white rounded-3xl p-2 relative z-10">
            <img src={GirlImage} alt="Girl" className="w-full rounded-3xl" />
          </div>
        </div>
      </div>

      <div className="mt-24">
        <WhyPeopleLove />
      </div>

      <div className="mt-24">
        <SeeResults />
      </div>

      <div className="mt-9">
        <section id="reviews">
          <TestimonialsCarousel />
        </section>
      </div>

      <section id="faq" className="mt-9">
        <FAQ />
      </section>

      <div className="mt-9">
        <CTA />
      </div>
      {showUnsupportedModal && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
    <div className="bg-white px-12 py-10 rounded-[32px] text-center shadow-xl w-[90%] max-w-md">
      <img src="/unsupported-icon.png" alt="Error icon" className="w-16 h-16 mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">Unsupported file type…</h2>
      <p className="text-gray-600 text-sm mb-6">
        This format is not supported.<br />
        Please upload a <span className="text-blue-600">.jpg</span>, <span className="text-blue-600">.jpeg</span>, <span className="text-blue-600">.png</span>, or <span className="text-blue-600">.webp</span> image.
      </p>
      <button
        onClick={() => setShowUnsupportedModal(false)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm"
      >
        Okay
      </button>
    </div>
  </div>
)}

{showFileTooLargeModal && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
    <div className="bg-white px-12 py-10 rounded-[32px] text-center shadow-xl w-[90%] max-w-md">
      <img src="/unsupported-icon.png" alt="Error icon" className="w-16 h-16 mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">File too large</h2>
      <p className="text-gray-600 text-sm mb-6">
        Your image is too large. Max size is <span className="text-blue-600">10 MB</span>
      </p>
      <button
        onClick={() => setShowFileTooLargeModal(false)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm"
      >
        Okay
      </button>
    </div>
  </div>
)}

  </div>
)}

 


