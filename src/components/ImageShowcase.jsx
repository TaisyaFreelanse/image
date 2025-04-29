import React from "react";
import { Link } from "react-router-dom";
import CompareSlider from "./CompareSlider";

import WatermarkedBefore from "../assets/1water.png";
import WatermarkedAfter from "../assets/2water.jpg";
import BackgroundBefore from "../assets/flow1.jpg";
import BackgroundAfter from "../assets/flow.png";

export default function ToolCards() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="grid md:grid-cols-2 gap-6">

        {}
        <div className="bg-white rounded-[32px] shadow-md overflow-hidden text-center flex flex-col items-center p-8">
          <div className="w-full aspect-[2/1] overflow-hidden rounded-[20px]">
            <CompareSlider
              beforeImage={WatermarkedBefore}
              afterImage={WatermarkedAfter}
            />
          </div>
          <h3 className="text-2xl font-semibold mt-6 mb-2">Remove Watermark</h3>
          <p className="text-gray-600 mb-6 max-w-md">
            Logos, timestamps, text — gone in seconds.<br />
            Automatic & manual AI cleanup.
          </p>
          <Link
            to="/remove-watermarks"
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Start Work
          </Link>
        </div>

        {}
        <div className="bg-white rounded-[32px] shadow-md overflow-hidden text-center flex flex-col items-center p-8">
          <div className="w-full aspect-[2/1] overflow-hidden rounded-[20px]">
            <CompareSlider
              beforeImage={BackgroundBefore}
              afterImage={BackgroundAfter}
              initial={55}
            />
          </div>
          <h3 className="text-2xl font-semibold mt-6 mb-2">Remove Background</h3>
          <p className="text-gray-600 mb-6 max-w-md">
            Transparent or new — just pick a background and go.<br />
            Perfect for e-commerce or social posts.
          </p>
          <Link
            to="/remove-background"
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Start Work
          </Link>
        </div>

      </div>
    </div>
  );
}










