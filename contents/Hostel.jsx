import MenuButton from "../MenuButton";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import "./Hostel.css";

import hostel1 from "/images/hostel/h1.jpg";
import hostel2 from "/images/hostel/h2.jpg";
import hostel3 from "/images/hostel/h3.jpg";
import hostel4 from "/images/hostel/h4.jpg";

/* Static image list */
const images = [hostel1, hostel2, hostel3, hostel4];

export default function Hostel() {
  const [current, setCurrent] = useState(0);
 const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hostel-page">
      <h2 className="hostel-title">HOSTEL FACILITIES</h2>

      <div className="hostel-container">

        {/* LEFT CONTENT */}
        <div className="hostel-content">

          <section>
            <h3>Accommodation Details</h3>
            <ul>
              <li className="hostel-li">Single, double, and four-member rooms with visitor’s hall</li>
              <li className="hostel-li">Pennar Hostel (Boys): 189 rooms</li>
              <li className="hostel-li">Bhavani Hostel (Girls): 324 rooms</li>
            </ul>
          </section>

          <section>
            <h3>Dining & Health Care</h3>
            <ul>
              <li className="hostel-li">Well-furnished dining hall</li>
              <li className="hostel-li">Separate Vegetarian and Non-Vegetarian food options</li>
              <li className="hostel-li">Sick room facility for medical emergencies</li>
            </ul>
          </section>

          <section>
            <h3>Laundry Services</h3>
            <ul>
              <li className="hostel-li">On-campus laundry service on all working days</li>
              <li className="hostel-li">Machine-based washing and drying</li>
              <li className="hostel-li">Nominal and affordable charges</li>
              <li className="hostel-li">Timely collection and delivery of clothes</li>
            </ul>
          </section>

          <section>
            <h3>Utilities & Infrastructure</h3>
            <ul>
              <li className="hostel-li">RO drinking water</li>
              <li className="hostel-li">24/7 power backup</li>
              <li className="hostel-li">Advanced reverse water heaters</li>
              <li className="hostel-li">Water treatment plants</li>
            </ul>
          </section>

        </div>

        {/* RIGHT IMAGE */}
        <div className="hostel-image">
          <img src={images[current]} alt="Hostel Facilities" />
        </div>

      </div>
      <MenuButton  onMenu={() => navigate("/menu")} />

    </div>
  );
}
