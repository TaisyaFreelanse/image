import React, { useState, useRef, useEffect } from "react";

export default function BeforeAfterSlider({
  before,      
  after,       
  width = 800, 
  height = 400 
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef();

  const [w, setW] = useState(width);
  useEffect(() => {
    const upd = () => ref.current && setW(ref.current.offsetWidth);
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width,
        height,
        overflow: "hidden",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={before}
        alt="Before"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <img
        src={after}
        alt="After"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
        }}
      />
      <input
        type="range"
        min="0" max="100" value={pos}
        onChange={e => setPos(e.target.value)}
        style={{
          position: "absolute",
          left: 0, top: 0,
          width: "100%", height: "100%",
          appearance: "none",
          background: "transparent",
          cursor: "ew-resize",
        }}
      />
    </div>
  );
}
