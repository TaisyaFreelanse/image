import React from "react";
import Img1 from "../assets/precision.png";
import Before2 from "../assets/kili.png";
import After2 from "../assets/kili1.jpg";
import Before3 from "../assets/mimi.png";
import After3 from "../assets/mimi1.png";
import CompareSlider from "./CompareSlider";

export default function WhyPeopleLove() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="container mx-auto">
        {}
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
          Why People Love Our <br /> Background Remover
        </h2>
        <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          AI that's fast, precise, and looks like real editing magic.
        </p>

        {}
        <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
          {}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">🎯 Precision Edge Detection</h3>
            <p className="text-gray-600">
              Our AI carefully traces even the finest details — from loose strands of hair to delicate accessories and complex shapes.
              No rough cutouts or missing parts. Everything stays crisp and natural.
            </p>
          </div>
          {}
          <div className="md:w-1/2">
            <img src={Img1} alt="Precision" className="w-full rounded-xl" />
          </div>
        </div>

        {}
<div className="flex flex-col md:flex-row-reverse gap-12 items-center mb-24">
  {}
  <div className="md:w-1/2">
    <h3 className="text-2xl font-semibold mb-4">🎨 Background Your Way</h3>
    <p className="text-gray-600">
      You choose how your final image looks. Replace the background with a clean transparent layer, a solid color,
      or pick from our curated gallery. Simple, flexible, and fast.
    </p>
  </div>
  {}
  <div className="w-full max-w-[500px] h-[350px] md:max-w-[550px] md:h-[500px] overflow-hidden rounded-2xl shadow-lg mx-auto md:mx-0 md:w-1/2">
    <CompareSlider
      beforeImage={Before2}
      afterImage={After2}
    />
  </div>
</div>


        {}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">✨ Quality-Preserving Removal</h3>
            <p className="text-gray-600">
              Removing the background shouldn't mean losing quality. Our AI preserves sharpness, lighting, and color balance in the subject.
              The result looks natural — like there was never a background at all.
            </p>
          </div>
          <div className="w-full max-w-[500px] h-[350px] md:max-w-[700px] md:h-[700px] overflow-hidden rounded-2xl shadow-lg mx-auto">
            <CompareSlider
              beforeImage={Before3}
              afterImage={After3}
            />
          </div>
        </div>

      </div>
    </section>
  );
}






