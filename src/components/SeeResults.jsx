import React from "react";
import Before1 from "../assets/xz.png";
import After1 from "../assets/xz1.png";
import Before2 from "../assets/po.png";
import After2 from "../assets/po1.png";
import Before3 from "../assets/soso1_stretched.png";
import After3 from "../assets/soso_stretched.png";
import CompareSlider from "./CompareSlider";

export default function SeeResults() {
  return (
    <section className="bg-gray-50 py-20 px-6 rounded-3xl mt-12">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          🎉 See the Results Before You Start
        </h2>
        <p className="text-gray-500 mb-16 max-w-2xl mx-auto">
          Real examples of watermark removal using our AI tool.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {}
          <div className="bg-white p-6 rounded-3xl shadow-md flex flex-col items-center">
            <div className="w-full max-w-[350px] h-[250px] md:max-w-[400px] md:h-[300px] overflow-hidden rounded-2xl mb-6 mx-auto">
              <CompareSlider beforeImage={Before1} afterImage={After1} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Great with Hair</h3>
            <p className="text-gray-500 text-sm">
              Easily handles tricky edges like hair, fur, and semi-transparent areas — with pixel-level precision.
            </p>
          </div>

          {}
          <div className="bg-white p-6 rounded-3xl shadow-md flex flex-col items-center">
            <div className="w-full max-w-[350px] h-[250px] md:max-w-[400px] md:h-[300px] overflow-hidden rounded-2xl mb-6 mx-auto">
              <CompareSlider beforeImage={Before2} afterImage={After2} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Cleans Nature</h3>
            <p className="text-gray-500 text-sm">
              From trees to grass to clouds — even complex natural backgrounds get cleanly removed.
            </p>
          </div>

          {}
          <div className="bg-white p-6 rounded-3xl shadow-md flex flex-col items-center">
            <div className="w-full max-w-[350px] h-[250px] md:max-w-[400px] md:h-[300px] overflow-hidden rounded-2xl mb-6 mx-auto">
              <CompareSlider beforeImage={Before3} afterImage={After3} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Sharp on Details</h3>
            <p className="text-gray-500 text-sm">
              Keeps crisp edges and fine detail, whether it’s lace, text, or thin objects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

