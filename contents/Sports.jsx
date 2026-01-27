import { useEffect, useState } from "react";
import "./Sports.css";


/* GALLERY IMAGES */
const galleryImages = Array.from(
  { length: 24 },
  (_, i) => `/images/sports/${i + 1}.jpg`
);

const indoorGames = [
  "Badminton",
  "Basketball",
  "Table Tennis",
  "Chess",
  "Carrom",
  "Weight Lifting",
  "Best Physique",
  "Kho-Kho",
  "Gymnasium"
];

const outdoorGames = [
  "Athletics",
  "Cricket",
  "Football",
  "Hockey",
  "Volleyball",
  "Kabaddi",
  "Ball Badminton",
  "Tennis",
  "Handball"
];

export default function Sports() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection((d) => (d === "right" ? "left" : "right"));
      setIndex((i) => (i + 1) % galleryImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sports-page">
      <h1 className="sports-title">🏆 Sports Facilities</h1>

      <div className="sports-layout">

        {/* INDOOR */}
        <div className="glass-box indoor-box">
          <h2>Indoor Games</h2>
          <div className="bounce-ball blue"></div>

          {indoorGames.map((game, i) => (
            <div
              key={i}
              className="game-card animate-card"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {game}
            </div>
          ))}
        </div>

        {/* CENTER GALLERY */}
        <div className="gallery-box">
          <img
            key={index}
            src={galleryImages[index]}
            alt="Sports Gallery"
            className={`gallery-image ${direction}`}
            draggable="false"
          />
        </div>

        {/* OUTDOOR */}
        <div className="glass-box outdoor-box">
          <h2>Outdoor Games</h2>
          <div className="bounce-ball orange"></div>

          {outdoorGames.map((game, i) => (
            <div
              key={i}
              className="game-card animate-card"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {game}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
