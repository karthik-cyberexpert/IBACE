import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuButton from "../MenuButton.jsx"; // ✅ ADD
import "./DepartmentLayout.css";

export default function DepartmentLayout({ title, theme, sections }) {
  const navigate = useNavigate();
  const sectionKeys = Object.keys(sections);
  const [active, setActive] = useState(sectionKeys[0]);

  return (
    <div className={`mca-page ${theme}`}>
      {/* HEADER */}
      <div className="mca-header">
        <h1 className="letter-animate">
          {title.split("").map((l, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>
              {l}
            </span>
          ))}
        </h1>
      </div>

      {/* BODY */}
      <div className="mca-body">
        {/* LEFT NAV */}
        <div className="pg-sidebar">
          {sectionKeys.map((key) => (
            <button
              key={key}
              className={`pg-btn ${active === key ? "active" : ""}`}
              onClick={() => setActive(key)}
            >
              {key}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="pg-content fade-content">
          <h1>{sections[active].title}</h1>
          {sections[active].custom ? (
            sections[active].custom
          ) : (
            <p>{sections[active].content}</p>
          )}
        </div>
      </div>

      {/* 🔵 FLOATING MENU BUTTON (BOTTOM CENTER) */}
      <MenuButton onMenu={() => navigate("/menu")} />
    </div>
  );
}
