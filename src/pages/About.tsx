import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import MenuButton from "../components/MenuButton"; // Using our shared component

// Images - referenced as strings since we can't guarantee files exist during build in this env
// Ideally these would be imported if files existed
const historyBg = "/images/about6.jpg";
const aceCollege = "/images/ace.jpeg";
const campusBg = "/images/about7.jpg";
const aceName = "/images/about2.jpeg";
const committeeBg = "/images/about5.jpg";
const affiliationBg = "/images/about8.jpg";

// Affiliation logos
const a1 = "/images/a1.png";
const a2 = "/images/a2.png";
const a3 = "/images/a3.png";
const a4 = "/images/a4.png";
const a5 = "/images/a5.png";
const a6 = "/images/a6.png";
const a7 = "/images/a7.png";

type SectionType = "History" | "Campus" | "Committee" | "Affiliation" | null;

export default function About() {
  const navigate = useNavigate();

  const sections: SectionType[] = ["History", "Campus", "Committee", "Affiliation"];
  const [activeSection, setActiveSection] = useState<SectionType>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_undoStack, setUndoStack] = useState<SectionType[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_redoStack, setRedoStack] = useState<SectionType[]>([]);

  /* ---------- CHANGE SECTION ---------- */
  const changeSection = (section: SectionType) => {
    if (section === activeSection) return;
    setUndoStack((prev) => [...prev, activeSection]);
    setRedoStack([]);
    setActiveSection(section);
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
        return aceCollege; // Fallback or Default
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

      {/* ACTION BAR Replaced with MenuButton */}
      <MenuButton onMenu={() => navigate('/menu')} />
    </div>
  );
}
