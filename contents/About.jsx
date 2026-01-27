import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

// Images
import historyBg from "/images/about6.jpg";
import aceCollege from "/images/ace.jpeg";
import campusBg from "/images/about7.jpg";
import aceName from "/images/about2.jpeg";
import committeeBg from "/images/about5.jpg";
import affiliationBg from "/images/about8.jpg";

// Affiliation logos
import a1 from "/images/a1.png";
import a2 from "/images/a2.png";
import a3 from "/images/a3.png";
import a4 from "/images/a4.png";
import a5 from "/images/a5.png";
import a6 from "/images/a6.png";
import a7 from "/images/a7.png";

export default function About() {
  const navigate = useNavigate();

  const sections = ["History", "Campus", "Committee", "Affiliation"];
  const [activeSection, setActiveSection] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  /* ---------- CHANGE SECTION ---------- */
  const changeSection = (section) => {
    if (section === activeSection) return;
    setUndoStack((prev) => [...prev, activeSection]);
    setRedoStack([]);
    setActiveSection(section);
  };

  /* ---------- REDO (SECTION ONLY) ---------- */
  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setUndoStack((prev) => [...prev, activeSection]);
    setActiveSection(next);
  };

  /* ---------- BACKGROUND ---------- */
  const getBackgroundImage = () => {
    switch (activeSection) {
      case "History":
        return historyBg;
      case "Campus":
        return campusBg;
      case "Committee":
        return committeeBg;
      case "Affiliation":
        return affiliationBg;
      default:
        return aceCollege;
    }
  };

  return (
    <div
      className="about-page"
      style={{ backgroundImage: `url(${getBackgroundImage()})` }}
    >
      {/* SECTION BUTTONS */}
      <div
        className={`section-buttons ${
          activeSection ? "top-row" : "center-grid"
        }`}
      >
        {sections.map((item, index) => (
          <button
            key={item}
            className={`section-btn ${activeSection === item ? "active" : ""}`}
            style={{ animationDelay: `${index * 0.12}s` }}
            onClick={() => changeSection(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* HISTORY */}
      {activeSection === "History" && (
        <div className="section-content">
          <ul className="history-list" key={activeSection}>
            {[
              "Adhiyamaan College of Engineering (ACE) was established in 1987–1988.",
              "Spread across a 250-acre green campus at Hosur.",
              "First engineering college in the erstwhile Dharmapuri District.",
              "Affiliated to Anna University, Chennai.",
              "Strategically located near NH-7 with excellent road connectivity.",
              "Strong industry collaboration near Bangalore, committed to quality education and innovation."
            ].map((point, i) => (
              <li key={i} className="history-item">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CAMPUS */}
      {activeSection === "Campus" && (
        <div className="section-content">
          <div className="campus-images">
            <img src={aceName} alt="ACE Name" />
            <img src={aceCollege} alt="ACE Campus" />
          </div>
        </div>
      )}

      {/* COMMITTEE */}
      {activeSection === "Committee" && (
        <div className="section-content">
          <div className="committee-lists">
            <div className="committee-box">
              <h4>Statutory Committees</h4>
              <ul>
                <li>Academic Council</li>
                <li>Finance Committee</li>
                <li>Governing Body</li>
                <li>Board of Study</li>
              </ul>
            </div>

            <div className="committee-box">
              <h4>Non-Statutory Committees</h4>
              <ul>
                <li>Discipline and Welfare Committee</li>
                <li>Grievance Redressal Committee</li>
                <li>Admission Committee</li>
                <li>Planning and Evaluation Committee</li>
                <li>Library Committee</li>
                <li>Student Welfare Committee</li>
                <li>Anti Ragging Committee</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* AFFILIATION */}
      {activeSection === "Affiliation" && (
        <div className="section-content affiliation-section">
          <p>Recognized by Government of Tamil Nadu</p>
          <p>Approved by AICTE, New Delhi</p>
          <p>Approved by Council of Architecture, New Delhi</p>
          <p>Autonomous Status – UGC</p>
          <p>Accredited by NBA</p>
          <p>Research Centre</p>

          <div className="affiliation-images">
            {[a1, a2, a3, a4, a5, a6, a7].map((img, i) => (
              <img key={i} src={img} alt={`Affiliation ${i + 1}`} />
            ))}
          </div>
        </div>
      )}

      {/* ACTION BAR */}
      <div className="action-bar">

        {/* BACK TO MAIN MENU */}
        <button
          onClick={() => navigate("/menu")}
          className="back-btn"
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "18px",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 25px rgba(37,99,235,0.9)",
            animation: "floatBtn 2.8s ease-in-out infinite",
          }}
        >
          <img src="/images/home.gif" alt="Menu" width="64" height="64" />
        </button>
      </div>
    </div>
  );
}
