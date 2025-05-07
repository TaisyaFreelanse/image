import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import MagicIcon from "../assets/remove-icon.png";
export default function ProcessPage() {
  const location = useLocation();
  const initialImage = location.state?.image;
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  function dataURLtoBlob(dataURL) {
    if (typeof dataURL !== "string" || !dataURL.includes(",")) {
      throw new Error("Invalid data URL format.");
    }
  
    const arr = dataURL.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
      throw new Error("MIME type not found in data URL.");
    }
  
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  
  
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
  const imageRef = useRef();
  const containerRef = useRef();

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
  const createMaskFromBrushPaths = () => {
    const canvas = document.createElement("canvas");
    canvas.width = imageSize.width;
    canvas.height = imageSize.height;
    const ctx = canvas.getContext("2d");
  
    // Чёрный фон
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Белая кисть
    const scaleX = imageSize.width / containerRef.current.offsetWidth;
    const scaleY = imageSize.height / containerRef.current.offsetHeight;
    ctx.strokeStyle = "white";
    ctx.lineWidth = brushSize * scaleX;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
  
    for (const path of brushPaths) {
      ctx.beginPath();
      path.forEach((point, i) => {
        const x = point.x * scaleX;
        const y = point.y * scaleY;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    }
  
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/png");
    });
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
  };
  
  const handleRemove = async () => {

    setIsProcessing(true);
  
    try {
      const file = dataURLtoBlob(images[activeIndex]);
      const formData = new FormData();
      formData.append("image", file);
  
      let maskBlob = null;
  
      if (tool === "brush") {
        maskBlob = await createMaskFromBrushPaths();
      } else if (tool === "rectangle" && rect) {
        
        const canvas = document.createElement("canvas");
        const image = new Image();
image.src = images[activeIndex];
await new Promise(resolve => (image.onload = resolve));

canvas.width = image.naturalWidth;
canvas.height = image.naturalHeight;

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        const imgBounds = imageRef.current.getBoundingClientRect();
const scaleX = canvas.width / imgBounds.width;
const scaleY = canvas.height / imgBounds.height;


const x = Math.min(rect.x, rect.x + rect.width) * scaleX;
const y = Math.min(rect.y, rect.y + rect.height) * scaleY;
const width = Math.abs(rect.width) * scaleX;
const height = Math.abs(rect.height) * scaleY;

ctx.fillRect(x, y, width, height);


        maskBlob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      }
  
      if (maskBlob) {
        formData.append("mask", maskBlob, "mask.png");
      }
      
      const response = await fetch("http://localhost:8000/remove-watermark", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Server error");
  
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
  
      setImages([url]);
      setBrushPaths([]);
      setRect(null);
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
  
  
  const handleDownload = () => {
    setShowDownloadModal(true);
    setDownloadProgress(0);
  
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setDownloadProgress(progress);
  
      if (progress >= 100) {
        clearInterval(interval);
        const link = document.createElement("a");
        link.href = images[activeIndex];
        link.download = "image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setShowDownloadModal(false);
      }
    }, 300); 
  };
  const getTouchPos = (touch) => {
    const bounds = containerRef.current.getBoundingClientRect();
    return {
      x: touch.clientX - bounds.left,
      y: touch.clientY - bounds.top,
    };
  };
  
  const startDrawTouch = (e) => {
    if (mode !== "manual") return;
    const touch = e.touches[0];
    const { x, y } = getTouchPos(touch);
    if (tool === "rectangle") {
      setIsDrawing(true);
      setRect({ x, y, width: 0, height: 0 });
    } else if (tool === "brush") {
      setIsDrawing(true);
      setBrushPaths((prev) => [...prev, [{ x, y }]]);
    }
  };
  
  const drawTouch = (e) => {
    if (!isDrawing) return;
    const touch = e.touches[0];
    const { x, y } = getTouchPos(touch);
    if (tool === "rectangle" && rect) {
      setRect({ ...rect, width: x - rect.x, height: y - rect.y });
    } else if (tool === "brush") {
      setBrushPaths((prev) => {
        const newPaths = [...prev];
        newPaths[newPaths.length - 1] = [...newPaths[newPaths.length - 1], { x, y }];
        return newPaths;
      });
    }
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
  onTouchStart={startDrawTouch}
  onTouchMove={drawTouch}
  onTouchEnd={stopDraw}
  className="touch-none bg-[#f5f5f5] rounded-xl w-full max-w-[600px] h-[500px] md:w-[1000px] md:h-[600px] flex items-center justify-center overflow-hidden relative"
>


            {images.length > 0 ? (
              <img
              src={images[activeIndex]}
              ref={imageRef}
              alt="Uploaded preview"
              draggable={false}
              onLoad={(e) => {
                setImageSize({
                  width: e.target.naturalWidth,
                  height: e.target.naturalHeight,
                });
              }}
              style={{ transform: `scale(${zoom / 100})`, transition: "transform 0.2s" }}
              className={`w-full h-auto md:max-h-[70vh] md:w-auto object-contain rounded-xl ${isProcessing ? "blur-sm" : ""}`}
            />            
            ) : (
              <p className="text-gray-500">No image uploaded</p>
            )}
            {rect && (
              <div
                className="absolute border-2 border-blue-400 bg-blue-200 bg-opacity-30 pointer-events-none"
                style={{ left: rect.x, top: rect.y, width: rect.width, height: rect.height }}
              />
            )}
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{ zIndex: 10 }}
            >
              {brushPaths.map((path, index) => (
                <polyline
                  key={index}
                  fill="none"
                  stroke="rgba(59,130,246,0.5)"
                  strokeWidth={brushSize}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={path.map(p => `${p.x},${p.y}`).join(" ")}
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
        
        <div className="flex flex-col justify-between items-center md:items-start w-full md:w-auto">
  <div className="flex gap-2 bg-gray-100 rounded-full p-1">
    <button
      className={`px-6 py-2 rounded-full font-medium ${mode === "automatic" ? "bg-blue-100 text-blue-700" : "text-gray-600"}`}
      onClick={() => setMode("automatic")}
    >
      Automatic
    </button>
    <button
      className={`px-6 py-2 rounded-full font-medium ${mode === "manual" ? "bg-blue-100 text-blue-700" : "text-gray-600"}`}
      onClick={() => setMode("manual")}
    >
      Manual
    </button>
  </div>

  {mode === "automatic" && (
    <div className="hidden md:block min-h-[420px] w-full"></div>
)}
          {mode === "manual" && (
            <div className="text-center text-sm text-gray-500 mt-[20px] md:mt-44 space-y-6">
              <div>
                <div className="mb-2 font-semibold text-gray-400">Instrument</div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setTool("rectangle")}
                    className={`border px-4 w-36 h-36 py-3 rounded-xl flex flex-col items-center hover:shadow transition ${tool === "rectangle" ? "ring-2 ring-blue-500" : ""}`}
                  >
                    <img src="/maximize-2.png" alt="Rectangle" className="w-8 h-8 mt-4" />
                    <span className="text-sm mt-1">Draw Rectangle</span>
                  </button>
                  <button
                    onClick={() => setTool("brush")}
                    className={`border px-4 py-3 rounded-xl flex flex-col items-center hover:shadow transition ${tool === "brush" ? "ring-2 ring-blue-500" : ""}`}
                  >
                    <img src="/pen-tool-2.png" alt="Brush" className="w-9 h-9 mt-5" />
                    <span className="text-sm mt-1">Use Brush</span>
                  </button>
                </div>
              </div>
              <div>
                <div className="mb-2 font-semibold text-gray-400">Size</div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-48 accent-blue-500"
                />
              </div>
            </div>
          )}

<div className="mt-32 mr-auto flex flex-col items-center w-full">
  {}


{}
<div className="hidden md:flex mt-10 w-full justify-center">
  {mode === "automatic" && isProcessed && (
    <p className="text-sm text-gray-600 mb-3 text-center w-full">
      Didn't you like the result?{" "}
      <button
        className="text-blue-500 underline"
        onClick={() => setMode("manual")}
      >
        Try manual edit
      </button>
    </p>
  )}
</div>


<div className="flex justify-center -mt-28 md:-mt-20">
  <button
    className="bg-blue-500 hover:bg-blue-600 text-white w-72 py-3 rounded-full font-semibold shadow flex items-center justify-center gap-2"
    onClick={handleRemove}
  >
    <img src={MagicIcon} alt="icon" className="w-5 h-5 filter invert brightness-0" />
    Remove
  </button>
</div>


  {isProcessed && (
  <button
    onClick={handleDownload}  
    className="mt-4 bg-white text-gray-800 border border-gray-300 rounded-full px-6 py-3 flex items-center gap-2 shadow"
  >
    ⬇ Download Result
  </button>
)}
</div>
        </div>
      </div>

      <div className="mt-[-30px] md:mt-10 md:ml-[-220px] flex justify-center items-center gap-8 text-gray-600 text-xl">

        {}
{!isProcessing && !isProcessed && (
  <div className="flex md:hidden justify-center items-center gap-5 mt-4 text-gray-700 text-lg">
    <button onClick={handleUndo} title="Undo">↶</button>
    <button onClick={handleRedo} title="↷">↷</button>
    <div className="flex items-center gap-3">
      <button onClick={increaseZoom} className="text-2xl leading-none">+</button>
      <span className="text-sm font-medium">{zoom}%</span>
      <button onClick={decreaseZoom} className="text-2xl leading-none">−</button>
    </div>
    <button onClick={resetZoom} title="Fit to screen">👁️</button>
  </div>
)}

{}
<div className="hidden md:flex mt-10 justify-center items-center gap-8 text-gray-600 text-xl">
  <button className="hover:text-black transition" title="Undo" onClick={handleUndo}>
    &#8630;
  </button>
  <button className="hover:text-black transition" title="Redo" onClick={handleRedo}>
    &#8631;
  </button>
  <div className="flex items-center gap-3">
    <button className="hover:text-black text-2xl leading-none" onClick={increaseZoom}>+</button>
    <span className="text-sm font-medium">{zoom}%</span>
    <button className="hover:text-black text-2xl leading-none" onClick={decreaseZoom}>−</button>
  </div>
  <button className="hover:text-black transition" title="Fit to screen" onClick={resetZoom}>
    &#128065;
  </button>
</div>

      </div>

      {showDownloadModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white px-12 py-14 rounded-[32px] w-full max-w-2xl text-center shadow-xl">
      {}
      <img src="/download-icon.png" alt="Downloading icon" className="w-20 h-20 mx-auto mb-4" />

      <h2 className="text-xl font-semibold mb-2">Downloading...</h2>
      <p className="text-gray-500 mb-6">We’re preparing your image…</p>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
  <div
    className="bg-blue-500 h-2 rounded-full transition-all duration-200"
    style={{ width: `${downloadProgress}%` }}
  ></div>
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

