import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import MagicIcon from "../assets/remove-icon.png";

export default function ProcessPage() {
  const location = useLocation();
  const initialImage = location.state?.image;

  const [mode, setMode] = useState("automatic");
  const [zoom, setZoom] = useState(100);
  const [history, setHistory] = useState([75]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [images, setImages] = useState(initialImage ? [initialImage] : []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [rect, setRect] = useState(null);
  const [tool, setTool] = useState("rectangle");
  const [brushPaths, setBrushPaths] = useState([]);
  const [brushSize, setBrushSize] = useState(10);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const containerRef = useRef();
  const [selectedBg, setSelectedBg] = useState({ type: null, value: null });



  const increaseZoom = () => updateZoom(Math.min(zoom + 5, 200));
  const decreaseZoom = () => updateZoom(Math.max(zoom - 5, 10));
  const resetZoom = () => updateZoom(100);

  const updateZoom = (newZoom) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newZoom);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setZoom(newZoom);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setZoom(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setZoom(history[newIndex]);
    }
  };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prev) => [...prev, event.target.result]);
        setActiveIndex(images.length);
      };
      reader.readAsDataURL(file);
    }
  };

  const startDraw = (e) => {
    if (mode !== "manual") return;
    const bounds = containerRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    if (tool === "rectangle") {
      setIsDrawing(true);
      setRect({ x, y, width: 0, height: 0 });
    } else if (tool === "brush") {
      setIsDrawing(true);
      setBrushPaths((prev) => [...prev, [{ x, y }]]);
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const bounds = containerRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    if (tool === "rectangle" && rect) {
      const newWidth = x - rect.x;
      const newHeight = y - rect.y;
      setRect({ ...rect, width: newWidth, height: newHeight });
    } else if (tool === "brush") {
      setBrushPaths((prev) => {
        const newPaths = [...prev];
        newPaths[newPaths.length - 1] = [...newPaths[newPaths.length - 1], { x, y }];
        return newPaths;
      });
    }
  };

  const stopDraw = () => {
    setIsDrawing(false);
    setRect(null);
    if (tool === "brush") {
      setBrushPaths((prev) => prev.slice(0, -1));
    }
  };
  const mergeImageWithBackground = async () => {
    return new Promise((resolve) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = images[activeIndex];
  
      image.onload = () => {
        const width = image.width;
        const height = image.height;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
  
        // draw background
        if (selectedBg?.type === "color") {
          ctx.fillStyle = selectedBg.value;
          ctx.fillRect(0, 0, width, height);
        } else if (selectedBg?.type === "image") {
          const bg = new Image();
          bg.crossOrigin = "anonymous";
          bg.src = selectedBg.value;
          bg.onload = () => {
            ctx.drawImage(bg, 0, 0, width, height);
            ctx.drawImage(image, 0, 0, width, height);
            canvas.toBlob(resolve, "image/png");
          };
          return;
        }
  
        // draw foreground image
        ctx.drawImage(image, 0, 0, width, height);
        canvas.toBlob(resolve, "image/png");
      };
    });
  };
  

  const handleRemove = async () => {
    setIsProcessing(true);
  
    try {
      const file = await fetch(images[activeIndex]).then(res => res.blob());
      const formData = new FormData();
      formData.append("file", file); // ⚠️ ключ "file", как в /remove_bg
  
      const response = await fetch("/remove-bg", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Server error");
  
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
  
      setImages([url]);
      setActiveIndex(0);
      setIsProcessed(true);
      setShowErrorModal(false);
    } catch (error) {
      console.error(error);
      setShowErrorModal(true);
    } finally {
      setIsProcessing(false);
    }
  };
  

  const handleDownload = async () => {
    setShowDownloadModal(true);
    setDownloadProgress(0);
    let progress = 0;
  
    const interval = setInterval(() => {
      progress += 10;
      setDownloadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 300);
  
    const blob = await mergeImageWithBackground();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "result.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadModal(false);
  };
  

  return (
    <div className="min-h-screen bg-white px-4 py-12 relative">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 justify-center items-start">
        <div className="flex md:flex-col gap-4 items-center">
          <label className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-xl cursor-pointer">
            +
            <input type="file" accept="image/*" onChange={handleAddImage} className="hidden" />
          </label>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              onClick={() => setActiveIndex(index)}
              className={`w-12 h-12 rounded-md object-cover cursor-pointer ${index === activeIndex ? "ring-2 ring-blue-500" : ""}`}
            />
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-6 relative">
          <div
            ref={containerRef}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            className="bg-[#f5f5f5] rounded-xl w-full max-w-[600px] h-[500px] md:w-[1000px] md:h-[600px] flex items-center justify-center overflow-hidden relative"
          >
            {images.length > 0 ? (
  <div className="relative w-full h-full flex items-center justify-center">
    {selectedBg?.type === "image" && (
  <img
    src={selectedBg.value}
    alt="Background"
    className="absolute w-full h-full object-cover z-0 rounded-xl"
  />
)}

{selectedBg?.type === "color" && (
  <div
    className="absolute w-full h-full z-0 rounded-xl"
    style={{ backgroundColor: selectedBg.value }}
  />
)}

    <img
      src={images[activeIndex]}
      alt="Foreground"
      draggable={false}
      style={{ transform: `scale(${zoom / 100})`, transition: "transform 0.2s" }}
      className={`relative z-10 w-full h-auto md:max-h-[70vh] md:w-auto object-contain rounded-xl ${isProcessing ? "blur-sm" : ""}`}
    />
  </div>
) : (
  <p className="text-gray-500">No image uploaded</p>
)}

            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
              {brushPaths.map((path, index) => (
                <polyline
                  key={index}
                  fill="none"
                  stroke="rgba(59,130,246,0.5)"
                  strokeWidth={brushSize}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={path.map((p) => `${p.x},${p.y}`).join(" ")}
                />
              ))}
            </svg>
            {isProcessing && (
              <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex flex-col items-center justify-center z-20 text-white text-center">
                <div className="mb-4 animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent"></div>
                <p className="text-lg font-medium">AI is working its magic...<br />please wait</p>
              </div>
            )}
            
          </div>
        </div>

        <div className="flex flex-col justify-between items-start w-full md:w-auto">
        <div className="flex flex-col items-start w-full md:w-auto">
  <div className="flex justify-center md:justify-start gap-2 bg-gray-100 rounded-full p-1 mt-[-20px] md:mt-0 w-full md:w-auto">
    <button
      className={`px-6 py-2 rounded-full font-medium ${mode === "automatic" ? "bg-blue-100 text-blue-700" : "text-gray-600"}`}
      onClick={() => setMode("automatic")}
    >
      Remove BG
    </button>
    <button
      className={`px-6 py-2 rounded-full font-medium ${mode === "manual" ? "bg-blue-100 text-blue-700" : "text-gray-600"}`}
      onClick={() => setMode("manual")}
    >
      Change BG
    </button>
  </div>
</div>



          {mode === "automatic" && (
  <div className="hidden md:block min-h-[480px] w-full"></div>
)}         
{mode === "manual" && (
  <div className="mt-0 w-full flex flex-col items-center">
    <div className="flex gap-4 mb-6">
  <button
    onClick={() => setTool("color")}
    className={`w-24 h-24 mt-12 rounded-2xl flex flex-col items-center justify-center transition ${
      tool === "color" ? "bg-[#EAF1FF] shadow-md" : "bg-white"
    }`}
  >
    <img src="/rectangle.png" alt="Color" className="w-15 h-15 mb-1" />
    <span
      className={`text-sm font-medium ${
        tool === "color" ? "text-blue-600" : "text-gray-700"
      }`}
    >
      
    </span>
  </button>

  <button
    onClick={() => setTool("image")}
    className={`w-24 h-24 mt-12 rounded-2xl flex flex-col items-center justify-center transition ${
      tool === "image" ? "bg-[#EAF1FF] shadow-md" : "bg-white"
    }`}
  >
    <img src="/lasso.png" alt="Image" className="w-15 h-15 mb-1" />
    <span
      className={`text-sm font-medium ${
        tool === "image" ? "text-blue-600" : "text-gray-700"
      }`}
    >
      
    </span>
  </button>
</div>



    {tool === "color" ? (
      <div className="grid grid-cols-5 gap-3">
        {["#D9D9D9", "#F38BCB", "#9FD8D3", "#FFE177", "#96D97C", "#57D4F1", "#FFC7C7", "#8B80F9", "#C9F9A7", "#FDD446"].map((color, index) => (
  <div
    key={index}
    className={`w-12 h-12 mt-9 rounded-full border-2 border-white shadow cursor-pointer ${selectedBg?.type === "color" && selectedBg?.value === color ? "ring-4 ring-blue-500" : ""}`}
    style={{ backgroundColor: color }}
    onClick={() => setSelectedBg({ type: "color", value: color })}
  />
))}

      </div>
    ) : (
      <div className="grid grid-cols-3 gap-3">
        {/* Очистить фон */}
<div
  onClick={() => setSelectedBg({ type: null, value: null })}
  className="w-24 h-24 rounded-[8px] border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer shadow bg-white"
  title="Удалить фон"
>
  <span className="text-2xl text-gray-500">✖</span>
</div>

  {[
    "/bg-transparent.png",
    null,
    "/bg1.png",
    "/bg2.jpg",
    "/bg3.jpg",
    "/bg4.jpg",
    "/bg5.jpg",
    "/bg6.png",
  
  ].map((src, i) => {
    if (src === null) {
      return (
        <label
          key="upload-bg"
          className="w-24 h-24 rounded-[8px] flex items-center justify-center cursor-pointer shadow"
        >
          <img src="/bg.png" alt="Upload" className="w-18 h-18" />
          <input
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newBg = event.target.result;
        setSelectedBg({ type: "image", value: newBg });
      };
      reader.readAsDataURL(file);
    }
  }}
/>

        </label>
      );
    } else {
      return (
        <img
  key={i}
  src={src}
  alt={`bg-${i}`}
  className={`w-24 h-24 rounded-[8px] object-cover cursor-pointer shadow ${selectedBg === src ? "ring-4 ring-blue-500" : ""}`}
  onClick={() => setSelectedBg({ type: "image", value: src })}
/>

      );
    }
  })}
</div>

    )}
  </div>
)}

<div className="mt-8 md:mt-32 mr-auto flex flex-col items-center w-full">
            {mode === "automatic" && isProcessed && (
              <p className="text-sm text-gray-600 mb-3 text-center w-full">
                
                <button className="text-blue-500 underline" onClick={() => setMode("manual")}>
                  
                </button>
              </p>
            )}

<div className="flex flex-col h-full">
  {}

  <div className="flex justify-center mt-[-10px] md:mt-[-80px]">
  <button
    className="bg-blue-500 hover:bg-blue-600 text-white w-80 py-3 rounded-full font-semibold shadow flex items-center justify-center gap-2"
    onClick={handleRemove}
  >
    <img src={MagicIcon} alt="icon" className="w-5 h-5 filter invert brightness-0" />
    Remove
  </button>
</div>

</div>
{}
<div className="flex md:hidden justify-center items-center gap-5 mt-4 text-gray-700 text-lg">
  <button onClick={handleUndo} title="Undo">↶</button>
  <button onClick={handleRedo} title="Redo">↷</button>
  <div className="flex items-center gap-3">
    <button onClick={increaseZoom} className="text-2xl leading-none">+</button>
    <span className="text-sm font-medium">{zoom}%</span>
    <button onClick={decreaseZoom} className="text-2xl leading-none">−</button>
  </div>
  <button onClick={resetZoom} title="Fit to screen">👁️</button>
</div>


            {isProcessed && (
              <button
                onClick={handleDownload}
                className="-mt-6 bg-white text-gray-800 border border-gray-300 rounded-full px-10 py-3 flex items-center gap-2 shadow"
              >
                ⬇ Download Result
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="hidden md:flex -mt-15 justify-center items-center gap-8 text-gray-600 text-xl ml-[-220px]">
        <button className="hover:text-black transition" title="Undo" onClick={handleUndo}>
          &#8630;
        </button>
        <button className="hover:text-black transition" title="Redo" onClick={handleRedo}>
          &#8631;
        </button>
        <div className="flex items-center gap-3">
          <button className="hover:text-black text-2xl leading-none" onClick={increaseZoom}>
            +
          </button>
          <span className="text-sm font-medium">{zoom}%</span>
          <button className="hover:text-black text-2xl leading-none" onClick={decreaseZoom}>
            −
          </button>
        </div>
        <button className="hover:text-black transition" title="Fit to screen" onClick={resetZoom}>
          &#128065;
        </button>
      </div>

      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white px-12 py-14 rounded-[32px] w-full max-w-2xl text-center shadow-xl">
            <img src="/download-icon.png" alt="Downloading icon" className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Downloading...</h2>
            <p className="text-gray-500 mb-6">We’re preparing your image…</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div className="bg-blue-500 h-2 rounded-full transition-all duration-200" style={{ width: `${downloadProgress}%` }}></div>
            </div>
            <button
              onClick={() => setShowDownloadModal(false)}
              className="border border-gray-300 px-6 py-2 rounded-full hover:bg-gray-100 transition"
            >
              Stop Downloading
            </button>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white px-10 py-9 rounded-[32px] w-full max-w-xl text-center shadow-xl">
            <img src="/error-icon.png" alt="Error icon" className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Oops! Something went wrong during processing</h2>
            <p className="text-gray-500 mb-6">Please try again</p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


