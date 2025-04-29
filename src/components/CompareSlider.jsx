import React, { useState, useRef } from 'react';

export default function CompareSlider({ beforeImage, afterImage, initial = 50 }) {
  const [position, setPosition] = useState(initial);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const startDragging = () => setIsDragging(true);
  const stopDragging = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    updatePosition(e.touches[0].clientX);
  };

  const updatePosition = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0) return;

    let x = ((clientX - rect.left) / rect.width) * 100;
    x = Math.max(0, Math.min(100, x));
    setPosition(x);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-pointer select-none rounded-[36px] touch-none"
      onMouseDown={startDragging}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onMouseMove={handleMouseMove}
      onTouchStart={startDragging}
      onTouchEnd={stopDragging}
      onTouchMove={handleTouchMove}
    >
      {}
      <img
        src={afterImage}
        alt="After"
        className="absolute top-0 left-0 w-full h-full min-h-full object-cover object-left"
        draggable="false"
      />

      {}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{
          width: `${position}%`,
          pointerEvents: 'none',
          transition: isDragging ? 'none' : 'width 0.3s ease',
        }}
      >
        <img
          src={beforeImage}
          alt="Before"
          className="w-full h-full min-h-full object-cover object-left"
          draggable="false"
        />
      </div>

      {}
      <div
        className="absolute top-0 bottom-0 z-10 flex items-center justify-center"
        style={{
          left: `${position}%`,
          transform: 'translateX(-50%)',
          transition: isDragging ? 'none' : 'left 0.3s ease',
        }}
      >
        {}
        <img
          src="/Line 2.png"
          alt="Divider Line"
          className="h-full"
          draggable="false"
        />

        {}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-white border border-gray-400 absolute top-1/2 left-1/2 transform -translate-x-[55%] -translate-y-1/2 flex items-center justify-center text-gray-700 text-2xl font-light">
            ‹ ›
          </div>
        </div>
      </div>
    </div>
  );
}
































