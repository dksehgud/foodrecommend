// 사이트 소개 페이지

import "../../CSS/AboutUs.css";

import React from "react";

export default function AboutUs() {
  return (
    <div className="aboutus">
      <div id="aboutus-box">
        <div id="aboutus-content1" className="slide-in-blurred-left">
          <div id="aboutus-content-image1"></div>
          <div id="aboutus-content-main1">
            <h1 style={{ fontSize: "35px", color: "#004225" }}>What we do!</h1>
            <p style={{ fontSize: "20px", color: "#FCF8E8" }}>
              We help people make healthy eating habits.
            </p>
            <p style={{ fontSize: "20px", color: "#FCF8E8" }}>
              We Help you decide what to eat today without hesitation.
            </p>
          </div>
        </div>
        <div id="aboutus-content2" className="slide-in-blurred-right ">
          <div id="aboutus-content-main2">
            <p>&nbsp;</p>
            <h2 style={{ color: "#004225" }}>
              We provide customized nutritional solutions to our customers
            </h2>
            <p style={{ fontSize: "17px", color: "#FCF8E8" }}>
              We recommend foods that can complement the nutrients you are
              lacking of.
            </p>
            <p style={{ fontSize: "17px", color: "#FCF8E8" }}>
              We aim to meet the nutritional needs of various individuals.
            </p>
            <p style={{ fontSize: "17px", color: "#FCF8E8" }}>
              Additionally, we recommend foods according to your preferences.
            </p>
            <p style={{ fontSize: "17px", color: "#FCF8E8" }}>
              We developed this service using artificial intelligence.
            </p>
          </div>
          <div id="aboutus-content-image2"></div>
        </div>
      </div>
    </div>
  );
}
