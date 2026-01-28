import React, { useEffect, useState } from "react";
import "./PlacementSlider.css";

const images = [
  "/images/placement/p1.jpeg",
  "/images/placement/p2.jpeg",
  "/images/placement/p3.jpeg",
  "/images/placement/p4.jpeg",
  "/images/placement/p5.jpeg"
];

export default function PlacementSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // autoplay speed
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider-container">
      <div
        className="slider-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <div className="slide" key={i}>
            <img 
                src={img} 
                alt={`slide-${i}`} 
                onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Placement+Slide';
                }}
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="nav prev"
        onClick={() =>
          setIndex((index - 1 + images.length) % images.length)
        }
      >
        ‹
      </button>

      <button
        className="nav next"
        onClick={() => setIndex((index + 1) % images.length)}
      >
        ›
      </button>
    </div>
  );
}
