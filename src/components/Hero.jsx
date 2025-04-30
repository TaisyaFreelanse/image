import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-white py-24 px-4 font-sans">
      <div className="container mx-auto max-w-7xl grid sm:grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {}
        <div className="text-center md:text-left">
  <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 leading-tight mb-0">
    AI Image
  </h1>
  <h2 className="text-6xl md:text-8xl font-extrabold text-[#3C82F4] leading-tight -mt-2 mb-6">
    Enhancer
  </h2>

  <p className="text-xl md:text-base text-gray-700 mb-1">
    Remove watermarks or backgrounds{" "}
    <span className="hidden md:inline bg-yellow-400 text-white font-normal px-4 py-1 rounded-full text-sm align-middle shadow-md rotate-[3deg]">
  with a single click
</span>
  </p>

  <p className="text-xl md:text-base text-gray-600 mb-8 -mt-1">
    Try our smart tools — it’s fast, free, and private.
  </p>

  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
    <Link
      to="/remove-watermarks"
      className="bg-[#3C82F4] text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-[#3C82F4]/90 transition"
    >
      Try Remove Watermark
    </Link>
    <Link
      to="/remove-background"
      className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold shadow hover:bg-yellow-300 transition"
    >
      Try Remove Background
    </Link>
  </div>
</div>

        {}
        <div>
          <img
            src="/girlfoto.jpeg"
            alt="Girl Preview"
            className="w-full max-w-[700px] mx-auto"
          />
        </div>
      </div>
    </section>
  );
}


