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

    const reader = new FileReader();
    reader.onload = () => {
      setLoading(false);
      
      navigate("/process", { state: { image: reader.result } });
    };
    reader.onerror = () => {
      setLoading(false);
      console.error("Ошибка чтения файла");
      setShowNoFileError(true);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {loading && <Loader />}

      {showFileTypeError && (
        <Modal
          icon="/unsupported-icon.png"
          title="Unsupported file type…"
          message="This format is not supported. Please upload a .jpg, .jpeg, .png, or .webp image."
          onClose={() => setShowFileTypeError(false)}
        />
      )}

      {showFileSizeError && (
        <Modal
          icon="/unsupported-icon.png"
          title="File too large"
          message="Your image is too large. Max size is 10 MB."
          onClose={() => setShowFileSizeError(false)}
        />
      )}

      {showNoFileError && (
        <Modal
          icon="/unsupported-icon.png"
          title="No image selected"
          message="Please select an image to continue"
          onClose={() => setShowNoFileError(false)}
        />
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


function Modal({ icon, title, message, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white px-10 py-8 rounded-[28px] w-full max-w-sm text-center shadow-xl">
        <img src={icon} alt="Error icon" className="w-20 h-20 mx-auto mb-4" />
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-500 text-sm mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
        >
          Okay
        </button>
      </div>
    </div>
  );
}




