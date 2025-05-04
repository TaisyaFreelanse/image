import React, { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookieAccepted");
    if (!accepted) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieAccepted", "true");
    setVisible(false);
  };

  const handleReject = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-10 md:right-10 bg-[#222] text-white px-6 py-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl z-50">
      <div className="flex items-center gap-4">
        <img
          src="/cookie-new.png"
          alt="cookie"
          className="w-16 h-16"
        />
        <div>
          <p className="font-medium">Cookies make everything better</p>
          {!showDetails ? (
            <>
              <p className="text-sm text-gray-400">
                We use cookies to give you the best experience. Not the edible kind, unfortunately.
              </p>
              <button
                className="text-gray-400 text-sm underline mt-1"
                onClick={() => setShowDetails(true)}
              >
                Show details
              </button>
            </>
          ) : (
            <p className="text-sm text-gray-400">
              Cookies — contain data such as username and password and are used to improve user
              experience, optimize the performance of websites and personalize content.
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleAccept}
          className="bg-white text-black px-6 py-2 rounded-full font-medium hover:opacity-90"
        >
          Accept everything
        </button>
        <button
          onClick={handleReject}
          className="border border-white text-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-black transition"
        >
          Reject
        </button>
      </div>
    </div>
  );
}


