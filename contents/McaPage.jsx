import DepartmentLayout from "../components/DepartmentLayout.jsx";
import ImageSlider from "../components/ImageSlider.jsx"; 
export default function McaPage() {
  return (
    <DepartmentLayout
      title="Department  of  MCA"
      theme="theme-mca"
      sections={{
        About: {
          title: "About MCA",
          content:
            "The Master of Computer Applications (MCA) is a postgraduate degree program that focuses on computer science, software development, and applications of computer technology in various industries. The Department of MCA was established in the year 1995 -96 with the intake of 60 and it is affiliated to Anna University, Chennai. The department has well equipped laboratory, wi-fi class rooms and dedicated faculty members. It strives hard to develop world-class, self-disciplined computer professionals who will be responsible for uplifting the economic status of our Nation and humanity.",
        },
        Infrastructure: {
  title: "Infrastructure",
  custom: (
    <div className="infra-grid">
      {/* LEFT – IMAGE SLIDER */}
      <div className="infra-left">
        <ImageSlider
          images={[
            "/images/mca/infrastructure/mca1.jpg",
            "/images/mca/infrastructure/mca2.jpg",
            "/images/mca/infrastructure/mca3.jpg",
            "/images/mca/infrastructure/mca4.jpg",
            "/images/mca/infrastructure/mca5.jpg",
          ]}
        />
      </div>

      {/* RIGHT – CONTENT */}
      <div className="infra-right">
        <p>
          The MCA department is equipped with state-of-the-art computer
          laboratories, high-speed internet connectivity, smart classrooms,
          and modern teaching aids. The labs are designed to provide hands-on
          experience in software development, networking, cloud computing,
          and emerging technologies.
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
        { role: "Software Developer", salary: "₹3 – 12+ LPA", icon: "💻" },
        { role: "Web Developer", salary: "₹3 – 8+ LPA", icon: "🌐" },
        { role: "Database Administrator", salary: "₹4 – 8+ LPA", icon: "🗄️" },
        { role: "Data Scientist", salary: "₹6 – 15+ LPA", icon: "📊" },
        { role: "Cloud Engineer", salary: "₹5 – 10+ LPA", icon: "☁️" },
        { role: "Cyber Security Analyst", salary: "₹5 – 10+ LPA", icon: "🔐" },
        { role: "Software Tester", salary: "₹3 – 6+ LPA", icon: "🧪" },
        { role: "System Analyst", salary: "₹4 – 8+ LPA", icon: "🧠" },
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
          content:<div><p>
             Dr. D Swamydoss<br></br>
             Prof. & Head,<br></br>
             Department of MCA<br></br>
             Email-id:hod_mca@adhiyamaan.ac.in<br></br>
             Mobile number:9487819140<br></br>
            </p></div>
            ,
        },
      }}
    />
  );
}
