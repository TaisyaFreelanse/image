import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  const toggleServicesMenu = () => {
    setIsServicesOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setIsServicesOpen(false);
  }, [location]);

  return (
    <header className="bg-white shadow-sm relative z-50">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-start relative">
        <Link to="/" className="flex items-center space-x-2 z-10">
          <span className="text-[#3C82F4]">✨</span>
          <span className="text-xl font-bold text-[#3C82F4]">AI</span>
        </Link>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-10 text-gray-800 font-medium z-40">
          {}
          <div className="relative">
            <div
              className="cursor-pointer transition-all duration-200 ease-in-out px-4 py-2 rounded-md hover:text-blue-500"
              onClick={toggleServicesMenu}
            >
              SERVICES
            </div>

            {}
            <div
              className={`absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md w-40 text-sm z-50 ${
                isServicesOpen ? "block" : "hidden"
              }`}
            >
              <Link
                to="/remove-watermarks"
                className="block px-4 py-2 hover:bg-gray-100 transition duration-150"
              >
                Watermark
              </Link>
              <Link
                to="/remove-background"
                className="block px-4 py-2 hover:bg-gray-100 transition duration-150"
              >
                Background
              </Link>
            </div>
          </div>

          {}
          <Link to="/#reviews" className="hover:text-blue-500">
            REVIEWS
          </Link>

          {}
          <Link to="/#faq" className="hover:text-blue-500">
            FAQ
          </Link>
        </div>
      </nav>
    </header>
  );
}









