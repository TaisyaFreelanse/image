import React from "react";
import UploadImage from "../components/UploadImage";
import CompareSlider from "../components/CompareSlider";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import FAQ from "../components/FAQ"; 

import pinBefore from "../assets/pin1.png";
import pinAfter from "../assets/pin.png";
import BeforeImage from "../assets/pin1.png";
import AfterImage from "../assets/nya.png";
import Before1 from "../assets/pin1.png";
import After1 from "../assets/glo.png";
import Before2 from "../assets/lp.png";
import After2 from "../assets/loi.png";
import Before3 from "../assets/pin1.png";
import After3 from "../assets/mili.png";

export default function WatermarkPage() {
  return (
    <>
      {}
      <section id="top" className="bg-white py-20 px-6">
        <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Remove Watermarks Easy</h1>
            <p className="text-lg text-gray-700 mb-8">
              Use AI to clean up your images — fast, easy, and for free. No sign-up needed.
            </p>
            <UploadImage />
          </div>
          <div className="relative">
            <img src="/watermark-fullpage-preview.jpg" alt="Preview" className="rounded-xl w-full max-w-lg mx-auto">
            </img>
          </div>
        </div>
      </section>

      {}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-gray-500 mb-12">Easy as 1-2-3</p>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="bg-purple-100 p-6 rounded-3xl">
              <img src="/r1.png" alt="Upload your image" className="rounded-3xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Upload your image</h3>
              <p className="text-gray-600">Choose a file from your device or drag & drop it into the editor</p>
            </div>

            <div className="bg-yellow-100 p-6 rounded-3xl">
              <div className="rounded-3xl overflow-hidden mb-4 h-[300px]">
                <CompareSlider beforeImage={pinBefore} afterImage={pinAfter} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Let AI do the magic</h3>
              <p className="text-gray-600">
                Our smart algorithm detects and removes watermarks or backgrounds in seconds.
              </p>
            </div>

            <div className="bg-sky-100 p-6 rounded-3xl">
              <img src="/r3.png" alt="Download the result" className="rounded-3xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Download the result</h3>
              <p className="text-gray-600">Get your clean, high-quality image — ready to use anywhere</p>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="bg-white py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Why People Love Our Tool</h2>
          <p className="text-center text-gray-500 mb-12">Smart, simple, and seriously good at what it does.</p>

          <div className="flex flex-col md:flex-row items-center mb-16 gap-10">
            <div className="md:w-1/2">
              <img src="/lina.png" alt="Remove marks" className="rounded-2xl w-full" />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-2">🧽 Removes even the toughest marks</h3>
              <p className="text-gray-600">
                Our advanced AI tackles even the most stubborn watermarks — whether they’re placed over faces, logos, or textured backgrounds.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center mb-16 gap-10">
            <div className="md:w-1/2">
              <img src="/mimi.jpg" alt="AI erase" className="rounded-2xl w-full" />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-2">🚀 AI that knows what to erase</h3>
              <p className="text-gray-600">
                The AI distinguishes watermarks from important image elements, preserving your visuals.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 ">
            <div className="md:w-1/2">
              <div className="rounded-2xl overflow-hidden w-[500px] h-[500px] md:ml-20">
                <CompareSlider beforeImage={BeforeImage} afterImage={AfterImage} />
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-2">✨ Keeps your image crisp & clear</h3>
              <p className="text-gray-600">
                Say goodbye to smudgy edits. Our watermark remover keeps every detail intact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="bg-gray-50 py-20 px-6 rounded-t-3xl">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">🎉 See the Results Before You Start</h2>
          <p className="text-center text-gray-500 mb-12">Real examples of watermark removal using our AI tool.</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-4 shadow text-center">
              <div className="overflow-hidden rounded-2xl mb-4 h-[320px]">
                <CompareSlider beforeImage={Before1} afterImage={After1} />
              </div>
              <h3 className="text-xl font-semibold mb-1">Great with Faces</h3>
              <p className="text-gray-600 text-sm">Keeps facial details clean and natural.</p>
            </div>

            <div className="bg-white rounded-3xl p-4 shadow text-center">
              <div className="overflow-hidden rounded-2xl mb-4 h-[310px]">
                <CompareSlider beforeImage={Before2} afterImage={After2} />
              </div>
              <h3 className="text-xl font-semibold mb-1">Cleans Nature</h3>
              <p className="text-gray-600 text-sm">Removes marks from trees, skies, and textures with precision.</p>
            </div>

            <div className="bg-white rounded-3xl p-4 shadow text-center">
              <div className="overflow-hidden rounded-2xl mb-4 h-[310px]">
                <CompareSlider beforeImage={Before3} afterImage={After3} />
              </div>
              <h3 className="text-xl font-semibold mb-1">Powerful Recognition</h3>
              <p className="text-gray-600 text-sm">Removes even stubborn watermarks smartly.</p>
            </div>
          </div>
        </div>
      </section>

      {}
      <TestimonialsCarousel />

      {}
      <FAQ />

      {}
      <section className="bg-white py-20 px-6 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start editing your images today 🚀</h2>
          <p className="text-gray-500 mb-8 text-lg">Try our free ✨AI-powered tools✨ now — no sign-up needed.</p>
          <div className="flex justify-center gap-6 flex-wrap">
            <a href="/remove-watermarks" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-medium">
              Try Remove Watermark
            </a>
            <a href="/remove-background" className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full text-sm font-medium">
              Try Remove Background
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

