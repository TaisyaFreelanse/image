import React, { useEffect, useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5;
        return next >= 100 ? 100 : next;
      });
    }, 100); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="bg-white rounded-[30px] shadow-xl w-[700px] h-[300px] max-w-full flex flex-col justify-between p-10">
        <div className="flex-1 flex flex-col items-center justify-center text-center relative">
          <img
            src="/upload-icon.png"
            alt="Processing icon"
            className="w-24 absolute top-8 -translate-y-1/2"
          />
          <h2 className="text-lg font-normal text-gray-900 mt-12">Processing...</h2>
          <p className="text-gray-500 mt-2">
            Your image is loading, please wait
          </p>
        </div>

        <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}




  