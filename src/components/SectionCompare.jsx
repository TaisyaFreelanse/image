import { Link } from "react-router-dom";
import CompareSlider from "./CompareSlider";

import glav1 from "../assets/glav1.png";
import glav from "../assets/glav.jpg";
import personBefore from "../assets/person.jpg"; 
import personAfter from "../assets/person1.png";

export default function SectionCompare() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="container mx-auto max-w-7xl space-y-36">

        {}
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Remove Watermarks</h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto md:mx-0">
                Logos, timestamps, text — gone in seconds. Automatic & manual AI cleanup.
              </p>
            </div>
            <Link
              to="/remove-watermarks"
              className="mt-10 inline-block w-max bg-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-600 transition self-center md:self-start"
            >
              Try Watermark Tool
            </Link>
          </div>

          {}
          <div className="flex-1 flex justify-center">
          <div className="w-[400px] h-[420px] md:w-[580px] md:h-[600px] rounded-[30px] overflow-hidden mx-auto">
              <CompareSlider
                beforeImage={glav1}
                afterImage={glav}
              />
            </div>
          </div>
        </div>

        {}
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {}
          <div className="flex-1 flex justify-center order-2 md:order-1">
          <div className="w-[400px] h-[400px] md:w-[600px] md:h-[650px] rounded-[30px] overflow-hidden border border-gray-300 mx-auto">
              <CompareSlider
                beforeImage={personBefore}
                afterImage={personAfter}
              />
            </div>
          </div>

          {}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left order-1 md:order-2">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Replace Backgrounds</h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto md:mx-0">
                Transparent or new — just pick a background and go. Perfect for e-commerce or social posts.
              </p>
            </div>
            <Link
              to="/remove-background"
              className="mt-10 inline-block w-max bg-blue-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-600 transition self-center md:self-start"
            >
              Try Background Tool
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}







