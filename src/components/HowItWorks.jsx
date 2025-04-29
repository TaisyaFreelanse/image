export default function HowItWorks() {
  const steps = [
    {
      title: "Upload your image",
      text: "Choose a file from your device or drag & drop it into the editor",
    },
    {
      title: "Let AI do the magic",
      text: "Our smart algorithm detects and removes watermarks or backgrounds in seconds.",
    },
    {
      title: "Download the result",
      text: "Get your clean, high‑quality image — ready to use anywhere",
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-20 text-center">
      <h2 className="text-3xl font-bold">How It Works</h2>
      <p className="mt-2 text-gray-500">Easy as 1‑2‑3</p>

      <div className="mt-16 grid gap-12 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={i} className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-lg font-bold text-brand">
              {i + 1}
            </div>
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-gray-500">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
