import { useEffect, useState } from "react";
import MenuButton from "../components/MenuButton";
import "./Hostel.css";

// Use string paths for images
const hostel1 = "/images/hostel/h1.jpg";
const hostel2 = "/images/hostel/h2.jpg";
const hostel3 = "/images/hostel/h3.jpg";
const hostel4 = "/images/hostel/h4.jpg";

/* Static image list */
const images = [hostel1, hostel2, hostel3, hostel4];

export default function Hostel() {
  const [current, setCurrent] = useState(0);

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
          <img 
            src={images[current]} 
            alt="Hostel Facilities" 
            onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/800x600?text=Hostel+Facilities'; 
            }}
          />
        </div>

      </div>
      <MenuButton />

    </div>
  );
}
