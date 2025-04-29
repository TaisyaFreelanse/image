import React from "react";
import { FiUpload } from "react-icons/fi";

export default function UploadImage() {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
      <label className="cursor-pointer">
        <input type="file" className="hidden" />
        <div className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-full flex items-center gap-2">
          <FiUpload className="text-white text-lg" />
          Upload image
        </div>
      </label>
      <p className="text-gray-500 text-sm mt-4">or Drag & Drop Here</p>
    </div>
  );
}

