import React from "react";
import "../home.css";

const HeroSlide = ({ slide: { title, description, gender, image } }) => {
  return (
    <div>
      <div className="container-slider">
        <div
          className="hero-image"
          style={{
            backgroundImage: `url("${image}")`,
          }}
        ></div>
        <div className="hero-content">
          <h2>{title}</h2>
          <p>{description}</p>
          <button>Browse {gender}'s</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;
