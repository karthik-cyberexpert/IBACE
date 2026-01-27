import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Scholarships.css";

export default function Scholarships() {
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [keyTrigger, setKeyTrigger] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const changeTab = (tab) => {
    setActive(tab);
    setKeyTrigger((prev) => prev + 1); // 🔑 re-trigger animation
  };

  return (
    <div className="sch-page">
      {/* BACKGROUND IMAGE */}
      <img src="./images/scholarship.jpg" alt="bg" className="bg-img" />

      {/* HEADER */}
      <header className="sch-header glass">
        <h1 className="typing">
          {"Scholarships".split("").map((c, i) => (
            <span key={i} style={{ "--delay": `${i * 0.08}s` }}>
              {c}
            </span>
          ))}
        </h1>
        <p style={{ color: "white", marginTop: "10px" }}>
          Financial Assistance & Government Scholarship Schemes
        </p>
     

      {/* NAV BAR */}
      <nav className="sch-navbar">
        {["overview", "eligibility", "documents", "process", "details"].map(
          (item, i) => (
            <button
              key={item}
              className={`nav-btn ${active === item ? "active train" : ""}`}
              style={{ animationDelay: `${i * 0.15}s` }}
              onClick={() => changeTab(item)}
            >
              {item.toUpperCase()}
            </button>
          )
        )}
      </nav>
 </header>
      {/* CONTENT */}
      <div className="sch-content" key={keyTrigger}>
        {/* OVERVIEW */}
        {active === "overview" && (
          <>
            <div className="sch-card slide-left delay-1 glass">
              Scholarships provide financial support through government,
              institutional, and private funding sources.
            </div>
            <div className="sch-card slide-left delay-2 glass">
              Assistance is based on merit, community, income, and special
              categories.
            </div>
            <div className="sch-card slide-left delay-3 glass">
              Eligible students must apply within deadlines with valid documents.
            </div>
          </>
        )}

        {/* ELIGIBILITY */}
        {active === "eligibility" && (
          <>
            <div className="sch-card slide-left delay-1 glass">
              Minimum 60% academic performance required.
            </div>
            <div className="sch-card slide-left delay-2 glass">
              Valid community / caste certificate mandatory.
            </div>
            <div className="sch-card slide-left delay-3 glass">
              Family income as per government norms.
            </div>
            <div className="sch-card slide-left delay-4 glass">
              First graduate & special category students eligible.
            </div>
          </>
        )}

        {/* DOCUMENTS */}
        {active === "documents" && (
          <>
            <div className="sch-card slide-left delay-1 glass">
              Academic mark sheets (12th / qualifying exam).
            </div>
            <div className="sch-card slide-left delay-2 glass">
              Community / caste certificate.
            </div>
            <div className="sch-card slide-left delay-3 glass">
              Income certificate.
            </div>
            <div className="sch-card slide-left delay-4 glass">
              First graduate certificate (if applicable).
            </div>
            <div className="sch-card slide-left delay-5 glass">
              Admission allotment letter.
            </div>
          </>
        )}

        {/* PROCESS */}
        {active === "process" && (
          <>
            <div className="sch-card slide-left delay-1 glass">
              Scholarship notification release after admission.
            </div>
            <div className="sch-card slide-left delay-2 glass">
              Student application submission.
            </div>
            <div className="sch-card slide-left delay-3 glass">
              Document verification by institution.
            </div>
            <div className="sch-card slide-left delay-4 glass">
              Approval through government / accounts section.
            </div>
            <div className="sch-card slide-left delay-5 glass">
              Scholarship amount disbursement.
            </div>
          </>
        )}

        {/* DETAILS */}
        {active === "details" && (
          <div className="sch-card slide-left delay-1 glass">
            <table className="scholarship-table">
              <thead>
                <tr>
                  <th>Scholarship</th>
                  <th>Eligibility</th>
                  <th>Benefit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Merit Scholarship</td>
                  <td>Top academic performers</td>
                  <td>Fee concession</td>
                </tr>
                <tr>
                  <td>SC / ST</td>
                  <td>SC / ST students</td>
                  <td>Tuition + stipend</td>
                </tr>
                <tr>
                  <td>BC / MBC</td>
                  <td>BC / MBC students</td>
                  <td>Fee support</td>
                </tr>
                <tr>
                  <td>Minority</td>
                  <td>Minority communities</td>
                  <td>Annual aid</td>
                </tr>
                <tr>
                  <td>First Graduate</td>
                  <td>First graduate</td>
                  <td>Fee concession</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* FLOATING MENU BUTTON */}
      <button
        onClick={() => navigate("/menu")}
        className="floating-menu-btn"
      >
        <img src="/images/menu.gif" alt="Menu" />
      </button>
    </div>
  );
}
