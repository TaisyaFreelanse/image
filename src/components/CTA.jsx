export default function CTA() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 text-center">
      <h2 className="text-3xl font-bold">
        Start editing your images today <span role="img">🚀</span>
      </h2>
      <p className="mt-2 text-lg">
        Try our free <span className="font-semibold">✨AI‑powered tools✨</span>{" "}
        now — no sign‑up needed.
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
        <a
          href="/remove-watermarks"
          className="rounded-full bg-brand px-8 py-3 font-medium text-white shadow hover:bg-brand/90"
        >
          Try Remove Watermark
        </a>
        <a
          href="/remove-background"
          className="rounded-full bg-brandYellow px-8 py-3 font-medium text-gray-900 shadow hover:bg-brandYellow/90"
        >
          Try Remove Background
        </a>
      </div>
    </section>
  );
}
