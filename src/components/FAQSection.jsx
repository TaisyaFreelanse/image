import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const questions = [
  {
    question: "Is this free to use?",
    answer: "Yes, all features of AI Image Enhancer are available for free with no sign-up required.",
  },
  {
    question: "What file formats are supported?",
    answer: "JPG, PNG, WEBP, JPEG, and more.",
  },
  {
    question: "Is my data safe?",
    answer: "Yes, all uploaded images are processed securely and not stored.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2">Got Questions?</h2>
        <p className="text-center text-gray-500 mb-12">Answers to the most common questions.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {questions.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-6 shadow-sm transition"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggle(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                <div className="text-gray-500">
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </div>
              </div>
              {openIndex === index && (
                <p className="mt-4 text-gray-600">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
