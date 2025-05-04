import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 text-center">
      <h2 className="text-3xl font-bold">
        Start editing your images today <span role="img" aria-label="rocket">🚀</span>
      </h2>
      <p className="mt-2 text-lg">
        Try our free <span className="font-semibold">✨AI‑powered tools✨</span> now — no sign‑up needed.
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
        <Link
          to="/remove-watermarks"
          className="rounded-full bg-blue-600 px-8 py-3 font-medium text-white shadow hover:bg-blue-700 transition"
        >
          Try Remove Watermark
        </Link>
        <Link
          to="/remove-background"
          className="rounded-full bg-yellow-400 px-8 py-3 font-medium text-gray-900 shadow hover:bg-yellow-500 transition"
        >
          Try Remove Background
        </Link>
      </div>
    </section>
  );
}