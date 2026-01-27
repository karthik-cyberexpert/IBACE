import React from "react";
import "./placement.css";
import PlacementLineChart from "../components/PlacementLineChart";
import PlacementSlider from "../components/PlacementSlider";

/* LOGO LISTS (ADD / REMOVE FREELY) */
const row1Logos = [
  "p1.jpeg", "p2.jpeg", "p3.jpeg", "p4.jpeg", "p5.jpeg",
  "p6.png", "p7.jpeg", "p8.jpeg", "p9.jpeg", "p10.jpeg",
  "p11.jpeg", "p12.jpeg", "p13.jpeg", "p14.jpeg",
  "p15.jpeg", "p16.jpeg"
];

const row2Logos = [
  "p17.jpeg", "p18.jpeg", "p19.jpeg", "p20.jpeg", "p21.jpeg",
  "p22.jpeg", "p23.jpeg", "p24.png", "p25.png", "p26.png",
  "p27.png", "p28.png", "p29.png", "p30.png",
  "p31.png", "p32.png"
];

export default function Placement() {
  return (
    <div className="department-page placement-page">

      {/* HEADING */}
      <h2 className="heading">Placements</h2>

      {/* TOP SECTION */}
      <div className="top-section">
        <div className="top-box graph-anim-wrapper">
          <PlacementLineChart />
        </div>

        <div className="top-box">
          <div className="mosaic-wrapper">
           <PlacementSlider/>
          </div>
        </div>
      </div>

      {/* LOGOS MARQUEE */}
      <div className="logos-wrapper">

        {/* ROW 1 */}
        <div className="logo-row left-to-right">
          <div className="logo-track">
            {[...row1Logos, ...row1Logos].map((logo, i) => (
              <div className="logo-box" key={`r1-${i}`}>
                <img src={`/logos/${logo}`} alt="" />
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2 */}
        <div className="logo-row right-to-left">
          <div className="logo-track">
            {[...row2Logos, ...row2Logos].map((logo, i) => (
              <div className="logo-box" key={`r2-${i}`}>
                <img src={`/logos/${logo}`} alt="" />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
