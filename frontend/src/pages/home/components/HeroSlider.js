import React, { useContext, useState } from "react";
import "../home.css";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import HeroSlide from "./HeroSlide";
import { DataContext } from "../../../contexts/DataContextProvider";

const HeroSlider = () => {
  const { navData } = useContext(DataContext);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="container hero-slider">
      <HeroSlide key={currentSlide} slide={navData[currentSlide]} />
      <div className="slider-controls">
        <BsArrowLeftCircle
          size={32}
          onClick={() =>
            setCurrentSlide((prev) =>
              prev > 0 ? prev - 1 : navData.length - 1
            )
          }
        />
        <span className="radio-slider">
          {navData.map((slide, index) => (
            <input
              key={index}
              type="radio"
              name="slide-controler"
              value={index}
              checked={index === currentSlide}
              onChange={() => setCurrentSlide(index)}
            />
          ))}
        </span>
        <BsArrowRightCircle
          size={32}
          onClick={() =>
            setCurrentSlide((prev) =>
              prev < navData.length - 1 ? prev + 1 : 0
            )
          }
        />
      </div>
    </div>
  );
};

export default HeroSlider;
