import before from "../assets/before.jpg";
import after from "../assets/after.jpg";
import { useState } from "react";

export default function FeatureBlock({ side = "right", type = "watermark" }) {
  const [pos, setPos] = useState(50);
  const isLeft = side === "left";

  const title =
    type === "watermark" ? "Remove Watermarks" : "Replace Backgrounds";
  const blurb =
    type === "watermark"
      ? "Logos, timestamps, text — gone in seconds. Automatic & manual AI cleanup."
      : "Transparent or new — just pick a background and go. Perfect for e‑commerce or social posts.";

  return (
    <section
      id={type}
      className={`mx-auto grid max-w-7xl items-center gap-8 px-4 py-24 md:grid-cols-2 ${
        isLeft ? "md:flex-row-reverse" : ""
      }`}
    >
      {!isLeft && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="max-w-md text-gray-600">{blurb}</p>
          <a
            href="#"
            className="inline-block rounded-full bg-brand px-6 py-3 font-medium text-white shadow hover:bg-brand/90"
          >
            {type === "watermark" ? "Try Watermark Tool" : "Try Background Tool"}
          </a>
        </div>
      )}

      {}
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <img src={after} className="block w-full" alt="after" />
        <img
          src={before}
          alt="before"
          className="absolute inset-0 w-full"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />
        <input
          type="range"
          min="1"
          max="99"
          value={pos}
          onChange={(e) => setPos(e.target.value)}
          className="absolute inset-x-0 bottom-4 mx-auto w-[60%] accent-brand"
        />
      </div>

      {isLeft && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="max-w-md text-gray-600">{blurb}</p>
          <a
            href="#"
            className="inline-block rounded-full bg-brandYellow px-6 py-3 font-medium text-gray-900 shadow hover:bg-brandYellow/90"
          >
            {type === "watermark" ? "Try Watermark Tool" : "Try Background Tool"}
          </a>
        </div>
      )}
    </section>
  );
}
