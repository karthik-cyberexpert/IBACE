import DepartmentLayout from "../components/DepartmentLayout.jsx";
import ImageSlider from "../components/ImageSlider.jsx"; 
export default function MbaPage() {
  return (
    <DepartmentLayout
      title="Department of MBA"
      theme="theme-mba"
      sections={{
        About: {
          title: "About MBA",
          content:
"The Department of Management Studies was incepted in the year 1992 with the state of the art infrastructure as per the norms and beyond. Ours is the first MBA Program affiliated to the University of Madras after the Department of Management Studies of the University.The department offers two Post Graduate Programs namely two year MBA (Full time) and a three year MBA (Part time) under Permanent Affiliation to Anna University, Chennai."        },

              Infrastructure: {
        title: "Infrastructure",
        custom: (
          <div className="infra-grid">
            {/* LEFT – IMAGE SLIDER */}
            <div className="infra-left">
              <ImageSlider
                images={[
                  "/images/mba/infrastructure/1.jpg",
                  "/images/mba/infrastructure/2.jpg",
                  "/images/mba/infrastructure/3.jpg"
                ]}
              />
            </div>
      
            {/* RIGHT – CONTENT */}
            <div className="infra-right">
              <p>
               Our campus is equipped with modern infrastructure designed to support academic excellence, innovation, and student comfort. The facilities are continuously upgraded to meet current educational and technological standards.
              </p>
            </div>
          </div>
        ),
      },

        "Career Opportunities": {
          title: "Career Opportunities",
          custom: (
            <div className="career-grid">
              {[
                { role: "Business Analyst", salary: "₹4 – 8+ LPA", icon: "📈" },
                { role: "Marketing Manager", salary: "₹4 – 10+ LPA", icon: "📢" },
                { role: "HR Manager", salary: "₹3 – 7+ LPA", icon: "👥" },
                { role: "Finance Analyst", salary: "₹5 – 12+ LPA", icon: "💰" },
                { role: "Operations Manager", salary: "₹4 – 9+ LPA", icon: "⚙️" },
                { role: "Project Manager", salary: "₹5 – 12+ LPA", icon: "📋" },
              ].map((item, i) => (
                <div
                  key={item.role}
                  className="career-card"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="career-icon">{item.icon}</div>
                  <h3>{item.role}</h3>
                  <span>{item.salary}</span>
                </div>
              ))}
            </div>
          ),
        },

        Contact: {
          title: "Contact",
          content: "Email: mba@college.edu | Phone: +91 98765 11111",
        },
      }}
    />
  );
}
