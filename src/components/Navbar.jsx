import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm relative z-50">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-start relative">
        <Link to="/" className="flex items-center space-x-2 z-10">
          <span className="text-[#3C82F4]">✨</span>
          <span className="text-xl font-bold text-[#3C82F4]">AI</span>
        </Link>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-10 text-gray-800 font-medium z-40">
          <Link
            to="/remove-watermarks"
            className={`text-sm hover:text-blue-600 transition ${
              location.pathname === "/remove-watermarks" ? "text-blue-600" : ""
            }`}
          >
            Remove watermarks
          </Link>

          <Link
            to="/remove-background"
            className={`text-sm hover:text-blue-600 transition ${
              location.pathname === "/remove-background" ? "text-blue-600" : ""
            }`}
          >
            Remove background
          </Link>
        </div>
      </nav>
    </header>
  );
}
