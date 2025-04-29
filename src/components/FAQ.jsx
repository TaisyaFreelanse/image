import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    q: "Is this free to use?",
    a: "Yes! Core watermark & background tools are free with no sign‑up.",
  },
  {
    q: "What file formats are supported?",
    a: "JPG, PNG, WEBP, JPEG, and more.",
  },
  {
    q: "Is my data safe?",
    a: "We process images in isolated containers and delete them within 24 hours.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="mx-auto max-w-3xl px-4 py-24">
      <h2 className="text-center text-3xl font-bold">Got Questions?</h2>
      <p className="mt-2 text-center text-gray-500">
        Answers to the most common questions.
      </p>

      <div className="mt-12 space-y-4">
        {faqs.map((f, i) => (
          <div
            key={i}
            className="cursor-pointer border-b py-4"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{f.q}</span>
              <div className="transition-transform duration-300">
                {open === i ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </div>

            {}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                open === i ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-sm text-gray-600">{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


