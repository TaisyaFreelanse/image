import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

export default function UploadImage() {
  const [loading, setLoading] = useState(false);
  const [showFileTypeError, setShowFileTypeError] = useState(false);
  const [showFileSizeError, setShowFileSizeError] = useState(false);
  const [showNoFileError, setShowNoFileError] = useState(false);
  const navigate = useNavigate();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setShowNoFileError(true);
      return;
    }

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setShowFileTypeError(true);
      return;
    }

    const maxSizeMB = 10;
    if (file.size > maxSizeMB * 1024 * 1024) {
      setShowFileSizeError(true);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/process", { state: { image: URL.createObjectURL(file) } });
    }, 2000);
  };

  return (
    <>
      {loading && <Loader />}

      {showFileTypeError && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white px-10 py-8 rounded-[28px] w-full max-w-sm text-center shadow-xl">
            <img src="/unsupported-icon.png" alt="Unsupported file" className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Unsupported file type…</h2>
            <p className="text-gray-500 text-sm mb-6">
              This format is not supported.<br />
              Please upload a <span className="text-blue-500">.jpg</span>, <span className="text-blue-500">.jpeg</span>, <span className="text-blue-500">.png</span>, or <span className="text-blue-500">.webp</span> image.
            </p>
            <button
              onClick={() => setShowFileTypeError(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {showFileSizeError && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white px-10 py-8 rounded-[28px] w-full max-w-sm text-center shadow-xl">
            <img src="/unsupported-icon.png" alt="File too large" className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">File too large</h2>
            <p className="text-gray-500 text-sm mb-6">
              Your image is too large. Max size is <span className="text-blue-500">10 MB</span>.
            </p>
            <button
              onClick={() => setShowFileSizeError(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {showNoFileError && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white px-10 py-8 rounded-[28px] w-full max-w-sm text-center shadow-xl">
            <img src="/unsupported-icon.png" alt="No image selected" className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">No image selected</h2>
            <p className="text-gray-500 text-sm mb-6">
              Please select an image to continue
            </p>
            <button
              onClick={() => setShowNoFileError(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-[200px]">
        <label className="cursor-pointer">
          <input type="file" className="hidden" onChange={handleUpload} />
          <div className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-full flex items-center gap-2">
            <FiUpload className="text-white text-lg" />
            Upload image
          </div>
        </label>
        <p className="text-gray-500 text-sm mt-4">or Drag & Drop Here</p>
      </div>
    </>
  );
}



