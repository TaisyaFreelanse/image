export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h3 className="text-center text-xl font-semibold">
          ✨ AI&nbsp;&nbsp;Image Enhancer
        </h3>

        <div className="mt-8 flex justify-center gap-4 text-sm">
          <a href="#" className="rounded-full bg-gray-800 px-4 py-1">About</a>
          <a href="#" className="rounded-full bg-gray-800 px-4 py-1">Contact</a>
          <a href="#" className="rounded-full bg-gray-800 px-4 py-1">Privacy Policy</a>
        </div>

        <p className="mt-10 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} AI Image Enhancer. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
