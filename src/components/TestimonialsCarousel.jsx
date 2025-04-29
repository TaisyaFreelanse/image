import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Lynn Tanner",
    username: "@lynn",
    text: "Wow! The watermark remover worked in seconds and saved me a ton of Photoshop time.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Hannibal Smith",
    username: "@hannibal",
    text: "Background removal is insanely accurate. Perfect for my Etsy listings!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Col. Roderick Decker",
    username: "@decker",
    text: "Clean UI and results are better than paid tools I've tried. Love it.",
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
  },
  {
    name: "Samantha Rose",
    username: "@samantha",
    text: "Easy to use and fast results. My go-to tool for quick edits!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          What our users say
        </h2>
        <p className="text-gray-500 mb-10">
          Real feedback from people who tried our AI tools
        </p>

        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[0, 1, 2].map((offset) => {
            const i = (index + offset) % testimonials.length;
            const t = testimonials[i];
            return (
              <div
                key={i}
                className="flex flex-col justify-between h-full bg-white p-6 rounded-2xl shadow-md text-left transition-transform duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.username}</p>
                  </div>
                </div>
                <p className="text-gray-700">{t.text}</p>
              </div>
            );
          })}
        </div>

        {}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="p-3 rounded-full border bg-white shadow hover:bg-gray-100 transition"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          <button
            onClick={next}
            className="p-3 rounded-full border bg-white shadow hover:bg-gray-100 transition"
          >
            <FaArrowRight className="text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}





